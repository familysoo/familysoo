// Contentful Content Types
export type ContentType = 'family' | 'baby' | 'remindWedding';

// Contentful Sys 타입
export interface ContentfulSys {
  space: {
    sys: {
      type: 'Link';
      linkType: 'Space';
      id: string;
    };
  };
  id: string;
  type: 'Entry' | 'Asset';
  createdAt: string;
  updatedAt: string;
  revision: number;
  environment: {
    sys: {
      id: string;
      type: 'Link';
      linkType: 'Environment';
    };
  };
  publishedVersion: number;
  contentType?: {
    sys: {
      type: 'Link';
      linkType: 'ContentType';
      id: string;
    };
  };
  locale?: string;
}

// Contentful Asset 타입
export interface ContentfulAsset {
  sys: ContentfulSys;
  fields: {
    title: string;
    description?: string;
    file: {
      url: string;
      details: {
        size: number;
        image?: {
          width: number;
          height: number;
        };
      };
      fileName: string;
      contentType: string;
    };
  };
}

// Asset Link 타입
export interface AssetLink {
  sys: {
    type: 'Link';
    linkType: 'Asset';
    id: string;
  };
}

// Portfolio Entry 타입들 (실제 응답 구조에 맞게 수정)
export interface BabyEntry {
  metadata: {
    tags: any[];
    concepts: any[];
  };
  sys: ContentfulSys;
  fields: {
    images?: AssetLink[];
    category: string;
    order: number;
  };
}

export interface FamilyEntry {
  metadata: {
    tags: any[];
    concepts: any[];
  };
  sys: ContentfulSys;
  fields: {
    images?: AssetLink[];
    category: string;
    order: number;
  };
}

export interface RemindWeddingEntry {
  metadata: {
    tags: any[];
    concepts: any[];
  };
  sys: ContentfulSys;
  fields: {
    images?: AssetLink[];
    category: string;
    order: number;
  };
}

// Union type for all entries
export type PortfolioEntry = BabyEntry | FamilyEntry | RemindWeddingEntry;

// Contentful API 응답 타입
export interface ContentfulResponse {
  sys: {
    type: string;
  };
  total: number;
  skip: number;
  limit: number;
  items: PortfolioEntry[];
  includes?: {
    Asset?: ContentfulAsset[];
  };
}

// API 요청 파라미터 타입
export interface ServicesApiParams {
  type: ContentType;
}

// API 응답 타입
export interface ServicesApiResponse {
  success: boolean;
  contentType: ContentType;
  data: PortfolioEntry[];
  total: number;
  includes: {
    Asset?: ContentfulAsset[];
  };
}

// API 에러 응답 타입
export interface ServicesApiError {
  error: string;
  details?: string;
}

// 포트폴리오 아이템 (프론트엔드에서 사용할 변환된 타입)
export interface PortfolioItem {
  id: string;
  imageUrl: string; // 최적화된 썸네일 URL
  lightboxUrl?: string; // 라이트박스용 고해상도 URL
  originalUrl?: string; // 원본 URL (필요시 사용)
  aspectRatio: string;
  category: string;
  contentType: ContentType;
  // 2-depth 카테고리 관련 필드 (옵셔널)
  mainCategory?: string; // 대분류
  subCategory?: string;  // 소분류
}
