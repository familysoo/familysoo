import { NextRequest, NextResponse } from 'next/server';
import type { 
  ContentType, 
  ContentfulResponse, 
  ServicesApiResponse, 
  ServicesApiError 
} from '@/types/database';

const CONTENTFUL_BASE_URL = 'https://cdn.contentful.com/spaces';
const SPACE_ID = process.env.NEXT_PUBLIC_SPACE_ID;
const ACCESS_TOKEN = process.env.NEXT_PUBLIC_CONTENT_DELIVERY_TOKEN;

// Contentful API 호출 함수
async function fetchContentfulEntries(contentType: ContentType): Promise<ContentfulResponse> {
  try {
    const url = `${CONTENTFUL_BASE_URL}/${SPACE_ID}/environments/master/entries?content_type=${contentType}&access_token=${ACCESS_TOKEN}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { revalidate: 60 } // 1분마다 캐시 갱신
    });

    if (!response.ok) {
      throw new Error(`Contentful API error: ${response.status}`);
    }

    const data: ContentfulResponse = await response.json();
    return data;
  } catch (error) {
    console.error(`Error fetching ${contentType} entries:`, error);
    throw error;
  }
}

export async function GET(
  request: NextRequest
): Promise<NextResponse<ServicesApiResponse | ServicesApiError>> {
  try {
    // 환경변수 확인
    if (!SPACE_ID || !ACCESS_TOKEN) {
      return NextResponse.json(
        { error: 'Contentful 환경변수가 설정되지 않았습니다.' },
        { status: 500 }
      );
    }

    const { searchParams } = new URL(request.url);
    const contentType = searchParams.get('type') as ContentType | null;

    // content type 파라미터 확인
    if (!contentType) {
      return NextResponse.json(
        { error: 'content type 파라미터가 필요합니다. (?type=family|baby|remindWedding)' },
        { status: 400 }
      );
    }

    // 허용되는 content type 확인
    const allowedTypes: ContentType[] = ['family', 'baby', 'remindWedding'];
    if (!allowedTypes.includes(contentType)) {
      return NextResponse.json(
        { error: `지원되지 않는 content type입니다. 허용되는 타입: ${allowedTypes.join(', ')}` },
        { status: 400 }
      );
    }

    // Contentful API 호출
    const data = await fetchContentfulEntries(contentType);

    return NextResponse.json({
      success: true,
      contentType,
      data: data.items,
      total: data.total,
      includes: data.includes || {}
    });

  } catch (error) {
    console.error('API 요청 중 오류 발생:', error);
    return NextResponse.json(
      { 
        error: 'Contentful 데이터를 가져오는 중 오류가 발생했습니다.',
        details: error instanceof Error ? error.message : '알 수 없는 오류'
      },
      { status: 500 }
    );
  }
}
