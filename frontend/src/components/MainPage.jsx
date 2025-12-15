import axios from 'axios'
import { actions as channelsActions } from '../assets/slices/channelsSlice'
import { actions as messagesActions } from '../assets/slices/messagesSlice'
import { actions as modalActions } from '../assets/slices/modalSlice'
import { Modal } from './Modal'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { ToastContainer, toast } from 'react-toastify'
import rollbar from '../../rollbar-config'
import { Channels } from './Channels'
import { Messages } from './Messages'
import filter from 'leo-profanity'
import { Header } from './Header'

export const MainPage = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }

        const [channelsResponse, messagesResponse] = await Promise.all([
          axios.get('/api/v1/channels', { headers }),
          axios.get('/api/v1/messages', { headers }),
        ])
        const filteredChannels = channelsResponse.data.map(channel => ({
          ...channel,
          name: filter.clean(channel.name),
        }))
        dispatch(channelsActions.setChannels(filteredChannels))
        dispatch(messagesActions.setMessages(messagesResponse.data))
      }
      catch (error) {
        if (!error.response) {
          toast.error(t('networkError'))
          rollbar.error('Ошибка получения данных')
        }
      }
    }
    fetchData()
  }, [dispatch, t])

  const dataChannels = useSelector(state => state.channelsReducer)
  const dataMessages = useSelector(state => state.messagesReducer)
  const modalOpen = useSelector(state => state.modalReducer.activeModal)
  const idChannel = useSelector(state => state.currentChatReducer.idChannel)
  const nameChannel = useSelector(
    state => state.currentChatReducer.nameChannel,
  )
  const currentDataMessages = dataMessages.messages.filter(
    message => message.channelId === idChannel,
  )
  const nameUser = useSelector(state => state.currentChatReducer.userName)

  const handleSubmitMessage = (e) => {
    e.preventDefault()
    const text = e.target.elements.body.value
    const newText = filter.clean(text)
    const button = e.target.querySelector('button[type="submit"]')
    button.disabled = true

    const newMessage = {
      body: newText,
      channelId: idChannel,
      username: nameUser,
    }
    const token = localStorage.getItem('token')

    axios
      .post('/api/v1/messages', newMessage, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => (e.target.elements.body.value = ''))
      .catch((error) => {
        if (!error.response) {
          toast.error(t('networkError'))
          rollbar.error('Ошибка при отправке сообщения')
        }
      })
      .finally(() => {
        button.disabled = false
      })
  }

  const handleChannel = () => {
    dispatch(modalActions.openModal())
  }

  const declensionWord = (num) => {
    const numInWord = num.toString()
    if (numInWord.slice(-1) === '1' && numInWord.slice(-2) !== '11') {
      return `${num} сообщение`
    }
    if (Number(numInWord.slice(-1)) > 1 && Number(numInWord.slice(-1)) < 5) {
      return `${num} сообщения`
    }
    else {
      return `${num} сообщений`
    }
  }
  return (
    <>
      <div className="d-flex flex-column h-100">
        <Header button />
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>{t('mainPage.channels')}</b>
                <button
                  type="button"
                  className="p-0 text-primary btn btn-group-vertical"
                  onClick={handleChannel}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-plus-square"
                  >
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"></path>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"></path>
                  </svg>
                  <span className="visually-hidden">
                    {t('mainPage.addSymbol')}
                  </span>
                </button>
              </div>
              <Channels
                data={dataChannels.channels}
                currentChannel={idChannel}
              />
            </div>
            <div className="col p-0 h-100">
              <div className="d-flex flex-column h-100">
                <div className="bg-light mb-4 p-3 shadow-sm small">
                  <p className="m-0">
                    <b>
                      #
                      {nameChannel}
                    </b>
                  </p>
                  <span className="text-muted">
                    {declensionWord(currentDataMessages.length)}
                  </span>
                </div>

                <Messages data={currentDataMessages} />

                <div className="mt-auto px-5 py-3">
                  <form
                    className="py-1 border rounded-2"
                    onSubmit={handleSubmitMessage}
                  >
                    <div className="input-group has-validation">
                      <input
                        name="body"
                        aria-label={t('mainPage.newMessage')}
                        placeholder={t('mainPage.message')}
                        className="border-0 p-0 ps-2 form-control"
                        autoFocus
                      />
                      <button type="submit" className="btn btn-group-vertical">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 16 16"
                          width="20"
                          height="20"
                          fill="currentColor"
                          className="bi bi-arrow-right-square"
                        >
                          <path d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1zM0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"></path>
                        </svg>
                        <span className="visually-hidden">
                          {t('mainPage.send')}
                        </span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
      {modalOpen && <Modal />}
    </>
  )
}
