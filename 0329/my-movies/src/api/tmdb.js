/**
 * @사용법
 * tmdb.discover()
 * tmdb.getPopularMovies(1))
 * tmdb.getDetail(791373))
 * tmdb.search('미스터'))
 *
 * @이미지
 * https://developers.themoviedb.org/3/getting-started/images
 * https://image.tmdb.org/t/p/w400/{이미지_경로}
 *
 * @비디오
 * https://www.youtube.com/watch?v={비디오_키}
 */
class MoviesAPI {
  /* 비공개 ---------------------------------------------------------------------- */

  _url = 'https://api.themoviedb.org/3'
  _key = process.env.REACT_APP_TMDB_KEY
  _language = 'ko'
  _region = 'KR'
  _sortBy = 'popularity.asc'
  _appendTo = 'videos,images'

  /* 공개 ----------------------------------------------------------------------- */

  setLanguage(newLang) {
    this._language = newLang
  }

  setRegion(newRegion) {
    this._region = newRegion
  }

  setSortBy(newSortBy) {
    this._sortBy = newSortBy
  }

  // [참고]
  // https://www.themoviedb.org/documentation/api/discover
  // https://developers.themoviedb.org/3/discover/movie-discover
  discover({ page = 1, adult = false } = {}) {
    return `${this._url}/discover/movie?
              api_key=${this._key}&
              language=${this._language}&
              region=${this._region}&
              include_image_language=${this._language}&
              append_to_response=${this._appendTo}
              include_adult=${adult}&
              page=${page}`.replace(/\s/g, '')
  }

  // [참고]
  // https://developers.themoviedb.org/3/movies/get-popular-movies
  getPopularMovies(page = 1, language, region) {
    language && this.setLanguage(language)
    region && this.setRegion(region)

    return `${this._url}/movie/popular?
              api_key=${this._key}&
              language=${this._language}&
              region=${this._region}`.replace(/\s/g, '')
  }

  // [참고]
  // https://developers.themoviedb.org/3/movies/get-movie-details
  getDetail(movieId) {
    return `${this._url}/movie/${movieId}?
              api_key=${this._key}&
              language=${this._language}&
              append_to_response=${this._appendTo}`.replace(/\s/g, '')
  }

  getImageURL(path, size = 400) {
    return `https://image.tmdb.org/t/p/w${size}/${path}`
  }

  getVideoURL(key) {
    return `https://www.youtube.com/embed/${key}?autoplay=1&modestbranding=1`
  }

  // [참고]
  // https://developers.themoviedb.org/3/search/search-movies
  // https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
  search(query, page = 1) {
    if (!query) {
      throw new Error('검색어 입력이 반드시 필요합니다.')
    }

    return `${this._url}/search/movie?
              api_key=${this._key}&
              query=${encodeURIComponent(query)}&
              language=${this._language}&
              region=${this._region}&
              page=${page}`.replace(/\s/g, '')
  }
}

export default new MoviesAPI()
