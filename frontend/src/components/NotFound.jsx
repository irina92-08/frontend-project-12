import notFoundImg from '../assets/images/404.svg'
import { useTranslation } from 'react-i18next'
import { Header } from './Header'

export const NotFound = () => {
  const { t } = useTranslation()
  return (
    <div className="d-flex flex-column h-100">
      <Header />
      <div className="text-center">
        <img
          alt={t('notFound.notFoundText')}
          className="img-fluid h-25"
          src={notFoundImg}
        />
        <h1 className="h4 text-muted">{t('notFound.notFoundText')}</h1>
        <p className="text-muted">
          {t('notFound.text')}
          <a href="/">
            {' '}
            {t('notFound.mainPageLink')}
          </a>
        </p>
      </div>
    </div>
  )
}
