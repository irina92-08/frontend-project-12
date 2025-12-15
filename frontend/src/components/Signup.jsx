import { Formik, Form, Field } from 'formik'
import signupImg from '../assets/images/signup.jpg'
import cn from 'classnames'
import { actions as currentChatActions } from '../assets/slices/currentValueChatSlice'
import { actions as authActions } from '../assets/slices/authSlice'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import { Header } from './Header'
import { authSchema } from '../schemas/authSchema'

export const FormSignup = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { t } = useTranslation()

  const initForm = {
    username: '',
    password: '',
    confirmPassword: '',
  }

  const onSubmit = async (values, formikHelpers) => {
    const { setSubmitting, setFieldError } = formikHelpers
    await axios
      .post('api/v1/signup', values)
      .then((response) => {
        const { token, username } = response.data

        dispatch(
          currentChatActions.setCurrentUserName(username),
        )
        dispatch(authActions.loginSuccess({ token }))
        navigate('/')
        setSubmitting(false)
      })
      .catch((error) => {
        if (!error.response) {
          toast.error(t('networkError'))
          setFieldError('form', t('networkError'))
        }
        if (error.response?.status === 409) {
          setFieldError('username', t('signup.userExists'))
        }
        else {
          setFieldError(
            'form',
            t('signup.errorRegistration'),
          )
        }
        setSubmitting(false)
      })
  }

  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header />
        <div className="container-fluid h-100">
          <div className="row justify-content-center align-content-center h-100">
            <div className="col-12 col-md-8 col-xxl-6">
              <div className="card shadow-sm">
                <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                  <div>
                    <img
                      src={signupImg}
                      className="rounded-circle"
                      alt={t('signup.registration')}
                    />
                  </div>
                  <Formik
                    initialValues={initForm}
                    validateOnChange={true}
                    validateOnBlur={false}
                    validationSchema={authSchema(t)}
                    onSubmit={async (values, formikHelpers) => {
                      onSubmit(values, formikHelpers)
                    }}
                  >
                    {({ errors, isSubmitting, handleSubmit, touched }) => (
                      <Form className="w-50" onSubmit={handleSubmit}>
                        <h1 className="text-center mb-4">
                          {t('signup.registration')}
                        </h1>
                        <div className="form-floating mb-3">
                          <Field
                            autoFocus
                            placeholder={t('signup.symbols')}
                            name="username"
                            autoComplete="username"
                            id="username"
                            className={cn('form-control', {
                              'is-invalid': errors.username && touched.username,
                            })}
                          />
                          <label className="form-label" htmlFor="username">
                            {t('signup.username')}
                          </label>
                          {errors.username && touched.username && (
                            <div className="invalid-tooltip">
                              {errors.username}
                            </div>
                          )}
                        </div>
                        <div className="form-floating mb-3">
                          <Field
                            placeholder={t('signup.symbolsPassword')}
                            name="password"
                            aria-describedby="passwordHelpBlock"
                            autoComplete="new-password"
                            type="password"
                            id="password"
                            className={cn('form-control', {
                              'is-invalid': errors.password && touched.password,
                            })}
                          />
                          {errors.password && touched.password && (
                            <div className="invalid-tooltip">
                              {errors.password}
                            </div>
                          )}
                          <label className="form-label" htmlFor="password">
                            {t('signup.password')}
                          </label>
                        </div>
                        <div className="form-floating mb-4">
                          <Field
                            placeholder={t('signup.mastMutch')}
                            name="confirmPassword"
                            autoComplete="new-password"
                            type="password"
                            id="confirmPassword"
                            className={cn('form-control', {
                              'is-invalid':
                                errors.confirmPassword
                                && touched.confirmPassword,
                            })}
                          />
                          {errors.confirmPassword
                            && touched.confirmPassword && (
                            <div className="invalid-tooltip">
                              {errors.confirmPassword}
                            </div>
                          )}
                          <label
                            className="form-label"
                            htmlFor="confirmPassword"
                          >
                            {t('signup.confirm')}
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="w-100 btn btn-outline-primary"
                          disabled={isSubmitting}
                        >
                          {t('signup.registr')}
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  )
}
