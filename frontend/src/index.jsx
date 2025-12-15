import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { FormLoging } from './components/Loging'
import { MainPage } from './components/MainPage'
import { NotFound } from './components/NotFound'
import { FormSignup } from './components/Signup'
import { useSelector } from 'react-redux'

const App = () => {
  const { isAuthenticated } = useSelector(state => state.authReducer)

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            isAuthenticated
              ? <MainPage />
              : <Navigate to="/login" replace />
          }
        />
        <Route path="/login" element={<FormLoging />} />
        <Route path="/signup" element={<FormSignup />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  )
}
export default App
