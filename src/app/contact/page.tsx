'use client';

import Link from "next/link";
import { useState } from "react";
import Header from "../../components/Header";

export default function ContactPage() {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  const faqItems = [
    {
      question: "촬영은 얼마나 걸리나요?",
      answer: "가족사진은 약 1-2시간, 리마인드웨딩은 2-3시간, 성장앨범은 30분-1시간 정도 소요됩니다. 자연스러운 분위기에서 충분한 시간을 갖고 촬영합니다."
    },
    {
      question: "사진은 언제 받을 수 있나요?",
      answer: "촬영 후 7-10일 정도 후에 보정이 완료된 고화질 사진을 온라인으로 전달드립니다. 급하신 경우 별도 상담 가능합니다."
    },
    {
      question: "몇 장의 사진을 받게 되나요?",
      answer: "기본적으로 보정된 사진 30-50장을 제공하며, 원본 사진도 함께 전달드립니다. 패키지에 따라 장수가 달라질 수 있습니다."
    },
    {
      question: "비용은 어떻게 되나요?",
      answer: "가족사진 15만원, 리마인드웨딩 25만원, 성장앨범 12만원부터 시작하며, 추가 옵션에 따라 달라질 수 있습니다. 정확한 견적은 상담을 통해 안내드립니다."
    },
    {
      question: "예약 취소나 변경이 가능한가요?",
      answer: "촬영 3일 전까지는 무료로 변경 및 취소가 가능합니다. 이후에는 부분적인 비용이 발생할 수 있으니 미리 연락 부탁드립니다."
    },
    {
      question: "주차는 가능한가요?",
      answer: "스튜디오 전용 주차장이 있으며, 촬영 고객에게는 2시간 무료 주차를 제공합니다. 추가 시간은 시간당 2,000원입니다."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container">
          <div className="text-center">
            <h1 className="font-serif text-4xl md:text-6xl font-light mb-6 text-foreground">
              예약 문의
            </h1>
            <p className="text-lg md:text-xl text-foreground/80">
              소중한 순간을 함께 만들어가요
            </p>
          </div>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-light mb-6">예약 방법</h2>
            <p className="text-lg text-foreground/70">편리한 방법으로 예약하세요</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <div className="bg-white px-8 py-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4" style={{width: '4rem', height: '4rem'}}>
                <span className="text-2xl">📞</span>
              </div>
              <h3 className="font-medium text-xl mb-3">전화 예약</h3>
              <p className="text-foreground/70 mb-4">직접 상담받고 예약하기</p>
              <a href="tel:02-1234-5678" className="text-primary font-medium text-lg">
                02-1234-5678
              </a>
              <p className="text-sm text-foreground opacity-60 mt-2">
                월-토 10:00-19:00
              </p>
            </div>

            <div className="bg-white px-8 py-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4" style={{width: '4rem', height: '4rem'}}>
                <span className="text-2xl">💬</span>
              </div>
              <h3 className="font-medium text-xl mb-3">카카오톡</h3>
              <p className="text-foreground/70 mb-4">간편하게 채팅으로 문의</p>
              <a href="#" className="text-primary font-medium text-lg">
                @familysoo
              </a>
              <p className="text-sm text-foreground opacity-60 mt-2">
                24시간 언제든지
              </p>
            </div>

            <div className="bg-white px-8 py-8 rounded-2xl shadow-sm text-center hover:shadow-lg transition-shadow">
              <div className="bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4" style={{width: '4rem', height: '4rem'}}>
                <span className="text-2xl">📧</span>
              </div>
              <h3 className="font-medium text-xl mb-3">이메일</h3>
              <p className="text-foreground/70 mb-4">자세한 문의사항 전달</p>
              <a href="mailto:familysoo@studio.com" className="text-primary font-medium text-lg">
                familysoo@studio.com
              </a>
              <p className="text-sm text-foreground opacity-60 mt-2">
                24시간 접수
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12">
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
                        <span className="font-medium">150,000원부터</span>
                      </div>
                      <div className="flex justify-between items-center py-2" style={{borderBottom: '1px solid rgba(245, 241, 235, 0.5)'}}>
                        <span>리마인드웨딩</span>
                        <span className="font-medium">250,000원부터</span>
                      </div>
                      <div className="flex justify-between items-center py-2" style={{borderBottom: '1px solid rgba(245, 241, 235, 0.5)'}}>
                        <span>성장앨범</span>
                        <span className="font-medium">120,000원부터</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-4">운영 시간</h4>
                    <div className="space-y-2 text-foreground/80">
                      <p>월요일 - 토요일: 10:00 - 19:00</p>
                      <p>일요일: 예약제 운영</p>
                      <p className="text-sm text-foreground opacity-60">※ 공휴일은 휴무입니다</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-lg mb-4">오시는 길</h4>
                    <div className="space-y-4">
                      <p className="text-foreground/80">
                        <strong>주소:</strong><br />
                        서울시 강남구 테헤란로 123<br />
                        ABC빌딩 3층 Family Soo Studio
                      </p>
                      <div className="bg-accent/50 px-4 py-4 rounded-lg">
                        <p className="text-sm text-foreground/70" style={{lineHeight: '1.6'}}>
                          <strong>대중교통:</strong><br />
                          지하철 2호선 강남역 3번출구 도보 5분<br />
                          버스 정류장 '강남역' 하차 후 도보 3분
                        </p>
                      </div>
                      <div className="bg-accent/50 px-4 py-4 rounded-lg">
                        <p className="text-sm text-foreground/70" style={{lineHeight: '1.6'}}>
                          <strong>주차 안내:</strong><br />
                          건물 지하 주차장 이용 가능<br />
                          촬영 고객 2시간 무료 (추가 시간당 2,000원)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white px-8 py-8 rounded-2xl shadow-sm">
              <h3 className="font-medium text-2xl mb-6">온라인 예약 문의</h3>
              <form className="space-y-8">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">이름 *</label>
                    <input
                      type="text"
                      required
                      className="w-full px-3 py-3 border border-accent rounded-lg transition-colors"
                      placeholder="홍길동"
                      style={{outline: 'none'}}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">연락처 *</label>
                    <input
                      type="tel"
                      required
                      className="w-full px-3 py-3 border border-accent rounded-lg transition-colors"
                      placeholder="010-1234-5678"
                      style={{outline: 'none'}}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">이메일</label>
                  <input
                    type="email"
                    className="w-full px-3 py-3 border border-accent rounded-lg transition-colors"
                    placeholder="example@email.com"
                    style={{outline: 'none'}}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">촬영 종류 *</label>
                  <select 
                    required
                    className="w-full px-3 py-3 border border-accent rounded-lg transition-colors"
                    style={{outline: 'none'}}
                  >
                    <option value="">촬영 종류를 선택해주세요</option>
                    <option value="family">가족사진</option>
                    <option value="remind">리마인드웨딩</option>
                    <option value="baby">성장앨범</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">희망 날짜</label>
                  <input
                    type="date"
                    className="w-full px-3 py-3 border border-accent rounded-lg transition-colors"
                    style={{outline: 'none'}}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">참여 인원</label>
                  <select className="w-full px-3 py-3 border border-accent rounded-lg transition-colors" style={{outline: 'none'}}>
                    <option value="">인원수를 선택해주세요</option>
                    <option value="1">1명</option>
                    <option value="2">2명</option>
                    <option value="3">3명</option>
                    <option value="4">4명</option>
                    <option value="5+">5명 이상</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">문의사항</label>
                  <textarea
                    rows={4}
                    className="w-full px-3 py-3 border border-accent rounded-lg transition-colors"
                    placeholder="촬영에 대한 궁금한 점이나 특별한 요청사항을 자유롭게 작성해주세요."
                    style={{outline: 'none', resize: 'none'}}
                  ></textarea>
                </div>

                <div className="flex items-start gap-3">
                  <input 
                    type="checkbox" 
                    id="privacy" 
                    required
                    className="mt-1"
                  />
                  <label htmlFor="privacy" className="text-sm text-foreground/70" style={{lineHeight: '1.6'}}>
                    개인정보 수집 및 이용에 동의합니다. 
                    <span className="text-primary" style={{textDecoration: 'underline', cursor: 'pointer'}}>약관보기</span>
                  </label>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 rounded-lg font-medium transition-colors"
                >
                  예약 문의 보내기
                </button>
              </form>
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

      {/* Map Section Placeholder */}
      <section className="py-16 bg-muted">
        <div className="container">
          <div className="text-center mb-8">
            <h2 className="font-serif text-3xl font-light mb-4">찾아오시는 길</h2>
          </div>
          <div className="bg-accent/50 rounded-2xl flex items-center justify-center" style={{height: '24rem'}}>
            <div className="text-center">
              <span className="text-6xl mb-4 block">🗺️</span>
              <p className="text-foreground/70">지도가 여기에 표시됩니다</p>
              <p className="text-sm text-foreground opacity-60 mt-2">
                서울시 강남구 테헤란로 123, ABC빌딩 3층
              </p>
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