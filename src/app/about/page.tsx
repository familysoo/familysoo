'use client';

import Link from "next/link";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Camera, Heart, Award, Users, MapPin, Phone, Mail, Star, MessageCircle } from "lucide-react";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";
import Footer from "../../components/Footer";

// 타입 인터페이스들
interface Feature {
  title: string;
  description: string;
}

interface TimelineItemType {
  year: string;
  title: string;
  description: string;
}

// 개별 특징 카드 컴포넌트
function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const icons = [
    <Camera key="camera" size={28} className="text-primary" />,
    <Heart key="heart" size={28} className="text-primary" />,
    <Award key="award" size={28} className="text-primary" />,
    <Users key="users" size={28} className="text-primary" />
  ];

  return (
    <motion.div
      ref={ref}
      className="bg-white p-8 rounded-2xl shadow-sm text-center"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.05,
        boxShadow: "0 8px 30px rgba(139, 115, 85, 0.15)"
      }}
    >
      <motion.div 
        className="bg-primary/10 rounded-full p-4 w-20 h-20 flex items-center justify-center mx-auto mb-6"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {icons[index]}
      </motion.div>
      <h3 className="font-serif text-xl font-medium mb-3 text-foreground">{feature.title}</h3>
      <p className="text-foreground/70 leading-relaxed">{feature.description}</p>
    </motion.div>
  );
}

// 타임라인 아이템 컴포넌트
function TimelineItem({ item, index }: { item: TimelineItemType; index: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-start"
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
    >
      <motion.div 
        className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium flex-shrink-0"
        whileHover={{ scale: 1.1, rotate: 5 }}
        transition={{ duration: 0.2 }}
      >
        {item.year}
      </motion.div>
      <div className="flex-1 pl-8">
        <motion.h3 
          className="font-serif text-xl font-medium mb-2 text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.2 }}
        >
          {item.title}
        </motion.h3>
        <motion.p 
          className="text-foreground/70 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.3 }}
        >
          {item.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

export default function AboutPage() {
  const studioFeatures = [
    {
      title: "편안한 공간",
      description: "아늑하고 자연스러운 분위기의 촬영 공간에서 편안하게 촬영할 수 있습니다."
    },
    {
      title: "전문 장비",
      description: "최신 카메라와 조명 장비로 완벽한 화질의 사진을 제공합니다."
    },
    {
      title: "경험 많은 작가",
      description: "25년 경력의 전문 사진작가가 최고의 순간을 포착합니다."
    },
    {
      title: "맞춤 컨셉",
      description: "고객의 취향과 스타일에 맞는 개인별 맞춤 촬영을 진행합니다."
    }
  ];

  const timeline = [
    {
      year: "2000",
      title: "스튜디오 설립",
      description: "가족사진 전문 스튜디오로 당진에서 첫 걸음을 시작했습니다. 작은 공간에서 시작된 꿈이 지금의 Family Soo Studio가 되었습니다."
    },
    {
      year: "2010",
      title: "리마인드웨딩 서비스 시작",
      description: "부부들의 특별한 추억 만들기 서비스를 본격 시작하며, 결혼의 감동을 다시 한번 느낄 수 있는 프로그램을 개발했습니다."
    },
    {
      year: "2015",
      title: "베이비 촬영 전문화",
      description: "아기 전문 촬영 시스템을 구축하고, 신생아부터 돌잔치까지 체계적인 성장 기록 서비스를 제공하기 시작했습니다."
    },
    {
      year: "2020",
      title: "디지털 서비스 확대",
      description: "온라인 갤러리 및 디지털 앨범 서비스를 도입하여 고객 편의성을 대폭 향상시켰습니다."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <PageHero 
        title="스튜디오 소개"
        description="20년간 쌓아온 경험과 따뜻한 감성으로<br />여러분의 소중한 순간을 기록합니다"
      />

      {/* CEO Message */}
      <section className="py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.h2 
                className="font-serif text-3xl font-light mb-8 text-foreground"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                대표 인사말
              </motion.h2>
              
              <div className="space-y-6">
                <motion.p 
                  className="text-foreground/80 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  안녕하세요, <strong className="text-primary">Family Soo</strong> 스튜디오입니다.
                </motion.p>
                <motion.p 
                  className="text-foreground/80 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  2000년 당진에서 작은 스튜디오로 시작해 지금까지 20년간 수천 가족의 소중한 순간들을 
                  사진으로 담아왔습니다. 매 순간 고객의 진솔한 모습과 자연스러운 감정을 
                  포착하기 위해 끊임없이 노력해왔습니다.
                </motion.p>
                <motion.p 
                  className="text-foreground/80 leading-relaxed"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  저희 스튜디오의 가장 큰 자부심은 단순히 아름다운 사진을 찍는 것이 아니라, 
                  그 순간의 감정과 이야기를 담아내는 것입니다. 앞으로도 변함없는 열정으로 
                  여러분의 특별한 이야기를 아름답게 기록해드리겠습니다.
                </motion.p>
                
                <motion.div 
                  className="pt-6 border-t border-accent"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                >
                  <p className="text-primary font-medium mb-1">Family Soo Studio 대표</p>
                  {/* <p className="font-serif text-2xl text-primary font-medium">이수진</p> */}
                </motion.div>
              </div>
            </motion.div>

            <div className="relative">
              <div className="relative rounded-2xl h-80 overflow-hidden">
                <img 
                  src="/images/hero/exterior.jpg" 
                  alt="Family Soo Studio 외관" 
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50" />
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                  <h4 className="font-serif text-2xl font-medium text-white mb-3">
                    Family Soo Studio
                  </h4>
                  <p className="text-white/90 text-sm">
                    소중한 순간을 아름답게 기록하는<br />
                    따뜻한 감성의 사진 스튜디오
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Philosophy */}
      <section className="py-32 bg-muted">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-light mb-6 text-foreground">스튜디오 철학</h2>
            <p className="text-lg text-foreground/70 max-w-3xl mx-auto leading-relaxed">
              자연스럽고 따뜻한 감성을 담아내는 것이 저희의 철학입니다. 
              억지스러운 포즈보다는 진솔한 모습, 완벽한 기술보다는 진심을 담은 사진을 추구합니다.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {studioFeatures.map((feature, index) => (
              <FeatureCard key={index} feature={feature} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Studio History */}
      <section className="py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-light mb-6 text-foreground">스튜디오 연혁</h2>
            <p className="text-lg text-foreground/70">25년간의 발자취와 성장 스토리</p>
          </motion.div>

          <div className="max-w-4xl mx-auto space-y-12">
            {timeline.map((item, index) => (
              <TimelineItem key={index} item={item} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Studio Space */}
      <section className="py-32 bg-gradient-to-br from-primary/5 to-accent/10">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-light mb-6 text-foreground">촬영 공간</h2>
            <p className="text-lg text-foreground/70">편안하고 아늑한 분위기의 전문 촬영 공간</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12">
            <motion.div
              className="bg-white p-8 rounded-2xl shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(139, 115, 85, 0.15)"
              }}
            >
              <h3 className="font-serif text-2xl font-medium mb-6 text-primary">메인 스튜디오</h3>
              <ul className="space-y-4">
                {[
                  "넓은 촬영 공간 (50평)",
                  "자연광 활용 가능한 대형 창",
                  "다양한 배경 및 소품 구비",
                  "개별 대기실 및 메이크업룸",
                  "전문 조명 시스템"
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    className="flex items-center text-foreground/80"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    whileHover={{ x: 4, color: "var(--foreground)" }}
                  >
                    <Star size={16} className="text-primary mr-3" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="bg-white p-8 rounded-2xl shadow-sm"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileHover={{ 
                scale: 1.02,
                boxShadow: "0 8px 30px rgba(139, 115, 85, 0.15)"
              }}
            >
              <h3 className="font-serif text-2xl font-medium mb-6 text-primary">특화 공간</h3>
              <ul className="space-y-4">
                {[
                  "신생아 전용 안전 촬영실",
                  "자연스러운 야외 테라스 공간",
                  "감성적인 빈티지 컨셉 코너",
                  "프라이빗 상담실",
                  "편안한 고객 휴식 공간"
                ].map((item, idx) => (
                  <motion.li 
                    key={idx}
                    className="flex items-center text-foreground/80"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 + 0.2 }}
                    whileHover={{ x: 4, color: "var(--foreground)" }}
                  >
                    <Heart size={16} className="text-primary mr-3" />
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-32 bg-primary">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl font-light mb-6 text-white">숫자로 보는 Family Soo</h2>
            <p className="text-white/90 text-lg">25년간 쌓아온 신뢰와 경험</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { number: "2000+", label: "행복한 가족들" },
              { number: "25년", label: "전문 경력" },
              { number: "500+", label: "리마인드 웨딩" },
              { number: "1000+", label: "성장 앨범" }
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div 
                  className="font-serif text-4xl md:text-5xl font-light text-white mb-2"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 + 0.3, type: "spring", bounce: 0.4 }}
                >
                  {stat.number}
                </motion.div>
                <p className="text-white/80">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Location Info */}
      <section className="py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-light mb-6 text-foreground">찾아오시는 길</h2>
            <p className="text-lg text-foreground/70">당진에서 만나는 따뜻한 추억 공간</p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              className="space-y-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center mb-4">
                  <MapPin className="text-primary mr-3" size={24} />
                  <h3 className="font-serif text-xl font-medium text-foreground">주소</h3>
                </div>
                <p className="text-foreground/80 leading-relaxed">
                  충청남도 당진시 북문로 2길 10 패밀리수 스튜디오
                </p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center mb-4">
                  <Phone className="text-primary mr-3" size={24} />
                  <h3 className="font-serif text-xl font-medium text-foreground">연락처</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/80">
                    <a href="tel:041-356-1592" className="hover:text-primary transition-colors">
                      041-356-1592
                    </a>
                  </p>
                  <p className="text-sm text-foreground/60">평일 10:00 ~ 19:00 | 주말 10:00 ~ 19:00 (예약제)</p>
                </div>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-sm">
                <div className="flex items-center mb-4">
                  <MessageCircle className="text-primary mr-3" size={24} />
                  <h3 className="font-serif text-xl font-medium text-foreground">카카오 아이디</h3>
                </div>
                <div className="space-y-2">
                  <p className="text-foreground/80">
                    soo_1592
                  </p>
                  <p className="text-sm text-foreground/60">카카오톡 친구 추가 후 1:1 문의 주세요</p>
                </div>
              </div>
            </motion.div>

            {/* <motion.div
              className="bg-gradient-to-br from-accent/20 to-primary/10 rounded-2xl p-12 text-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              whileHover={{ scale: 1.02 }}
            >
              <motion.div
                className="text-8xl mb-6 opacity-60"
                animate={{ 
                  y: [0, -10, 0],
                  rotate: [0, 2, -2, 0]
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
              >
                🗺️
              </motion.div>
              <h3 className="font-serif text-2xl font-medium mb-4 text-foreground">당진의 중심에서</h3>
              <p className="text-foreground/70 leading-relaxed">
                접근성이 좋은 위치에서<br />
                편안한 촬영 환경을 제공합니다
              </p>
            </motion.div> */}
            {/* 네이버 지도 iframe */}
            <iframe
                src="https://map.naver.com/p/search/%EC%B6%A9%EC%B2%AD%EB%82%A8%EB%8F%84%20%EB%8B%B9%EC%A7%84%EC%8B%9C%20%EB%B6%81%EB%AC%B8%EB%A1%9C%202%EA%B8%B8%2010%20%ED%8C%A8%EB%B0%80%EB%A6%AC%EC%88%98%EC%8A%A4%ED%8A%9C%EB%94%94%EC%98%A4"
                width="100%"
                height="100%"
                style={{ border: 0, borderRadius: '1rem' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Family Soo Studio 위치"
              />
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
              여러분의 소중한 순간을 기다리고 있습니다
            </h2>
            <p className="text-lg text-foreground/70 mb-8 max-w-2xl mx-auto">
              20년 경험의 전문가와 함께 특별한 추억을 만들어보세요.<br />
              진심을 담은 촬영으로 평생 간직할 소중한 기억을 선물해드리겠습니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/portfolio">
                <motion.div
                  className="bg-white hover:bg-primary hover:text-white text-primary border-2 border-primary px-8 py-3 rounded-full font-medium transition-colors cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(139, 115, 85, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  포트폴리오 보기
                </motion.div>
              </Link>
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
      <Footer />
    </div>
  );
} 