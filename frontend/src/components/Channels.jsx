import { actions as modalActions } from '../assets/slices/modalSlice'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'react-i18next'
import filter from 'leo-profanity'
import { actions as currentChatActions } from '../assets/slices/currentValueChatSlice'
import cn from 'classnames'

export const Channels = ({ data, currentChannel }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()

  const handleRenameClick = (channel) => {
    dispatch(modalActions.openRenameModal(channel))
  }

  const channelList = data.map(channel => (
    <li key={channel.id} className="nav-item w-100" id={channel.id}>
      {channel.id > 2 && (
        <div role="group" className="d-flex dropdown btn-group">
          <button
            type="button"
            className={cn('w-100 rounded-0 text-start btn text-truncate', {
              'btn-secondary': channel.id === currentChannel,
            })}
            onClick={() => {
              dispatch(currentChatActions.changeCurrentChannel(channel))
            }}
          >
            <span className="me-1">#</span>
            {filter.clean(channel.name)}
          </button>
          <button
            type="button"
            id={channel.id}
            aria-expanded="true"
            data-bs-toggle="dropdown"
            className=" dropdown-toggle dropdown-toggle-split btn"
          >
            <span className="visually-hidden">
              {t('mainPage.managementChannel')}
            </span>
          </button>
          <div
            aria-labelledby={channel.id}
            className="dropdown-menu dropdown-menu-end"
          >
            <a
              className="dropdown-item"
              role="button"
              onClick={() => dispatch(modalActions.openDeleteModal(channel))}
            >
              {t('mainPage.delete')}
            </a>
            <a
              className="dropdown-item"
              role="button"
              onClick={() => handleRenameClick(channel)}
            >
              {t('mainPage.rename')}
            </a>
          </div>
        </div>
      )}
      {channel.id < 3 && (
        <button
          type="button"
          className={cn('w-100 rounded-0 text-start btn', {
            'btn-secondary': channel.id === currentChannel,
          })}
          onClick={() => {
            dispatch(currentChatActions.changeCurrentChannel(channel))
          }}
        >
          <span className="me-1">#</span>
          {filter.clean(channel.name)}
        </button>
      )}
    </li>
  ))

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channelList}
    </ul>
  )
}
