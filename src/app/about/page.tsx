'use client';

import Link from "next/link";

export default function AboutPage() {
  const studioFeatures = [
    {
      icon: "🏠",
      title: "편안한 공간",
      description: "아늑하고 자연스러운 분위기의 촬영 공간"
    },
    {
      icon: "📷",
      title: "전문 장비",
      description: "최신 카메라와 조명 장비로 완벽한 화질"
    },
    {
      icon: "👨‍🎨",
      title: "경험 많은 작가",
      description: "20년 경력의 전문 사진작가"
    },
    {
      icon: "🎨",
      title: "맞춤 컨셉",
      description: "고객 취향에 맞는 개인별 맞춤 촬영"
    }
  ];

  const timeline = [
    {
      year: "2004",
      title: "스튜디오 설립",
      description: "가족사진 전문 스튜디오로 시작"
    },
    {
      year: "2010",
      title: "리마인드웨딩 서비스 시작",
      description: "부부들의 특별한 추억 만들기 서비스"
    },
    {
      year: "2015",
      title: "성장앨범 전문화",
      description: "아기 전문 촬영 시스템 구축"
    },
    {
      year: "2020",
      title: "디지털 서비스 확대",
      description: "온라인 갤러리 및 디지털 앨범 서비스"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 w-full bg-white/90 backdrop-blur-sm z-50 border-b border-accent">
        <div className="container">
          <div className="flex justify-between items-center h-16">
            <Link href="/" className="font-serif text-2xl font-bold text-primary">
              Family Soo
            </Link>
            
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">홈</Link>
              <Link href="/services" className="text-foreground hover:text-primary transition-colors">서비스</Link>
              <Link href="/about" className="text-primary font-medium">소개</Link>
              <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors">포트폴리오</Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">예약문의</Link>
            </nav>

            <div className="md:hidden">
              <select 
                className="mobile-select"
                value="/about"
                onChange={(e) => {
                  if (e.target.value !== "/about") {
                    window.location.href = e.target.value;
                  }
                }}
              >
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

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br">
        <div className="container">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-light mb-6 text-foreground">
              스튜디오 소개
            </h1>
            <p className="text-lg md:text-xl text-foreground/80">
              20년간 쌓아온 경험과 따뜻한 감성으로 여러분의 소중한 순간을 기록합니다
            </p>
          </div>
        </div>
      </section>

      {/* CEO Message */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-serif text-3xl font-light mb-6">대표 인사말</h2>
              <div className="space-y-6">
                <p className="text-foreground/80" style={{lineHeight: '1.6'}}>
                  안녕하세요, Family Soo Studio 대표 <strong>이수진</strong>입니다.
                </p>
                <p className="text-foreground/80" style={{lineHeight: '1.6'}}>
                  2004년 작은 스튜디오로 시작해 지금까지 20년간 수천 가족의 소중한 순간들을 
                  사진으로 담아왔습니다. 매 순간 고객의 진솔한 모습과 자연스러운 감정을 
                  포착하기 위해 노력해왔습니다.
                </p>
                <p className="text-foreground/80" style={{lineHeight: '1.6'}}>
                  저희 스튜디오의 가장 큰 자부심은 단순히 아름다운 사진을 찍는 것이 아니라, 
                  그 순간의 감정과 이야기를 담아내는 것입니다. 앞으로도 변함없는 열정으로 
                  여러분의 특별한 이야기를 아름답게 기록해드리겠습니다.
                </p>
                <div className="pt-4">
                  <p className="text-primary font-medium">Family Soo Studio 대표</p>
                  <p className="font-serif text-xl text-primary">이수진</p>
                </div>
              </div>
            </div>
            <div className="relative bg-gradient-to-br rounded-2xl" style={{height: '24rem', background: 'linear-gradient(to bottom right, var(--secondary), var(--accent))'}}>
              <div className="absolute inset-0 flex items-center justify-center">
                <span style={{fontSize: '6rem', opacity: '0.3'}}>📷</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Philosophy */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-light mb-6">스튜디오 철학</h2>
            <p className="text-lg text-foreground/70 mx-auto" style={{maxWidth: '48rem', lineHeight: '1.6'}}>
              자연스럽고 따뜻한 감성을 담아내는 것이 저희의 철학입니다. 
              억지스러운 포즈보다는 진솔한 모습, 완벽한 기술보다는 진심을 담은 사진을 추구합니다.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))'}}>
            {studioFeatures.map((feature, index) => (
              <div key={index} className="bg-white px-6 py-6 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="font-medium text-lg mb-3">{feature.title}</h3>
                <p className="text-sm text-foreground/70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio History */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-light mb-6">스튜디오 연혁</h2>
            <p className="text-lg text-foreground/70">20년간의 발자취</p>
          </div>

          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex items-start">
                <div className="text-center" style={{flexShrink: 0, width: '6rem'}}>
                  <div className="bg-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                    {item.year}
                  </div>
                </div>
                <div style={{flexGrow: 1, paddingLeft: '2rem'}}>
                  <h3 className="font-medium text-lg mb-2">{item.title}</h3>
                  <p className="text-foreground/70">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Studio Space */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-light mb-6">촬영 공간</h2>
            <p className="text-lg text-foreground/70">편안하고 아늑한 분위기의 촬영 공간</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white px-8 py-8 rounded-2xl shadow-sm">
              <h3 className="font-medium text-xl mb-4">메인 스튜디오</h3>
              <ul className="space-y-4 text-foreground/80">
                <li className="flex items-center">
                  <span className="bg-primary rounded-full mr-3" style={{width: '0.5rem', height: '0.5rem'}}></span>
                  넓은 촬영 공간 (50평)
                </li>
                <li className="flex items-center">
                  <span className="bg-primary rounded-full mr-3" style={{width: '0.5rem', height: '0.5rem'}}></span>
                  자연광 활용 가능한 대형 창
                </li>
                <li className="flex items-center">
                  <span className="bg-primary rounded-full mr-3" style={{width: '0.5rem', height: '0.5rem'}}></span>
                  다양한 배경 및 소품 구비
                </li>
                <li className="flex items-center">
                  <span className="bg-primary rounded-full mr-3" style={{width: '0.5rem', height: '0.5rem'}}></span>
                  개별 대기실 및 메이크업룸
                </li>
              </ul>
            </div>

            <div className="bg-white px-8 py-8 rounded-2xl shadow-sm">
              <h3 className="font-medium text-xl mb-4">특화 공간</h3>
              <ul className="space-y-4 text-foreground/80">
                <li className="flex items-center">
                  <span className="bg-secondary rounded-full mr-3" style={{width: '0.5rem', height: '0.5rem'}}></span>
                  신생아 전용 촬영실
                </li>
                <li className="flex items-center">
                  <span className="bg-secondary rounded-full mr-3" style={{width: '0.5rem', height: '0.5rem'}}></span>
                  야외 테라스 공간
                </li>
                <li className="flex items-center">
                  <span className="bg-secondary rounded-full mr-3" style={{width: '0.5rem', height: '0.5rem'}}></span>
                  빈티지 컨셉 코너
                </li>
                <li className="flex items-center">
                  <span className="bg-secondary rounded-full mr-3" style={{width: '0.5rem', height: '0.5rem'}}></span>
                  프라이빗 상담실
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="container text-center" style={{maxWidth: '64rem'}}>
          <h2 className="font-serif text-3xl font-light mb-6">
            여러분의 소중한 순간을 기다리고 있습니다
          </h2>
          <p className="text-lg text-foreground/70 mb-8">
            20년 경험의 전문가와 함께 특별한 추억을 만들어보세요
          </p>
          <div className="flex justify-center gap-4" style={{flexDirection: 'column'}}>
            <div className="flex justify-center gap-4" style={{flexDirection: 'row'}}>
              <Link
                href="/portfolio"
                className="bg-white text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-medium transition-colors"
                style={{border: '1px solid var(--primary)'}}
              >
                포트폴리오 보기
              </Link>
              <Link
                href="/contact"
                className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors"
              >
                예약 문의하기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-12">
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
                <li>02-1234-5678</li>
                <li>familysoo@studio.com</li>
                <li>서울시 강남구 테헤란로 123</li>
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