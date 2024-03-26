import Form from '@components/signup/Form'
import { SignupFormValues } from '@models/signup'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth, store } from '@remote/firebase'
import { toast } from 'react-toastify'
import { collection, doc, setDoc } from 'firebase/firestore'
import { COLLECTIONS } from '@constants/index'

const Signup = () => {
  const handleSubmit = async (formValues: SignupFormValues) => {
    const { email, password, name } = formValues
    const { user } = await createUserWithEmailAndPassword(auth, email, password)
    await updateProfile(user, {
      displayName: name,
    })
    const newUser = {
      uid: user.displayName,
      email: user.email,
      displayName: name,
    }
    await setDoc(doc(collection(store, COLLECTIONS.USER), user.uid), newUser)

    toast.success('회원가입이 완료되었습니다.')
  }
  return (
    <div>
      <Form onSubmit={handleSubmit} />
    </div>
  )
}

export default Signup
