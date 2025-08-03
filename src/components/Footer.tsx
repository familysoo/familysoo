import Link from "next/link";

export default function Footer() {
  return (
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
              <li><Link href="/services/family" className="hover:text-white transition-colors">가족 사진</Link></li>
              <li><Link href="/services/remind-wedding" className="hover:text-white transition-colors">리마인드 웨딩</Link></li>
              <li><Link href="/services/baby" className="hover:text-white transition-colors">베이비 촬영</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-medium mb-4">연락처</h4>
            <ul className="space-y-2 text-sm text-white/70">
              <li>041-356-1592</li>
              <li>familysoo1592@naver.com</li>
              <li>충청남도 당진시 북문로 2길 10 패밀리수 스튜디오</li>
              <li><a href="https://blog.naver.com/familysoo1592" target="_blank" className="hover:text-white transition-colors">블로그 바로가기</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-8 pt-8 text-center text-sm text-white/50">
          © 2024 Family Soo Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
} 