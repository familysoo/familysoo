'use client';

import Link from "next/link";
import { useState } from "react";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";
import Footer from "../../components/Footer";

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "촬영은 얼마나 걸리나요?",
      answer: "가족사진은 약 1-2시간, 리마인드웨딩은 2-3시간, 베이비 촬영은 30분-1시간 정도 소요됩니다. 자연스러운 분위기에서 충분한 시간을 갖고 촬영합니다."
    },
    {
      question: "사진은 언제 받을 수 있나요?",
      answer: "촬영 후 7-10일 정도 후에 보정이 완료된 고화질 사진을 온라인으로 전달드립니다. 급하신 경우 별도 상담 가능합니다."
    },
    {
      question: "몇 장의 사진을 받게 되나요?",
      answer: "액자로 선택한 사진을 보정해서 드립니다. 선택한 구성에 따라 장수가 달라질 수 있습니다."
    },
    {
      question: "비용은 어떻게 되나요?",
      answer: "가족사진 10만원, 리마인드웨딩 10만원, 베이비 촬영 15만원부터 시작하며, 추가 옵션에 따라 달라질 수 있습니다. 정확한 견적은 상담을 통해 안내드립니다."
    },
    {
      question: "예약 취소나 변경이 가능한가요?",
      answer: "촬영 3일 전까지는 무료로 변경 및 취소가 가능합니다. 이후에는 부분적인 비용이 발생할 수 있으니 미리 연락 부탁드립니다."
    },
    {
      question: "주차는 가능한가요?",
      answer: "스튜디오 전용 주차장이 준비되어 있습니다."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <PageHero 
        title="예약 문의"
        description="소중한 순간을 함께 만들어가요"
      />

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-light mb-6">예약 방법</h2>
            <p className="text-lg text-foreground/70">편리한 방법으로 예약하세요</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-16 justify-center max-w-4xl mx-auto">
            <div className="px-8 py-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4" style={{width: '4rem', height: '4rem'}}>
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-medium text-xl mb-3">전화 예약</h3>
              <p className="text-foreground/70 mb-4">직접 상담받고 예약하기</p>
              <a href="tel:041-356-1592" className="text-primary font-medium text-lg">
                041-356-1592
              </a>
              <p className="text-sm text-foreground opacity-60 mt-2">
                수-일 10:00-19:00
              </p>
            </div>

            <div className="px-8 py-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4" style={{width: '4rem', height: '4rem'}}>
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-medium text-xl mb-3">카카오톡</h3>
              <p className="text-foreground/70 mb-4">간편하게 채팅으로 문의</p>
              <a href="#" className="text-primary font-medium text-lg">
                @soo_1592
              </a>
              <p className="text-sm text-foreground opacity-60 mt-2">
                24시간 언제든지
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-24">
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-2xl mb-6">이용 안내</h3>
                
                <div className="space-y-8">
                  <div>
                    <h4 className="font-medium text-lg mb-4">촬영 정보</h4>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center py-2" style={{borderBottom: '1px solid rgba(245, 241, 235, 0.5)'}}>
                        <span>가족사진</span>
                        <span className="font-medium">100,000원부터</span>
                      </div>
                      <div className="flex justify-between items-center py-2" style={{borderBottom: '1px solid rgba(245, 241, 235, 0.5)'}}>
                        <span>리마인드웨딩</span>
                        <span className="font-medium">100,000원부터</span>
                      </div>
                      <div className="flex justify-between items-center py-2" style={{borderBottom: '1px solid rgba(245, 241, 235, 0.5)'}}>
                        <span>베이비 촬영</span>
                        <span className="font-medium">150,000원부터</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-4">운영 시간</h4>
                    <div className="space-y-2 text-foreground/80">
                      <p>수요일 - 일요일: 10:00 - 19:00</p>
                      <p>주말: 예약제 운영</p>
                      {/* <p className="text-sm text-foreground opacity-60">※ 공휴일은 휴무입니다</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Location & Map */}
            <div className="space-y-8">
              <div>
                <h3 className="font-medium text-2xl mb-6">오시는 길</h3>
                <div className="space-y-4">
                  <p className="text-foreground/80">
                    <strong>주소: </strong>
                    충청남도 당진시 북문로 2길 10 패밀리수 스튜디오
                  </p>
                </div>
              </div>
              
              {/* Map */}
              <div>
                <div className="rounded-2xl overflow-hidden" style={{height: '20rem'}}>
                  <iframe
                    src="https://map.naver.com/v5/search/충청남도%20당진시%20북문로%202길%2010%20패밀리수스튜디오"
                    width="100%"
                    height="100%"
                    style={{border: 'none'}}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Family Soo Studio 위치"
                  ></iframe>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20">
        <div className="container" style={{maxWidth: '64rem'}}>
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-light mb-6">자주 묻는 질문</h2>
            <p className="text-lg text-foreground/70">궁금한 점들을 미리 확인해보세요</p>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-sm">
                <button
                  className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-accent/50 rounded-2xl transition-colors"
                  onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                >
                  <h3 className="font-medium text-lg">{item.question}</h3>
                  <span className={`text-2xl text-primary transition-all ${expandedFaq === index ? 'transform rotate-45' : ''}`}>
                    +
                  </span>
                </button>
                {expandedFaq === index && (
                  <div className="px-6 pb-6">
                    <p className="text-foreground/80" style={{lineHeight: '1.6'}}>{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
} 