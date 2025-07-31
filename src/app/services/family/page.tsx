'use client';

import Header from "@/components/Header";
import PageHero from "@/components/PageHero";
import Breadcrumb from "@/components/Breadcrumb";
import Link from "next/link";
import { motion } from "framer-motion";
import { Users, Heart, Camera, Clock, Phone, Star, Gift, Image, Shield } from "lucide-react";

export default function FamilyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <PageHero 
        title="가족 촬영 서비스"
        description="온 가족이 함께하는 따뜻한 순간을 자연스럽게 담아냅니다.<br />각 가족만의 개성과 사랑이 느껴지는 특별한 작품을 만들어드립니다."
      />

      {/* Breadcrumb */}
      <Breadcrumb 
        items={[
          { label: "촬영 서비스", href: "/services" },
          { label: "가족사진" }
        ]}
      />

      {/* Service Details */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-serif text-3xl font-light mb-8 text-foreground">
                가족의 소중한 순간들
              </h2>
              
              <div className="space-y-6">
                <p className="text-foreground/80 leading-relaxed">
                  온 가족이 함께하는 특별한 시간을 아름다운 사진으로 기록합니다. 
                  자연스러운 표정과 따뜻한 분위기 속에서 가족만의 스토리를 담아내어 
                  평생 간직할 소중한 추억을 만들어드립니다.
                </p>
                
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">세미 정장</h4>
                    <p className="text-sm text-foreground/70">우아하고 품격 있는 가족 초상</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">캐주얼</h4>
                    <p className="text-sm text-foreground/70">편안하고 자연스러운 일상의 모습</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">드레스 (웨딩)</h4>
                    <p className="text-sm text-foreground/70">특별한 날의 화려하고 로맨틱한 순간</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">흑백</h4>
                    <p className="text-sm text-foreground/70">클래식하고 감성적인 흑백 예술</p>
                  </div>
                  <div className="bg-white p-4 rounded-lg shadow-sm">
                    <h4 className="font-medium mb-2 text-primary">한복</h4>
                    <p className="text-sm text-foreground/70">전통의 아름다움이 담긴 우리 문화</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <div className="bg-gradient-to-br from-primary/10 to-accent/20 rounded-2xl p-16 text-center">
                <div className="text-8xl mb-6 opacity-60">👨‍👩‍👧‍👦</div>
                <p className="text-foreground/60 italic">
                  "가족의 사랑이 담긴 특별한 순간"
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl font-light mb-6 text-foreground">서비스 특징</h2>
            <p className="text-lg text-foreground/70">가족만의 특별함을 담는 전문 촬영 서비스</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                icon: <Gift size={32} className="text-primary" />,
                title: "의상 무료 대여",
                description: "전 컨셉 의상을 무료로 대여해드려 부담 없이 촬영하세요"
              },
              {
                icon: <Image size={32} className="text-primary" />,
                title: "고급 아크릴 액자",
                description: "27x20cm 크기의 고급 아크릴 액자로 작품을 완성합니다"
              },
              {
                icon: <Heart size={32} className="text-primary" />,
                title: "예쁜 수정본",
                description: "전문 보정으로 더욱 아름다운 사진을 제공합니다"
              },
              {
                icon: <Users size={32} className="text-primary" />,
                title: "인원 수 제한 없음",
                description: "대가족도 환영! 모든 가족 구성원이 함께 촬영 가능합니다"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white p-6 rounded-2xl shadow-sm text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 30px rgba(139, 115, 85, 0.15)"
                }}
              >
                <div className="bg-primary/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-serif text-lg font-medium mb-3 text-foreground">{feature.title}</h3>
                <p className="text-foreground/70 leading-relaxed text-sm">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Concept Introduction */}
      <section className="py-20">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-light mb-6 text-foreground">촬영 컨셉 소개</h2>
              <p className="text-lg text-foreground/70">가족의 개성에 맞는 다양한 컨셉을 선택하세요</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-sm border-2 border-primary/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-6xl">👔</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-primary mb-3">세미 정장 가족사진 컨셉</h3>
                <p className="text-foreground/70 leading-relaxed">
                  우아하고 품격 있는 가족의 모습을 담습니다. 공식적인 행사나 특별한 기념일에 
                  어울리는 클래식하고 세련된 스타일의 가족 초상사진을 제공합니다.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-6xl">👕</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-primary mb-3">캐주얼 컨셉</h3>
                <p className="text-foreground/70 leading-relaxed">
                  편안하고 자연스러운 일상의 모습을 기록합니다. 가족의 진솔한 표정과 
                  자연스러운 상호작용을 통해 따뜻하고 친근한 분위기의 사진을 완성합니다.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/30 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-6xl">👗</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-primary mb-3">드레스 (웨딩) 컨셉</h3>
                <p className="text-foreground/70 leading-relaxed">
                  결혼기념일이나 특별한 날을 기념하는 화려하고 로맨틱한 촬영입니다. 
                  드레스와 정장으로 멋을 낸 가족의 모습을 우아하게 담아냅니다.
                </p>
              </motion.div>
              
              <motion.div 
                className="bg-white p-8 rounded-xl shadow-sm border-2 border-accent/20"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="aspect-video bg-gradient-to-br from-gray-300 to-gray-500 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-6xl text-white">⚫</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-primary mb-3">흑백 컨셉 <span className="text-xs bg-accent text-white px-2 py-1 rounded">특별</span></h3>
                <p className="text-foreground/70 leading-relaxed">
                  클래식하고 감성적인 흑백 사진으로 시간을 초월한 예술 작품을 만듭니다. 
                  빛과 그림자의 조화로 가족의 깊은 유대감을 표현합니다.
                </p>
              </motion.div>

              <motion.div 
                className="bg-white p-8 rounded-xl shadow-sm border-2 border-primary/20 lg:col-span-1 md:col-span-2 lg:mx-auto lg:max-w-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="aspect-video bg-gradient-to-br from-red-200 to-red-400 rounded-lg mb-6 flex items-center justify-center">
                  <span className="text-6xl">👘</span>
                </div>
                <h3 className="font-serif text-xl font-medium text-primary mb-3">한복 컨셉 <span className="text-xs bg-primary text-white px-2 py-1 rounded">전통</span></h3>
                <p className="text-foreground/70 leading-relaxed">
                  우리 전통 의상인 한복을 입고 촬영하는 특별한 컨셉입니다. 
                  전통의 아름다움과 가족의 화목함이 어우러진 품격 있는 사진을 완성합니다.
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-20 bg-muted">
        <div className="container">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="font-serif text-3xl font-light mb-6 text-foreground">가격 안내</h2>
              <p className="text-lg text-foreground/70">투명하고 합리적인 가격으로 제공합니다</p>
            </div>

            {/* 패키지 구성 설명 */}
            <div className="mb-16">
              <div className="bg-gradient-to-br from-primary/5 to-accent/10 p-8 rounded-2xl">
                <h3 className="font-serif text-2xl font-medium mb-6 text-center text-primary">💝 포함 혜택</h3>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="bg-white p-6 rounded-xl">
                    <h4 className="font-medium text-primary mb-4 flex items-center">
                      <Gift className="mr-2" size={20} />
                      전 컨셉 의상 무료 대여
                    </h4>
                    <p className="text-sm text-foreground/80">
                      모든 촬영 컨셉에 맞는 의상을 무료로 대여해드립니다. 
                      세미정장부터 드레스까지 다양한 스타일의 옷을 준비해두었어요.
                    </p>
                  </div>
                  
                  <div className="bg-white p-6 rounded-xl">
                    <h4 className="font-medium text-primary mb-4 flex items-center">
                      <Users className="mr-2" size={20} />
                      촬영 인원 수 제한 없음
                    </h4>
                    <p className="text-sm text-foreground/80">
                      2명부터 10명 이상의 대가족까지! 인원 수에 관계없이 
                      모든 가족 구성원이 함께 촬영할 수 있습니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* 가족 촬영 패키지 */}
            <div className="grid md:grid-cols-3 gap-8">
              <motion.div
                className="bg-white p-8 rounded-2xl shadow-sm border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <h4 className="font-serif text-xl font-medium mb-4 text-primary">베이직</h4>
                <div className="text-3xl font-light mb-4 text-foreground">350,000원</div>
                <div className="bg-primary/5 p-3 rounded-lg mb-6">
                  <p className="text-sm font-medium text-primary">🎨 선택한 2개 컨셉 촬영</p>
                </div>
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center text-foreground/80">
                    <Star size={14} className="text-primary mr-2" />
                    촬영한 모든 원본 JPG파일 제공
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={14} className="text-primary mr-2" />
                    선택한 2장 전문 보정
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={14} className="text-primary mr-2" />
                    27x20cm 고급 아크릴 액자 1개
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={14} className="text-primary mr-2" />
                    전 컨셉 의상 무료 대여
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-primary p-8 rounded-2xl text-white"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4 className="font-serif text-xl font-medium mb-4">프리미엄 <span className="text-xs bg-white/20 px-2 py-1 rounded">인기</span></h4>
                <div className="text-3xl font-light mb-4">490,000원</div>
                <div className="bg-white/10 p-3 rounded-lg mb-6">
                  <p className="text-sm font-medium">🎨 전체 5개 컨셉 촬영</p>
                </div>
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center">
                    <Star size={14} className="text-white mr-2" />
                    촬영한 모든 원본 JPG파일 제공
                  </li>
                  <li className="flex items-center">
                    <Star size={14} className="text-white mr-2" />
                    선택한 4장 전문 보정
                  </li>
                  <li className="flex items-center">
                    <Star size={14} className="text-white mr-2" />
                    27x20cm 고급 아크릴 액자 2개
                  </li>
                  <li className="flex items-center">
                    <Star size={14} className="text-white mr-2" />
                    전 컨셉 의상 무료 대여
                  </li>
                </ul>
              </motion.div>

              <motion.div
                className="bg-white p-8 rounded-2xl shadow-sm border"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4 className="font-serif text-xl font-medium mb-4 text-primary">럭셔리</h4>
                <div className="text-3xl font-light mb-4 text-foreground">690,000원</div>
                <div className="bg-accent/5 p-3 rounded-lg mb-6">
                  <p className="text-sm font-medium text-accent">🎨 전체 5개 컨셉 + 앨범</p>
                </div>
                <ul className="space-y-3 mb-8 text-sm">
                  <li className="flex items-center text-foreground/80">
                    <Star size={14} className="text-primary mr-2" />
                    촬영한 모든 원본 JPG파일 제공
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={14} className="text-primary mr-2" />
                    선택한 6장 전문 보정
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={14} className="text-primary mr-2" />
                    12x12 20페이지 프리미엄 앨범
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={14} className="text-primary mr-2" />
                    27x20cm 고급 아크릴 액자 2개
                  </li>
                  <li className="flex items-center text-foreground/80">
                    <Star size={14} className="text-primary mr-2" />
                    전 컨셉 의상 무료 대여
                  </li>
                </ul>
              </motion.div>
            </div>

            {/* 추가 옵션 */}
            <div className="mt-16">
              <h3 className="font-serif text-2xl font-medium mb-8 text-center text-primary">✨ 추가 옵션</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                >
                  <h4 className="font-serif text-lg font-medium mb-3 text-primary">추가 보정</h4>
                  <div className="text-2xl font-light mb-3 text-foreground">30,000원 / 장</div>
                  <p className="text-sm text-foreground/70">
                    선택하신 기본 보정본 외에 추가로 원하시는 사진을 전문 보정해드립니다.
                  </p>
                </motion.div>

                <motion.div
                  className="bg-white p-6 rounded-2xl shadow-sm border"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                >
                  <h4 className="font-serif text-lg font-medium mb-3 text-primary">추가 액자</h4>
                  <div className="text-2xl font-light mb-3 text-foreground">80,000원 / 개</div>
                  <p className="text-sm text-foreground/70">
                    27x20cm 고급 아크릴 액자를 추가로 제작해드립니다.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl font-light mb-6 text-foreground">
              가족의 소중한 순간을 기록하세요
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              전문 작가와 함께 가족만의 특별한 이야기를<br />
              아름다운 사진으로 만들어보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="tel:041-1592-0000"
                className="bg-white hover:bg-primary hover:text-white text-primary border-2 border-primary px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(139, 115, 85, 0.2)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} className="mr-2" />
                전화 상담하기
              </motion.a>
              <Link href="/contact">
                <motion.div
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-full font-medium transition-colors cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(139, 115, 85, 0.3)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  예약 문의하기
                </motion.div>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-white py-16">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="font-serif text-xl font-bold mb-4">Family Soo Studio</h3>
              <p className="text-white/70 text-sm leading-relaxed">
                소중한 순간을 사진으로 남기는<br />
                따뜻한 감성의 스튜디오
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">서비스</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li><Link href="/services/family" className="hover:text-white transition-colors">가족사진</Link></li>
                <li><Link href="/services/baby" className="hover:text-white transition-colors">베이비 촬영</Link></li>
                <li><Link href="/services/remind-wedding" className="hover:text-white transition-colors">리마인드웨딩</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">연락처</h4>
              <ul className="space-y-2 text-sm text-white/70">
                <li>041-1592-0000</li>
                <li>familysoo1592@naver.com</li>
                <li>충남 당진시</li>
                <li><a href="https://blog.naver.com/familysoo1592" target="_blank" className="hover:text-white transition-colors">블로그 바로가기</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/50">
            © 2024 Family Soo Studio. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}