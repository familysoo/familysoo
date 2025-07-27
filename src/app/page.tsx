'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

// 애니메이션이 적용된 포트폴리오 섹션 컴포넌트
function PortfolioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("전체");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // 다양한 높이의 masonry 포트폴리오 아이템들 (카테고리 정보 포함)
  const portfolioItems = [
    {
      id: 1,
      imageUrl: "https://images.unsplash.com/photo-1511895426328-dc8714191300?q=80&w=800&auto=format&fit=crop",
      aspectRatio: "aspect-[4/3]",
      category: "가족사진",
      title: "따뜻한 가족의 시간"
    },
    {
      id: 2,
      imageUrl: "https://images.unsplash.com/photo-1581952975975-08cd95a728d4?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspectRatio: "aspect-square",
      category: "가족사진",
      title: "행복한 가족 포트레이트"
    },
    {
      id: 3,
      imageUrl: "https://images.unsplash.com/photo-1524144031591-3d146c70a0d9?q=80&w=600&auto=format&fit=crop",
      aspectRatio: "aspect-[3/4]",
      category: "리마인드웨딩",
      title: "로맨틱 웨딩 순간"
    },
    {
      id: 4,
      imageUrl: "https://images.unsplash.com/photo-1557446772-d4de8a495127?q=80&w=800&auto=format&fit=crop",
      aspectRatio: "aspect-[5/4]",
      category: "가족사진",
      title: "자연스러운 가족 촬영"
    },
    {
      id: 5,
      imageUrl: "https://images.unsplash.com/photo-1510154221590-ff63e90a136f?q=80&w=600&auto=format&fit=crop",
      aspectRatio: "aspect-[4/5]",
      category: "성장앨범",
      title: "소중한 성장 기록"
    },
    {
      id: 6,
      imageUrl: "https://images.unsplash.com/photo-1542037179399-bbf09c7f9888?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspectRatio: "aspect-[3/2]",
      category: "리마인드웨딩",
      title: "영원한 사랑의 약속"
    },
    {
      id: 7,
      imageUrl: "https://images.unsplash.com/photo-1603367563698-67012943fd67?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      aspectRatio: "aspect-square",
      category: "성장앨범",
      title: "아이의 소중한 순간"
    },
    {
      id: 8,
      imageUrl: "https://images.unsplash.com/photo-1524144031591-3d146c70a0d9?q=80&w=600&auto=format&fit=crop",
      aspectRatio: "aspect-[2/3]",
      category: "리마인드웨딩",
      title: "감동적인 웨딩 순간"
    },
    {
      id: 9,
      imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=600&auto=format&fit=crop",
      aspectRatio: "aspect-[4/3]",
      category: "가족사진",
      title: "가족의 즐거운 시간"
    },
    {
      id: 10,
      imageUrl: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?q=80&w=600&auto=format&fit=crop",
      aspectRatio: "aspect-[3/4]",
      category: "성장앨범",
      title: "아름다운 성장 순간"
    }
  ];

  // 카테고리별 필터링
  const filteredItems = activeCategory === "전체" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  // 카테고리 버튼들
  const categories = ["전체", "가족사진", "리마인드웨딩", "성장앨범"];

  // 라이트박스 열기
  const openLightbox = (imageUrl: string) => {
    const index = filteredItems.findIndex(item => item.imageUrl === imageUrl);
    setCurrentImageIndex(index);
    setLightboxImage(imageUrl);
    document.body.style.overflow = 'hidden';
  };

  // 라이트박스 닫기
  const closeLightbox = () => {
    setLightboxImage(null);
    document.body.style.overflow = 'unset';
  };

  // 이전 이미지로 이동
  const goToPrevious = () => {
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : filteredItems.length - 1;
    setCurrentImageIndex(newIndex);
    setLightboxImage(filteredItems[newIndex].imageUrl);
  };

  // 다음 이미지로 이동
  const goToNext = () => {
    const newIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0;
    setCurrentImageIndex(newIndex);
    setLightboxImage(filteredItems[newIndex].imageUrl);
  };

  // 키보드 네비게이션
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!lightboxImage) return;
      
      switch (e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [lightboxImage, currentImageIndex, filteredItems]);

  return (
    <section className="py-32 bg-muted">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h2 className="font-serif text-4xl font-light mb-6 text-foreground">포트폴리오</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              소중한 순간들의 아름다운 기록을 확인해보세요.<br />
              다양한 컨셉과 스타일의 작품들을 만나보실 수 있습니다.
            </p>
          </motion.div>

          {/* 카테고리 탭 */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-full p-2 flex space-x-2 shadow-sm">
              {categories.map((category) => (
                <motion.button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeCategory === category
                      ? 'bg-primary text-white'
                      : 'text-foreground hover:bg-primary/10'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category}
                </motion.button>
              ))}
            </div>
          </motion.div>

                              {/* Masonry 컬럼 기반 포트폴리오 갤러리 */}
          <motion.div 
            className="columns-2 md:columns-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            key={activeCategory} // 카테고리 변경 시 애니메이션 재실행
          >
            {filteredItems.map((item, index) => (
              <motion.div
                key={`${activeCategory}-${item.id}`}
                className="break-inside-avoid mb-4 group cursor-pointer"
                onClick={() => openLightbox(item.imageUrl)}
                initial={{ opacity: 0, scale: 0.8, rotate: Math.random() * 10 - 5 }}
                animate={isInView ? { 
                  opacity: 1, 
                  scale: 1, 
                  rotate: 0 
                } : { 
                  opacity: 0, 
                  scale: 0.8, 
                  rotate: Math.random() * 10 - 5 
                }}
                transition={{ 
                  duration: 0.6, 
                  delay: 0.8 + index * 0.1,
                  ease: "easeOut"
                }}
                whileHover={{ 
                  scale: 1.02,
                  rotate: Math.random() * 4 - 2,
                  zIndex: 10,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="relative overflow-hidden rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 group">
                  <motion.div
                    className={`${item.aspectRatio} bg-cover bg-center w-full`}
                    style={{
                      backgroundImage: `url('${item.imageUrl}')`
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {/* 호버 시 나타나는 오버레이 */}
                    <motion.div
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                    >
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <motion.div
                          className="bg-white/20 backdrop-blur-sm rounded-full p-3"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <svg width="24" height="24" fill="white" viewBox="0 0 24 24">
                            <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
                          </svg>
                        </motion.div>
                      </div>
                    </motion.div>
                  </motion.div>
                  
                  {/* 이미지 하단 카테고리 표시 */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <p className="text-white text-sm font-medium">{item.category}</p>
                    <p className="text-white/80 text-xs">{item.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          <motion.div 
            className="text-center mt-24"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 1.4 }}
          >
            <Link href="/portfolio">
              <motion.span
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors inline-block cursor-pointer"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(139, 115, 85, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                더 많은 작품 보기
              </motion.span>
            </Link>
          </motion.div>
        </motion.div>

        {/* 라이트박스 모달 */}
        {lightboxImage && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-md z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
          >
            {/* 이미지 카운터 - 좌상단 */}
            <div className="absolute top-6 left-6 text-white font-medium z-30 text-lg">
              {currentImageIndex + 1} / {filteredItems.length}
            </div>

            {/* 카테고리 표시 - 좌상단 */}
            <div className="absolute top-6 left-6 mt-10 text-white/80 text-sm z-30">
              {activeCategory}
            </div>

            {/* 이미지 컨테이너 */}
            <div className="w-full h-full flex items-center justify-center">
              <motion.img
                src={lightboxImage}
                alt="Portfolio Image"
                className="max-w-full h-screen object-contain"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
              />
            </div>

            {/* 이전 버튼 */}
            {filteredItems.length > 1 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  goToPrevious();
                }}
                className="absolute left-8 text-white/70 hover:text-white transition-all z-30 bg-white/20 rounded-full p-3 backdrop-blur-sm hover:-translate-x-1"
                style={{ 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </motion.button>
            )}

            {/* 다음 버튼 */}
            {filteredItems.length > 1 && (
              <motion.button
                onClick={(e) => {
                  e.stopPropagation();
                  goToNext();
                }}
                className="absolute right-8 text-white/70 hover:text-white transition-all z-30 bg-white/20 rounded-full p-3 backdrop-blur-sm hover:translate-x-1"
                style={{ 
                  top: '50%', 
                  transform: 'translateY(-50%)',
                  transition: 'all 0.2s ease'
                }}
              >
                <svg width="32" height="32" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </motion.button>
            )}
            
            {/* 키보드 안내 */}
            {/* <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 text-white/60 text-sm text-center">
              ← → 키로 이동 | ESC 키로 닫기 | 배경 클릭으로 닫기
            </div> */}
          </motion.div>
        )}
      </div>
    </section>
  );
}

// 애니메이션이 적용된 스튜디오 소개 섹션 컴포넌트
function StudioSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const studioFeatures = [
    "당진 최초 가족·리마인드 전문점",
    "25년 이상 경력의 전문 작가",
    "당진 최대 규모의 촬영 시설",
    "다양한 디자인의 드레스·턱시도 다량보유",
    "전문 메이크업 서비스 제공",
    "최신 디자인 사진액자 작업",
    "액자 작업 전 수정 확인서비스",
    "쾌적한 대기공간·메이크업실·상담실 구비"
  ];

  return (
    <section className="py-32">
      <div className="container">
        <motion.div
          ref={ref}
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* 대표 인사말 + 스튜디오 철학 */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <motion.h2 
              className="font-serif text-4xl font-light mb-8 text-foreground"
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
                className="font-serif text-2xl font-medium mb-4 text-primary"
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
              >
                대표 인사말
              </motion.h3>
              <motion.p 
                className="text-foreground/80 leading-relaxed mb-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                안녕하세요, Family Soo Studio 대표 수진입니다.<br />
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
            
            <motion.div 
              className="bg-muted rounded-2xl p-6"
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : { opacity: 0, y: 30, scale: 0.95 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(139, 115, 85, 0.1)",
                transition: { duration: 0.3 }
              }}
            >
              <motion.h4 
                className="font-medium text-lg mb-4 text-foreground"
                whileHover={{ color: "var(--primary)", transition: { duration: 0.2 } }}
              >
                스튜디오 특징
              </motion.h4>
              <ul className="space-y-3 text-foreground/70">
                {studioFeatures.map((feature, index) => (
                  <motion.li 
                    key={index}
                    className="flex items-center"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: 1.4 + index * 0.1,
                      ease: "easeOut"
                    }}
                    whileHover={{ 
                      x: 8,
                      color: "var(--foreground)",
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.span 
                      className="text-primary mr-3"
                      whileHover={{ 
                        scale: 1.3, 
                        rotate: 360,
                        transition: { duration: 0.3 }
                      }}
                    >
                      ✓
                    </motion.span>
                    {feature}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </motion.div>

          {/* 촬영 공간 이미지 */}
          <motion.div 
            className="space-y-4"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <motion.div 
              className="bg-muted rounded-2xl h-64 flex items-center justify-center cursor-pointer"
              initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
              animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.9, rotate: 2 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              whileHover={{ 
                scale: 1.03,
                rotate: -1,
                boxShadow: "0 10px 40px rgba(139, 115, 85, 0.15)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-center">
                <motion.span 
                  className="text-6xl mb-4 block"
                  whileHover={{ 
                    scale: 1.2,
                    rotate: 10,
                    transition: { duration: 0.3 }
                  }}
                >
                  📸
                </motion.span>
                <p className="text-foreground/60">촬영 공간 이미지</p>
              </div>
            </motion.div>
            
            <div className="grid grid-cols-2 gap-4">
              <motion.div 
                className="bg-muted rounded-xl h-32 flex items-center justify-center cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: 1,
                  boxShadow: "0 6px 25px rgba(139, 115, 85, 0.12)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <motion.span 
                    className="text-3xl mb-2 block"
                    whileHover={{ 
                      scale: 1.3,
                      rotate: -15,
                      transition: { duration: 0.3 }
                    }}
                  >
                    🎨
                  </motion.span>
                  <p className="text-sm text-foreground/60">스튜디오 분위기</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="bg-muted rounded-xl h-32 flex items-center justify-center cursor-pointer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                whileHover={{ 
                  scale: 1.05,
                  rotate: -1,
                  boxShadow: "0 6px 25px rgba(139, 115, 85, 0.12)",
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="text-center">
                  <motion.span 
                    className="text-3xl mb-2 block"
                    whileHover={{ 
                      scale: 1.3,
                      rotate: 15,
                      transition: { duration: 0.3 }
                    }}
                  >
                    📷
                  </motion.span>
                  <p className="text-sm text-foreground/60">전문 장비</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

// 애니메이션이 적용된 서비스 섹션 컴포넌트
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
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="grid lg:grid-cols-2 gap-16 items-center mb-16">
        <motion.div 
          className={`${isReversed ? 'lg:order-2' : ''}`}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: 0 } : { opacity: 0, scale: 0.8, rotate: -5 }}
          transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        >
          <motion.div 
            className="rounded-2xl h-80 bg-cover bg-center relative overflow-hidden cursor-pointer"
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
        </motion.div>
        
        <motion.div 
          className={`${isReversed ? 'lg:order-1' : ''}`}
          initial={{ opacity: 0, y: 60 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 60 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
        >
          <motion.h3 
            className="font-serif text-3xl font-medium mb-6 text-primary"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.6 }}
          >
            {title}
          </motion.h3>
          
          <motion.p 
            className="text-foreground/80 text-lg leading-relaxed mb-8"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.7 }}
          >
            {description}
          </motion.p>
          
          <motion.div 
            className="border border-primary rounded-xl p-6 mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.8 }}
            whileHover={{ 
              borderColor: "var(--primary)",
              boxShadow: "0 4px 20px rgba(139, 115, 85, 0.1)",
              transition: { duration: 0.3 }
            }}
          >
            <h4 className="font-medium text-lg mb-4 text-foreground">포함 서비스</h4>
            <ul className="space-y-2 text-foreground/70">
              {services.map((service, index) => (
                <motion.li 
                  key={index}
                  className="flex items-center"
                  initial={{ opacity: 0, x: -20 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ 
                    duration: 0.5, 
                    delay: 0.9 + index * 0.1,
                    ease: "easeOut"
                  }}
                  whileHover={{ 
                    x: 4,
                    transition: { duration: 0.2 }
                  }}
                >
                  <motion.span 
                    className="text-primary mr-3"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.3 }}
                  >
                    ✓
                  </motion.span>
                  {service}
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 1.2 }}
          >
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
          </motion.div>
        </motion.div>
      </div>
      
      {showDivider && (
        <div className="flex justify-center">
          <motion.div 
            className="h-px bg-primary/30"
            initial={{ width: 0, opacity: 0 }}
            animate={isInView ? { width: "6rem", opacity: 1 } : { width: 0, opacity: 0 }}
            transition={{ duration: 1, delay: 1.4, ease: "easeOut" }}
          />
        </div>
      )}
    </motion.div>
  );
}

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  
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
      title: "리마인드 웨딩의 감동",
      image: "/images/hero/wedding-1.jpg",
      fallback: "linear-gradient(135deg, #d4c4a8, #8b7355)"
    },
    {
      id: 4,
      title: "영원한 사랑의 순간",
      image: "/images/hero/wedding-2.jpg",
      fallback: "linear-gradient(135deg, #f5f1eb, #d4c4a8)"
    }
  ];

  // 자동 슬라이드 전환
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4); // 4개의 슬라이드
    }, 5000); // 5초마다 전환

    return () => clearInterval(timer);
  }, []);

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToServices = () => {
    window.location.href = '/services';
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/90 backdrop-blur-sm border-b border-accent' 
          : 'bg-transparent border-b border-transparent'
      }`}>
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className={`font-serif text-2xl font-bold transition-colors duration-300 ${
              isScrolled ? 'text-primary' : 'text-white'
            }`}>
              Family Soo
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className={`transition-colors duration-300 ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
              }`}>홈</Link>
              <Link href="/services" className={`transition-colors duration-300 ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
              }`}>서비스</Link>
              <Link href="/about" className={`transition-colors duration-300 ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
              }`}>소개</Link>
              <Link href="/portfolio" className={`transition-colors duration-300 ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
              }`}>포트폴리오</Link>
              <Link href="/contact" className={`transition-colors duration-300 ${
                isScrolled ? 'text-foreground hover:text-primary' : 'text-white hover:text-white/80'
              }`}>예약문의</Link>
            </nav>

            {/* Mobile menu */}
            <div className="md:hidden">
              <select 
                className={`mobile-select transition-colors duration-300 ${
                  isScrolled ? 'text-foreground' : 'text-white'
                }`}
                onChange={(e) => {
                  if (e.target.value) {
                    window.location.href = e.target.value;
                  }
                }}
              >
                <option value="">메뉴</option>
                <option value="/">홈</option>
                <option value="/services">서비스</option>
                <option value="/about">소개</option>
                <option value="/portfolio">포트폴리오</option>
                <option value="/contact">예약문의</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section with Carousel */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Carousel Background */}
        <div style={{ position: 'absolute', inset: 0 }}>
          {heroSlides.map((slide, index) => (
            <div
              key={`slide-${index}`}
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${slide.image}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
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
        
        <div className="relative z-20 text-center px-4">
          <h1 className="font-serif text-5xl md:text-5xl font-light mb-6 fade-in-up text-white drop-shadow-lg">
            소중한 순간을<br />사진으로 남기세요
          </h1>
          <p className="text-lg md:text-xl mb-8 opacity-90 fade-in-up text-white/90 drop-shadow-md">
            가족의 시간, 사랑으로 기록됩니다
          </p>
          <Link 
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors fade-in-up shadow-lg"
          >
            예약 문의하기
          </Link>
        </div>

        {/* Carousel Dots */}
        <div style={{
          position: 'absolute',
          bottom: '2rem',
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
          onClick={() => setCurrentSlide((prev) => (prev - 1 + 4) % 4)}
          style={{
            position: 'absolute',
            left: '2rem',
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
          <ChevronLeft size={40} strokeWidth={2} />
        </button>
        <button
          onClick={() => setCurrentSlide((prev) => (prev + 1) % 4)}
          style={{
            position: 'absolute',
            right: '2rem',
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
          <ChevronRight size={40} strokeWidth={2} />
        </button>
      </section>

      {/* 2. 촬영 서비스 안내 */}
      <section className="py-32 bg-muted">
        <div className="container">
          <div className="text-center mb-24">
            <h2 className="font-serif text-4xl font-light mb-6 text-foreground">촬영 서비스</h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              각각의 특별한 순간을 위한 맞춤 촬영 서비스로<br />
              소중한 기억을 아름다운 작품으로 완성해드립니다.
            </p>
          </div>

          <div className="space-y-32">
            {/* 가족사진 */}
            <ServiceSection 
              imageUrl="https://images.unsplash.com/photo-1557446772-d4de8a495127?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="가족사진"
              description="온 가족이 함께하는 따뜻한 순간을 자연스럽게 담아냅니다. 각 가족만의 개성과 사랑이 느껴지는 특별한 작품을 만들어드립니다."
              services={[
                "전문 작가 촬영 (1-2시간)",
                "다양한 컨셉 촬영",
                "전문 보정 작업",
                "고해상도 원본 파일 제공"
              ]}
              href="/services#family"
              isReversed={false}
              showDivider={true}
            />

            {/* 리마인드 웨딩 */}
            <ServiceSection 
              imageUrl="https://images.unsplash.com/photo-1524144031591-3d146c70a0d9?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="리마인드 웨딩"
              description="결혼의 감동을 다시 한번 느낄 수 있는 특별한 촬영입니다. 웨딩드레스를 다시 입고 그날의 설렘과 행복을 재현해보세요."
              services={[
                "웨딩드레스 & 턱시도 제공",
                "전문 메이크업 서비스",
                "로맨틱 컨셉 촬영",
                "고급 앨범 제작"
              ]}
              href="/services#remind-wedding"
              isReversed={true}
              showDivider={true}
            />

            {/* 성장앨범 */}
            <ServiceSection 
              imageUrl="https://images.unsplash.com/photo-1510154221590-ff63e90a136f?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="성장앨범"
              description="아이의 소중한 성장 과정을 단계별로 기록합니다. 신생아부터 돌잔치까지, 매 순간의 변화와 성장을 아름답게 담아냅니다."
              services={[
                "신생아 ~ 돌잔치 단계별 촬영",
                "안전한 촬영 환경",
                "성장 기록 앨범 제작",
                "추억의 소품 촬영"
              ]}
              href="/services#growth"
              isReversed={false}
              showDivider={false}
            />
          </div>
        </div>
      </section>

      {/* 3. 스튜디오 소개 */}
      <StudioSection />

      {/* 4. 포트폴리오 (촬영 사례) */}
      <PortfolioSection />

      {/* 5. 이용안내 */}
      <section className="py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-serif text-4xl font-light mb-6 text-foreground">이용안내</h2>
            <p className="text-lg text-foreground/70">
              촬영 예약부터 완성된 사진 받기까지의 전 과정을 안내해드립니다.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-16">
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
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-2xl font-medium mb-6 text-primary">
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
                    <h4 className="font-medium text-lg mb-3">예약 방법</h4>
                    <ul className="space-y-2 text-foreground/70">
                      <motion.li whileHover={{ x: 4, color: "var(--foreground)" }} transition={{ duration: 0.2 }}>
                        • 전화 상담: 041-1592-0000
                      </motion.li>
                      <motion.li whileHover={{ x: 4, color: "var(--foreground)" }} transition={{ duration: 0.2 }}>
                        • 온라인 예약: 예약 신청 폼 작성
                      </motion.li>
                      <motion.li whileHover={{ x: 4, color: "var(--foreground)" }} transition={{ duration: 0.2 }}>
                        • 블로그 상담: blog.naver.com/familysoo1592
                      </motion.li>
                      <motion.li whileHover={{ x: 4, color: "var(--foreground)" }} transition={{ duration: 0.2 }}>
                        • 이메일: familysoo1592@naver.com
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
                    <h4 className="font-medium text-lg mb-3">촬영 가격</h4>
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
                        <span className="font-medium">150,000원~</span>
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
                        <span className="font-medium">300,000원~</span>
                      </motion.div>
                      <motion.div 
                        className="flex justify-between items-center py-2 border-b border-gray-100"
                        whileHover={{ 
                          backgroundColor: "rgba(139, 115, 85, 0.05)",
                          scale: 1.01
                        }}
                        transition={{ duration: 0.2 }}
                      >
                        <span>성장앨범</span>
                        <span className="font-medium">200,000원~</span>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                  >
                    <h4 className="font-medium text-lg mb-3">소요 시간</h4>
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
                transition={{ duration: 0.3 }}
              >
                <h3 className="font-serif text-2xl font-medium mb-6 text-primary">
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
                    <h4 className="font-medium text-lg mb-2">Q. 드레스와 턱시도는 제공되나요?</h4>
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
                    <h4 className="font-medium text-lg mb-2">Q. 메이크업 서비스도 받을 수 있나요?</h4>
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
                    <h4 className="font-medium text-lg mb-2">Q. 액자 제작은 어떻게 진행되나요?</h4>
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
                    <h4 className="font-medium text-lg mb-2">Q. 주차는 편리한가요?</h4>
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
            className="font-serif text-4xl font-light mb-6 text-white drop-shadow-lg"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            지금 바로 예약하세요
          </motion.h2>
          <motion.p 
            className="text-white/90 mb-8 max-w-2xl mx-auto drop-shadow-md"
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
              href="tel:041-1592-0000"
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
              📝 온라인 예약 신청
            </motion.span>
          </motion.div>
          
          <motion.div 
            className="mt-6 text-white/80 text-sm drop-shadow-sm"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p>📞 041-1592-0000 | 📧 familysoo1592@naver.com</p>
            <p>운영시간: 평일 10:00-19:00, 주말 10:00-17:00 (예약제)</p>
            <p>🌐 <a href="https://blog.naver.com/familysoo1592" target="_blank" className="hover:text-white transition-colors">blog.naver.com/familysoo1592</a></p>
          </motion.div>
        </div>
      </section>

      {/* 7. 위치 및 오시는 길 */}
      <section className="py-32">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="font-serif text-4xl font-light mb-6 text-foreground"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              오시는 길
            </motion.h2>
            <motion.p 
              className="text-lg text-foreground/70"
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
          <div className="grid lg:grid-cols-2 gap-16 mb-16">
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
                transition={{ duration: 0.3 }}
              >
                <div className="h-96 relative">
                  {/* 네이버 지도 iframe */}
                  <iframe
                    src="https://map.naver.com/v5/search/%EC%B6%A9%EB%82%A8%20%EB%8B%B9%EC%A7%84%EC%8B%9C?c=14128189.6214308,4518712.4380694,15,0,0,0,dh"
                    width="100%"
                    height="100%"
                    style={{ border: 0, borderRadius: '1rem' }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Family Soo Studio 위치"
                  />
                  
                  {/* 지도 위 오버레이 정보 */}
                  <motion.div 
                    className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm rounded-lg px-4 py-2 shadow-lg"
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                    whileHover={{ 
                      scale: 1.05,
                      boxShadow: "0 4px 15px rgba(139, 115, 85, 0.2)"
                    }}
                  >
                    <p className="text-sm font-medium text-primary">📍 Family Soo Studio</p>
                    <p className="text-xs text-foreground/70">충남 당진시</p>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>

            {/* 주소 및 연락처 */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="space-y-8"
            >
              <motion.div 
                className="bg-white rounded-2xl p-8 shadow-sm"
                initial={{ scale: 1, boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)" }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 8px 30px rgba(139, 115, 85, 0.1)"
                }}
                transition={{ duration: 0.3 }}
              >
                <motion.h3 
                  className="font-serif text-2xl font-medium mb-6 text-primary"
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
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4
                    }}
                  >
                    <span className="text-lg">📍</span>
                    <div>
                      <p className="font-medium text-foreground">주소</p>
                      <p className="text-foreground/70 text-sm">충남 당진시 (자세한 주소는 예약 시 안내)</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-3 p-3 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4
                    }}
                    onClick={() => window.open('tel:041-1592-0000')}
                  >
                    <span className="text-lg">📞</span>
                    <div>
                      <p className="font-medium text-foreground">전화번호</p>
                      <p className="text-primary font-medium">041-1592-0000</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-3 p-3 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.2 }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4
                    }}
                    onClick={() => window.open('mailto:familysoo1592@naver.com')}
                  >
                    <span className="text-lg">📧</span>
                    <div>
                      <p className="font-medium text-foreground">이메일</p>
                      <p className="text-primary font-medium">familysoo1592@naver.com</p>
                    </div>
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-start space-x-3 p-3 rounded-lg cursor-pointer"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.4 }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4
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
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 1.6 }}
                    whileHover={{ 
                      backgroundColor: "rgba(139, 115, 85, 0.05)",
                      x: 4
                    }}
                  >
                    <span className="text-lg">🕒</span>
                    <div>
                      <p className="font-medium text-foreground">운영시간</p>
                      <p className="text-foreground/70 text-sm">평일 10:00-19:00</p>
                      <p className="text-foreground/70 text-sm">주말 10:00-17:00 (예약제)</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </motion.div>
          </div>

          {/* 하단: 교통 정보 (Full Width) */}
          <motion.div 
            className="bg-white rounded-2xl p-8 shadow-sm"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.6 }}
            whileHover={{ 
              scale: 1.01,
              boxShadow: "0 8px 30px rgba(139, 115, 85, 0.1)"
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
              >
                <motion.h4 
                  className="font-medium text-lg mb-4 flex items-center text-foreground"
                  whileHover={{ color: "var(--primary)" }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span 
                    className="mr-3 text-2xl"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ duration: 0.3 }}
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
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                      whileHover={{ 
                        x: 8,
                        color: "var(--foreground)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.span 
                        className="text-primary mr-3"
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.2 }}
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
              >
                <motion.h4 
                  className="font-medium text-lg mb-4 flex items-center text-foreground"
                  whileHover={{ color: "var(--primary)" }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span 
                    className="mr-3 text-2xl"
                    whileHover={{ scale: 1.2, rotate: -10 }}
                    transition={{ duration: 0.3 }}
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
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.4 + index * 0.1 }}
                      whileHover={{ 
                        x: 8,
                        color: "var(--foreground)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.span 
                        className="text-primary mr-3"
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.2 }}
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
              >
                <motion.h4 
                  className="font-medium text-lg mb-4 flex items-center text-foreground"
                  whileHover={{ color: "var(--primary)" }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.span 
                    className="mr-3 text-2xl"
                    whileHover={{ scale: 1.2, rotate: 360 }}
                    transition={{ duration: 0.5 }}
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
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                      whileHover={{ 
                        x: 8,
                        color: "var(--foreground)",
                        transition: { duration: 0.2 }
                      }}
                    >
                      <motion.span 
                        className="text-primary mr-3"
                        whileHover={{ scale: 1.3 }}
                        transition={{ duration: 0.2 }}
                      >
                        •
                      </motion.span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
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
              <p className="text-white opacity-70 text-sm" style={{lineHeight: '1.6'}}>
                소중한 순간을 사진으로 남기는<br />
                따뜻한 감성의 스튜디오
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">서비스</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li><Link href="/services" className="hover:text-white transition-colors">가족사진</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">리마인드웨딩</Link></li>
                <li><Link href="/services" className="hover:text-white transition-colors">성장앨범</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">연락처</h4>
              <ul className="space-y-2 text-sm opacity-70">
                <li>041-1592-0000</li>
                <li>familysoo1592@naver.com</li>
                <li>충남 당진시</li>
                <li><a href="https://blog.naver.com/familysoo1592" target="_blank" className="hover:text-white transition-colors">블로그 바로가기</a></li>
              </ul>
            </div>
          </div>
          <div style={{borderTop: '1px solid rgba(255, 255, 255, 0.2)', marginTop: '2rem', paddingTop: '2rem'}} className="text-center text-sm opacity-50">
            © 2024 Family Soo Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
