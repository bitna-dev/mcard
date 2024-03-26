import FixedBottomButton from '@shared/FixedBottomButton'
import Flex from '@shared/Flex'
import TextField from '@shared/TextField'
import { css } from '@emotion/react'
import Spacing from '@components/shared/Spacing'
import { ChangeEvent, useCallback, useState, useMemo } from 'react'
import { SignupFormValues } from '@models/signup'
import validator from 'validator'

const Form = ({
  onSubmit,
}: {
  onSubmit: (formValues: SignupFormValues) => void
}) => {
  const [formValues, setFormValues] = useState<SignupFormValues>({
    email: '',
    password: '',
    rePassword: '',
    name: '',
  })
  const [dirty, setDirty] = useState<Partial<SignupFormValues>>({})
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: true,
    }))
  }, [])

  const errors = useMemo(() => validate(formValues), [formValues])
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))
  }, [])

  const submitAble = Object.keys(errors).length === 0

  return (
    <Flex direction="column" css={formContainerStyles}>
      <TextField
        label="이메일"
        placeholder="abc@gmail.com"
        value={formValues.email}
        onChange={handleFormValues}
        name="email"
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : null}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        type="password"
        value={formValues.password}
        onChange={handleFormValues}
        name="password"
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : null}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호 재확인"
        type="password"
        value={formValues.rePassword}
        onChange={handleFormValues}
        name="rePassword"
        hasError={Boolean(dirty.password) && Boolean(errors.rePassword)}
        helpMessage={Boolean(dirty.password) ? errors.rePassword : null}
        onBlur={handleBlur}
      />
      <Spacing size={16} />
      <TextField
        label="이름"
        placeholder="m-card"
        value={formValues.name}
        onChange={handleFormValues}
        name="name"
        hasError={Boolean(dirty.name) && Boolean(errors.name)}
        helpMessage={Boolean(dirty.name) ? errors.name : null}
        onBlur={handleBlur}
      />
      <FixedBottomButton
        disabled={submitAble === false}
        label="회원가입"
        onClick={() => {
          onSubmit(formValues)
        }}
      />
    </Flex>
  )
}

export default Form

const formContainerStyles = css`
  padding: 24px;
`

const validate = (formValues: SignupFormValues) => {
  let errors: Partial<SignupFormValues> = {}
  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8자이상 입력해주세요.'
  }
  if (formValues.rePassword.length < 8) {
    errors.rePassword = '비밀번호를 8자이상 입력해주세요.'
  } else if (
    validator.equals(formValues.password, formValues.rePassword) === false
  ) {
    errors.rePassword = '비밀번호가 일치하지않습니다.'
  }
  if (formValues.name.length < 2) {
    errors.name = '이름을 2자 이상 입력해주세요.'
  }
  return errors
}
