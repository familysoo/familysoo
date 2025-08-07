# **Family Soo Studio 디자인 가이드**

## **색상 팔레트**

### **주요 색상**

- **Primary Brown** - #8b7355 (브랜드 메인 색상, 버튼과 강조 요소에 사용)
- **Background White** - #fefefe (메인 배경색)
- **Foreground Dark** - #2d2d2d (주요 텍스트 색상)

### **보조 색상**

- **Secondary Beige** - #d4c4a8 (보조 브랜드 색상, 장식 요소에 사용)
- **Accent Light** - #f5f1eb (배경 강조 및 선택 상태에 사용)
- **Muted Cream** - #f8f6f1 (섹션 배경 및 카드 배경에 사용)

### **기능적 색상**

- **흰색** - #ffffff (카드 배경, 버튼 배경)
- **투명도 변형**
  - Primary/10: rgba(139, 115, 85, 0.1) - 호버 배경
  - Primary/20: rgba(139, 115, 85, 0.2) - 선택된 상태
  - Primary/90: rgba(139, 115, 85, 0.9) - 버튼 호버
  - Foreground/70: rgba(45, 45, 45, 0.7) - 보조 텍스트
  - Foreground/80: rgba(45, 45, 45, 0.8) - 설명 텍스트

### **그라데이션**

- **배경 그라데이션**: linear-gradient(135deg, #8b7355, #d4c4a8)
- **오버레이 그라데이션**: linear-gradient(to bottom, primary/40, primary/80)

## **타이포그래피**

### **폰트 패밀리**

- **주 폰트**: Noto Sans KR (한글 본문 및 UI 텍스트)
- **세리프 폰트**: Noto Serif KR (제목 및 브랜드 텍스트)
- **대체 폰트**: -apple-system, BlinkMacSystemFont, sans-serif

### **폰트 두께**

- **Light**: 300 (font-light)
- **Regular**: 400 (기본)
- **Medium**: 500 (font-medium)
- **Bold**: 700 (font-bold)

### **텍스트 스타일**

### **제목**

- **H1**: 80px/1.2, font-serif, font-light, Letter spacing -0.02em
  - 히어로 섹션 메인 제목에 사용
- **H2**: 36px/1.2, font-serif, font-light, Letter spacing -0.02em
  - 섹션 제목에 사용
- **H3**: 30px/1.2, font-serif, font-medium, Letter spacing -0.02em
  - 서브섹션 제목에 사용
- **H4**: 24px/1.2, font-serif, font-medium
  - 카드 제목 및 작은 제목에 사용

### **본문 텍스트**

- **Body Large**: 18px/1.6, Regular
  - 주요 설명 텍스트
- **Body**: 16px/1.6, Regular
  - 일반 본문 텍스트
- **Body Small**: 14px/1.6, Regular
  - 보조 정보 및 설명

### **특수 텍스트**

- **Caption**: 12px/1.4, Medium
  - 레이블 및 메타데이터
- **Button Text**: 16px/1.4, Medium
  - 버튼 텍스트
- **Link Text**: 16px/1.4, Medium, Primary color
  - 클릭 가능한 링크 텍스트

## **컴포넌트 스타일링**

### **버튼**

- **Primary Button**
  - 배경: Primary Brown (#8b7355)
  - 텍스트: White (#ffffff)
  - 높이: 48px
  - 모서리 반경: 9999px (rounded-full)
  - 패딩: 32px 가로
  - 호버: Primary/90 배경, scale(1.05), 그림자 효과
- **Secondary Button**
  - 테두리: 2px Primary Brown
  - 텍스트: Primary Brown
  - 배경: 투명
  - 높이: 48px
  - 모서리 반경: 9999px
- **Text Button**
  - 텍스트: Primary Brown
  - 배경 없음, 테두리 없음
  - 호버: 8px 오른쪽 이동

### **카드**

- 배경: White (#ffffff)
- 그림자: 0 1px 3px rgba(0, 0, 0, 0.1)
- 모서리 반경: 16px (rounded-2xl)
- 패딩: 32px
- 호버: scale(1.02), 그림자 증가

### **입력 필드**

- 높이: 56px
- 모서리 반경: 8px
- 테두리: 1px solid #e5e5e5
- 활성 테두리: 2px solid Primary Brown
- 배경: White
- 텍스트: Foreground Dark
- 플레이스홀더: Foreground/70

### **아이콘**

- **기본 아이콘**: 24px x 24px
- **작은 아이콘**: 20px x 20px
- **네비게이션 아이콘**: 28px x 28px
- **대형 아이콘**: 40px x 40px (화살표 등)
- 인터랙티브 아이콘: Primary Brown
- 장식용 아이콘: Foreground/70

## **레이아웃 시스템**

### **컨테이너**

- **최대 너비**: 1280px
- **중앙 정렬**: margin: 0 auto
- **기본 패딩**: 1rem (16px)
- **모바일 패딩**: 2rem (32px)

### **그리드 시스템**

- **2 컬럼**: grid-cols-2 (모바일)
- **3 컬럼**: md:grid-cols-3 (태블릿 이상)
- **4 컬럼**: md:grid-cols-4 (포트폴리오 masonry)
- **반반**: lg:grid-cols-2 (데스크톱 2컬럼)

### **간격 시스템**

- **4px**: 마이크로 간격 (관련 요소들 간)
- **8px**: 작은 간격 (내부 패딩)
- **16px**: 기본 간격 (표준 마진, gap-4)
- **24px**: 중간 간격 (섹션 내 요소들, gap-6)
- **32px**: 큰 간격 (섹션 간 구분, gap-8, py-8)
- **64px**: 매우 큰 간격 (주요 섹션 간, gap-16, py-16)
- **128px**: 특대 간격 (메인 섹션 패딩, py-32)

### **수직 간격**

- **섹션 패딩**: py-32 (128px 상하)
- **서브섹션**: py-16 (64px 상하)
- **컴포넌트**: py-6 (24px 상하)
- **텍스트 간격**: mb-6, mb-8

## **반응형 디자인**

### **브레이크포인트**

- **Mobile**: 기본 (0px~767px)
- **Tablet**: md: (768px~1023px)
- **Desktop**: lg: (1024px 이상)

### **모바일 최적화**

- **텍스트 크기**: 모바일에서 약간 작게 조정
- **패딩**: 컨테이너 패딩을 2rem으로 증가
- **그리드**: 1-2 컬럼으로 단순화
- **버튼**: 터치하기 쉬운 크기 유지 (최소 44px)
- **네비게이션**: 햄버거 메뉴로 전환

### **태블릿 최적화**

- **그리드**: 3-4 컬럼 활용
- **이미지**: 더 큰 크기로 표시
- **간격**: 데스크톱과 유사하게 조정

### **데스크톱 최적화**

- **최대 활용**: 1280px 컨테이너 최대 사용
- **복잡한 레이아웃**: 2컬럼, 복잡한 그리드 활용
- **호버 효과**: 마우스 인터랙션 최적화

## **모션 및 애니메이션**

### **기본 트랜지션**

- **빠른 전환**: 0.2s ease-out (호버, 클릭)
- **표준 전환**: 0.3s ease (일반적인 상태 변화)
- **부드러운 전환**: 0.6s ease-out (요소 등장)
- **느린 전환**: 0.8s ease-out (큰 요소 애니메이션)

### **이징 함수**

- **ease-out**: 대부분의 UI 애니메이션
- **ease-in-out**: 마이크로 인터랙션
- **ease**: 기본 상태 변화

### **인터랙션 애니메이션**

- **호버 스케일**: scale(1.02~1.05)
- **클릭 스케일**: scale(0.95~0.98)
- **호버 이동**: translateX(4px~8px)
- **회전**: rotate(10deg, 360deg)

### **페이지 진입 애니메이션**

- **페이드인**: opacity 0 → 1
- **슬라이드업**: translateY(30px) → 0
- **슬라이드 좌우**: translateX(±50px) → 0
- **스케일인**: scale(0.8) → 1
- **딜레이**: 0.2s~1.4s (순차적 등장)

### **스크롤 애니메이션**

- **Framer Motion**: useInView 훅 사용
- **뷰포트 마진**: -100px (조기 트리거)
- **한 번만 실행**: once: false (재실행 가능)

## **그림자 시스템**

- **기본 그림자**: 0 1px 3px rgba(0, 0, 0, 0.1)
- **호버 그림자**: 0 8px 30px rgba(139, 115, 85, 0.1)
- **강한 그림자**: 0 10px 40px rgba(139, 115, 85, 0.15)
- **버튼 그림자**: 0 8px 25px rgba(139, 115, 85, 0.3)

## **이미지 및 미디어**

### **이미지 스타일**

- **모서리 반경**: rounded-2xl (16px), rounded-xl (12px)
- **비율**: aspect-[4/3], aspect-square, aspect-[3/4] 등
- **오버레이**: bg-black/20~80 (가독성을 위한 어두운 오버레이)
- **호버 효과**: scale(1.1) 확대

### **배경 이미지**

- **커버**: background-size: cover
- **중앙**: background-position: center
- **반복 없음**: background-repeat: no-repeat
- **패럴랙스**: useTransform 활용

## **특수 컴포넌트**

### **네비게이션**

- **고정 헤더**: fixed top-0, z-50
- **스크롤 감지**: 투명 → 반투명 흰색 배경
- **백드롭 블러**: backdrop-blur-sm
- **모바일 메뉴**: 70vw 너비, 오른쪽 슬라이드

### **히어로 섹션**

- **전체 화면**: h-screen
- **캐러셀**: 5초 자동 전환
- **오버레이**: rgba(0, 0, 0, 0.6)
- **중앙 정렬**: flex items-center justify-center

### **포트폴리오 갤러리**

- **Masonry 레이아웃**: CSS columns 사용
- **라이트박스**: 전체 화면 모달
- **카테고리 필터**: 둥근 탭 버튼
- **무작위 회전**: Math.random() * 10 - 5

### **카드 컴포넌트**

- **호버 상승**: scale(1.02)
- **그림자 증가**: 호버 시 더 진한 그림자
- **내용 오버레이**: 호버 시 정보 표시

## **접근성 고려사항**

### **키보드 네비게이션**

- **ESC 키**: 모달 닫기
- **화살표 키**: 이미지 갤러리 네비게이션
- **Tab 키**: 포커스 이동

### **색상 대비**

- **주 텍스트**: #2d2d2d on #fefefe (높은 대비)
- **보조 텍스트**: rgba(45, 45, 45, 0.7) (적절한 대비)
- **브랜드 색상**: #8b7355 (충분한 대비 확보)

### **터치 인터랙션**

- **최소 터치 영역**: 44px x 44px
- **충분한 간격**: 터치 요소 간 적절한 거리
- **시각적 피드백**: 터치 시 스케일 변화

## **성능 최적화**

### **이미지 최적화**

- **WebP 형식**: 가능한 경우 사용
- **적절한 크기**: 실제 표시 크기에 맞춤
- **지연 로딩**: loading="lazy" 속성 사용

### **애니메이션 최적화**

- **GPU 가속**: transform과 opacity 우선 사용
- **적절한 duration**: 0.2s~0.8s 범위
- **성능 모드**: will-change 적절히 사용 