import * as yup from 'yup'

export const authSchema = t => yup.object().shape({
  username: yup
    .string()
    .min(3, t('signup.symbols'))
    .max(20, t('signup.symbols'))
    .required(t('signup.require')),

  password: yup
    .string()
    .min(6, t('signup.symbolsPassword'))
    .required(t('signup.require')),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password'), null], t('signup.mastMutch')),
})
