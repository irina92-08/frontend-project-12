import { useEffect } from 'react'

export const Messages = ({ data }) => {
  useEffect(() => {
    const container = document.getElementById('messages-box')
    if (container) {
      container.scrollTop = container.scrollHeight
    }
  }, [data])

  const messagesList = data.map((massege) => {
    return (
      <div className="text-break mb-2" key={massege.id}>
        <b>{massege.username}</b>
        :
        {massege.body}
      </div>
    )
  })
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messagesList}
    </div>
  )
}
