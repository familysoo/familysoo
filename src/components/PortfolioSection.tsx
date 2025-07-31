'use client';

import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { PortfolioItem, ContentfulAsset, ServicesApiResponse, ContentType } from "@/types/database";
import LoadingSpinner from "./LoadingSpinner";

// Contentful 이미지 최적화 함수들
const getOptimizedImageUrl = (originalUrl: string, options: {
  width?: number;
  quality?: number;
  format?: 'webp' | 'jpg' | 'png';
}) => {
  if (!originalUrl) return '';
  
  const { width, quality = 75, format = 'webp' } = options;
  const baseUrl = originalUrl.startsWith('//') ? `https:${originalUrl}` : originalUrl;
  
  // 가장 안전한 파라미터만 사용
  const params = new URLSearchParams();
  if (width && width <= 4000) {
    params.append('w', width.toString());
  }
  if (quality >= 1 && quality <= 100) {
    params.append('q', quality.toString());
  }
  // WebP 포맷만 사용하여 안정성 확보
  if (format === 'webp') {
    params.append('fm', 'webp');
  }
  
  return `${baseUrl}?${params.toString()}`;
};

// 썸네일 이미지 URL 생성 (포트폴리오 그리드용)
const getThumbnailUrl = (originalUrl: string, isMobile: boolean = false) => {
  try {
    return getOptimizedImageUrl(originalUrl, {
      width: isMobile ? 400 : 600,
      format: 'webp'
    });
  } catch (error) {
    // 최적화 실패 시 원본 URL 반환
    console.warn('이미지 최적화 실패, 원본 사용:', error);
    return originalUrl.startsWith('//') ? `https:${originalUrl}` : originalUrl;
  }
};

// 라이트박스 이미지 URL 생성 (확대 보기용)
const getLightboxUrl = (originalUrl: string) => {
  try {
    return getOptimizedImageUrl(originalUrl, {
      format: 'webp'
    });
  } catch (error) {
    // 최적화 실패 시 원본 URL 반환
    console.warn('이미지 최적화 실패, 원본 사용:', error);
    return originalUrl.startsWith('//') ? `https:${originalUrl}` : originalUrl;
  }
};

// 포트폴리오 데이터 변환 함수
export const transformContentfulData = (
  response: ServicesApiResponse,
  contentType: ContentType
): PortfolioItem[] => {
  const assets = response.includes.Asset || [];
  const allItems: PortfolioItem[] = [];
  
  // 카테고리 기본값 매핑 (Contentful 카테고리가 없을 때 사용)
  const defaultCategoryMap: Record<ContentType, string> = {
    'family': '가족사진',
    'baby': '성장앨범', 
    'remindWedding': '리마인드웨딩'
  };
  
  // 다양한 aspect ratio 배열
  const aspectRatios = [
    "aspect-[4/3]",
    "aspect-square", 
    "aspect-[3/4]",
    "aspect-[5/4]",
    "aspect-[4/5]",
    "aspect-[3/2]",
    "aspect-[2/3]"
  ];
  
  response.data.forEach((entry) => {
    // 각 entry의 모든 이미지를 개별 아이템으로 변환
    entry.fields.images.forEach((imageLink, imageIndex) => {
      // Asset 찾기
      const asset = assets.find((asset: ContentfulAsset) => 
        asset.sys.id === imageLink.sys.id
      );
      
      if (asset && asset.fields.file.url) {
        const originalUrl = asset.fields.file.url;
        
        allItems.push({
          id: `${entry.sys.id}-${imageIndex}`, // 고유 ID 생성
          imageUrl: getThumbnailUrl(originalUrl), // 최적화된 썸네일 URL
          lightboxUrl: getLightboxUrl(originalUrl), // 라이트박스용 고해상도 URL
          originalUrl: `https:${originalUrl}`, // 원본 URL (필요시 사용)
          aspectRatio: aspectRatios[allItems.length % aspectRatios.length],
          category: entry.fields.category || defaultCategoryMap[contentType],
          title: `${entry.fields.title} ${imageIndex + 1}`,
          contentType
        });
      }
    });
  });
  
  return allItems;
};

interface PortfolioSectionProps {
  title: string;
  description: string;
  categories: string[];
  portfolioItems: PortfolioItem[];
  showMoreButton?: boolean;
  moreButtonText?: string;
  moreButtonHref?: string;
}

export default function PortfolioSection({ 
  title, 
  description, 
  categories, 
  portfolioItems,
  showMoreButton = false,
  moreButtonText = "더 많은 작품 보기",
  moreButtonHref = "/portfolio"
}: PortfolioSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState(categories[0] || "전체");
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [mainImageLoaded, setMainImageLoaded] = useState(false);

  // 카테고리별 필터링
  const filteredItems = activeCategory === "전체" || activeCategory === categories[0]
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  // 이미지 프리로딩 함수
  const preloadImage = (url: string) => {
    if (!url || preloadedImages.has(url)) return;
    
    const img = new Image();
    img.onload = () => {
      setPreloadedImages(prev => new Set([...prev, url]));
    };
    img.onerror = () => {
      console.warn('이미지 프리로드 실패:', url);
    };
    img.src = url;
  };

  // 인접한 이미지들 프리로드 (순차적으로 1개씩)
  const preloadAdjacentImages = (currentIndex: number) => {
    // 다음 이미지를 우선적으로 프리로드 (사용자가 다음을 더 많이 클릭함)
    const nextIndex = currentIndex + 1 < filteredItems.length ? currentIndex + 1 : 0;
    const nextItem = filteredItems[nextIndex];
    
    if (nextItem) {
      const nextImageUrl = nextItem.lightboxUrl || nextItem.imageUrl;
      preloadImage(nextImageUrl);
      
      // 다음 이미지 로드 완료 후 이전 이미지도 프리로드
      setTimeout(() => {
        const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : filteredItems.length - 1;
        const prevItem = filteredItems[prevIndex];
        if (prevItem) {
          const prevImageUrl = prevItem.lightboxUrl || prevItem.imageUrl;
          preloadImage(prevImageUrl);
        }
      }, 1000); // 1초 후 이전 이미지 프리로드
    }
  };

  // 메인 이미지 로드 완료 시 프리로딩 시작
  const handleMainImageLoad = () => {
    const loadEndTime = performance.now();
    const loadTime = loadEndTime - (window as any).lightboxLoadStartTime;
    console.log(`🚀 라이트박스 이미지 로드 완료: ${loadTime.toFixed(0)}ms`);
    
    setMainImageLoaded(true);
    // 메인 이미지 로드 완료 후 프리로딩 시작
    setTimeout(() => {
      console.log('📸 인접 이미지 프리로딩 시작');
      preloadAdjacentImages(currentImageIndex);
    }, 500); // 0.5초 여유 시간
  };

  // 라이트박스 열기
  const openLightbox = (imageUrl: string) => {
    const index = filteredItems.findIndex(item => item.imageUrl === imageUrl);
    const item = filteredItems[index];
    setCurrentImageIndex(index);
    setMainImageLoaded(false); // 새 이미지 로딩 시작
    
    // 로딩 시작 시간 기록
    (window as any).lightboxLoadStartTime = performance.now();
    console.log('⏱️ 라이트박스 이미지 로딩 시작:', item.title);
    
    // 라이트박스용 고해상도 이미지가 있으면 사용, 없으면 썸네일 사용
    setLightboxImage(item.lightboxUrl || item.imageUrl);
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
    const item = filteredItems[newIndex];
    setCurrentImageIndex(newIndex);
    setMainImageLoaded(false); // 새 이미지 로딩 시작
    
    // 슬라이드 로딩 시작 시간 기록
    (window as any).lightboxLoadStartTime = performance.now();
    console.log('⏪ 이전 이미지 로딩 시작:', item.title);
    
    setLightboxImage(item.lightboxUrl || item.imageUrl);
  };

  // 다음 이미지로 이동
  const goToNext = () => {
    const newIndex = currentImageIndex < filteredItems.length - 1 ? currentImageIndex + 1 : 0;
    const item = filteredItems[newIndex];
    setCurrentImageIndex(newIndex);
    setMainImageLoaded(false); // 새 이미지 로딩 시작
    
    // 슬라이드 로딩 시작 시간 기록
    (window as any).lightboxLoadStartTime = performance.now();
    console.log('⏩ 다음 이미지 로딩 시작:', item.title);
    
    setLightboxImage(item.lightboxUrl || item.imageUrl);
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
            <h2 className="font-serif text-4xl font-light mb-6 text-foreground">{title}</h2>
            <div className="text-lg text-foreground/70 max-w-2xl mx-auto">
              {description.split('<br />').map((line, index) => (
                <span key={index}>
                  {line}
                  {index < description.split('<br />').length - 1 && <br />}
                </span>
              ))}
            </div>
          </motion.div>

          {/* 카테고리 탭 */}
          <motion.div 
            className="flex justify-center mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="bg-white rounded-full p-2 flex space-x-2 shadow-sm overflow-x-auto scrollbar-hide">
              {categories.map((category) => (
                <motion.button 
                  key={category}
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
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

          {/* 더 많은 작품 보기 버튼 */}
          {showMoreButton && (
            <motion.div 
              className="text-center mt-24"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <a href={moreButtonHref}>
                <motion.span
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors inline-block cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(139, 115, 85, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {moreButtonText}
                </motion.span>
              </a>
            </motion.div>
          )}
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
            <div className="w-full h-full flex items-center justify-center relative">
              {/* 로딩 스피너 */}
              {!mainImageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 z-10">
                  <LoadingSpinner size="lg" className="text-white" />
                </div>
              )}
              
              <motion.img
                src={lightboxImage}
                alt="Portfolio Image"
                className={`max-w-full h-screen object-contain ${!mainImageLoaded ? 'opacity-0' : 'opacity-100'}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: mainImageLoaded ? 1 : 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={(e) => e.stopPropagation()}
                onLoad={handleMainImageLoad}
                onError={() => {
                  console.warn('라이트박스 이미지 로드 실패:', lightboxImage);
                  setMainImageLoaded(true); // 에러 시에도 로딩 스피너 제거
                }}
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
          </motion.div>
        )}
      </div>
    </section>
  );
}

export type { PortfolioSectionProps }; 