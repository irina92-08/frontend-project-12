import { actions as authActions } from '../assets/slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

export const Header = ( {button} ) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const handleLogout = () => {
    dispatch(authActions.logout())
    navigate('/login')
    return
  }
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/login">
          Hexlet Chat
        </a>
        {button && (
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleLogout}
          >
            {t('mainPage.exit')}
          </button>
        )}
      </div>
    </nav>
  )
}
