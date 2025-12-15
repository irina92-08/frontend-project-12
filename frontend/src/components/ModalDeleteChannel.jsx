import { actions as currentChatActions } from '../assets/slices/currentValueChatSlice'
import { actions as modalActions } from '../assets/slices/modalSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import axios from 'axios'

export const ModalDeleteChannel = ({ modalContext, channelId, dataChannels, onClose }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const handleDelete = async () => {
    const token = localStorage.getItem('token')

    try {
      await axios({
        method: modalContext.method,
        url: modalContext.url,
        headers: { Authorization: `Bearer ${token}` },
      })

      const channels = dataChannels.channels
      const remainingChannels = channels.filter(ch => ch.id !== channelId)
      if (remainingChannels.length > 0) {
        dispatch(currentChatActions.changeCurrentChannel(remainingChannels[0]))
      }
      toast.success(t('succesDelete'))
      dispatch(modalActions.closeModal())
    }
    catch (error) {
      console.error(t('networkError'), error)
      toast.error(t('networkError'))
    }
  }

  return (
    <>
      <p className="lead">{t('modal.areYouSure')}</p>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={onClose}
        >
          {t('modal.cancel')}
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          {modalContext.modalButton}
        </button>
      </div>
    </>
  )
}
