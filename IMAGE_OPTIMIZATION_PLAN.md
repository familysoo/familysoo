# 이미지 최적화 계획 📸

포트폴리오 이미지 로딩 속도 개선을 위한 단계별 최적화 방안

## 🎯 목표
- 초기 로딩 시간 50-70% 단축
- 파일 크기 70-80% 감소
- 사용자 경험 2-3배 개선

---

## 📋 구현 단계

### **1단계: Contentful 이미지 변환 API 활용** ✅ 구현 완료
**예상 효과**: 파일 크기 70-80% 감소

#### 구현 내용
- Contentful URL 쿼리 파라미터로 실시간 이미지 변환
- 포트폴리오 그리드용 썸네일: `?w=600&h=400&f=webp&q=75`
- 라이트박스용 고해상도: `?w=1200&f=webp&q=85`
- WebP 포맷으로 자동 변환

#### 적용된 크기
- **썸네일**: 600px 너비, WebP, 75% 품질
- **라이트박스**: 1200px 너비, WebP, 85% 품질
- **모바일 썸네일**: 400px 너비, WebP, 70% 품질

---

### **2단계: Next.js Image 컴포넌트 + Lazy Loading** 🔄 대기 중
**예상 효과**: 초기 로딩 시간 50-70% 단축

#### 구현 예정 내용
- `next/image` 컴포넌트로 교체
- Intersection Observer 기반 지연 로딩
- 뷰포트에 들어올 때만 이미지 로드
- 자동 blur placeholder 생성

#### 기술 스택
- `next/image` 컴포넌트
- Intersection Observer API
- Dynamic import for performance

---

### **3단계: Progressive Image Loading** 🔄 대기 중
**예상 효과**: 체감 로딩 속도 2-3배 개선

#### 구현 예정 내용
- 저화질 이미지 먼저 로드 → 고화질로 점진적 교체
- Base64 인코딩된 초소형 썸네일 placeholder
- Smooth transition 애니메이션
- "이미지가 선명해지는" 사용자 경험

#### 기술 구현
- 10px 이하 저화질 이미지 생성
- CSS transition으로 부드러운 교체
- Canvas API 활용한 blur 효과

---

### **4단계: 적응형 이미지 크기** 🔄 대기 중
**예상 효과**: 디바이스별 최적화로 추가 20-30% 개선

#### 구현 예정 내용
- 디바이스 화면 크기별 다른 해상도 제공
- `srcset`과 `sizes` 속성 활용
- 반응형 이미지 로딩

#### 크기별 최적화
- **모바일** (< 768px): 300-400px
- **태블릿** (768-1024px): 600-800px  
- **데스크톱** (> 1024px): 1200px+

---

## ✅ 단계별 구현 확인 방법

### **1단계 확인: Contentful 이미지 변환 API**

#### 🔍 **Network 탭에서 확인**
1. Chrome DevTools → Network 탭 열기
2. 포트폴리오 섹션으로 스크롤
3. 이미지 요청 URL 확인:
   ```
   ✅ 올바른 예시:
   https://images.ctfassets.net/qm30xgt64wge/6G2Gxo4YIRD1hIj15XsxBL/xxx/image.jpg?w=600&f=webp&q=75&fit=fill
   
   ❌ 잘못된 예시:
   https://images.ctfassets.net/qm30xgt64wge/6G2Gxo4YIRD1hIj15XsxBL/xxx/image.jpg (쿼리 파라미터 없음)
   ```

#### 📊 **파일 크기 확인**
- Network 탭에서 이미지 파일 크기 확인
- **예상 크기**: 50-200KB (원본 2-5MB에서 크게 감소)
- **포맷**: Response Headers에서 `content-type: image/webp` 확인

#### 🖼️ **라이트박스 고해상도 확인**
1. 포트폴리오 이미지 클릭하여 라이트박스 열기
2. Network 탭에서 새로운 이미지 요청 확인
3. 라이트박스 이미지 URL에 `?w=1200&f=webp&q=85` 포함 여부 확인

---

### **2단계 확인: Next.js Image + Lazy Loading**

#### 🔍 **DOM 구조 확인**
```html
✅ 올바른 구조:
<img loading="lazy" src="..." style="..." />

❌ 잘못된 구조:
<div style="background-image: url(...)" />
```

#### 📱 **Lazy Loading 동작 확인**
1. Network 탭 → Disable cache 체크
2. 페이지 새로고침
3. 포트폴리오 섹션으로 스크롤하기 **전**에 Network 탭 확인
4. **결과**: 포트폴리오 이미지 요청이 없어야 함
5. 스크롤하면서 이미지가 뷰포트에 진입할 때 요청 발생 확인

#### ⚡ **성능 개선 확인**
- Lighthouse → Performance 탭에서 LCP 개선 확인
- **목표**: 초기 로딩 시간 50% 이상 단축

---

### **3단계 확인: Progressive Image Loading**

#### 🎭 **Progressive 효과 확인**
1. Network 탭 → Slow 3G로 설정
2. 페이지 새로고침
3. **확인할 효과**:
   - 저화질 blur 이미지 먼저 표시
   - 점진적으로 선명한 이미지로 교체
   - 부드러운 transition 애니메이션

#### 🔍 **이미지 요청 순서 확인**
```
Network 탭에서 요청 순서:
1. 초소형 placeholder (base64 또는 10px 이하)
2. 중간 품질 이미지 (?q=50)
3. 최종 고품질 이미지 (?q=75)
```

#### 📊 **사용자 경험 측정**
- **체감 로딩 속도**: 이미지가 즉시 나타나는지 확인
- **시각적 안정성**: CLS(Cumulative Layout Shift) 점수 개선

---

### **4단계 확인: 적응형 이미지 크기**

#### 📱 **디바이스별 이미지 크기 확인**
1. Chrome DevTools → Device Toolbar로 다양한 화면 크기 테스트

**모바일 (320-767px)**:
```
예상 URL: ?w=400&f=webp&q=70
```

**태블릿 (768-1023px)**:
```
예상 URL: ?w=600&f=webp&q=75
```

**데스크톱 (1024px+)**:
```
예상 URL: ?w=800&f=webp&q=75
```

#### 🔍 **srcset 속성 확인**
```html
✅ 올바른 구조:
<img srcset="image-400.webp 400w, image-800.webp 800w, image-1200.webp 1200w" 
     sizes="(max-width: 768px) 400px, (max-width: 1024px) 600px, 800px" />
```

#### 📊 **대역폭 절약 확인**
- 모바일에서 Network 탭으로 파일 크기 확인
- **모바일 예상 크기**: 30-100KB (데스크톱 대비 50-70% 감소)

---

## 🔧 성능 모니터링

### 측정 지표
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)  
- Cumulative Layout Shift (CLS)
- 이미지 로딩 완료 시간

### 도구
- Chrome DevTools Performance 탭
- Lighthouse 성능 감사
- Network 탭에서 이미지 로딩 확인

### 📈 **성능 측정 방법**
1. **Lighthouse 감사**:
   ```
   Chrome DevTools → Lighthouse → Performance → Analyze page load
   ```

2. **실제 로딩 시간 측정**:
   ```
   Network 탭 → DOMContentLoaded/Load 이벤트 확인
   ```

3. **이미지별 세부 분석**:
   ```
   Network 탭 → Img 필터 → Size/Time 컬럼 확인
   ```

---

## 📝 구현 로그

### 2024-12-19 - 1단계 구현 및 수정 ✅
- [x] Contentful 이미지 변환 함수 생성 (`getOptimizedImageUrl`)
- [x] 썸네일/라이트박스 크기 분리 (`getThumbnailUrl`, `getLightboxUrl`)
- [x] WebP 포맷 자동 적용
- [x] 반응형 크기 설정 (모바일: 400px, 데스크톱: 600px)
- [x] PortfolioItem 타입에 lightboxUrl, originalUrl 속성 추가
- [x] PortfolioSection에서 라이트박스 고해상도 이미지 적용
- [x] **API 파라미터 수정**: 400 에러 해결을 위한 파라미터 최적화
- [x] **Fallback 시스템**: 최적화 실패 시 원본 이미지 사용
- [x] **품질 최적화**: Squoosh 사전 압축으로 고품질 설정 (90%/95%)
- [x] **라이트박스 프리로딩**: 인접 이미지 미리 로드로 즉시 슬라이드
- [x] **코드 모듈화**: 이미지 최적화 함수를 PortfolioSection으로 이동
- [x] **로딩 UX 개선**: 공통 로딩 스피너 컴포넌트 (점들이 회전하는 디자인)

#### 구현된 최적화 옵션
- **썸네일**: 600px, WebP, **90% 품질** (Squoosh 사전 최적화로 고품질 가능)
- **라이트박스**: 1200px, WebP, **95% 품질** (최고 화질 유지)  
- **파라미터 최적화**: `fm=webp`, `w=크기`, `q=품질` (단순화)
- **에러 처리**: try-catch로 원본 이미지 fallback 제공
- **프리로딩**: 인접 이미지 자동 프리로드 (즉시 슬라이드)

#### 🔧 400 에러 해결을 위한 수정 사항
1. **파라미터 단순화**: `fit`, `height` 파라미터 제거
2. **포맷 파라미터**: `f` → `fm` 변경 ([Contentful 공식 문서](https://www.contentful.com/developers/docs/references/images-api) 준수)
3. **안전성 검증**: 크기 4000px 이하, 품질 1-100% 검증
4. **Fallback 시스템**: 최적화 실패 시 원본 이미지 자동 사용

#### 🚀 라이트박스 성능 최적화 (12-19 추가)
1. **품질 향상**: 썸네일 90%, 라이트박스 95% (Squoosh 사전 최적화로 가능)
2. **이미지 프리로딩**: 인접한 이미지들 미리 로드
3. **즉시 슬라이드**: 1-2초 → 즉시 전환 (체감 속도 향상)
4. **메모리 관리**: 중복 프리로드 방지, 에러 처리

### 다음 단계
- [ ] 2단계: Next.js Image 컴포넌트 적용
- [ ] 3단계: Progressive Loading 구현
- [ ] 4단계: 적응형 이미지 최종 적용

---

## 🚀 예상 최종 성능

| 지표 | 현재 | 목표 | 개선율 |
|------|------|------|---------|
| 초기 로딩 시간 | ~8초 | ~2-3초 | 60-70% ↓ |
| 이미지 파일 크기 | ~2-5MB | ~200-500KB | 80-90% ↓ |
| FCP | ~3초 | ~1초 | 70% ↓ |
| LCP | ~8초 | ~2-3초 | 65-75% ↓ |

---

*최종 업데이트: 2024-12-19* 