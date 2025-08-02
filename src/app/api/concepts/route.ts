import { NextRequest, NextResponse } from 'next/server';
import type { 
  ConceptApiResponse, 
  ServicesApiError,
  ConceptEntry,
  ContentfulAsset
} from '@/types/database';

const CONTENTFUL_BASE_URL = 'https://cdn.contentful.com/spaces';
const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENT_DELIVERY_TOKEN;

// Contentful API 호출 함수 - concept 모델용
async function fetchConceptEntries(service?: string): Promise<{ items: ConceptEntry[], total: number, includes?: { Asset?: ContentfulAsset[] } }> {
  try {
    let url = `${CONTENTFUL_BASE_URL}/${SPACE_ID}/environments/master/entries?content_type=concept&include=2&access_token=${ACCESS_TOKEN}`;
    
    // 서비스별 필터링
    if (service) {
      url += `&fields.service=${encodeURIComponent(service)}`;
    }
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 300 } // 5분마다 캐시 갱신
    });

    if (!response.ok) {
      throw new Error(`Contentful API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      items: data.items,
      total: data.total,
      includes: data.includes
    };
  } catch (error) {
    console.error(`Error fetching concept entries:`, error);
    throw error;
  }
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ConceptApiResponse | ServicesApiError>> {
  try {
    // 환경변수 확인
    if (!SPACE_ID || !ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Contentful 환경변수가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const service = searchParams.get('service'); // '베이비', '가족', '리마인드 웨딩' 중 하나 또는 null

    // Contentful API 호출
    const data = await fetchConceptEntries(service || undefined);

    return NextResponse.json({
      success: true,
      data: data.items,
      total: data.total,
      includes: data.includes || {}
    });

  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    return NextResponse.json(
      { 
        error: 'Contentful concept 데이터를 가져오는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
} 