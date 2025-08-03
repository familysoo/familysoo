'use client';

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import PortfolioSection, { transformContentfulData } from "@/components/PortfolioSection";
import ConceptSection from "@/components/ConceptSection";
import Link from "next/link";
import { motion } from "framer-motion";
import { Phone, Star } from "lucide-react";
import type { PortfolioItem, ServicesApiResponse } from "@/types/database";
import Footer from "@/components/Footer";

export default function BabyPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['전체']);
  const [loading, setLoading] = useState(true);

  // 베이비 포트폴리오 데이터 로드
  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const response = await fetch('/api/services?type=baby');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        
        const data: ServicesApiResponse = await response.json();
        
        // 데이터 변환
        const transformedItems = transformContentfulData(data, 'baby');
        
        // 엔트리명을 카테고리로 추출 (중복 제거)
        const entryCategories = [...new Set(data.data.map(entry => entry.fields.category))];
        const allCategories = ['전체', ...entryCategories];
        
        setPortfolioItems(transformedItems);
        setCategories(allCategories);
      } catch (error) {
        console.error('포트폴리오 데이터 로딩 실패:', error);
      } finally {
        setLoading(false);
      }
    }

    loadPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <PageHero 
        title="베이비 촬영"
        description="아이의 소중한 성장 과정을 단계별로 기록합니다.<br />신생아부터 돌잔치까지, 매 순간의 변화와 성장을 아름답게 담아냅니다."
      />

      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "서비스", href: "/services" },
          { label: "베이비 촬영" }
        ]}
      />

      {/* Service Details */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl font-light mb-8 text-foreground">
                소중한 성장의 순간들
              </h2>
              
              <div className="space-y-6">
                <p className="text-foreground/80 leading-relaxed">
                  아이의 첫 순간부터 돌잔치까지, 각 단계별로 변화하는 모습을 전문적으로 기록합니다. 
                  안전하고 편안한 환경에서 아이의 자연스러운 표정과 모습을 담아내어 
                  평생 간직할 소중한 추억을 만들어드립니다.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">신생아 촬영</h4>
                    <p className="text-sm text-foreground/70">생후 7-14일 최적의 시기</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">100일 촬영</h4>
                    <p className="text-sm text-foreground/70">건강한 성장의 첫 기념</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">돌잔치 촬영</h4>
                    <p className="text-sm text-foreground/70">첫 번째 생일의 특별함</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">성장 기록</h4>
                    <p className="text-sm text-foreground/70">연속적인 성장 앨범</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-2xl p-8 text-center">
                <div className="relative w-full h-80 mb-6 rounded-xl overflow-hidden">
                  <img 
                    src="/images/hero/baby-2.jpg" 
                    alt="리마인드웨딩 촬영" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-foreground/60 italic">
                  "매 순간이 소중한 성장의 기록"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {!loading && (
        <PortfolioSection
          title="베이비 촬영 포트폴리오"
          description="아이의 소중한 순간들을 담은 작품들을 확인해보세요.<br />각 테마별로 다양한 컨셉의 베이비 촬영 사진들을 보실 수 있습니다."
          categories={categories}
          portfolioItems={portfolioItems}
          serviceType="baby"
          showMoreButton={true}
          moreButtonText="더 많은 베이비 작품 보기"
          moreButtonHref="/portfolio?category=baby"
          maxItems={12}
        />
      )}

      {/* Pricing */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-light mb-6 text-foreground">가격 안내</h2>
              <p className="text-lg text-foreground/70">투명하고 합리적인 가격으로 제공합니다</p>
            </div>

            {/* 테마 소개 - Contentful에서 동적으로 로드 */}
            <ConceptSection service="베이비" />

            {/* 상품 구성 설명 */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-primary/5 to-accent/10 p-8 rounded-2xl">
                <h3 className="font-serif text-2xl font-medium mb-6 text-center text-primary">💡 상품 구성 이해하기</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl">
                    <h4 className="font-medium text-primary mb-3">🎨 "테마"란 무엇인가요?</h4>
                    <p className="text-sm text-foreground/80 mb-4">
                      각 상품에서 "1테마", "2테마"는 위 테마들 중에서 선택하여 촬영하는 컨셉의 개수입니다.
                    </p>
                    <div className="bg-primary/5 p-4 rounded-lg">
                      <p className="text-sm text-foreground/80">
                        <strong>예시:</strong> 심플 A (2테마 촬영)<br/>
                        → "돌상 + 복고컨셉" 또는 "한옥 + 가족" 등<br/>
                        → 원하시는 테마 2개를 자유롭게 선택!
                      </p>
                    </div>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl">
                    <h4 className="font-medium text-primary mb-3">📷 촬영 분량 vs 결과물</h4>
                    <p className="text-sm text-foreground/80 mb-4">
                      "2테마 촬영 = 사진 2장"이 아닙니다! 촬영 분량과 결과물은 다릅니다.
                    </p>
                    <div className="bg-accent/5 p-4 rounded-lg">
                      <p className="text-sm text-foreground/80">
                        <strong>실제 구성:</strong><br/>
                        • 촬영: 선택한 테마별로 수십 장 촬영<br/>
                        • 원본: 촬영한 모든 JPG 파일 제공<br/>
                        • 수정본: 고객이 선택한 1~2장 보정<br/>
                        • 출력물: 액자/앨범으로 제작
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 단일 촬영 패키지 */}
            <div className="mb-16">
              <h3 className="font-serif text-2xl font-medium mb-8 text-center text-primary">📋 단일 촬영 패키지</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4 text-primary">심플 A</h4>
                  <div className="text-3xl font-light mb-4 text-foreground">290,000원</div>
                  <div className="bg-primary/5 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-primary">🎨 위 테마 중 2개 선택 촬영</p>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      선택한 1장 전문 보정
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      8R 액자 1개 제작
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4 text-primary">심플 B</h4>
                  <div className="text-3xl font-light mb-4 text-foreground">390,000원</div>
                  <div className="bg-primary/5 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-primary">🎨 기본 테마 2개 + 돌상 or 가족촬영 추가</p>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      선택한 2장 전문 보정
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      8R 액자 2개 또는 11R 액자 1개
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-primary p-6 rounded-2xl text-white"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4">심플 C <span className="text-xs bg-white/20 px-2 py-1 rounded">인기</span></h4>
                  <div className="text-3xl font-light mb-4">490,000원</div>
                  <div className="bg-white/10 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium">🎨 기본 테마 2개 + 돌상 or 가족촬영 추가</p>
                  </div>
                  <ul className="space-y-2 mb-6 text-sm">
                    <li className="flex items-center">
                      <Star size={14} className="text-white mr-2" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center">
                      <Star size={14} className="text-white mr-2" />
                      선택한 2장 전문 보정
                    </li>
                    <li className="flex items-center">
                      <Star size={14} className="text-white mr-2" />
                      10x10 10페이지 프리미엄 앨범 + 11R 액자 1개
                    </li>
                  </ul>
                </motion.div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-6">
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4 text-primary">원본 A <span className="text-sm text-foreground/60">(추가상품)</span></h4>
                  <div className="text-3xl font-light mb-4 text-foreground">100,000원</div>
                  <div className="bg-primary/5 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-primary">🎨 위 테마 중 1개 선택 촬영</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      선택한 1장 전문 보정 제공
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4 text-primary">못난이 테마 <span className="text-xs bg-primary text-white px-2 py-1 rounded">특별</span></h4>
                  <div className="text-3xl font-light mb-4 text-foreground">250,000원</div>
                  <div className="bg-primary/5 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-primary">🎨 못난이 전용 테마 1컷 촬영</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      8x20 특수 사이즈 액자 제작
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* 기념일 패키지 */}
            <div className="mb-16">
              <h3 className="font-serif text-2xl font-medium mb-8 text-center text-primary">🎉 기념일 패키지</h3>
              <p className="text-center text-foreground/70 mb-8">정해진 구성 + 추천 컨셉으로 특별한 기념일을 기록하세요</p>
              <div className="grid md:grid-cols-2 gap-8">
                <motion.div
                  className="bg-white p-8 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="font-serif text-2xl font-medium mb-4 text-primary">첫돌기념 패키지</h4>
                  <div className="text-4xl font-light mb-4 text-foreground">290,000원</div>
                  <div className="bg-primary/5 p-4 rounded-lg mb-6">
                    <p className="text-sm font-medium text-primary mb-2">🎂 첫돌 테마 중 2건 선택 촬영</p>
                    <p className="text-xs text-foreground/70">돌상, 돌잡이, 한옥, 복고 컨셉 등에서 선택</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-foreground/80">
                      <Star size={16} className="text-primary mr-3" />
                      8R 액자 1개 + 선택한 2장 전문 보정
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={16} className="text-primary mr-3" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={16} className="text-primary mr-3" />
                      <span>추가 컨셉 선택 시 1건당 +100,000원</span>
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-white p-8 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 className="font-serif text-2xl font-medium mb-4 text-primary">백일기념 패키지</h4>
                  <div className="text-4xl font-light mb-4 text-foreground">290,000원</div>
                  <div className="bg-primary/5 p-4 rounded-lg mb-6">
                    <p className="text-sm font-medium text-primary mb-2">💝 백일 테마 중 2건 선택 촬영</p>
                    <p className="text-xs text-foreground/70">백일상, 전통누드, 스튜디오, 가족 컨셉 등에서 선택</p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center text-foreground/80">
                      <Star size={16} className="text-primary mr-3" />
                      8R 액자 1개 + 선택한 2장 전문 보정
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={16} className="text-primary mr-3" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={16} className="text-primary mr-3" />
                      <span>형제자매, 레몬 컨셉 추가 선택 가능</span>
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* 성장앨범 패키지 */}
            <div className="mb-16">
              <h3 className="font-serif text-2xl font-medium mb-8 text-center text-primary">📚 성장앨범 패키지</h3>
              <div className="bg-gradient-to-br from-primary/5 to-accent/10 p-6 rounded-2xl mb-6">
                <p className="text-center text-foreground/70">기간별 성장 기록을 위한 특별 할인 패키지 - 아이의 성장 과정을 완벽하게 기록하세요</p>
              </div>
              
              <div className="grid lg:grid-cols-3 gap-6">
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4 text-primary">심플 성장</h4>
                  <div className="mb-4">
                    <span className="text-lg text-foreground/50 line-through">990,000원</span>
                    <div className="text-3xl font-light text-foreground">790,000원</div>
                    <span className="text-sm text-primary font-medium">200,000원 할인!</span>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg mb-4">
                    <p className="text-xs text-foreground/80">🎨 50일 2테마 + 100일 2테마 + 돌 2테마 + 가족 1테마</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      10x10인치 16페이지 프리미엄 앨범
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      16x20 아크릴 액자 1개
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      8x10인치 액자 2개
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-primary p-6 rounded-2xl text-white"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4">돌상 성장 <span className="text-xs bg-white/20 px-2 py-1 rounded">인기</span></h4>
                  <div className="mb-4">
                    <span className="text-lg text-white/60 line-through">1,190,000원</span>
                    <div className="text-3xl font-light">990,000원</div>
                    <span className="text-sm text-white/90 font-medium">200,000원 할인!</span>
                  </div>
                  <div className="bg-white/10 p-3 rounded-lg mb-4">
                    <p className="text-xs text-white/90">🎨 50일 2테마 + 100일 2테마 + 돌 1테마 + 돌상 1테마 + 가족 1테마</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center">
                      <Star size={14} className="text-white mr-2" />
                      11x11인치 20페이지 프리미엄 앨범
                    </li>
                    <li className="flex items-center">
                      <Star size={14} className="text-white mr-2" />
                      16x20 아크릴 액자 1개
                    </li>
                    <li className="flex items-center">
                      <Star size={14} className="text-white mr-2" />
                      8x10인치 액자 2개
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4 text-primary">본아트 성장 <span className="text-xs bg-primary text-white px-2 py-1 rounded">프리미엄</span></h4>
                  <div className="mb-4">
                    <span className="text-lg text-foreground/50 line-through">1,390,000원</span>
                    <div className="text-3xl font-light text-foreground">1,190,000원</div>
                    <span className="text-sm text-primary font-medium">200,000원 할인!</span>
                  </div>
                  <div className="bg-primary/5 p-3 rounded-lg mb-4">
                    <p className="text-xs text-foreground/80">🎨 본아트 + 50일 2테마 + 100일 2테마 + 200일 2테마 + 돌 1테마 + 돌상 1테마 + 가족 1테마</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      12x12인치 22페이지 프리미엄 앨범
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      20x30 아크릴 액자 1개
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      8x10인치 액자 3개
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>

            {/* 출사형 상품 */}
            <div>
              <h3 className="font-serif text-2xl font-medium mb-8 text-center text-primary">🌿 출사형 상품</h3>
              <p className="text-center text-foreground/70 mb-8">야외에서 자연스러운 분위기로 촬영하는 출사 전용 상품</p>
              <div className="grid md:grid-cols-3 gap-6">
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4 text-primary">출사 - 원본 JPG</h4>
                  <div className="text-3xl font-light mb-4 text-foreground">250,000원</div>
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-green-700">🌿 야외 자연 촬영</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      별도 보정 및 출력물 없음
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4 text-primary">출사 - 8R 액자 + JPG</h4>
                  <div className="text-3xl font-light mb-4 text-foreground">350,000원</div>
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-green-700">🌿 야외 자연 촬영 + 액자</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      선택한 1장 보정 + 8R 액자 1개
                    </li>
                  </ul>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border border-primary"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <h4 className="font-serif text-xl font-medium mb-4 text-primary">출사 - 앨범 + JPG</h4>
                  <div className="text-3xl font-light mb-4 text-foreground">450,000원</div>
                  <div className="bg-green-50 p-3 rounded-lg mb-4">
                    <p className="text-sm font-medium text-green-700">🌿 야외 자연 촬영 + 앨범</p>
                  </div>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      촬영한 모든 원본 JPG파일 제공
                    </li>
                    <li className="flex items-center text-foreground/80">
                      <Star size={14} className="text-primary mr-2" />
                      10x10 10페이지 앨범 제작
                    </li>
                  </ul>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl font-light mb-6 text-foreground">
              소중한 성장의 순간을 기록하세요
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              아이의 첫 순간부터 돌잔치까지, 전문 작가와 함께<br />
              평생 간직할 아름다운 성장 앨범을 만들어보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="tel:041-356-1592"
                className="bg-white hover:bg-primary hover:text-white text-primary border-2 border-primary px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(139, 115, 85, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} className="mr-2" />
                전화 상담하기
              </motion.a>
              <Link href="/contact">
                <motion.div
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(139, 115, 85, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  예약 문의하기
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
