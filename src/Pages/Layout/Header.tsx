
import { useNavigate } from 'react-router-dom'

type Props = {}

const Header = (props: Props) => {
  const navigate = useNavigate()
  return (
    <div>
      <div onClick={() => {navigate('/home')}}>homePage</div>
      <div onClick={() => {navigate('/register')}}>register</div>
      <div onClick={() => {navigate('/login')}}>Login</div>
    </div>
  )
}

export default Header
