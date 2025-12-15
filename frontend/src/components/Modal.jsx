import { actions as modalActions } from '../assets/slices/modalSlice'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { ModalDeleteChannel } from './ModalDeleteChannel'
import { ModalAddRenameChannel } from './ModalAddRenameChannel'

export const Modal = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const modal = useSelector(state => state.modalReducer)
  const { initialValue, statusModal, channelId } = modal

  const dataChannels = useSelector(state => state.channelsReducer)

  const modalContext = {
    modalTitle: '',
    modalButton: '',
    url: '',
    method: '',
  }

  switch (statusModal) {
    case 'rename':
      modalContext.modalTitle = t('modal.renameChannel')
      modalContext.modalButton = t('modal.rename')
      modalContext.url = `/api/v1/channels/${channelId}`
      modalContext.method = 'patch'
      break

    case 'add':
      modalContext.modalTitle = t('modal.addChannel')
      modalContext.modalButton = t('modal.send')
      modalContext.url = '/api/v1/channels'
      modalContext.method = 'post'
      break

    case 'delete':
      modalContext.modalTitle = t('modal.deleteChannel')
      modalContext.modalButton = t('modal.delete')
      modalContext.url = `/api/v1/channels/${channelId}`
      modalContext.method = 'delete'
      break

    default:
      toast.error(t('unknownRequest'))
      console.error(t('unknownRequest'))
      break
  }

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal())
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      style={{ display: 'block' }}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">{modalContext.modalTitle}</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={handleCloseModal}
            >
            </button>
          </div>
          <div className="modal-body">
            {statusModal === 'delete'
              ? (
                  <ModalDeleteChannel
                    modalContext={modalContext}
                    channelId={channelId}
                    dataChannels={dataChannels}
                    onClose={handleCloseModal}
                  />
                )
              : (
                  <ModalAddRenameChannel
                    initialValue={initialValue}
                    modalContext={modalContext}
                    statusModal={statusModal}
                    dataChannels={dataChannels}
                    channelId={channelId}
                    onClose={handleCloseModal}
                  />
                )}
          </div>
        </div>
      </div>
    </div>
  )
}
