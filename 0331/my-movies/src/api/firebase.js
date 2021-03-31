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

/* -------------------------------------------------------------------------- */

// 인증 사용자 생성하거나, (존재하는 경우) 가져오는 유틸리티 함수
export const createOrGetAuthUser = async (user, additionalData = {}) => {
  // 유효성 검사
  // user 값이 전달되지 않았다면 오류를 출력
  if (!user) {
    throw new Error(
      'createOrGetAuthUser 함수는 user 인자를 필수로 전달 받아야 합니다.'
    )
  }
  // Users 컬렉션 내부의 새로운 Document 참조 객체 생성
  const userDocRef = firestore.doc(`users/${user.uid}`)
  try {
    // 문서 참조 객체의 get 메서드를 사용해서 스냅샷 가져오기
    const snapshot = await userDocRef.get()

    // 만약 snapshot.exists 속성 값이 false이면 신규 사용자 등록
    if (!snapshot.exists) {
      // 전달 받은 user 에서 데이터베이스에 저장할 속성을 추출
      // displayName, photoURL, email, uid, createdAt
      const { displayName, photoURL, email, uid } = user
      const createdAt = new Date()

      await userDocRef.set({
        displayName,
        photoURL,
        email,
        uid,
        createdAt,
      })
    }
  } catch (error) {
    console.error(error.message)
  }

  // 인증 사용자 참조를 반환
  // 왜????? onSnapshot 이벤트 처리를 위해서
  return userDocRef
}

// 회원 가입 시에 사용될 유틸리티
// 이메일, 패스워드를 회원가입 폼에서부터 전달 받아요
export const signUpWithEmailAndPassword = async (
  email,
  password,
  additionalData = {}
) => {
  try {
    // Firebase Auth 서비스의 메서드를 사용해서 사용자 생성
    const { user } = await auth.createUserWithEmailAndPassword(email, password)

    // 유틸리티 createOrGetAuthUser 함수를 사용해
    // Firestore Users 컬렉션 user.uid 도큐멘트 생성 또는 가져오기
    await createOrGetAuthUser(user, additionalData)
  } catch (error) {
    console.error(error.message)
  }
}
