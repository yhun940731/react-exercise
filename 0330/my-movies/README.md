# "나의 영화" 서비스

[TMDB](https://www.themoviedb.org/) 영화 API를 활용해 다음의 페이지를 구성하고 연결합니다.

페이지(page) | 라우트(route) | 설명 | 접근 권한 요구
-- | -- | -- | --
`src/pages/Home/Home.js` | `/` | 홈 페이지 | 
`src/pages/Movies/MovieList.js` | `/movies` | 무비 리스트 페이지 | 
`src/pages/Movies/MovieDetail.js` | `/movie/:id` | 무비 상세 페이지 | 
`src/pages/Bookmark/Bookmark.js` | `/bookmark` | 무비 북마크 페이지 | 로그인(인증) 사용자