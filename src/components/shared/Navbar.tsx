import { useCallback } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Button from './Button'
import Flex from './Flex'
import { css } from '@emotion/react'
import { colors } from '@styles/colorPalette'
import useUser from '@hooks/auth/useUser'
import { signOut } from 'firebase/auth'
import { auth } from '@remote/firebase'
import { toast } from 'react-toastify'

const Navbar = () => {
  const user = useUser()

  const { pathname } = useLocation()
  const showSignButton = ['/signup', '/login'].includes(pathname) === false
  const handleLogout = async () => {
    await signOut(auth)
    toast.success('로그아웃되었습니다.')
  }
  const renderButton = useCallback(() => {
    if (user != null) {
      return <Button onClick={handleLogout}>로그아웃</Button>
    }
    if (showSignButton) {
      return (
        <Link to="/login">
          <Button weak>로그인/회원가입</Button>
        </Link>
      )
    }
    return null
  }, [showSignButton, user])

  return (
    <Flex justify="space-between" align="center" css={navBarContainerStyles}>
      <Link to="/">logo</Link>
      {renderButton()}
    </Flex>
  )
}
const navBarContainerStyles = css`
  padding: 10px 24px;
  position: sticky;
  top: 0;
  background-color: ${colors.white};
  z-index: 10;
  border: 1px solid ${colors.grey};
`
export default Navbar
