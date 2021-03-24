# 구조 분해 할당 기본 값 설정

**이전 시간 가장 많이 받은 질문** 👀에 대해 답변 드립니다. 😎 (후훗! 공부해왔지롱~)

<br>

## 배열 

할당된 배열에 `z`, `m` 변수가 없으므로 `z`, `m` 변수의 기본 값은 각각 `1`, `2`로 설정됩니다.

```jsx
const [ z = 1, m = 2 ] = []

expect(z).toBe(1) // true
expect(m).toBe(2) // true
```

배열의 특정 인덱스에 값이 채워지면 기본값을 대체하게 됩니다.

```jsx
const [ z = 1, m = 2 ] = [ , 101 ]

expect(z).toBe(1) // true
expect(m).toBe(2) // false
```

## 객체

객체 분해에 대한 기본값을 지정할 수도 있습니다.
구조화 되지 않은 객체에는 속성 키 `alpha` 속성 키 `omega`가 없어 기본 값이 사용됩니다.

```jsx
// alpha 속성의 별칭 a = 0
// omega 속성의 별칭 o = false
const {alpha: a=0, omega: o=false} = {};

expect(a).toBe(0) // true
expect(o).toBe(false) // true
```

객체의 특정 속성에 값이 채워지면 기본값을 대체하게 됩니다.

```jsx
const {alpha: a=0, omega: o=false} = { alpha: '구조 분해 할당에 기본 값이라니!!' };

expect(a).toBe(0) // false
expect(o).toBe(false) // true
```


위 코드는 아래와 같이 간추려 사용할 수 있어 코드가 더욱 간단해집니다.

```jsx
const {a = 0, o = false} = {};

expect(a).toBe(0)
expect(o).toBe(false)
```

## 테스트 함수

위 에시에서 사용된 테스트 함수 코드입니다.

```jsx
const expect = (actualValue) => ({
  toBe(expectedValue) {
    return actualValue === expectedValue
  }
})
```

<br>

## 참고 

구조 분해 할당 기본 값 설정에 관한 정보는 이 도서에서 확인할 수 있습니다.

[**성급한 프로그래머를 위한 JavaScript**, ES2021 에디션<br>(JavaScript for impatient programmers)](https://exploringjs.com/impatient-js/ch_destructuring.html#advanced-4)

<img src="https://exploringjs.com/impatient-js/img-homepage/cover-homepage.jpg" alt="" height="200" />