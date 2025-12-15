import { Formik, Form, Field } from 'formik'
import axios from 'axios'
import { actions as currentChatActions } from '../assets/slices/currentValueChatSlice'
import { actions as modalActions } from '../assets/slices/modalSlice'
import { useDispatch } from 'react-redux'
import { channelSchema } from '../schemas/channelSchema'
import cn from 'classnames'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { clean } from 'leo-profanity'

export const ModalAddRenameChannel = ({
  initialValue,
  modalContext,
  statusModal,
  channelId,
  dataChannels,
  onClose,
}) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const initForm = {
    name: initialValue || '',
    error: false,
  }
  const onSubmit = async (values, formikHelpers) => {
    const { setSubmitting, setFieldValue, resetForm } = formikHelpers
    setFieldValue('error', false)
    const token = localStorage.getItem('token')
    const newName = clean(values.name)

    try {
      const response = await axios({
        method: modalContext.method,
        url: modalContext.url,
        data: { name: newName },
        headers: { Authorization: `Bearer ${token}` },
      })

      if (statusModal === 'add' || statusModal === 'rename') {
        dispatch(currentChatActions.changeCurrentChannel(response.data))
      }
      if (statusModal === 'add') {
        toast.success(t('succesAdd'))
      }
      if (statusModal === 'rename') {
        toast.success(t('succesRename'))
      }

      dispatch(modalActions.closeModal())
      resetForm()
    } catch (error) {
      console.error(t('networkError'), error)
      toast.error(t('networkError'))
      setFieldValue('error', true)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <Formik
      enableReinitialize={true}
      initialValues={initForm}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={channelSchema(t, channelId, dataChannels, statusModal)}
      onSubmit={ (values, formikHelpers) => {
        onSubmit(values, formikHelpers)
      }}
    >
      {({ isSubmitting, errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <Field autoFocus
              name="name"
              required
              id="name"
              className={cn('form-control mb-2', {
                'is-invalid': errors.name && touched.name,
              })}
            />
            <label htmlFor="name" className="visually-hidden">
              {t('modal.nameChannel')}
            </label>
          </div>

          {errors.name && touched.name && (
            <div className="invalid-feedback d-block">{errors.name}</div>
          )}
          <div className="d-flex justify-content-end">
            <button
              type="button"
              className="me-2 btn btn-secondary"
              disabled={isSubmitting}
              onClick={onClose}
            >
              {t('modal.cancel')}
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={isSubmitting}
            >
              {modalContext.modalButton}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  )
}
