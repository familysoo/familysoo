'use client';

import { motion } from "framer-motion";
import type { ConceptItem, ConceptApiResponse, ConceptEntry, ContentfulAsset } from "@/types/database";
import { useState, useEffect } from "react";
import LoadingSpinner from "./LoadingSpinner";

// Contentful concept 데이터 변환 함수
export const transformConceptData = (
  response: ConceptApiResponse
): ConceptItem[] => {
  const assets = response.includes.Asset || [];
  
  return response.data.map((entry: ConceptEntry) => {
    let imageUrl = undefined;
    
    // 이미지가 있는 경우만 처리
    if (entry.fields.image) {
      const asset = assets.find((asset: ContentfulAsset) => 
        asset.sys.id === entry.fields.image?.sys.id
      );
      
      if (asset && asset.fields.file.url) {
        const originalUrl = asset.fields.file.url;
        imageUrl = originalUrl.startsWith('//') ? `https:${originalUrl}` : originalUrl;
      }
    }
    
    return {
      id: entry.sys.id,
      name: entry.fields.name,
      service: entry.fields.service,
      description: entry.fields.description,
      imageUrl,
      category: entry.fields.category,
      recommend: entry.fields.recommend,
      recommendLabel: entry.fields.recommendLabel,
      order: entry.fields.order
    };
  });
};

interface ConceptSectionProps {
  service: '베이비' | '가족' | '리마인드 웨딩';
  title?: string;
  description?: string;
}

export default function ConceptSection({ 
  service, 
  title = "촬영 테마 소개",
  description = "아래 다양한 테마 중에서 원하시는 컨셉을 선택하여 촬영합니다"
}: ConceptSectionProps) {
  const [concepts, setConcepts] = useState<ConceptItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConcepts() {
      try {
        const response = await fetch(`/api/concepts?service=${encodeURIComponent(service)}`);
        if (!response.ok) {
          throw new Error('Failed to fetch concepts');
        }
        
        const data: ConceptApiResponse = await response.json();
        const transformedConcepts = transformConceptData(data);
        setConcepts(transformedConcepts);
      } catch (error) {
        console.error('컨셉 데이터 로딩 실패:', error);
        setError('컨셉 데이터를 불러오는데 실패했습니다.');
      } finally {
        setLoading(false);
      }
    }

    loadConcepts();
  }, [service]);

  // 카테고리별로 컨셉들을 그룹화
  const conceptsByCategory = concepts
  .sort((a, b) => {
    const orderA = a.order ?? 999999;
    const orderB = b.order ?? 999999;
    return orderA - orderB;
  })
  .reduce((acc, concept) => {
    const category = concept.category || '기본 컨셉';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(concept);
    return acc;
  }, {} as Record<string, ConceptItem[]>);

  if (loading) {
    return (
      <div className="mb-20">
        <h3 className="font-serif text-lg sm:text-2xl font-medium mb-8 text-center text-primary">{title}</h3>
        <div className="flex justify-center">
          <LoadingSpinner size="lg" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mb-20">
        <h3 className="font-serif text-lg sm:text-2xl font-medium mb-8 text-center text-primary">{title}</h3>
        <div className="text-center text-foreground/70 p-8 bg-muted rounded-lg">
          {error}
        </div>
      </div>
    );
  }

  if (concepts.length === 0) {
    return (
      <div className="mb-20">
        <h3 className="font-serif text-lg sm:text-2xl font-medium mb-8 text-center text-primary">{title}</h3>
        <div className="text-center text-foreground/70 p-8 bg-muted rounded-lg">
          등록된 컨셉이 없습니다.
        </div>
      </div>
    );
  }

  // 카테고리별 이모지 매핑
  const categoryEmojis: Record<string, string> = {
    '첫돌 기념 테마': '🎂',
    '백일 기념 테마': '💝',
    '추가 선택 컨셉': '✨',
    '기본 컨셉': '🎨'
  };

  return (
    <div className="mb-20">
      <h3 className="font-serif text-lg sm:text-2xl font-medium mb-8 text-center text-primary">{title}</h3>
      <p className="text-center text-foreground/70 mb-12">{description}</p>
      
      {Object.entries(conceptsByCategory).map(([category, categoryItems], categoryIndex) => (
        <div key={category} className="mb-12">
          <h4 className="font-serif text-lg sm:text-xl font-medium mb-6 text-primary">
            {category}
          </h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categoryItems.map((concept, index) => (
              <motion.div 
                key={concept.id}
                className={`bg-white p-4 rounded-xl shadow-sm ${
                  concept.recommend ? 'border-1 border-primary' : ''
                }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                {concept.imageUrl ? (
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg mb-3 overflow-hidden">
                    <img 
                      src={concept.imageUrl} 
                      alt={concept.name}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="aspect-square bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg mb-3 flex items-center justify-center">
                    <span className="text-4xl">🎨</span>
                  </div>
                )}
                
                <h5 className="font-medium text-primary mb-2 flex items-center gap-2">
                  {concept.name}
                  {concept.recommend && concept.recommendLabel && (
                    <span className={`text-xs px-2 py-1 rounded bg-primary text-white`}>
                      {concept.recommendLabel}
                    </span>
                  )}
                </h5>
                
                <p className="text-sm text-foreground/70">{concept.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export type { ConceptSectionProps }; 