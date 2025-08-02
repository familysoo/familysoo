'use client';

import Link from "next/link";
import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ChevronRight, Camera, Heart, Baby, Users, Star, Clock, Phone } from "lucide-react";
import Header from "../../components/Header";
import PageHero from "../../components/PageHero";

// 서비스 타입 인터페이스
interface Service {
  title: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  included: string[];
  process: string[];
}

// 개별 서비스 섹션 컴포넌트
function ServiceSection({ 
  service, 
  index, 
  isActive: _isActive, 
  onClick 
}: {
  service: Service;
  index: number;
  isActive: boolean;
  onClick: () => void;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });

  const icons = [
    <Users key="family" size={32} className="text-primary" />,
    <Heart key="wedding" size={32} className="text-primary" />,
    <Baby key="growth" size={32} className="text-primary" />
  ];

  return (
    <motion.div
      ref={ref}
      className="bg-white rounded-2xl p-8 shadow-sm border border-transparent hover:border-primary/20 transition-all duration-300 cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ 
        scale: 1.02,
        boxShadow: "0 8px 30px rgba(139, 115, 85, 0.15)"
      }}
      onClick={onClick}
    >
      <motion.div 
        className="flex items-center mb-6"
        initial={{ opacity: 0, x: -20 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
      >
        <motion.div 
          className="bg-primary/10 rounded-full p-4 mr-4"
          whileHover={{ scale: 1.1, rotate: 5 }}
          transition={{ duration: 0.2 }}
        >
          {icons[index]}
        </motion.div>
        <div>
          <h3 className="font-serif text-2xl font-medium text-foreground mb-2">
            {service.title}
          </h3>
          <p className="text-primary font-medium">{service.price}</p>
        </div>
      </motion.div>

      <motion.p 
        className="text-foreground/80 leading-relaxed mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
      >
        {service.description}
      </motion.p>

      <motion.div 
        className="mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
      >
        <h4 className="font-medium text-lg mb-3 text-foreground">주요 특징</h4>
        <ul className="space-y-2">
          {service.features.slice(0, 3).map((feature: string, idx: number) => (
            <motion.li 
              key={idx}
              className="flex items-center text-foreground/70"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.3, delay: index * 0.1 + 0.5 + idx * 0.1 }}
              whileHover={{ x: 4, color: "var(--foreground)" }}
            >
              <motion.span 
                className="text-primary mr-3"
                whileHover={{ scale: 1.2 }}
                transition={{ duration: 0.2 }}
              >
                ✓
              </motion.span>
              {feature}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: index * 0.1 + 0.6 }}
      >
        <div className="flex items-center text-foreground/60">
          <Clock size={16} className="mr-2" />
          <span>{service.duration}</span>
        </div>
        <motion.div
          className="text-primary font-medium flex items-center"
          whileHover={{ x: 4 }}
          transition={{ duration: 0.2 }}
        >
          자세히 보기 <ChevronRight size={16} className="ml-1" />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

// 선택된 서비스 상세 정보 컴포넌트
function ServiceDetail({ service, isVisible }: { service: Service; isVisible: boolean }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-50px" });

  if (!isVisible) return null;

  return (
    <motion.div
      ref={ref}
      className="bg-gradient-to-br from-primary/5 to-accent/10 rounded-2xl p-8 mb-16"
      initial={{ opacity: 0, y: 50, height: 0 }}
      animate={{ 
        opacity: isInView ? 1 : 0, 
        y: isInView ? 0 : 30,
        height: "auto"
      }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="grid lg:grid-cols-2 gap-12">
        {/* 서비스 상세 정보 */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="font-serif text-3xl font-medium mb-6 text-primary">
            {service.title} 상세 정보
          </h3>
          
          <div className="mb-8">
            <h4 className="font-medium text-lg mb-4">전체 포함 사항</h4>
            <div className="grid gap-3">
              {service.included.map((item: string, idx: number) => (
                <motion.div
                  key={idx}
                  className="flex items-center p-3 bg-white rounded-lg shadow-sm"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.4, delay: 0.3 + idx * 0.1 }}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 4px 15px rgba(139, 115, 85, 0.1)"
                  }}
                >
                  <Star size={16} className="text-primary mr-3" />
                  <span className="text-foreground/80">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div
            className="bg-white rounded-xl p-6 shadow-sm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            whileHover={{ 
              scale: 1.02,
              boxShadow: "0 8px 25px rgba(139, 115, 85, 0.1)"
            }}
          >
            <h4 className="font-medium text-lg mb-4 text-foreground">가격 정보</h4>
            <div className="grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-primary/5 rounded-lg">
                <p className="text-sm text-foreground/70 mb-1">기본 가격</p>
                <p className="text-xl font-serif font-medium text-primary">{service.price}</p>
              </div>
              <div className="text-center p-4 bg-accent/20 rounded-lg">
                <p className="text-sm text-foreground/70 mb-1">촬영 시간</p>
                <p className="text-xl font-serif font-medium text-foreground">{service.duration}</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* 촬영 진행 과정 */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <h4 className="font-serif text-2xl font-medium mb-6 text-foreground">촬영 진행 과정</h4>
          <div className="space-y-4">
            {service.process.map((step: string, idx: number) => (
              <motion.div
                key={idx}
                className="flex items-start p-4 bg-white rounded-xl shadow-sm"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.4, delay: 0.5 + idx * 0.1 }}
                whileHover={{ 
                  scale: 1.02,
                  boxShadow: "0 4px 15px rgba(139, 115, 85, 0.1)"
                }}
              >
                <motion.div 
                  className="bg-primary rounded-full flex items-center justify-center mr-4 mt-1 text-white font-medium"
                  style={{ width: '2rem', height: '2rem', fontSize: '0.875rem' }}
                  whileHover={{ scale: 1.1, rotate: 360 }}
                  transition={{ duration: 0.3 }}
                >
                  {idx + 1}
                </motion.div>
                <div className="flex-1">
                  <p className="text-foreground/80 leading-relaxed">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="mt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            <Link href="/contact">
              <motion.div
                className="w-full bg-primary hover:bg-primary/90 text-white py-4 rounded-full font-medium text-center transition-colors flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(139, 115, 85, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} className="mr-2" />
                예약 문의하기
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function ServicesPage() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: "가족사진",
      description: "온 가족이 함께하는 따뜻한 순간을 자연스럽게 담아냅니다. 각 가족만의 개성과 사랑이 느껴지는 특별한 작품을 만들어드립니다.",
      features: [
        "자연스러운 포즈 연출", 
        "다양한 배경 선택", 
        "고품질 보정", 
        "가족 구성원별 개별 촬영", 
        "단체 사진 포함",
        "계절별 컨셉 촬영",
        "펫과 함께하는 가족사진"
      ],
      price: "100,000원부터",
      duration: "1-2시간",
      included: [
        "보정된 사진 30-50장 제공",
        "고해상도 원본 파일",
        "온라인 갤러리 1개월 무료",
        "USB 또는 DVD 제공",
        "기본 액자 1개 무료 제작"
      ],
      process: [
        "사전 상담 및 컨셉 논의 (전화/방문)",
        "촬영 일정 및 장소 결정",
        "당일 촬영 진행 (1-2시간)",
        "전문 보정 작업 (7-10일)",
        "완성된 사진 전달 및 액자 제작"
      ]
    },
    {
      title: "리마인드 웨딩",
      description: "결혼의 감동을 다시 한번 느낄 수 있는 특별한 촬영입니다. 웨딩드레스를 다시 입고 그날의 설렘과 행복을 재현해보세요.",
      features: [
        "웨딩드레스 & 턱시도 제공", 
        "전문 메이크업 서비스", 
        "로맨틱 컨셉 촬영", 
        "추억의 재현", 
        "소품 제공",
        "야외 촬영 가능",
        "결혼기념일 특별 할인"
      ],
      price: "100,000원부터",
      duration: "2-3시간",
      included: [
        "보정된 사진 50-80장 제공",
        "웨딩 앨범 제작 (20매)",
        "대형 액자 2개 제작",
        "드레스 대여 포함",
        "전문 메이크업 서비스"
      ],
      process: [
        "컨셉 및 스타일 상담",
        "드레스 피팅 및 메이크업 예약",
        "촬영 장소 선정 및 섭외",
        "당일 촬영 진행 (2-3시간)",
        "앨범 제작 및 액자 완성 후 전달"
      ]
    },
    {
      title: "성장앨범",
      description: "아이의 소중한 성장 과정을 단계별로 기록합니다. 신생아부터 돌잔치까지, 매 순간의 변화와 성장을 아름답게 담아냅니다.",
      features: [
        "월령별 촬영", 
        "성장 기록 차트", 
        "부모와 함께 촬영", 
        "안전한 촬영 환경", 
        "아기 전용 소품",
        "계절별 테마 촬영",
        "성장 동영상 제작"
      ],
      price: "200,000원부터",
      duration: "30분-1시간",
      included: [
        "보정된 사진 20-30장",
        "성장 기록 차트 제작",
        "미니 앨범 (10매)",
        "디지털 파일 전체 제공",
        "성장 동영상 (1분)"
      ],
      process: [
        "아기 월령에 맞는 컨셉 선택",
        "안전한 촬영 환경 준비 및 확인",
        "짧은 시간 집중 촬영 (30분-1시간)",
        "성장 기록 차트 작성 및 보정",
        "앨범 및 파일 전달 (7일 내)"
      ]
    }
  ];

  // URL hash를 기반으로 서비스 인덱스를 반환하는 함수
  const getServiceIndexFromHash = (hash: string) => {
    switch (hash) {
      case '#family':
        return 0;
      case '#remind-wedding':
        return 1;
      case '#growth':
        return 2;
      default:
        return 0;
    }
  };

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const serviceIndex = getServiceIndexFromHash(hash);
      setActiveService(serviceIndex);
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <PageHero 
        title="촬영 서비스"
        description="각각의 특별한 순간을 위한 맞춤 촬영 서비스로<br />소중한 기억을 아름다운 작품으로 완성해드립니다."
      />

      {/* Services Grid */}
      <section className="py-32">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-light mb-4 text-foreground">서비스 선택</h2>
            <p className="text-foreground/70">원하시는 서비스를 선택하여 자세한 정보를 확인해보세요</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {services.map((service, index) => (
              <ServiceSection
                key={index}
                service={service}
                index={index}
                isActive={activeService === index}
                onClick={() => setActiveService(index)}
              />
            ))}
          </div>

          {/* Selected Service Detail */}
          <ServiceDetail 
            service={services[activeService]} 
            isVisible={true}
          />
        </div>
      </section>

      {/* Additional Services */}
      <section className="py-32 bg-muted">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl font-light mb-4 text-foreground">추가 서비스</h2>
            <p className="text-foreground/70">더욱 완벽한 촬영을 위한 부가 서비스를 제공합니다</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: <Camera size={32} className="text-primary" />,
                title: "추가 보정",
                description: "특별한 요청사항에 따른 개별 보정 작업을 진행합니다.",
                price: "10,000원부터"
              },
              {
                icon: <Star size={32} className="text-primary" />,
                title: "앨범 제작",
                description: "고급 재질의 포토북 및 프리미엄 액자를 제작해드립니다.",
                price: "50,000원부터"
              },
              {
                icon: <Users size={32} className="text-primary" />,
                title: "출장 촬영",
                description: "원하시는 장소에서의 야외 촬영 서비스를 제공합니다.",
                price: "교통비 별도"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
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
                  {item.icon}
                </motion.div>
                <h3 className="font-serif text-xl font-medium mb-3 text-foreground">{item.title}</h3>
                <p className="text-foreground/70 mb-4 leading-relaxed">{item.description}</p>
                <p className="font-medium text-primary">{item.price}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-24 bg-primary">
        <div className="container text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-4xl font-light mb-6 text-white">
              지금 바로 예약하세요
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto">
              소중한 순간을 아름다운 사진으로 남기고 싶으시다면<br />
              언제든지 연락주세요. 친절한 상담으로 도와드리겠습니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.a 
                href="tel:041-1592-0000"
                className="bg-white hover:bg-white/90 text-primary px-8 py-3 rounded-full font-medium transition-colors flex items-center justify-center"
                whileHover={{ 
                  scale: 1.05,
                  boxShadow: "0 8px 25px rgba(255, 255, 255, 0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Phone size={20} className="mr-2" />
                전화로 상담하기
              </motion.a>
              <Link href="/contact">
                <motion.div
                  className="bg-transparent hover:bg-white/10 text-white border-2 border-white px-8 py-3 rounded-full font-medium transition-colors cursor-pointer"
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: "0 8px 25px rgba(255, 255, 255, 0.2)"
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  온라인 예약 신청
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
                <li><Link href="/services#family" className="hover:text-white transition-colors">가족사진</Link></li>
                <li><Link href="/services#remind-wedding" className="hover:text-white transition-colors">리마인드웨딩</Link></li>
                <li><Link href="/services#growth" className="hover:text-white transition-colors">성장앨범</Link></li>
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