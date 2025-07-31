'use client';

import Link from "next/link";
import { useState } from "react";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";

export default function PortfolioPage() {
  const [activeCategory, setActiveCategory] = useState("전체");

  const categories = ["전체", "가족", "리마인드", "아기"];

  const portfolioItems = [
    { category: "가족", title: "따뜻한 가족의 시간", description: "3세대가 함께한 특별한 순간", tags: ["가족사진", "3세대", "실내촬영"] },
    { category: "리마인드", title: "영원한 사랑의 약속", description: "결혼 10주년 기념 촬영", tags: ["리마인드웨딩", "10주년", "웨딩드레스"] },
    { category: "아기", title: "소중한 첫 만남", description: "생후 100일 기념 촬영", tags: ["신생아", "100일", "성장앨범"] },
    { category: "가족", title: "행복한 순간들", description: "첫째 돌잔치와 함께한 가족 사진", tags: ["가족사진", "돌잔치", "한복"] },
    { category: "리마인드", title: "다시 찾은 설렘", description: "결혼 20주년 리마인드 웨딩", tags: ["리마인드웨딩", "20주년", "야외촬영"] },
    { category: "아기", title: "천사의 미소", description: "6개월 아기의 밝은 미소", tags: ["아기사진", "6개월", "미소"] },
    { category: "가족", title: "자연 속 가족", description: "공원에서의 자연스러운 가족 사진", tags: ["가족사진", "야외촬영", "자연배경"] },
    { category: "리마인드", title: "시간을 거슬러", description: "대학시절 만남의 장소에서", tags: ["리마인드웨딩", "추억의장소", "캐주얼"] },
    { category: "아기", title: "꿈나라 천사", description: "평화롭게 잠든 신생아", tags: ["신생아", "수면사진", "흑백"] },
  ];

  const filteredItems = activeCategory === "전체" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <PageHero 
        title="포트폴리오"
        description="소중한 순간들의 아름다운 기록을 확인해보세요"
      />

      {/* Category Filter */}
      <section className="py-8 bg-white border-b border-accent">
        <div className="container">
          <div className="flex justify-center gap-4" style={{flexWrap: 'wrap'}}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full font-medium transition-colors ${
                  activeCategory === category
                    ? 'bg-primary text-white'
                    : 'bg-accent text-foreground hover:bg-secondary'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
          <div className="text-center mt-4">
            <p className="text-sm text-foreground opacity-60">
              {filteredItems.length}개의 작품
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="py-20">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))'}}>
            {filteredItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-shadow" style={{overflow: 'hidden'}}>
                {/* Image Placeholder */}
                <div className="relative bg-gradient-to-br" style={{height: '16rem', background: 'linear-gradient(to bottom right, var(--accent), var(--secondary))'}}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-30">
                    <span style={{fontSize: '6rem'}}>
                      {item.category === "가족" && "👨‍👩‍👧‍👦"}
                      {item.category === "리마인드" && "💕"}
                      {item.category === "아기" && "👶"}
                    </span>
                  </div>
                  <div className="absolute inset-0 hover:bg-black/40 transition-colors" style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    {/* View Button - appears on hover */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                      <button className="bg-white text-foreground px-4 py-2 rounded-full font-medium" style={{backgroundColor: 'rgba(255, 255, 255, 0.9)'}}>
                        자세히 보기
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="px-6 py-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      {item.category}
                    </span>
                  </div>
                  <h3 className="font-serif text-lg font-medium mb-2">{item.title}</h3>
                  <p className="text-sm text-foreground/70 mb-4">{item.description}</p>
                  
                  {/* Tags */}
                  <div className="flex gap-1" style={{flexWrap: 'wrap'}}>
                    {item.tags.map((tag, tagIndex) => (
                      <span key={tagIndex} className="text-xs bg-accent text-foreground/70 px-2 py-1 rounded">
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 text-center" style={{gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))'}}>
            <div>
              <div className="font-serif text-3xl font-light text-primary mb-2">2000+</div>
              <p className="text-foreground/70">촬영한 가족</p>
            </div>
            <div>
              <div className="font-serif text-3xl font-light text-primary mb-2">20년</div>
              <p className="text-foreground/70">경력</p>
            </div>
            <div>
              <div className="font-serif text-3xl font-light text-primary mb-2">500+</div>
              <p className="text-foreground/70">리마인드 웨딩</p>
            </div>
            <div>
              <div className="font-serif text-3xl font-light text-primary mb-2">1000+</div>
              <p className="text-foreground/70">성장 앨범</p>
            </div>
          </div>
        </div>
      </section>

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