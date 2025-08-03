'use client';

import Link from "next/link";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";
import PortfolioSection, { transformContentfulData } from "../../components/PortfolioSection";
import Footer from "../../components/Footer";
import type { PortfolioItem, ServicesApiResponse, ContentType } from "../../types/database";

function PortfolioContent() {
  const searchParams = useSearchParams();
  const [portfolioItems, setPortfolioItems] = useState<PortfolioItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // URL 파라미터에서 카테고리 정보 추출
  const categoryParam = searchParams.get('category'); // family, baby, remindWedding 등
  const subcategoryParam = searchParams.get('subcategory'); // 스튜디오, 야외 등

  // 카테고리 매핑 (URL 파라미터 -> 한국어 카테고리명)
  const categoryMapping: Record<string, string> = {
    'family': '가족',
    'baby': '베이비',
    'remindWedding': '리마인드웨딩'
  };

  // 초기 카테고리 값 설정
  const initialMainCategory = categoryParam ? categoryMapping[categoryParam] : undefined;
  const initialSubCategory = subcategoryParam || undefined;

  // 2-depth 카테고리 구조 (동적으로 생성될 예정)
  const [twoDepthCategories, setTwoDepthCategories] = useState<Array<{mainCategory: string; subCategories: string[]}>>([]);

  // API에서 모든 카테고리 데이터 가져오기
  useEffect(() => {
    const fetchAllPortfolioData = async () => {
      try {
        setLoading(true);
        const contentTypes: ContentType[] = ['family', 'baby', 'remindWedding'];
        const allItems: PortfolioItem[] = [];
        const categoryStructure: Array<{mainCategory: string; subCategories: string[]}> = [];

        // 각 카테고리별로 API 호출
        for (const contentType of contentTypes) {
          try {
            const response = await fetch(`/api/services?type=${contentType}`);
            if (response.ok) {
              const data: ServicesApiResponse = await response.json();
              
              // 실제 카테고리 추출
              const categories = [...new Set(data.data.map(entry => entry.fields.category))];
              console.log(`${contentType} categories:`, categories);
              
              // 대분류명 매핑
              const mainCategoryName = categoryMapping[contentType] || contentType;
              
              // 카테고리 구조 추가
              categoryStructure.push({
                mainCategory: mainCategoryName,
                subCategories: ["전체", ...categories]
              });
              
              // 데이터 변환 (2-depth 활성화)
              const transformedItems = transformContentfulData(data, contentType, true);
              allItems.push(...transformedItems);
            }
          } catch (err) {
            console.warn(`${contentType} 데이터 로드 실패:`, err);
          }
        }

        setPortfolioItems(allItems);
        setTwoDepthCategories(categoryStructure);
        
        // 초기 대분류 설정 (URL 파라미터가 있으면 사용, 없으면 첫 번째 대분류)
        if (!initialMainCategory && categoryStructure.length > 0) {
          // setActiveMainCategory(categoryStructure[0].mainCategory); // This line was removed as per the edit hint
        }
      } catch (err) {
        console.error('포트폴리오 데이터 로드 실패:', err);
        setError('데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    };

    fetchAllPortfolioData();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <PageHero 
        title="포트폴리오"
        description="소중한 순간들의 아름다운 기록을 확인해보세요"
      />

      {/* 포트폴리오 섹션 (2-depth 카테고리) */}
      {loading ? (
        <div className="py-32 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-foreground/70">포트폴리오를 불러오는 중...</p>
        </div>
      ) : error ? (
        <div className="py-32 text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-primary text-white px-6 py-2 rounded-full hover:bg-primary/90 transition-colors"
          >
            다시 시도
          </button>
        </div>
      ) : (
        <PortfolioSection
          title="전체 포트폴리오"
          description="Family Soo Studio의 다양한 순간들을<br />아름다운 사진으로 확인해보세요"
          categories={[]} // 2-depth에서는 사용하지 않음
          portfolioItems={portfolioItems}
          enableTwoDepth={true}
          twoDepthCategories={twoDepthCategories}
          maxVisibleTabs={1}
          initialMainCategory={initialMainCategory}
          initialSubCategory={initialSubCategory}
        />
      )}

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-light mb-6">고객 후기</h2>
            <p className="text-lg text-foreground/70">실제 고객들의 생생한 후기</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white px-6 py-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">⭐⭐⭐⭐⭐</span>
                <span className="text-sm text-foreground opacity-60">김○○님</span>
              </div>
              <p className="text-foreground/80 text-sm" style={{lineHeight: '1.6'}}>
                "20년 결혼기념일 리마인드 웨딩을 진행했는데, 정말 감동적이었어요. 
                자연스럽고 아름다운 사진들로 특별한 추억을 만들어주셔서 감사합니다."
              </p>
            </div>

            <div className="bg-white px-6 py-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">⭐⭐⭐⭐⭐</span>
                <span className="text-sm text-foreground opacity-60">박○○님</span>
              </div>
              <p className="text-foreground/80 text-sm" style={{lineHeight: '1.6'}}>
                "아기 100일 촬영을 했는데, 아이가 편안해하도록 세심하게 배려해주셨어요. 
                사진 퀄리티도 정말 만족스럽고, 평생 간직하고 싶은 사진들입니다."
              </p>
            </div>

            <div className="bg-white px-6 py-6 rounded-2xl shadow-sm">
              <div className="flex items-center mb-4">
                <span className="text-2xl mr-3">⭐⭐⭐⭐⭐</span>
                <span className="text-sm text-foreground opacity-60">이○○님</span>
              </div>
              <p className="text-foreground/80 text-sm" style={{lineHeight: '1.6'}}>
                "3세대 가족사진을 찍었는데, 온 가족이 너무 만족했어요. 
                자연스러운 표정들을 잘 담아주셔서 보는 사람마다 칭찬해주네요."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-muted">
        <div className="container text-center" style={{maxWidth: '64rem'}}>
          <h2 className="font-serif text-3xl font-light mb-6">
            여러분만의 특별한 순간을 남겨보세요
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            전문 작가와 함께 평생 간직할 소중한 추억을 만들어보세요
          </p>
          <Link
            href="/contact"
            className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors"
          >
            촬영 예약하기
          </Link>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function PortfolioPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <PortfolioContent />
    </Suspense>
  );
} 