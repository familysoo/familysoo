'use client';

import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from "next/navigation";

interface HeaderProps {
  transparent?: boolean;
}

export default function Header({ transparent = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);
  const pathname = usePathname();

  // 스크롤 감지
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 모바일 메뉴 관리 함수들
  const openMobileMenu = () => {
    setMobileMenuOpen(true);
  };

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  // ESC 키로 모바일 메뉴 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        closeMobileMenu();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  // 네비게이션 메뉴 아이템들
  const navigationItems = [
    { href: "/", label: "홈" },
    { 
      href: "#", 
      label: "서비스",
      hasDropdown: true,
      subItems: [
        { href: "/services/baby", label: "베이비 촬영" },
        { href: "/services/family", label: "가족 촬영" },
        { href: "/services/remind-wedding", label: "리마인드 웨딩" }
      ]
    },
    { href: "/about", label: "소개" },
    { href: "/portfolio", label: "포트폴리오" },
    { href: "/contact", label: "예약문의" }
  ];

  const isTransparent = transparent && !isScrolled;

  return (
    <>
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isTransparent
          ? 'bg-transparent border-b border-transparent' 
          : 'bg-white/90 backdrop-blur-sm border-b border-accent'
      }`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className={`font-serif text-xl sm:text-2xl font-bold transition-colors duration-300 ${
              isTransparent ? 'text-white' : 'text-primary'
            }`}>
              Family Soo
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8 text-lg">
              {navigationItems.map((item) => {
                const isActive = pathname === item.href || (item.subItems && item.subItems.some(subItem => pathname === subItem.href));
                
                if (item.hasDropdown) {
                  return (
                    <div 
                      key={item.href}
                      className="relative"
                      onMouseEnter={() => setServicesDropdownOpen(true)}
                      onMouseLeave={() => setServicesDropdownOpen(false)}
                    >
                      <Link 
                        href={item.href} 
                        className={`flex items-center space-x-1 transition-colors duration-300 ${
                          isActive
                            ? isTransparent 
                              ? 'text-white font-medium' 
                              : 'text-primary font-medium'
                            : isTransparent 
                              ? 'text-white hover:text-white/80' 
                              : 'text-foreground hover:text-primary'
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown 
                          size={16} 
                          className={`transition-transform duration-200 ${
                            servicesDropdownOpen ? 'rotate-180' : ''
                          }`} 
                        />
                      </Link>
                      
                      {/* Dropdown Menu */}
                      <AnimatePresence>
                        {servicesDropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50"
                          >
                            {item.subItems?.map((subItem) => {
                              const isSubActive = pathname === subItem.href;
                              return (
                                <Link
                                  key={subItem.href}
                                  href={subItem.href}
                                  className={`block px-4 py-2 text-sm transition-colors ${
                                    isSubActive
                                      ? 'text-primary bg-primary/5 font-medium'
                                      : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                                  }`}
                                >
                                  {subItem.label}
                                </Link>
                              );
                            })}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                }
                
                return (
                  <Link 
                    key={item.href}
                    href={item.href} 
                    className={`transition-colors duration-300 ${
                      isActive
                        ? isTransparent 
                          ? 'text-white font-medium' 
                          : 'text-primary font-medium'
                        : isTransparent 
                          ? 'text-white hover:text-white/80' 
                          : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile menu button */}
            <div className="md:hidden flex-shrink-0">
              <button
                onClick={openMobileMenu}
                className={`p-2 rounded-lg transition-all duration-300 ${
                  isTransparent
                    ? 'text-white hover:bg-white/20'
                    : 'text-foreground hover:bg-foreground/10' 
                }`}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Panel */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] md:hidden"
          onClick={closeMobileMenu}
        >
          {/* 배경 오버레이 */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
          
          {/* 모바일 메뉴 패널 */}
          <motion.div 
            className="bg-white shadow-2xl flex flex-col"
            style={{
              position: 'absolute',
              right: 0,
              top: 0,
              height: '100vh',
              width: '70vw',
              zIndex: 110
            }}
            onClick={(e) => e.stopPropagation()}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3, ease: 'easeOut' }}
          >
            {/* 헤더 */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
              <div className="flex items-center space-x-3">
                <h2 className="text-xl font-serif font-bold text-primary">Family Soo</h2>
              </div>
              <button
                onClick={closeMobileMenu}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2 rounded-lg hover:bg-gray-100"
              >
                <X size={24} />
              </button>
            </div>

            {/* 메뉴 아이템들 - 중간 영역 */}
            <nav className="py-6 flex-1">
              <div className="space-y-2">
                {navigationItems.map((item) => {
                  const isActive = pathname === item.href || (item.subItems && item.subItems.some(subItem => pathname === subItem.href));
                  
                  if (item.hasDropdown) {
                    return (
                      <div key={item.href}>
                        <Link 
                          href={item.href} 
                          className={`block px-6 py-4 text-lg transition-colors font-medium ${
                            isActive
                              ? 'text-primary bg-primary/5'
                              : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                          }`}
                          onClick={closeMobileMenu}
                        >
                          {item.label}
                        </Link>
                        {/* 모바일에서는 서브 메뉴들을 바로 표시 */}
                        <div className="pl-4">
                          {item.subItems?.map((subItem) => {
                            const isSubActive = pathname === subItem.href;
                            return (
                              <Link
                                key={subItem.href}
                                href={subItem.href}
                                className={`block px-6 py-3 text-sm transition-colors ${
                                  isSubActive
                                    ? 'text-primary bg-primary/10 font-medium'
                                    : 'text-gray-600 hover:text-primary hover:bg-primary/5'
                                }`}
                                onClick={closeMobileMenu}
                              >
                                {subItem.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    );
                  }
                  
                  return (
                    <Link 
                      key={item.href}
                      href={item.href} 
                      className={`block px-6 py-4 text-lg transition-colors font-medium ${
                        isActive
                          ? 'text-primary bg-primary/5'
                          : 'text-gray-700 hover:text-primary hover:bg-primary/5'
                      }`}
                      onClick={closeMobileMenu}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>
            </nav>

            {/* 연락처 정보 - 하단 고정 */}
            <div className="p-6 border-t border-gray-200 flex-shrink-0 bg-primary/5">
              <div className="text-center">
                <p className="text-2xl font-bold text-primary mb-3">041-356-1592</p>
                <div className="flex items-center justify-center mb-3">
                  <div className="inline-flex items-center gap-2 px-3 py-2 bg-primary/10 border border-primary rounded-lg">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    <span className="text-sm font-medium text-primary">카카오톡ID soo_1592</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mb-1">평일 10:00 ~ 19:00</p>
                <p className="text-sm text-gray-600">주말 10:00 ~ 19:00 (예약제)</p>
              </div>
              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500 text-center">familysoo1592@naver.com</p>
                <p className="text-xs text-gray-500 text-center">충청남도 당진시 북문로 2길 10 패밀리수 스튜디오</p>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </>
  );
} 