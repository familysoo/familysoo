# 0) 로컬 빌드 – 빌드 분 소모 없음
vercel build --token $Env:FAMILYSOO_VERCEL

# 1) ver1 브랜치 프리뷰 배포 (프롬프트 없이)
$deployUrl = vercel deploy --prebuilt --token $Env:FAMILYSOO_VERCEL --yes `
  | Select-String -Pattern "https://.*\.vercel\.app" `
  | ForEach-Object { $_.Matches[0].Value }

# 2) 기존 alias 제거 (프롬프트 생략 가능 –--yes 지원)
# vercel alias rm familysoo-dev.vercel.app --token $Env:FAMILYSOO_VERCEL --yes

# 3) 새 배포에 alias 부착 (confirm 프롬프트 없음)
vercel alias set $deployUrl familysoo-dev.vercel.app --token $Env:FAMILYSOO_VERCEL


# # 원격 빌드 + 프리뷰 배포, 캐시까지 무시
# $preview = vercel deploy --force --token $Env:FAMILYSOO_VERCEL --yes `
#   | Select-String -Pattern "https://.*\.vercel\.app" `
#   | ForEach-Object { $_.Matches[0].Value }

# # dev 서브도메인에 연결
# vercel alias set $preview realtalk-mentor-dev.vercel.app --token $Env:FAMILYSOO_VERCEL