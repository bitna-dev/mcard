import Form from '@components/login/Form'
import { LoginFormValues } from '@models/login'
import { auth } from '@remote/firebase'
import { FirebaseError } from 'firebase/app'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
const Login = () => {
  const navigate = useNavigate()
  const handleSubmit = useCallback(async (formValues: LoginFormValues) => {
    const { email, password } = formValues
    try {
      const user = await signInWithEmailAndPassword(auth, email, password)
      toast.success('로그인이 되었습니다.')
      navigate('/')
    } catch (error) {
      //firebase error
      if (error instanceof FirebaseError) {
        console.log(error.code)

        if (error.code === 'auth/invalid-credential') {
          toast.error('계정의 정보를 다시 확인해주세요.')
        }
        return
      } else {
        toast.error('잠시후 다시 시도해주세요.')
      }
    }
  }, [])
  return (
    <>
      <Form onSubmit={handleSubmit} />
    </>
  )
}

export default Login
