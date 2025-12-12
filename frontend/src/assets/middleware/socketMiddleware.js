import { io } from 'socket.io-client'
import { actions as messagesActions } from '../slices/messagesSlice'
import { actions as channelsActions } from '../slices/channelsSlice'
import { toast } from 'react-toastify'
import rollbar from '../../../rollbar-config'
import i18n from '../../../i18n'

let socket = null

export const socketMiddleware = store => next => action => {
  if (!socket) {
    socket = io()

    socket.on('connect_error', error => {
      console.error('Socket connection error:', error)
      toast.error(i18n.t('networkError'))
      rollbar.error('Ошибка соединения сокета')
    })

    // socket.on("error", (error) => {
    //   console.error("Socket error:", error);
    //   toast.error('Произошла ошибка при работе с сокетом');
    // });

    // socket.on("disconnect", (reason) => {
    //   console.warn("Socket disconnected:", reason);
    //   if (reason === 'io server disconnect') {
    //     socket.connect();
    //   }
    //   toast.warning('Соединение прервано');
    // });

    socket.on('newMessage', payload => {
      store.dispatch(messagesActions.addMessage(payload))
    })

    socket.on('newChannel', payload => {
      store.dispatch(channelsActions.addChannel(payload))
      console.log(payload) // { id: 6, name: "new channel", removable: true }
    })

    socket.on('removeChannel', payload => {
      console.log(payload) // { id: 6 };
      store.dispatch(channelsActions.removeChannel(payload))
    })

    socket.on('renameChannel', payload => {
      console.log(payload) // { id: 7, name: "new name channel", removable: true }
      store.dispatch(channelsActions.renameChannel(payload))
    })
  }

  return next(action)
}
