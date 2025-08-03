'use client';

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import PortfolioSection, { transformContentfulData } from "@/components/PortfolioSection";
import Footer from "@/components/Footer";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Phone, Star, Gift } from "lucide-react";
import type { PortfolioItem, ServicesApiResponse } from "@/types/database";
import ConceptSection from "@/components/ConceptSection";

export default function FamilyPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['전체']);
  const [loading, setLoading] = useState(true);

  // 가족 포트폴리오 데이터 로드
  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const response = await fetch('/api/services?type=family');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        
        const data: ServicesApiResponse = await response.json();
        
        // 데이터 변환
        const transformedItems = transformContentfulData(data, 'family');
        
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
        title="가족 촬영 서비스"
        description="온 가족이 함께하는 따뜻한 순간을 자연스럽게 담아냅니다.<br />각 가족만의 개성과 사랑이 느껴지는 특별한 작품을 만들어드립니다."
      />

      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "촬영 서비스", href: "/services" },
          { label: "가족사진" }
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
              <h2 className="font-serif text-xl sm:text-3xl font-light mb-8 text-foreground">
                가족의 소중한 순간들
              </h2>
              
              <div className="space-y-6">
                <p className="text-foreground/80 leading-relaxed">
                  온 가족이 함께하는 특별한 시간을 아름다운 사진으로 기록합니다. 
                  자연스러운 표정과 따뜻한 분위기 속에서 가족만의 스토리를 담아내어 
                  평생 간직할 소중한 추억을 만들어드립니다.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">세미 정장</h4>
                    <p className="text-sm text-foreground/70">우아하고 품격 있는 가족 초상</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">캐주얼</h4>
                    <p className="text-sm text-foreground/70">편안하고 자연스러운 일상의 모습</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">드레스 (웨딩)</h4>
                    <p className="text-sm text-foreground/70">특별한 날의 화려하고 로맨틱한 순간</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">한복</h4>
                    <p className="text-sm text-foreground/70">전통의 아름다움이 담긴 우리 문화</p>
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
                    src="/images/hero/family-1.jpg" 
                    alt="가족 촬영" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <p className="text-foreground/60 italic">
                  "가족의 사랑이 담긴 특별한 순간"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {!loading && (
        <PortfolioSection
          title="가족 촬영 포트폴리오"
          description="가족의 사랑과 행복이 담긴 특별한 순간들을 확인해보세요.<br />다양한 컨셉과 스타일의 가족 사진들을 보실 수 있습니다."
          categories={categories}
          portfolioItems={portfolioItems}
          serviceType="family"
          showMoreButton={true}
          moreButtonText="더 많은 가족 작품 보기"
          moreButtonHref="/portfolio?category=family"
          maxItems={12}
        />
      )}

      {/* Concept Introduction */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-xl sm:text-3xl font-light mb-6 text-foreground">촬영 컨셉 소개</h2>
              <p className="text-lg text-foreground/70">가족의 개성에 맞는 다양한 컨셉을 선택하세요</p>
            </div>

            {/* 테마 소개 - Contentful에서 동적으로 로드 */}
            <ConceptSection service="가족" />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-xl sm:text-3xl font-light mb-6 text-foreground">가격 안내</h2>
              <p className="text-lg text-foreground/70">투명하고 합리적인 가격으로 제공합니다</p>
            </div>

            {/* 단일 패키지 */}
            <div className="flex justify-center">
              <motion.div
                className="bg-primary p-12 rounded-2xl text-white max-w-md w-full text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h4 className="font-serif text-lg sm:text-2xl font-medium mb-6">가족 촬영 패키지</h4>
                <div className="text-3xl font-light mb-6">100,000원</div>
                <div className="bg-white/10 p-4 rounded-lg mb-8">
                  <p className="text-sm font-medium">🎨 전체 컨셉 촬영 가능</p>
                </div>
                <ul className="space-y-4 text-sm">
                  <li className="flex items-center justify-start">
                    <Star size={16} className="text-white mr-3" />
                    촬영한 모든 원본 JPG파일 제공
                  </li>
                  <li className="flex items-center justify-start">
                    <Star size={16} className="text-white mr-3" />
                    전문 보정 서비스
                  </li>
                  <li className="flex items-center justify-start">
                    <Star size={16} className="text-white mr-3" />
                    인원 수 제한 없음
                  </li>
                  <li className="flex items-center justify-start">
                    <Star size={16} className="text-white mr-3" />
                    전 컨셉 의상 무료 대여
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* 포함 혜택 */}
            <div className="mt-16">
              <div className="bg-gradient-to-br from-primary/5 to-accent/10 p-8 rounded-2xl">
                <h3 className="font-serif text-lg sm:text-2xl font-medium mb-6 text-center text-primary">💝 포함 혜택</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl">
                    <h4 className="font-medium text-primary mb-4 flex items-center">
                      <Gift className="mr-2" size={20} />
                      전 컨셉 의상 무료 대여
                    </h4>
                    <p className="text-sm text-foreground/80">
                      모든 촬영 컨셉에 맞는 의상을 무료로 대여해드립니다. 
                      세미정장부터 드레스까지 다양한 스타일의 옷을 준비해두었어요.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl">
                    <h4 className="font-medium text-primary mb-4 flex items-center">
                      <Users className="mr-2" size={20} />
                      촬영 인원 수 제한 없음
                    </h4>
                    <p className="text-sm text-foreground/80">
                      2명부터 10명 이상의 대가족까지! 인원 수에 관계없이 
                      모든 가족 구성원이 함께 촬영할 수 있습니다.
                    </p>
                  </div>
                </div>
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
            <h2 className="font-serif text-2xl sm:text-4xl font-light mb-6 text-foreground">
              가족의 소중한 순간을 기록하세요
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              전문 작가와 함께 가족만의 특별한 이야기를<br />
              아름다운 사진으로 만들어보세요.
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