'use client';

import Link from "next/link";
import { useState } from "react";

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "가족사진",
      description: "소중한 가족과의 시간을 아름다운 사진으로 남겨보세요",
      features: ["자연스러운 포즈 연출", "다양한 배경 선택", "고품질 보정", "가족 구성원별 개별 촬영", "단체 사진 포함"],
      price: "150,000원부터",
      duration: "1-2시간",
      included: ["보정된 사진 30-50장", "원본 파일 제공", "온라인 갤러리", "USB 제공"],
      process: [
        "사전 상담 및 컨셉 논의",
        "촬영 일정 및 장소 결정",
        "당일 촬영 진행",
        "사진 보정 작업",
        "완성된 사진 전달"
      ]
    },
    {
      title: "리마인드 웨딩",
      description: "결혼의 감동을 다시 한번 느낄 수 있는 특별한 촬영",
      features: ["웨딩드레스 협찬", "로맨틱한 컨셉", "추억의 재현", "메이크업 서비스", "소품 제공"],
      price: "250,000원부터",
      duration: "2-3시간",
      included: ["보정된 사진 50-80장", "원본 파일 제공", "웨딩 앨범 제작", "액자 제공"],
      process: [
        "컨셉 및 스타일 상담",
        "드레스 및 메이크업 예약",
        "촬영 장소 섭외",
        "당일 촬영 진행",
        "앨범 제작 및 전달"
      ]
    },
    {
      title: "성장앨범",
      description: "아이의 소중한 성장 과정을 단계별로 기록합니다",
      features: ["월령별 촬영", "성장 기록", "부모와 함께", "안전한 촬영 환경", "아기 전용 소품"],
      price: "120,000원부터",
      duration: "30분-1시간",
      included: ["보정된 사진 20-30장", "성장 차트", "미니 앨범", "디지털 파일"],
      process: [
        "아기 월령에 맞는 컨셉 선택",
        "안전한 촬영 환경 준비",
        "짧은 시간 집중 촬영",
        "성장 기록 차트 작성",
        "앨범 및 파일 전달"
      ]
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
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              <Link href="/" className="text-foreground hover:text-primary transition-colors">홈</Link>
              <Link href="/services" className="text-primary font-medium">서비스</Link>
              <Link href="/about" className="text-foreground hover:text-primary transition-colors">소개</Link>
              <Link href="/portfolio" className="text-foreground hover:text-primary transition-colors">포트폴리오</Link>
              <Link href="/contact" className="text-foreground hover:text-primary transition-colors">예약문의</Link>
            </nav>

            {/* Mobile menu */}
            <div className="md:hidden">
              <select 
                className="mobile-select"
                value="/services"
                onChange={(e) => {
                  if (e.target.value !== "/services") {
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
              촬영 서비스
            </h1>
            <p className="text-lg md:text-xl text-foreground/80">
              각각의 특별한 순간을 위한 맞춤 촬영 서비스
            </p>
          </div>
        </div>
      </section>

      {/* Services Navigation */}
      <section className="py-8 bg-white border-b border-accent">
        <div className="container">
          <div className="flex justify-center space-x-8">
            {services.map((service, index) => (
              <button
                key={index}
                onClick={() => setActiveService(index)}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  activeService === index
                    ? 'bg-primary text-white'
                    : 'text-foreground hover:text-primary'
                }`}
              >
                {service.title}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Service Detail */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Service Info */}
            <div>
              <h2 className="font-serif text-3xl font-light mb-4">
                {services[activeService].title}
              </h2>
              <p className="text-lg text-foreground/80 mb-8" style={{lineHeight: '1.6'}}>
                {services[activeService].description}
              </p>

              {/* Features */}
              <div className="mb-8">
                <h3 className="font-medium text-xl mb-4">서비스 특징</h3>
                <ul className="space-y-2">
                  {services[activeService].features.map((feature, idx) => (
                    <li key={idx} className="flex items-center">
                      <span className="bg-primary rounded-full mr-3" style={{width: '0.5rem', height: '0.5rem'}}></span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Pricing */}
              <div className="mb-8">
                <h3 className="font-medium text-xl mb-4">가격 및 소요시간</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-accent/50 px-4 py-4 rounded-lg">
                    <span className="text-sm text-foreground/70">가격</span>
                    <p className="font-medium text-lg">{services[activeService].price}</p>
                  </div>
                  <div className="bg-accent/50 px-4 py-4 rounded-lg">
                    <span className="text-sm text-foreground/70">소요시간</span>
                    <p className="font-medium text-lg">{services[activeService].duration}</p>
                  </div>
                </div>
              </div>

              {/* Included */}
              <div className="mb-8">
                <h3 className="font-medium text-xl mb-4">포함 사항</h3>
                <ul className="space-y-2">
                  {services[activeService].included.map((item, idx) => (
                    <li key={idx} className="flex items-center text-sm">
                      <span className="bg-secondary rounded-full mr-3" style={{width: '0.375rem', height: '0.375rem'}}></span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Process */}
            <div className="bg-white px-8 py-8 rounded-2xl shadow-sm">
              <h3 className="font-medium text-xl mb-6">촬영 진행 과정</h3>
              <div className="space-y-4">
                {services[activeService].process.map((step, idx) => (
                  <div key={idx} className="flex items-start">
                    <div className="bg-primary/10 rounded-full flex items-center justify-center mr-4 mt-1" style={{width: '2rem', height: '2rem'}}>
                      <span className="text-sm font-medium text-primary">{idx + 1}</span>
                    </div>
                    <p className="text-foreground/80">{step}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-accent" style={{borderTop: '1px solid'}}>
                <Link
                  href="/contact"
                  className="w-full block text-center bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  예약 문의하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-16 bg-muted">
        <div className="container">
          <h2 className="font-serif text-3xl font-light text-center mb-12">추가 서비스</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white px-6 py-6 rounded-2xl shadow-sm text-center">
              <span className="text-3xl mb-4 block">📸</span>
              <h3 className="font-medium text-lg mb-2">추가 보정</h3>
              <p className="text-sm text-foreground/70">특별한 요청사항에 따른 개별 보정</p>
            </div>
            <div className="bg-white px-6 py-6 rounded-2xl shadow-sm text-center">
              <span className="text-3xl mb-4 block">🎁</span>
              <h3 className="font-medium text-lg mb-2">앨범 제작</h3>
              <p className="text-sm text-foreground/70">고급 재질의 포토북 및 액자 제작</p>
            </div>
            <div className="bg-white px-6 py-6 rounded-2xl shadow-sm text-center">
              <span className="text-3xl mb-4 block">🚗</span>
              <h3 className="font-medium text-lg mb-2">출장 촬영</h3>
              <p className="text-sm text-foreground/70">원하시는 장소에서의 야외 촬영</p>
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