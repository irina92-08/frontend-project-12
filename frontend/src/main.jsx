import App from './index.jsx'
import ReactDom from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'
import { Provider } from 'react-redux'
import store from './assets/slices/index.js'
import { i18nInit } from './i18n.js'

import ErrorBoundary from './ErrorBoundary.jsx'

const initApp = async () => {
  await i18nInit()
  const container = document.getElementById('chat')
  const root = ReactDom.createRoot(container)
  root.render(
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>,
  )
}

initApp()
