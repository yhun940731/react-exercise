// firebase/app 모듈 불러오기
import firebase from 'firebase/app'

// auth, firestore 모듈 불러오기
import 'firebase/auth'
import 'firebase/firestore'

/* configuration ------------------------------------------------------------ */

// Firebase 앱 구성 (객체)
const firebaseConfig = {
  apiKey: "AIzaSyDeStnZMPUJvpdFgiyan-YS7uLRSEiQHZQ",
  authDomain: "my-movies-c62b1.firebaseapp.com",
  projectId: "my-movies-c62b1",
  storageBucket: "my-movies-c62b1.appspot.com",
  messagingSenderId: "184806498932",
  appId: "1:184806498932:web:9c98937f4761b48f586721"
}

/* initialization ----------------------------------------------------------- */

// Firebase 앱 초기화
firebase.initializeApp(firebaseConfig)

/* export modules ----------------------------------------------------------- */

// 인증 객체
export const auth = firebase.auth()

// 언어 현지화 (명시적 설정)
auth.languageCode = 'ko'
// 기기의 현재 사용 중인 언어로 설정 (기기 설정에 따름)
// auth.useDeviceLanguage()

// 데이터베이스 객체
export const firestore = firebase.firestore()

// firebase app 기본 내보내기
export default firebase

/* Google Authentication Provider ------------------------------------------- */

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
googleAuthProvider.setCustomParameters({ prompt: 'select_account' })

// Google 인증 공급자 로그인(회원가입) 유틸리티
export const signInGoogle = () => auth.signInWithPopup(googleAuthProvider)

// 로그아웃 유틸리티
export const signOut = () => auth.signOut()
