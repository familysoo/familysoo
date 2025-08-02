'use client';

import { useState, useEffect } from "react";
import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import PortfolioSection, { transformContentfulData } from "@/components/PortfolioSection";
import Link from "next/link";
import { motion } from "framer-motion";
import { Clock, Phone, Star } from "lucide-react";
import type { PortfolioItem, ServicesApiResponse } from "@/types/database";

export default function RemindWeddingPage() {
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [categories, setCategories] = useState<string[]>(['전체']);
  const [loading, setLoading] = useState(true);

  // 리마인드 웨딩 포트폴리오 데이터 로드
  useEffect(() => {
    async function loadPortfolioData() {
      try {
        const response = await fetch('/api/services?type=remindWedding');
        if (!response.ok) {
          throw new Error('Failed to fetch portfolio data');
        }
        
        const data: ServicesApiResponse = await response.json();
        console.log('remindWedding data', data);
        
        // 데이터 변환
        const transformedItems = transformContentfulData(data, 'remindWedding');
        
        // 엔트리명을 카테고리로 추출 (중복 제거)
        const entryCategories = [...new Set(data.data.map(entry => entry.fields.category))];
        console.log('remindWedding entryCategories', entryCategories);
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
        title="리마인드웨딩 서비스"
        description="결혼의 감동을 다시 한번 느낄 수 있는 특별한 촬영입니다.<br />웨딩드레스를 다시 입고 그날의 설렘과 행복을 재현해보세요."
      />

      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "촬영 서비스", href: "/services" },
          { label: "리마인드웨딩" }
        ]}
      />

      {/* Service Details */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl font-light mb-8 text-foreground">
                다시 찾은 그날의 설렘
              </h2>
              
              <div className="space-y-6">
                <p className="text-foreground/80 leading-relaxed">
                  결혼식 이후 시간이 흘러도 변하지 않는 사랑의 마음을 다시 한번 확인하는 
                  특별한 시간입니다. 웨딩드레스와 턱시도를 다시 입고, 
                  그날의 감동과 설렘을 재현하여 더욱 깊어진 사랑을 사진에 담아드립니다.
                </p>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">1주년 기념</h4>
                    <p className="text-sm text-foreground/70">첫 번째 결혼기념일</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">5주년 기념</h4>
                    <p className="text-sm text-foreground/70">더욱 깊어진 사랑</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">10주년 기념</h4>
                    <p className="text-sm text-foreground/70">십년의 동행</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">특별한 날</h4>
                    <p className="text-sm text-foreground/70">언제든지 가능</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-2xl p-16 text-center">
                <div className="text-8xl mb-6 opacity-60">💕</div>
                <p className="text-foreground/60 italic">
                  "시간이 흘러도 변하지 않는 사랑"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      {!loading && (
        <PortfolioSection
          title="리마인드웨딩 포트폴리오"
          description="시간이 흘러도 변하지 않는 사랑의 이야기를 담은 특별한 작품들을 확인해보세요.<br />로맨틱하고 감동적인 리마인드웨딩 촬영 사진들을 보실 수 있습니다."
          categories={categories}
          portfolioItems={portfolioItems}
          serviceType="remindWedding"
          showMoreButton={true}
          moreButtonText="더 많은 리마인드웨딩 작품 보기"
          moreButtonHref="/portfolio?category=remindWedding"
          maxItems={12}
        />
      )}

      {/* Process */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-light mb-6 text-foreground">촬영 진행 과정</h2>
            <p className="text-lg text-foreground/70">체계적이고 전문적인 촬영 프로세스</p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              {[
                {
                  step: "01",
                  title: "컨셉 및 스타일 상담",
                  description: "원하시는 컨셉과 스타일을 상담하여 촬영 방향을 결정합니다."
                },
                {
                  step: "02", 
                  title: "드레스 피팅 및 메이크업 예약",
                  description: "체형에 맞는 드레스를 선택하고 전문 메이크업 서비스를 예약합니다."
                },
                {
                  step: "03",
                  title: "촬영 장소 선정 및 섭외", 
                  description: "컨셉에 맞는 최적의 촬영 장소를 선정하고 사전 준비를 완료합니다."
                },
                {
                  step: "04",
                  title: "당일 촬영 진행",
                  description: "2-3시간 동안 로맨틱하고 감동적인 순간들을 차근차근 담아냅니다."
                },
                {
                  step: "05",
                  title: "앨범 제작 및 전달",
                  description: "전문 보정 후 웨딩 앨범 제작 및 대형 액자 완성 후 전달해드립니다."
                }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className="flex items-start bg-white p-6 rounded-2xl shadow-sm"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 8px 25px rgba(139, 115, 85, 0.1)"
                  }}
                >
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center font-medium mr-6 flex-shrink-0">
                    {item.step}
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-medium mb-2 text-foreground">{item.title}</h3>
                    <p className="text-foreground/70 leading-relaxed">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-light mb-6 text-foreground">가격 안내</h2>
              <p className="text-lg text-foreground/70">감동적인 추억을 합리적인 가격으로</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-sm"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="font-serif text-2xl font-medium mb-6 text-primary">기본 패키지</h3>
                <div className="text-4xl font-light mb-4 text-foreground">400,000원</div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center text-foreground/80">
                    <Star size={16} className="text-primary mr-3" />
                    보정된 사진 50-80장
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={16} className="text-primary mr-3" />
                    웨딩 앨범 제작 (20매)
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={16} className="text-primary mr-3" />
                    대형 액자 2개 제작
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={16} className="text-primary mr-3" />
                    드레스 대여 포함
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={16} className="text-primary mr-3" />
                    전문 메이크업 서비스
                  </li>
                </ul>
                <div className="flex items-center text-foreground/60">
                  <Clock size={16} className="mr-2" />
                  <span>2-3시간</span>
                </div>
              </motion.div>

              <motion.div
                className="bg-primary p-8 rounded-2xl text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h3 className="font-serif text-2xl font-medium mb-6">프리미엄 패키지</h3>
                <div className="text-4xl font-light mb-4">650,000원</div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center">
                    <Star size={16} className="text-white mr-3" />
                    기본 패키지 모든 포함
                  </li>
                  <li className="flex items-center">
                    <Star size={16} className="text-white mr-3" />
                    야외 로케이션 촬영
                  </li>
                  <li className="flex items-center">
                    <Star size={16} className="text-white mr-3" />
                    웨딩 영상 제작 (3분)
                  </li>
                  <li className="flex items-center">
                    <Star size={16} className="text-white mr-3" />
                    추가 드레스 선택권
                  </li>
                  <li className="flex items-center">
                    <Star size={16} className="text-white mr-3" />
                    프리미엄 앨범 (30매)
                  </li>
                </ul>
                <div className="flex items-center text-white/80">
                  <Clock size={16} className="mr-2" />
                  <span>4-5시간</span>
                </div>
              </motion.div>
            </div>

            <motion.div 
              className="mt-8 bg-gradient-to-r from-accent/20 to-primary/10 p-6 rounded-2xl text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <h4 className="font-medium mb-2 text-primary">특별 할인 혜택</h4>
              <p className="text-foreground/70">결혼 기념일 촬영 시 10% 할인 / 재촬영 고객 15% 할인</p>
            </motion.div>
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
              사랑의 감동을 다시 한번
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              결혼의 설렘과 감동을 다시 느끼고 싶으시다면<br />
              리마인드웨딩으로 특별한 추억을 만들어보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="tel:041-1592-0000"
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
      <footer className="bg-foreground text-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold mb-4">Family Soo Studio</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                소중한 순간을 사진으로 남기는<br />
                따뜻한 감성의 스튜디오
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/services#family" className="hover:text-white transition-colors">가족사진</Link></li>
                <li><Link href="/services#remind-wedding" className="hover:text-white transition-colors">리마인드웨딩</Link></li>
                <li><Link href="/services#growth" className="hover:text-white transition-colors">성장앨범</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">연락처</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>041-1592-0000</li>
                <li>familysoo1592@naver.com</li>
                <li>충남 당진시</li>
                <li><a href="https://blog.naver.com/familysoo1592" target="_blank" className="hover:text-white transition-colors">블로그 바로가기</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/50">
            © 2024 Family Soo Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
