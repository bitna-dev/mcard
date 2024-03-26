import Button from '@components/shared/Button'
import FixedBottomButton from '@components/shared/FixedBottomButton'
import Flex from '@components/shared/Flex'
import Spacing from '@components/shared/Spacing'
import TextField from '@components/shared/TextField'
import { css } from '@emotion/react'
import { LoginFormValues } from '@models/login'
import { ChangeEvent, useCallback, useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { colors } from '@styles/colorPalette'
import validator from 'validator'

const Form = ({
  onSubmit,
}: {
  onSubmit: (formValues: LoginFormValues) => void
}) => {
  const navigate = useNavigate()

  const [formValues, setFormValues] = useState<LoginFormValues>({
    email: '',
    password: '',
  })
  const handleFormValues = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormValues((prevFormValues) => ({
      ...prevFormValues,
      [name]: value,
    }))
  }, [])
  const [dirty, setDirty] = useState<Partial<LoginFormValues>>({})
  const handleBlur = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setDirty((prevDirty) => ({
      ...prevDirty,
      [e.target.name]: true,
    }))
  }, [])
  const errors = useMemo(() => validate(formValues), [formValues])

  const submitAble = Object.keys(errors).length === 0
  return (
    <Flex css={formContainerStyles} direction="column">
      <TextField
        label="이메일"
        placeholder="abc@gmail.com"
        name="email"
        value={formValues.email}
        onBlur={handleBlur}
        onChange={handleFormValues}
        hasError={Boolean(dirty.email) && Boolean(errors.email)}
        helpMessage={Boolean(dirty.email) ? errors.email : null}
      />
      <Spacing size={16} />
      <TextField
        label="비밀번호"
        type="password"
        name="password"
        value={formValues.password}
        onBlur={handleBlur}
        onChange={handleFormValues}
        hasError={Boolean(dirty.password) && Boolean(errors.password)}
        helpMessage={Boolean(dirty.password) ? errors.password : null}
      />
      <Spacing size={16} />
      <Link to="/signup" css={SignupContainerStyles}>
        아직 계정이 없으세요?{' '}
      </Link>
      <FixedBottomButton
        disabled={submitAble === false}
        label="로그인"
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

const SignupContainerStyles = css`
  border: none;
  color: ${colors.darkGrey};
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  &:hover {
    color: ${colors.black};
    text-decoration: ${colors.darkGrey} underline;
  }
`

const validate = (formValues: LoginFormValues) => {
  let errors: Partial<LoginFormValues> = {}
  if (validator.isEmail(formValues.email) === false) {
    errors.email = '이메일 형식을 확인해주세요.'
  }
  if (formValues.password.length < 8) {
    errors.password = '비밀번호를 8자이상 입력해주세요.'
  }
  return errors
}
