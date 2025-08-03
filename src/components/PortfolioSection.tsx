'use client';

import { useState, useEffect, useRef, useMemo } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
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
  contentType: ContentType,
  enableTwoDepth?: boolean,
  twoDepthMapping?: Record<string, { main: string; sub: string }>
): PortfolioItem[] => {
  const assets = response.includes.Asset || [];
  const allItems: PortfolioItem[] = [];
  
  // 카테고리 기본값 매핑 (Contentful 카테고리가 없을 때 사용)
  const defaultCategoryMap: Record<ContentType, string> = {
    'family': '가족',
    'baby': '베이비', 
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
  
  // order 속성에 따라 데이터 정렬 (오름차순)
  response.data.sort((a, b) => {
    const orderA = a.fields.order ?? 999999;
    const orderB = b.fields.order ?? 999999;
    return orderA - orderB;
  });
  
  response.data.forEach((entry) => {
    // 각 entry의 모든 이미지를 개별 아이템으로 변환
    entry.fields.images?.forEach((imageLink, imageIndex) => {
      // Asset 찾기
      const asset = assets.find((asset: ContentfulAsset) => 
        asset.sys.id === imageLink.sys.id
      );
      
      if (asset && asset.fields.file.url) {
        const originalUrl = asset.fields.file.url;
        
        const categoryValue = entry.fields.category || defaultCategoryMap[contentType];
        const mappingInfo = enableTwoDepth && twoDepthMapping ? twoDepthMapping[categoryValue] : undefined;
        
        allItems.push({
          id: `${entry.sys.id}-${imageIndex}`, // 고유 ID 생성
          imageUrl: getThumbnailUrl(originalUrl), // 최적화된 썸네일 URL
          lightboxUrl: getLightboxUrl(originalUrl), // 라이트박스용 고해상도 URL
          originalUrl: `https:${originalUrl}`, // 원본 URL (필요시 사용)
          aspectRatio: aspectRatios[allItems.length % aspectRatios.length],
          category: categoryValue,
          // title: `${entry.fields.title} ${imageIndex + 1}`,
          contentType,
          // 2-depth 정보 추가
          mainCategory: mappingInfo?.main || defaultCategoryMap[contentType],
          subCategory: mappingInfo?.sub || categoryValue
        });
      }
    });
  });
  
  return allItems;
};

// 2-depth 카테고리 구조
interface TwoDepthCategory {
  mainCategory: string;        // 대분류 (예: "가족")
  subCategories: string[];     // 소분류 배열 (예: ["전체", "스튜디오", "야외"])
}

// TwoDepthTab 컴포넌트 Props
interface TwoDepthTabProps {
  type: 'main' | 'sub';
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  isDropdownOpen: boolean;
  onDropdownToggle: () => void;
  tabContainerRef: React.RefObject<HTMLDivElement | null>;
}

// TwoDepthTab 컴포넌트 (재사용 가능한 드롭다운 탭)
const TwoDepthTab = ({ 
  type, 
  categories, 
  activeCategory, 
  onCategoryChange, 
  isDropdownOpen, 
  onDropdownToggle,
  tabContainerRef 
}: TwoDepthTabProps) => {
  return (
    <div className="relative">
      <div 
        ref={tabContainerRef}
        className="bg-white rounded-full p-2 flex space-x-2 shadow-sm min-w-[140px]"
      >
        <motion.button
          onClick={onDropdownToggle}
          className="px-4 py-2 sm:px-6 sm:py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap w-full flex-shrink-0 flex justify-between items-center space-x-1 dropdown-container relative text-foreground hover:bg-primary/10"
          data-type={type}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>{activeCategory || (type === 'main' ? '대분류' : '소분류')}</span>
          <motion.div
            animate={{ rotate: isDropdownOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown size={16} />
          </motion.div>
        </motion.button>
      </div>
      
      {/* 드롭다운 메뉴 */}
      {isDropdownOpen && (
        <motion.div
          className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-50 max-h-60 overflow-y-auto dropdown-container"
          data-type={type}
          style={{
            width: tabContainerRef.current?.offsetWidth || 'auto'
          }}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-1">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  onCategoryChange(category);
                  onDropdownToggle();
                }}
                className={`w-full text-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:bg-primary/10'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
};

interface PortfolioSectionProps {
  title?: string;
  description?: string;
  categories: string[];
  portfolioItems: PortfolioItem[];
  showMoreButton?: boolean;
  moreButtonText?: string;
  moreButtonHref?: string;
  maxVisibleTabs?: number; // 탭에 표시할 최대 카테고리 수 (기본값: 4)
  maxItems?: number; // 표시할 최대 사진 개수 (설정하지 않으면 전체 표시)
  serviceType?: 'family' | 'baby' | 'remindWedding'; // 서비스 타입 (1-depth 모드에서 URL 생성용)
  // 초기 카테고리 설정 (URL 파라미터로부터)
  initialMainCategory?: string; // 초기 대분류 (2-depth 모드용)
  initialSubCategory?: string;  // 초기 소분류 (2-depth 모드용)
  initialCategory?: string;     // 초기 카테고리 (1-depth 모드용)
  // 2-depth 카테고리 관련 props
  enableTwoDepth?: boolean;              // 2-depth 모드 활성화
  twoDepthCategories?: TwoDepthCategory[]; // 2-depth 카테고리 구조
}

export default function PortfolioSection({ 
  title = '', 
  description = '', 
  categories, 
  portfolioItems,
  showMoreButton = false,
  moreButtonText = "더 많은 작품 보기",
  moreButtonHref: _moreButtonHref = "/portfolio",
  maxVisibleTabs = 4, // 기본값 설정
  maxItems, // 표시할 최대 사진 개수
  serviceType, // 서비스 타입
  enableTwoDepth = false,
  twoDepthCategories = [],
  initialMainCategory,
  initialSubCategory,
  initialCategory
}: PortfolioSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
  
  // 1-depth 상태 (기존)
  const [activeCategory, setActiveCategory] = useState(initialCategory || categories[0] || "전체");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const tabContainerRef = useRef<HTMLDivElement>(null);
  
  // 2-depth 상태 (신규)
  const [activeMainCategory, setActiveMainCategory] = useState(
    initialMainCategory || (enableTwoDepth && twoDepthCategories.length > 0 ? twoDepthCategories[0].mainCategory : "")
  );
  const [activeSubCategory, setActiveSubCategory] = useState(
    initialSubCategory || "전체"
  );
  const [isMainDropdownOpen, setIsMainDropdownOpen] = useState(false);
  const [isSubDropdownOpen, setIsSubDropdownOpen] = useState(false);
  const mainTabContainerRef = useRef<HTMLDivElement | null>(null);
  const subTabContainerRef = useRef<HTMLDivElement | null>(null);
  
  // 라이트박스 관련 상태
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set());
  const [mainImageLoaded, setMainImageLoaded] = useState(false);

  // 현재 선택된 소분류 목록 계산
  const currentSubCategories = enableTwoDepth && twoDepthCategories.length > 0
    ? twoDepthCategories.find(cat => cat.mainCategory === activeMainCategory)?.subCategories || ["전체"]
    : [];

  // 카테고리별 필터링
  const filteredItems = useMemo(() => {
    if (enableTwoDepth) {
      let filtered = portfolioItems;
      
      // 대분류 필터링 (PortfolioItem의 contentType을 기준으로)
      if (activeMainCategory) {
        const contentTypeMap: Record<string, ContentType> = {
          '가족': 'family',
          '베이비': 'baby', 
          '리마인드웨딩': 'remindWedding'
        };
        const targetContentType = contentTypeMap[activeMainCategory];
        if (targetContentType) {
          filtered = filtered.filter(item => item.contentType === targetContentType);
        }
      }
      
      // 소분류 필터링 (PortfolioItem의 category를 기준으로)
      if (activeSubCategory && activeSubCategory !== "전체") {
        filtered = filtered.filter(item => item.category === activeSubCategory);
      }
      
      return filtered;
    } else {
      // 기존 1-depth 로직 - 한국어 카테고리명을 contentType으로 매핑
      if (activeCategory === "전체" || activeCategory === categories[0]) {
        return portfolioItems;
      }
      
      // 한국어 카테고리명을 contentType으로 매핑
      const categoryToContentTypeMap: Record<string, ContentType> = {
        '가족사진': 'family',
        '리마인드웨딩': 'remindWedding', 
        '베이비촬영': 'baby'
      };
      
      const targetContentType = categoryToContentTypeMap[activeCategory];
      
      if (targetContentType) {
        // contentType으로 필터링
        return portfolioItems.filter(item => item.contentType === targetContentType);
      } else {
        // 기존 방식: category로 필터링 (하위 카테고리인 경우)
        return portfolioItems.filter(item => item.category === activeCategory);
      }
    }
  }, [enableTwoDepth, activeMainCategory, activeSubCategory, activeCategory, portfolioItems, categories]);

  // 표시할 아이템 수 제한 및 더보기 버튼 표시 여부 결정
  const displayItems = useMemo(() => {
    return maxItems ? filteredItems.slice(0, maxItems) : filteredItems;
  }, [filteredItems, maxItems]);

  // 더보기 버튼 표시 여부 (maxItems가 설정되고 실제 아이템이 더 많을 때 자동으로 true)
  const shouldShowMoreButton = maxItems ? filteredItems.length > maxItems : showMoreButton;

  // 더보기 버튼 URL 동적 생성
  const dynamicMoreButtonHref = useMemo(() => {
    if (enableTwoDepth) {
      // 2-depth 모드: 대분류와 소분류 모두 포함
      const params = new URLSearchParams();
      
      // 대분류 매핑 (한국어 -> 영어)
      const categoryMapping: Record<string, string> = {
        '가족': 'family',
        '베이비': 'baby',
        '리마인드웨딩': 'remindWedding'
      };
      
      if (activeMainCategory && categoryMapping[activeMainCategory]) {
        params.append('category', categoryMapping[activeMainCategory]);
      }
      
      if (activeSubCategory && activeSubCategory !== '전체') {
        params.append('subcategory', activeSubCategory);
      }
      
      return `/portfolio${params.toString() ? `?${params.toString()}` : ''}`;
    } else {
      // 1-depth 모드: serviceType과 현재 선택된 카테고리 사용
      const params = new URLSearchParams();
      
      // 서비스 타입이 있으면 category로 추가
      if (serviceType) {
        params.append('category', serviceType);
      }
      
      // 현재 선택된 카테고리가 '전체'가 아니면 subcategory로 추가
      if (activeCategory && activeCategory !== '전체' && activeCategory !== categories[0]) {
        params.append('subcategory', activeCategory);
      }
      
      return `/portfolio${params.toString() ? `?${params.toString()}` : ''}`;
    }
  }, [enableTwoDepth, activeMainCategory, activeSubCategory, activeCategory, categories, serviceType]);

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
    const nextIndex = currentIndex + 1 < displayItems.length ? currentIndex + 1 : 0;
    const nextItem = displayItems[nextIndex];
    
    if (nextItem) {
      const nextImageUrl = nextItem.lightboxUrl || nextItem.imageUrl;
      preloadImage(nextImageUrl);
      
      // 다음 이미지 로드 완료 후 이전 이미지도 프리로드
      setTimeout(() => {
        const prevIndex = currentIndex - 1 >= 0 ? currentIndex - 1 : displayItems.length - 1;
        const prevItem = displayItems[prevIndex];
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
    const loadTime = loadEndTime - ((window as unknown as { lightboxLoadStartTime: number }).lightboxLoadStartTime || 0);
    
    setMainImageLoaded(true);
    // 메인 이미지 로드 완료 후 프리로딩 시작
    setTimeout(() => {
      preloadAdjacentImages(currentImageIndex);
    }, 500); // 0.5초 여유 시간
  };

  // 라이트박스 열기
  const openLightbox = (imageUrl: string) => {
    const index = displayItems.findIndex(item => item.imageUrl === imageUrl);
    const item = displayItems[index];
    setCurrentImageIndex(index);
    setMainImageLoaded(false); // 새 이미지 로딩 시작
    
    // 로딩 시작 시간 기록
    (window as unknown as { lightboxLoadStartTime: number }).lightboxLoadStartTime = performance.now();

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
    const newIndex = currentImageIndex > 0 ? currentImageIndex - 1 : displayItems.length - 1;
    const item = displayItems[newIndex];
    setCurrentImageIndex(newIndex);
    setMainImageLoaded(false); // 새 이미지 로딩 시작
    
    // 슬라이드 로딩 시작 시간 기록
    (window as unknown as { lightboxLoadStartTime: number }).lightboxLoadStartTime = performance.now();
    
    setLightboxImage(item.lightboxUrl || item.imageUrl);
  };

  // 다음 이미지로 이동
  const goToNext = () => {
    const newIndex = currentImageIndex < displayItems.length - 1 ? currentImageIndex + 1 : 0;
    const item = displayItems[newIndex];
    setCurrentImageIndex(newIndex);
    setMainImageLoaded(false); // 새 이미지 로딩 시작
    
    // 슬라이드 로딩 시작 시간 기록
    (window as unknown as { lightboxLoadStartTime: number }).lightboxLoadStartTime = performance.now();
    
    setLightboxImage(item.lightboxUrl || item.imageUrl);
  };

  // 드롭다운 외부 클릭 시 닫기
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      
      if (enableTwoDepth) {
        // 2-depth 모드: 각각의 드롭다운 체크
        if (isMainDropdownOpen && !target.closest('.dropdown-container[data-type="main"]')) {
          setIsMainDropdownOpen(false);
        }
        if (isSubDropdownOpen && !target.closest('.dropdown-container[data-type="sub"]')) {
          setIsSubDropdownOpen(false);
        }
      } else {
        // 1-depth 모드: 기존 로직
        if (isDropdownOpen && !target.closest('.dropdown-container')) {
          setIsDropdownOpen(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [enableTwoDepth, isMainDropdownOpen, isSubDropdownOpen, isDropdownOpen]);

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
  }, [lightboxImage, currentImageIndex, displayItems]);

  return (
    <section className="py-32 bg-muted">
      <div className="container">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {title && description && (
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
          )}

          {/* 카테고리 탭 */}
          <motion.div 
            className="flex justify-center mb-12 relative"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {enableTwoDepth ? (
              /* 2-depth: 두 개의 탭을 나란히 배치 */
              <div className="flex justify-center space-x-4">
                {/* 대분류 탭 */}
                <TwoDepthTab
                  type="main"
                  categories={twoDepthCategories.map(cat => cat.mainCategory)}
                  activeCategory={activeMainCategory}
                  onCategoryChange={(category) => {
                    setActiveMainCategory(category);
                    setActiveSubCategory("전체"); // 대분류 변경 시 소분류 초기화
                  }}
                  isDropdownOpen={isMainDropdownOpen}
                  onDropdownToggle={() => setIsMainDropdownOpen(!isMainDropdownOpen)}
                  tabContainerRef={mainTabContainerRef}
                />
                
                {/* 소분류 탭 */}
                <TwoDepthTab
                  type="sub"
                  categories={currentSubCategories}
                  activeCategory={activeSubCategory}
                  onCategoryChange={setActiveSubCategory}
                  isDropdownOpen={isSubDropdownOpen}
                  onDropdownToggle={() => setIsSubDropdownOpen(!isSubDropdownOpen)}
                  tabContainerRef={subTabContainerRef}
                />
              </div>
            ) : (
              /* 1-depth: 기존 방식 */
              <div 
                ref={tabContainerRef}
                className="bg-white rounded-full p-2 flex space-x-2 shadow-sm overflow-x-auto scrollbar-hide"
              >
                {/* maxVisibleTabs가 1이고 카테고리가 2개 이상일 때: 첫 번째 탭을 드롭다운으로 만듦 */}
                {maxVisibleTabs === 1 && categories.length > 1 ? (
                  <motion.button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 flex items-center space-x-1 dropdown-container relative ${
                      activeCategory === categories[0] || categories.slice(1).includes(activeCategory)
                        ? 'text-primary'
                        : 'text-foreground hover:bg-primary/10'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span>
                      {activeCategory}
                    </span>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronDown size={16} />
                    </motion.div>
                  </motion.button>
                ) : (
                  <>
                    {/* 일반적인 탭 표시 */}
                    {categories.slice(0, maxVisibleTabs).map((category) => (
                      <motion.button 
                        key={category}
                        onClick={() => setActiveCategory(category)}
                        className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 ${
                          activeCategory === category
                            ? 'text-primary'
                            : 'text-foreground hover:bg-primary/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        {category}
                      </motion.button>
                    ))}
                    
                    {/* 드롭다운 버튼 (일반적인 경우) */}
                    {categories.length > maxVisibleTabs && maxVisibleTabs > 1 && (
                      <motion.button
                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                        className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap flex-shrink-0 flex items-center space-x-1 dropdown-container relative ${
                          categories.slice(maxVisibleTabs).includes(activeCategory)
                            ? 'text-primary'
                            : 'text-foreground hover:bg-primary/10'
                        }`}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>
                          {categories.slice(maxVisibleTabs).includes(activeCategory) 
                            ? activeCategory 
                            : '더보기'
                          }
                        </span>
                        <motion.div
                          animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                          transition={{ duration: 0.2 }}
                        >
                          <ChevronDown size={16} />
                        </motion.div>
                      </motion.button>
                    )}
                  </>
                )}
              </div>
            )}
            
            {/* 1-depth 드롭다운 메뉴 - 탭 컨테이너 밖에 배치 */}
            {!enableTwoDepth && ((maxVisibleTabs === 1 && categories.length > 1) || (categories.length > maxVisibleTabs && maxVisibleTabs > 1)) && isDropdownOpen && (
              <motion.div
                className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-white rounded-lg shadow-lg p-2 z-50 max-h-60 overflow-y-auto dropdown-container"
                style={{
                  width: tabContainerRef.current?.offsetWidth || 'auto'
                }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                <div className={`grid ${maxVisibleTabs === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-1`}>
                  {(maxVisibleTabs === 1 ? categories : categories.slice(maxVisibleTabs)).map((category) => (
                    <button
                      key={category}
                      onClick={() => {
                        setActiveCategory(category);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeCategory === category
                          ? 'bg-primary text-white'
                          : 'text-foreground hover:bg-primary/10'
                      }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Masonry 컬럼 기반 포트폴리오 갤러리 */}
          <motion.div 
            className="columns-2 md:columns-4"
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            key={activeCategory} // 카테고리 변경 시 애니메이션 재실행
          >
            {displayItems.map((item, index) => (
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
                    {/* <p className="text-white/80 text-xs">{item.title}</p> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* 더 많은 작품 보기 버튼 */}
          {shouldShowMoreButton && (
            <motion.div 
              className="text-center mt-24"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 1.4 }}
            >
              <a href={dynamicMoreButtonHref}>
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
              {currentImageIndex + 1} / {displayItems.length}
            </div>

            {/* 카테고리 표시 - 좌상단 */}
            <div className="absolute top-6 left-6 mt-10 text-white/80 text-sm z-30">
              {enableTwoDepth 
                ? `${activeMainCategory} > ${activeSubCategory}`
                : activeCategory
              }
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
            {displayItems.length > 1 && (
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
            {displayItems.length > 1 && (
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