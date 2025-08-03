import Link from "next/link";
import { Camera, Users, Heart, Baby, Phone, MessageCircle, MapPin, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-white py-20">
      <div className="container">
        <div className="grid md:grid-cols-3 gap-12">
          {/* Studio 소개 */}
          <div className="space-y-4">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-white/10 rounded-lg">
                <Camera className="w-5 h-5" />
              </div>
              <h3 className="font-serif text-xl font-bold">Family Soo Studio</h3>
            </div>
            <p className="text-white/70 text-sm leading-relaxed pl-10">
              소중한 순간을 사진으로 남기는<br />
              따뜻한 감성의 스튜디오
            </p>
          </div>

          {/* 서비스 */}
          <div className="space-y-4">
            <h4 className="font-medium mb-6 text-lg">서비스</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li>
                <Link href="/services/family" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                  <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-white/10 transition-colors">
                    <Users className="w-4 h-4" />
                  </div>
                  가족 사진
                </Link>
              </li>
              <li>
                <Link href="/services/remind-wedding" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                  <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-white/10 transition-colors">
                    <Heart className="w-4 h-4" />
                  </div>
                  리마인드 웨딩
                </Link>
              </li>
              <li>
                <Link href="/services/baby" className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group">
                  <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-white/10 transition-colors">
                    <Baby className="w-4 h-4" />
                  </div>
                  베이비 촬영
                </Link>
              </li>
            </ul>
          </div>

          {/* 연락처 */}
          <div className="space-y-4">
            <h4 className="font-medium mb-6 text-lg">연락처</h4>
            <ul className="flex flex-col gap-4 text-sm">
              <li className="flex items-start gap-3">
                <div className="p-1.5 bg-white/5 rounded-md">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <a 
                    href="tel:041-356-1592" 
                    className="text-white/70 hover:text-white transition-colors block"
                  >
                    041-356-1592
                  </a>
                  <p className="text-xs text-white/50 mt-1 block sm:hidden">
                    📞 탭하여 바로 전화하기
                  </p>
                </div>
              </li>
              <li className="flex items-center gap-3 text-white/70">
                <div className="p-1.5 bg-white/5 rounded-md">
                  <MessageCircle className="w-4 h-4" />
                </div>
                카카오톡 ID soo_1592
              </li>
              <li className="flex items-start gap-3 text-white/70">
                <div className="p-1.5 bg-white/5 rounded-md mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <span className="leading-relaxed">
                  충청남도 당진시 북문로 2길 10 패밀리수 스튜디오
                </span>
              </li>
              <li>
                <a 
                  href="https://blog.naver.com/familysoo1592" 
                  target="_blank" 
                  className="flex items-center gap-3 text-white/70 hover:text-white transition-colors group"
                >
                  <div className="p-1.5 bg-white/5 rounded-md group-hover:bg-white/10 transition-colors">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                  블로그 바로가기
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 구분선과 저작권 */}
        <div className="mt-16 pt-8 border-t border-white/10">
          <div className="text-center text-sm text-white/40">
            © 2025 Family Soo Studio. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
} 