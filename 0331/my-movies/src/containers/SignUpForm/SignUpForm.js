import React from 'react'
import classNames from 'classnames'
import { string, number, object, oneOfType } from 'prop-types'
import {
  isValidDisplayNameFormat,
  isValidEmailFormat,
  isValidPasswordConfirmFormat,
  isValidPasswordFormat,
  isFunction,
} from 'utils'
import { IconInput, Button } from 'components'
import { form, control, buttonGroup, button } from './SignUpForm.module.scss'

/* -------------------------------------------------------------------------- */

const initialSignUpFormValues = {
  displayName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  hasError: {
    email: null,
    password: null,
  },
}

/* -------------------------------------------------------------------------- */

class SignInForm extends React.Component {
  state = { ...initialSignUpFormValues }

  confirmOfSubmitting() {
    const { displayName, email, password, passwordConfirm } = this.state

    const values = {
      displayName: displayName.trim(),
      email: email.trim(),
      password: password.trim(),
      passwordConfirm: passwordConfirm.trim(),
    }

    const validation = {
      displayName: isValidDisplayNameFormat(values.displayName),
      email: isValidEmailFormat(values.email),
      password: isValidPasswordFormat(values.password),
      passwordConfirm: isValidPasswordConfirmFormat(
        values.password,
        values.passwordConfirm
      ),
    }

    return values.displayName.length === 0 ||
      values.email.length === 0 ||
      values.password.length === 0 ||
      !validation.email ||
      !validation.password ||
      !validation.passwordConfirm
      ? true
      : false
  }

  resetFormValues() {
    this.setState(initialSignUpFormValues)
  }

  setErrorState(name, message) {
    this.setState({
      ...this.state,
      hasError: {
        ...this.state.hasError,
        [name]: { message },
      },
    })
  }

  resetErrorState(name) {
    this.setState({
      ...this.state,
      hasError: {
        ...this.state.hasError,
        [name]: null,
      },
    })
  }

  handleSubmit = (e) => {
    e.preventDefault()

    const { onSubmit } = this.props
    const { hasError, ...requestFormData } = this.state
    const formdata = new FormData()

    Object.entries(requestFormData).forEach(([key, value]) =>
      formdata.append(key, value)
    )

    typeof isFunction(onSubmit) && onSubmit(formdata)
  }

  handleChange = (e) => {
    const { name, value, checked } = e.target

    const newState = {
      [name]: name !== 'isAutoLogin' ? value.trim() : checked,
    }

    this.setState(newState)
  }

  handleBlurCheckValidFormat = ({ target: { name, value } }) => {
    const { password } = this.state

    switch (name) {
      // 이름 유효성 검사 ---------------------------------------------

      case 'displayName':
        if (value.trim().length === 0) {
          this.setErrorState(name, '이름을 입력해주세요.')
          break
        }

        if (!isValidDisplayNameFormat(value)) {
          this.setErrorState(name, '이름은 최소 2자 이상 입력해야 합니다.')
          break
        }

        this.resetErrorState(name)
        break

      // 이메일 유효성 검사 ---------------------------------------------

      case 'email':
        if (value.trim().length === 0) {
          this.setErrorState(name, '아이디(이메일)를 입력해주세요.')
          break
        }

        if (!isValidEmailFormat(value)) {
          this.setErrorState(
            name,
            '아이디(이메일)는 이메일 형식으로 입력해주세요.'
          )
          break
        }

        this.resetErrorState(name)
        break

      // 패스워드 유효성 검사 ---------------------------------------------

      case 'password':
        if (value.trim().length === 0) {
          this.setErrorState(name, '비밀번호를 입력해주세요.')
          break
        }

        if (!isValidPasswordFormat(value)) {
          this.setErrorState(
            name,
            '숫자, 영어 조합 6자리 이상 입력해야 합니다.'
          )
          break
        }

        this.resetErrorState(name)
        break

      // 패스워드 유효성 검사 ---------------------------------------------

      case 'passwordConfirm':
        if (value.trim().length === 0) {
          this.setErrorState(name, '입력한 비밀번호를 다시 한번 입력해주세요.')
          break
        }

        if (!isValidPasswordConfirmFormat(password.trim(), value.trim())) {
          this.setErrorState(
            name,
            '입력한 비밀번호와 다릅니다. 확인 후, 다시 시도해보세요.'
          )
          break
        }

        this.resetErrorState(name)
        break

      default:
        throw new Error(
          '`email`, `password`, `passwordConfirm` 인풋 이름만 처리 가능합니다.'
        )
    }
  }

  render() {
    const { width, className = '', style, ...restProps } = this.props
    const {
      displayName,
      email,
      password,
      passwordConfirm,
      hasError,
    } = this.state

    const styles = {
      width,
      ...style,
    }

    return (
      <form
        className={classNames(form, className)}
        style={styles}
        noValidate
        {...restProps}
      >
        <IconInput
          icon="id-card"
          id="displayName"
          name="displayName"
          label="이름"
          placeholder="이름"
          focusedSelection
          className={control}
          value={displayName}
          onChange={this.handleChange}
          onBlur={this.handleBlurCheckValidFormat}
          error={hasError.displayName}
        />
        <IconInput
          email
          icon="letter"
          id="email"
          name="email"
          label="이메일"
          placeholder="아이디(이메일)"
          focusedSelection
          className={control}
          value={email}
          onChange={this.handleChange}
          onBlur={this.handleBlurCheckValidFormat}
          error={hasError.email}
        />
        <IconInput
          password
          icon="lock"
          id="password"
          name="password"
          label="비밀번호"
          placeholder="비밀번호"
          className={control}
          value={password}
          onChange={this.handleChange}
          onBlur={this.handleBlurCheckValidFormat}
          error={hasError.password}
        />
        <IconInput
          password
          icon="lock"
          id="passwordConfirm"
          name="passwordConfirm"
          label="비밀번호 확인"
          placeholder="비밀번호 확인"
          className={control}
          value={passwordConfirm}
          onChange={this.handleChange}
          onBlur={this.handleBlurCheckValidFormat}
          error={hasError.passwordConfirm}
        />
        <div className={buttonGroup}>
          <Button
            type="submit"
            className={button}
            disabled={this.confirmOfSubmitting()}
            onClick={this.handleSubmit}
          >
            회원가입
          </Button>
        </div>
      </form>
    )
  }
}

SignInForm.propTypes = {
  /** 폼 너비를 설정할 수 있습니다. */
  width: oneOfType([string, number]),
  /** 사용자 정의 클래스 이름을 추가할 수 있습니다. */
  className: string,
  /** 사용자 정의 스타일 객체를 설정할 수 있습니다. */
  style: object,
}

export default SignInForm
