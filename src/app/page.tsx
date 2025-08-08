'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Header from "../components/Header";
import PortfolioSection from "../components/PortfolioSection";
import Footer from "../components/Footer";
import type { 
  ServicesApiResponse, 
  PortfolioItem, 
  ContentType 
} from "@/types/database";
import LoadingSpinner from "../components/LoadingSpinner";
import { transformContentfulData } from "../components/PortfolioSection";

// 애니메이션이 적용된 스튜디오 소개 섹션 컴포넌트
function StudioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const studioFeatures = [
    {
      title: "넓고 다양한 컨셉의 스튜디오",
      description: "1층과 2층에 걸쳐 넓은 공간을 활용한 스튜디오로 다양한 촬영을 시도할 수 있는 최적의 환경을 제공합니다.",
      icon: "🏢"
    },
    {
      title: "다양한 소품과 세트",
      description: "촬영의 완성도를 높여주는 다양한 소품과 세트를 보유하고 있습니다. 아이들의 촬영을 위한 귀여운 소품부터 리마인드 웨딩 촬영을 위한 로맨틱한 소품까지, 각 컨셉에 어울리는 소품을 사용해 더욱 특별한 사진을 만들어드립니다.",
      icon: "🎨"
    },
    {
      title: "전문 사진 작가",
      description: "각 분야에서 경험을 쌓은 전문 사진 작가가 가족, 반려동물, 베이비 및 웨딩 촬영을 전문적으로 진행합니다.",
      icon: "📷"
    },
    {
      title: "개인 맞춤 서비스",
      description: "고객의 요구에 맞춰 촬영 컨셉과 스타일을 조정하며, 원하는 순간을 완벽하게 기록하기 위해 사전에 충분한 상담을 진행합니다.",
      icon: "✨"
    },
    {
      title: "최첨단 장비 및 시설",
      description: "최신 촬영 장비와 조명을 사용해 최고의 사진 품질을 보장합니다. 또한, 편안한 스튜디오 환경을 조성하여 모든 가족 구성원이 편안하게 촬영을 즐길 수 있습니다.",
      icon: "🏡"
    }
  ];

  return (
    <section className="py-16 sm:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* 대표 인사말 섹션 */}
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 대표 인사말 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="font-serif text-2xl sm:text-4xl font-light mb-8 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              스튜디오 소개
            </motion.h2>
            
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <motion.h3 
                className="font-serif text-lg sm:text-2xl font-medium mb-4 text-primary"
                whileHover={{ scale: 1.02, transition: { duration: 0.2, ease: "easeOut" } }}
                transition={{ duration: 0.2, ease: "easeOut" }}
              >
                대표 인사말
              </motion.h3>
              <motion.p 
                className="text-foreground/80 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                안녕하세요, 패밀리수 스튜디오에 오신 것을 환영합니다.<br />
                당진 최초의 가족·리마인드 전문 스튜디오로, 25년 이상의 촬영 경험을 바탕으로 
                여러분의 특별한 이야기를 아름답게 기록해드리고 있습니다.
              </motion.p>
              <motion.p 
                className="text-foreground/80 leading-relaxed"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 1.0 }}
              >
                당진 최대 규모의 시설과 풍부한 의상, 전문 메이크업 서비스까지 
                모든 것을 원스톱으로 제공하여 고객님의 소중한 순간을 완벽하게 담아내겠습니다.
              </motion.p>
            </motion.div>
          </motion.div>

          {/* 스튜디오 대표 이미지 */}
          <div className="relative">
            <div className="relative rounded-2xl h-80 overflow-hidden">
              <img 
                src="/images/hero/exterior.jpg" 
                alt="Family Soo Studio 외관" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <h4 className="font-serif text-2xl font-medium text-white mb-3">
                  Family Soo Studio
                </h4>
                <p className="text-white/90 text-sm">
                  소중한 순간을 아름답게 기록하는<br />
                  따뜻한 감성의 사진 스튜디오
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* 스튜디오의 5가지 특징 */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <motion.h3 
            className="font-serif text-lg sm:text-2xl font-medium mb-12 text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.0 }}
          >
            스튜디오의 5가지 특징
          </motion.h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {studioFeatures.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={isInView ? 
                  { 
                    opacity: 1, 
                    y: 0, 
                    scale: 1,
                    transition: { 
                      duration: 0.6, 
                      delay: 1.2 + index * 0.1,
                      ease: "easeOut"
                    }
                  } : 
                  { 
                    opacity: 0, 
                    y: 30, 
                    scale: 0.95,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }
                }
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(139, 115, 85, 0.1)",
                  transition: { duration: 0.2, ease: "easeOut" }
                }}
              >
                <motion.div 
                  className="text-center mb-4 sm:mb-6"
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <span className="text-3xl sm:text-4xl">{feature.icon}</span>
                </motion.div>
                <h4 className="font-serif text-lg sm:text-xl font-medium text-primary mb-4 text-center">
                  {feature.title}
                </h4>
                <p className="text-foreground/80 leading-relaxed text-center text-sm sm:text-base">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// 서비스 섹션 컴포넌트 (애니메이션 제거됨)
function ServiceSection({ 
  imageUrl, 
  title, 
  description, 
  services, 
  href, 
  isReversed, 
  showDivider 
}: {
  imageUrl: string;
  title: string;
  description: string;
  services: string[];
  href: string;
  isReversed: boolean;
  showDivider: boolean;
}) {
  return (
    <div>
      <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center mb-16">
        <div 
          className={`${isReversed ? 'lg:order-2' : ''}`}
        >
          <Link href={href}>
            <motion.div 
              className="rounded-2xl h-64 sm:h-80 bg-cover bg-no-repeat bg-center relative overflow-hidden cursor-pointer"
              style={{ backgroundImage: `url('${imageUrl}')` }}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.4 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div 
                className="absolute inset-0 bg-black/30 rounded-2xl"
                whileHover={{ 
                  backgroundColor: "rgba(0, 0, 0, 0.2)",
                  transition: { duration: 0.4 }
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl opacity-0"
                whileHover={{ 
                  opacity: 1,
                  transition: { duration: 0.4 }
                }}
              />
            </motion.div>
          </Link>
        </div>
        
        <div 
          className={`${isReversed ? 'lg:order-1' : ''}`}
        >
          <h3 className="font-serif text-xl sm:text-3xl font-medium mb-4 sm:mb-6 text-primary">
            {title}
          </h3>
          
          <p className="text-foreground/80 text-base sm:text-lg leading-relaxed mb-6 sm:mb-8">
            {description}
          </p>
          
          <motion.div 
            className="border border-primary rounded-xl p-4 sm:p-6 mb-4 sm:mb-6"
            whileHover={{ 
              borderColor: "var(--primary)",
              boxShadow: "0 4px 20px rgba(139, 115, 85, 0.1)",
              transition: { duration: 0.2, ease: "easeOut" }
            }}
          >
            <h4 className="font-medium text-base sm:text-lg mb-3 sm:mb-4 text-foreground">포함 서비스</h4>
            <ul className="space-y-2 text-foreground/70 text-sm sm:text-base">
              {services.map((service, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center"
                  whileHover={{ 
                    x: 4,
                    transition: { duration: 0.2, ease: "easeOut" }
                  }}
                >
                  <motion.span 
                    className="text-primary mr-3"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    ✓
                  </motion.span>
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <div>
            <Link href={href}>
              <motion.span
                className="text-primary font-medium cursor-pointer inline-block"
                whileHover={{ 
                  color: "rgba(139, 115, 85, 0.8)",
                  x: 8,
                  transition: { duration: 0.2 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                자세히 보기 →
              </motion.span>
            </Link>
          </div>
        </div>
      </div>
      
      {showDivider && (
        <div className="flex justify-center">
          <div 
            className="h-px bg-primary/30 w-24"
          />
        </div>
      )}
    </div>
  );
}



export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // 패럴랙스 효과를 위한 ref
  const parallaxRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: parallaxRef,
    offset: ["start end", "end start"]
  });
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  
  // 캐러셀 배경 이미지들
  const heroSlides = [
    {
      id: 1,
      title: "따뜻한 가족의 시간",
      image: "/images/hero/family-1.jpg",
      fallback: "linear-gradient(135deg, #8b7355, #d4c4a8)"
    },
    {
      id: 2,
      title: "소중한 추억 만들기", 
      image: "/images/hero/family-2.jpg",
      fallback: "linear-gradient(135deg, #8b7355, #f5f1eb)"
    },
    {
      id: 3,
      title: "아기 돌 촬영",
      image: "/images/hero/baby-1.jpg",
      fallback: "linear-gradient(135deg, #d4c4a8, #8b7355)"
    },
    {
      id: 4,
      title: "아기 백일 촬영",
      image: "/images/hero/baby-2.jpg",
      fallback: "linear-gradient(135deg, #f5f1eb, #d4c4a8)"
    },
    {
      id: 5,
      title: "리마인드 웨딩",
      image: "/images/hero/wedding-1.jpg",
      fallback: "linear-gradient(135deg, #f5f1eb, #d4c4a8)"
    }
  ];

  // 포트폴리오 데이터 가져오기
  const fetchPortfolioData = async () => {
    try {
      setIsLoading(true);
      
      // 병렬로 모든 content type 데이터 가져오기
      const contentTypes: ContentType[] = ['family', 'baby', 'remindWedding'];
      const promises = contentTypes.map(async (type) => {
        const response = await fetch(`/api/services?type=${type}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${type} data`);
        }
        const data: ServicesApiResponse = await response.json();
        return transformContentfulData(data, type);
      });
      
      const results = await Promise.all(promises);
      const allItems = results.flat();
      
      // 데이터를 섞어서 다양하게 표시
      const shuffledItems = allItems.sort(() => Math.random() - 0.5);
      setPortfolioItems(shuffledItems);
    } catch (error) {
      console.error('포트폴리오 데이터 가져오기 실패:', error);
      // 에러 발생 시 빈 배열로 설정
      setPortfolioItems([]);
    } finally {
      setIsLoading(false);
    }
  };

  // 자동 슬라이드 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length); // 전체 슬라이드 개수 사용
    }, 5000); // 5초마다 전환

    return () => clearInterval(timer);
  }, []);

  // 포트폴리오 데이터 로드
  useEffect(() => {
    fetchPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Header */}
      <Header transparent={true} />

      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Carousel Background */}
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
          {heroSlides.map((slide, index) => (
            <div
              key={`slide-${index}`}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: '50% 30%',
                backgroundRepeat: 'no-repeat',
                backgroundColor: '#8b7355',
                opacity: index === currentSlide ? 1 : 0,
                transition: 'opacity 1s ease-in-out',
                zIndex: index === currentSlide ? 10 : 0
              }}
            >
              {/* Dark overlay for text readability */}
              <div style={{
                position: 'absolute',
                inset: 0,
                backgroundColor: 'rgba(0, 0, 0, 0.6)'
              }}></div>
            </div>
          ))}
        </div>
        
        {/* 텍스트와 CTA를 하단으로 이동 */}
        <div className="absolute bottom-20 sm:bottom-24 left-0 right-0 z-20 text-center px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light mb-6 fade-in-up text-white drop-shadow-lg leading-tight">
              소중한 순간을<br/>사진으로 남기세요
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-8 opacity-90 fade-in-up text-white/90 drop-shadow-md">
              가족의 시간, 사랑으로 기록됩니다
            </p>
            {/* 모바일/태블릿: 전화 연결, PC: 예약문의 페이지 */}
            <Link 
              href="tel:041-356-1592"
              className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-colors fade-in-up shadow-lg lg:hidden"
            >
              예약 문의하기
            </Link>
            <Link 
              href="/contact"
              className="bg-primary hover:bg-primary/90 text-white px-6 sm:px-8 py-3 rounded-full font-medium transition-colors fade-in-up shadow-lg hidden lg:inline-block"
            >
              예약 문의하기
            </Link>
          </div>
        </div>

        {/* Carousel Dots */}
        <div style={{
          position: 'absolute',
          bottom: '1rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '1rem',
          zIndex: 50
        }}>
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                backgroundColor: index === currentSlide ? 'white' : 'rgba(255, 255, 255, 0.5)',
                transform: index === currentSlide ? 'scale(1.2)' : 'scale(1)',
                boxShadow: index === currentSlide ? '0 2px 8px rgba(0, 0, 0, 0.3)' : 'none'
              }}
            />
          ))}
        </div>

        {/* Carousel Navigation Arrows */}
        <button
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          style={{
            position: 'absolute',
            left: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 50,
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'white'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(255, 255, 255, 0.7)'}
        >
          <ChevronLeft size={32} strokeWidth={2} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          style={{
            position: 'absolute',
            right: '1rem',
            top: '50%',
            transform: 'translateY(-50%)',
            zIndex: 50,
            color: 'rgba(255, 255, 255, 0.7)',
            transition: 'all 0.3s ease',
            background: 'none',
            border: 'none',
            cursor: 'pointer'
          }}
          onMouseEnter={(e) => (e.target as HTMLElement).style.color = 'white'}
          onMouseLeave={(e) => (e.target as HTMLElement).style.color = 'rgba(255, 255, 255, 0.7)'}
        >
          <ChevronRight size={32} strokeWidth={2} />
        </button>
      </section>

      {/* 2. 촬영 서비스 안내 */}
      <section className="py-16 sm:py-32 bg-muted overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 sm:mb-24">
            <h2 className="font-serif text-2xl sm:text-4xl font-light mb-6 text-foreground">촬영 서비스</h2>
            <p className="text-base sm:text-lg text-foreground/70 max-w-2xl mx-auto px-4">
              각각의 특별한 순간을 위한 맞춤 촬영 서비스로<br />
              소중한 기억을 아름다운 작품으로 완성해드립니다.
            </p>
          </div>

          <div className="space-y-16 sm:space-y-32">
            {/* 가족사진 */}
            <ServiceSection 
              imageUrl="/images/hero/family-1.jpg"
              title="가족사진"
              description="온 가족이 함께하는 따뜻한 순간을 자연스럽게 담아냅니다. 각 가족만의 개성과 사랑이 느껴지는 특별한 작품을 만들어드립니다."
              services={[
                "전문 작가 촬영 (1-2시간)",
                "다양한 컨셉 촬영",
                "전문 보정 작업",
                "고해상도 원본 파일 제공"
              ]}
              href="/services/family"
              isReversed={false}
              showDivider={true}
            />

            {/* 리마인드 웨딩 */}
            <ServiceSection 
              imageUrl="/images/hero/wedding-1.jpg"
              title="리마인드 웨딩"
              description="결혼의 감동을 다시 한번 느낄 수 있는 특별한 촬영입니다. 웨딩드레스를 다시 입고 그날의 설렘과 행복을 재현해보세요."
              services={[
                "웨딩드레스 & 턱시도 제공",
                "전문 메이크업 서비스",
                "로맨틱 컨셉 촬영",
                "고급 앨범 제작"
              ]}
              href="/services/remind-wedding"
              isReversed={true}
              showDivider={true}
            />

            {/* 성장앨범 */}
            <ServiceSection 
              imageUrl="/images/hero/baby-2.jpg"
              title="베이비 촬영"
              description="아이의 소중한 성장 과정을 단계별로 기록합니다. 신생아부터 돌잔치까지, 매 순간의 변화와 성장을 아름답게 담아냅니다."
              services={[
                "신생아 ~ 돌잔치 단계별 촬영",
                "안전한 촬영 환경",
                "성장 기록 앨범 제작",
                "추억의 소품 촬영"
              ]}
              href="/services/baby"
              isReversed={false}
              showDivider={false}
            />
          </div>
        </div>
      </section>

      {/* 3. 스튜디오 소개 */}
      <StudioSection />

      {/* 4. 포트폴리오 (촬영 사례) */}
      {!isLoading && (
        <PortfolioSection 
          title="포트폴리오"
          description="소중한 순간들의 아름다운 기록을 확인해보세요.<br />다양한 컨셉과 스타일의 작품들을 만나보실 수 있습니다."
          categories={["전체", "가족사진", "리마인드웨딩", "베이비촬영"]}
          portfolioItems={portfolioItems}
          showMoreButton={true}
          moreButtonText="더 많은 작품 보기"
          moreButtonHref="/portfolio"
          maxItems={10}
        />
      )}
      
      {/* 로딩 상태 */}
      {isLoading && (
        <section className="py-32 bg-muted">
          <div className="container">
            <div className="text-center">
              <LoadingSpinner size="lg" className="text-primary" />
            </div>
          </div>
        </section>
      )}

      {/* 5. 이용안내 */}
      <section className="py-16 sm:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-2xl sm:text-4xl font-light mb-6 text-foreground">이용안내</h2>
            <p className="text-base sm:text-lg text-foreground/70 px-4">
              촬영 예약부터 완성된 사진 받기까지의 전 과정을 안내해드립니다.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
            {/* 예약 방법 및 가격 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-sm mb-8"
                initial={{ scale: 1, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(139, 115, 85, 0.1)"
                }}
                transition={{ duration: 0.2 }}
                style={{ 
                  transition: "transform 0.2s ease, box-shadow 0.2s ease" 
                }}
              >
                <h3 className="font-serif text-lg sm:text-2xl font-medium mb-6 text-primary">
                  예약 방법 및 가격
                </h3>
                
                <div>
                  <motion.div 
                    style={{ marginBottom: '3rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                  >
                    <h4 className="font-medium text-base sm:text-lg mb-3">예약 방법</h4>
                    <ul className="space-y-2 text-foreground/70">
                      <motion.li whileHover={{ x: 4, color: "var(--foreground)" }} transition={{ duration: 0.2 }}>
                        • 전화 상담: 
                        <a href="tel:041-356-1592" className="text-primary hover:text-primary/80 transition-colors ml-1">
                          041-356-1592
                        </a>
                        <span className="text-xs text-foreground/50 ml-2 inline sm:hidden">
                          (📞 탭하여 전화)
                        </span>
                      </motion.li>
                      <motion.li whileHover={{ x: 4, color: "var(--foreground)" }} transition={{ duration: 0.2 }}>
                        • 카카오 상담: @soo_1592
                      </motion.li>
                    </ul>
                  </motion.div>

                  <motion.div 
                    style={{ marginBottom: '3rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                  >
                    <h4 className="font-medium text-base sm:text-lg mb-3">촬영 가격</h4>
                    <div className="space-y-3">
                      <motion.div 
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                        whileHover={{ 
                          backgroundColor: "rgba(139, 115, 85, 0.05)",
                          scale: 1.01
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>가족사진 (기본)</span>
                        <span className="font-medium">100,000원~</span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                        whileHover={{ 
                          backgroundColor: "rgba(139, 115, 85, 0.05)",
                          scale: 1.01
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>리마인드웨딩</span>
                        <span className="font-medium">100,000원~</span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                        whileHover={{ 
                          backgroundColor: "rgba(139, 115, 85, 0.05)",
                          scale: 1.01
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>베이비 촬영</span>
                        <span className="font-medium">150,000원~</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <h4 className="font-medium text-base sm:text-lg mb-3">소요 시간</h4>
                    <ul className="space-y-2 text-foreground/70">
                      <motion.li whileHover={{ x: 4, color: "var(--foreground)" }} transition={{ duration: 0.2 }}>
                        • 촬영 시간: 1-2시간
                      </motion.li>
                      <motion.li whileHover={{ x: 4, color: "var(--foreground)" }} transition={{ duration: 0.2 }}>
                        • 보정 기간: 7-10일
                      </motion.li>
                      <motion.li whileHover={{ x: 4, color: "var(--foreground)" }} transition={{ duration: 0.2 }}>
                        • 앨범 제작: 추가 3-5일
                      </motion.li>
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* 자주 묻는 질문 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-sm"
                initial={{ scale: 1, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(139, 115, 85, 0.1)"
                }}
                transition={{ duration: 0.2 }}
                style={{ 
                  transition: "transform 0.2s ease, box-shadow 0.2s ease" 
                }}
              >
                <h3 className="font-serif text-lg sm:text-2xl font-medium mb-6 text-primary">
                  자주 묻는 질문
                </h3>
                
                <div className="space-y-6">
                  <motion.div 
                    className="p-4 rounded-xl"
                    initial={{ opacity: 0, y: 20, backgroundColor: "transparent" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.03)"
                    }}
                    style={{ transition: "background-color 0.2s ease" }}
                  >
                    <h4 className="font-medium text-base sm:text-lg mb-2">Q. 드레스와 턱시도는 제공되나요?</h4>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      네, 다양한 디자인의 드레스와 턱시도를 다량 보유하고 있어 고객님께 맞는 의상을 선택하실 수 있습니다. 사이즈별로 준비되어 있습니다.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-4 rounded-xl"
                    initial={{ opacity: 0, y: 20, backgroundColor: "transparent" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.03)"
                    }}
                    style={{ transition: "background-color 0.2s ease" }}
                  >
                    <h4 className="font-medium text-base sm:text-lg mb-2">Q. 메이크업 서비스도 받을 수 있나요?</h4>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      네, 전문 메이크업 서비스를 제공합니다. 가족 촬영 및 리마인드 웨딩 촬영 시 전문 메이크업으로 더욱 아름다운 모습을 연출해드립니다.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-4 rounded-xl"
                    initial={{ opacity: 0, y: 20, backgroundColor: "transparent" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.03)"
                    }}
                    style={{ transition: "background-color 0.2s ease" }}
                  >
                    <h4 className="font-medium text-base sm:text-lg mb-2">Q. 액자 제작은 어떻게 진행되나요?</h4>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      최신 디자인의 사진액자로 제작해드리며, 액자 작업 전 미리 확인해드리는 서비스로 고객 만족도를 높이고 있습니다.
                    </p>
                  </motion.div>

                  <motion.div 
                    className="p-4 rounded-xl"
                    initial={{ opacity: 0, y: 20, backgroundColor: "transparent" }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 1.0 }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.03)"
                    }}
                    style={{ transition: "background-color 0.2s ease" }}
                  >
                    <h4 className="font-medium text-base sm:text-lg mb-2">Q. 주차는 편리한가요?</h4>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      넓은 전용 주차장을 완비하여 무료로 이용하실 수 있습니다. 대형차량도 주차 가능하며, 당진·서산·예산 지역에서 접근이 용이합니다.
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 6. 예약 및 문의 버튼 */}
      <section ref={parallaxRef} className="relative py-24 overflow-hidden">
        {/* 패럴랙스 배경 이미지 */}
        <div className="absolute inset-0">
          <motion.div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1709216461598-018ae6307dc0?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
              backgroundPosition: useTransform(backgroundY, (value) => `center ${value}`)
            }}
          />
          {/* 다크 오버레이 */}
          <div className="absolute inset-0 bg-black/60" />
          {/* 그라데이션 오버레이 */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/80" />
        </div>
        
        {/* 컨텐츠 */}
        <div className="relative z-10 container text-center">
          <motion.h2 
            className="font-serif text-2xl sm:text-4xl font-light mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            지금 바로 예약하세요
          </motion.h2>
          <motion.p 
            className="text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md px-4"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            소중한 순간을 아름다운 사진으로 남기고 싶으시다면<br />
            언제든지 연락주세요. 친절한 상담으로도와드리겠습니다.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <motion.a 
              href="tel:041-356-1592"
              className="bg-white hover:bg-white/90 text-primary px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center shadow-lg"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(255, 255, 255, 0.3)"
              }}
              whileTap={{ scale: 0.95 }}
            >
              📞 전화로 상담하기
            </motion.a>
            <motion.span
              className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-full font-medium transition-colors cursor-pointer"
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)"
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => window.location.href = '/contact'}
            >
              📝 예약 문의
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="mt-6 text-white/80 text-sm drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p>📞 
              <a href="tel:041-356-1592" className="text-white hover:text-white/80 transition-colors">
                041-356-1592
              </a>
              <span className="text-xs text-white/70 ml-2 inline sm:hidden">
                (📞 탭하여 전화)
              </span>
               | 📧 카카오톡 아이디 @soo_1592</p>
            <p>운영시간: 평일 10:00-19:00, 주말 10:00-19:00 (예약제)</p>
            <p>🌐 <a href="https://blog.naver.com/familysoo1592" target="_blank" className="hover:text-white transition-colors">blog.naver.com/familysoo1592</a></p>
          </motion.div>
        </div>
      </section>

      {/* 7. 위치 및 오시는 길 */}
      <section className="py-16 sm:py-32 overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-serif text-2xl sm:text-4xl font-light mb-6 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              오시는 길
            </motion.h2>
            <motion.p 
              className="text-base sm:text-lg text-foreground/70 px-4"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              당진·서산·예산 지역에서 접근이 용이한 Family Soo Studio로 오세요.<br />
              넓은 주차장을 완비하여 편리하게 방문하실 수 있습니다.
            </motion.p>
          </motion.div>

          {/* 상단: 지도와 주소 정보 */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16">
            {/* 네이버 지도 */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="bg-white rounded-2xl overflow-hidden shadow-sm relative"
                initial={{ scale: 1, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(139, 115, 85, 0.15)"
                }}
                transition={{ duration: 0.2 }}
                style={{ 
                  transition: "transform 0.2s ease, box-shadow 0.2s ease" 
                }}
              >
                <div className="h-96 relative">
                  {/* 데스크탑: 네이버 지도 iframe */}
                  <div className="hidden sm:block w-full h-full">
                    <iframe
                      src="https://map.naver.com/p/search/%EC%B6%A9%EC%B2%AD%EB%82%A8%EB%8F%84%20%EB%8B%B9%EC%A7%84%EC%8B%9C%20%EB%B6%81%EB%AC%B8%EB%A1%9C%202%EA%B8%B8%2010%20%ED%8C%A8%EB%B0%80%EB%A6%AC%EC%88%98%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4"
                      width="100%"
                      height="100%"
                      style={{ 
                        border: 0, 
                        borderRadius: '1rem',
                        minHeight: '384px'
                      }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Family Soo Studio 위치"
                    />
                  </div>
                  
                  {/* 모바일: 정적 맵 이미지와 외부 링크 */}
                  <div className="block sm:hidden w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="text-4xl mb-4">🗺️</div>
                      <h4 className="font-serif text-lg font-medium text-primary mb-3">
                        Family Soo Studio
                      </h4>
                      <p className="text-sm text-foreground/80 mb-4 leading-relaxed">
                        충청남도 당진시 북문로 2길 10<br />
                        패밀리수 스튜디오
                      </p>
                      <div className="space-y-2">
                        <button
                          onClick={() => window.open('https://map.naver.com/p/search/%EC%B6%A9%EC%B2%AD%EB%82%A8%EB%8F%84%20%EB%8B%B9%EC%A7%84%EC%8B%9C%20%EB%B6%81%EB%AC%B8%EB%A1%9C%202%EA%B8%B8%2010%20%ED%8C%A8%EB%B0%80%EB%A6%AC%EC%88%98%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4', '_blank')}
                          className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium
                            hover:bg-primary/90 transition-colors block w-full mb-2"
                        >
                          네이버 지도에서 보기
                        </button>
                        <button
                          onClick={() => window.open('https://map.kakao.com/link/search/%ED%8C%A8%EB%B0%80%EB%A6%AC%EC%88%98%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4', '_blank')}
                          className="bg-yellow-500 text-white px-4 py-2 rounded-lg text-sm font-medium
                            hover:bg-yellow-600 transition-colors block w-full"
                        >
                          카카오맵에서 보기
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* 주소 및 연락처 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-6 sm:space-y-8"
            >
              <motion.div 
                className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm max-w-none"
                initial={{ scale: 1, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
                whileHover={{ 
                  scale: 1.01,
                  boxShadow: "0 8px 30px rgba(139, 115, 85, 0.1)"
                }}
                transition={{ duration: 0.2 }}
                style={{ 
                  transition: "transform 0.2s ease, box-shadow 0.2s ease" 
                }}
              >
                <motion.h3 
                  className="font-serif text-lg sm:text-2xl font-medium mb-6 text-primary"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  whileHover={{ color: "rgba(139, 115, 85, 0.8)" }}
                >
                  주소 및 연락처
                </motion.h3>
                <div className="space-y-4">
                  <motion.div 
                    className="flex items-start space-x-3 p-3 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: "rgba(139, 115, 85, 0)",
                      transition: { 
                        duration: 0.5, 
                        delay: 0.8,
                        x: { duration: 0.2, ease: "easeOut" },
                        backgroundColor: { duration: 0.2, ease: "easeOut" }
                      }
                    }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    <span className="text-lg">📍</span>
                    <div>
                      <p className="font-medium text-foreground">주소</p>
                      <p className="text-foreground/70 text-sm">충청남도 당진시 북문로 2길 10 패밀리수 스튜디오</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-3 p-3 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: "rgba(139, 115, 85, 0)",
                      transition: { 
                        duration: 0.5, 
                        delay: 1.0,
                        x: { duration: 0.2, ease: "easeOut" },
                        backgroundColor: { duration: 0.2, ease: "easeOut" }
                      }
                    }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    onClick={() => window.open('tel:041-356-1592')}
                  >
                    <span className="text-lg">📞</span>
                    <div>
                      <p className="font-medium text-foreground">전화번호</p>
                      <a 
                        href="tel:041-356-1592" 
                        className="text-primary font-medium hover:text-primary/80 transition-colors block"
                      >
                        041-356-1592
                      </a>
                      <p className="text-xs text-foreground/50 mt-1 block sm:hidden">
                        📞 탭하여 바로 전화하기
                      </p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-3 p-3 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: "rgba(139, 115, 85, 0)",
                      transition: { 
                        duration: 0.5, 
                        delay: 1.2,
                        x: { duration: 0.2, ease: "easeOut" },
                        backgroundColor: { duration: 0.2, ease: "easeOut" }
                      }
                    }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    onClick={() => window.open('mailto:familysoo1592@naver.com')}
                  >
                    <span className="text-lg">📧</span>
                    <div>
                      <p className="font-medium text-foreground">카카오톡 ID</p>
                      <p className="text-primary font-medium">@soo_1592</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-3 p-3 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: "rgba(139, 115, 85, 0)",
                      transition: { 
                        duration: 0.5, 
                        delay: 1.4,
                        x: { duration: 0.2, ease: "easeOut" },
                        backgroundColor: { duration: 0.2, ease: "easeOut" }
                      }
                    }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                    onClick={() => window.open('https://blog.naver.com/familysoo1592', '_blank')}
                  >
                    <span className="text-lg">🌐</span>
                    <div>
                      <p className="font-medium text-foreground">블로그</p>
                      <p className="text-primary font-medium">blog.naver.com/familysoo1592</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-3 p-3 rounded-lg"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      backgroundColor: "rgba(139, 115, 85, 0)",
                      transition: { 
                        duration: 0.5, 
                        delay: 1.6,
                        x: { duration: 0.2, ease: "easeOut" },
                        backgroundColor: { duration: 0.2, ease: "easeOut" }
                      }
                    }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4,
                      transition: { duration: 0.2, ease: "easeOut" }
                    }}
                  >
                    <span className="text-lg">🕒</span>
                    <div>
                      <p className="font-medium text-foreground">운영시간</p>
                      <p className="text-foreground/70 text-sm">평일 10:00-19:00</p>
                      <p className="text-foreground/70 text-sm">주말 10:00-19:00 (예약제)</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* 하단: 교통 정보 (Full Width) */}
          {/* <motion.div 
            className="bg-white rounded-2xl p-8 shadow-sm"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 8px 30px rgba(139, 115, 85, 0.1)"
            }}
            style={{ 
              transition: "transform 0.2s ease, box-shadow 0.2s ease" 
            }}
          >
            <motion.h3 
              className="font-serif text-2xl font-medium mb-8 text-primary text-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              교통 정보
            </motion.h3>
            
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(139, 115, 85, 0.08)"
                }}
                className="bg-muted rounded-xl p-6"
                style={{ 
                  transition: "transform 0.2s ease, box-shadow 0.2s ease" 
                }}
              >
                <motion.h4 
                  className="font-medium text-lg mb-4 flex items-center text-foreground"
                  whileHover={{ color: "var(--primary)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <motion.span 
                    className="mr-3 text-2xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    🚗
                  </motion.span>
                  자가용 (주요 도로)
                </motion.h4>
                <ul className="space-y-3 text-foreground/70 text-sm">
                  {[
                    "서해안고속도로 → 당진IC 방면",
                    "평택-시흥고속도로 → 당진분기점", 
                    "국도 29호선, 38호선 이용",
                    "서산, 예산에서 30분 이내 접근"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        color: "rgb(115 115 115)",
                        transition: { 
                          duration: 0.5, 
                          delay: 1.2 + index * 0.1,
                          x: { duration: 0.2, ease: "easeOut" },
                          color: { duration: 0.2, ease: "easeOut" }
                        }
                      }}
                      whileHover={{ 
                        x: 8,
                        color: "var(--foreground)",
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                    >
                      <motion.span 
                        className="text-primary mr-3"
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        •
                      </motion.span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.2 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(139, 115, 85, 0.08)"
                }}
                className="bg-muted rounded-xl p-6"
                style={{ 
                  transition: "transform 0.2s ease, box-shadow 0.2s ease" 
                }}
              >
                <motion.h4 
                  className="font-medium text-lg mb-4 flex items-center text-foreground"
                  whileHover={{ color: "var(--primary)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <motion.span 
                    className="mr-3 text-2xl"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    🚌
                  </motion.span>
                  대중교통
                </motion.h4>
                <ul className="space-y-3 text-foreground/70 text-sm">
                  {[
                    "당진시내버스 이용",
                    "서산-당진 시외버스 운행",
                    "예산-당진 시외버스 운행", 
                    "천안-당진 직행버스 운행"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        color: "rgb(115 115 115)",
                        transition: { 
                          duration: 0.5, 
                          delay: 1.4 + index * 0.1,
                          x: { duration: 0.2, ease: "easeOut" },
                          color: { duration: 0.2, ease: "easeOut" }
                        }
                      }}
                      whileHover={{ 
                        x: 8,
                        color: "var(--foreground)",
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                    >
                      <motion.span 
                        className="text-primary mr-3"
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        •
                      </motion.span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1.4 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 20px rgba(139, 115, 85, 0.08)"
                }}
                className="bg-muted rounded-xl p-6"
                style={{ 
                  transition: "transform 0.2s ease, box-shadow 0.2s ease" 
                }}
              >
                <motion.h4 
                  className="font-medium text-lg mb-4 flex items-center text-foreground"
                  whileHover={{ color: "var(--primary)" }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <motion.span 
                    className="mr-3 text-2xl"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                  >
                    🅿️
                  </motion.span>
                  주차 안내
                </motion.h4>
                <ul className="space-y-3 text-foreground/70 text-sm">
                  {[
                    "넓은 전용 주차장 완비",
                    "주차요금 무료",
                    "대형차량 주차 가능",
                    "편리한 주차 환경 제공"
                  ].map((item, index) => (
                    <motion.li 
                      key={index}
                      className="flex items-center"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        color: "rgb(115 115 115)",
                        transition: { 
                          duration: 0.5, 
                          delay: 1.6 + index * 0.1,
                          x: { duration: 0.2, ease: "easeOut" },
                          color: { duration: 0.2, ease: "easeOut" }
                        }
                      }}
                      whileHover={{ 
                        x: 8,
                        color: "var(--foreground)",
                        transition: { duration: 0.2, ease: "easeOut" }
                      }}
                    >
                      <motion.span 
                        className="text-primary mr-3"
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.2, ease: "easeOut" }}
                      >
                        •
                      </motion.span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.div> */}
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
