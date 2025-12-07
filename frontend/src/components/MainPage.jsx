import axios from "axios";
import { actions as channelsActions } from "../assets/slices/channelsSlice";
import { actions as messagesActions } from "../assets/slices/messagesSlice";
import { actions as modalActions } from "../assets/slices/modalSlice";
import { actions as currentChatActions } from "../assets/slices/currentValueChatSlice";
import { Modal } from "./Modal";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Channels = ({ data, currentChannel }) => {
  const dispatch = useDispatch();

  const handleRenameClick = (channel) => {
    dispatch(modalActions.openRenameModal(channel));
  };

  const channelList = data.map((channel) => (
    <li key={channel.id} className="nav-item w-100" id={channel.id}>
      {channel.id > 2 && (
        <div role="group" className="d-flex dropdown btn-group">
          <button
            type="button"
            className={cn("w-100 rounded-0 text-start btn text-truncate", {
              "btn-secondary": channel.id === currentChannel,
            })}
            onClick={() => {
              dispatch(currentChatActions.changeCurrentChannel(channel));
            }}
          >
            <span className="me-1">#</span>
            {channel.name}
          </button>
          <button
            type="button"
            id={channel.id}
            aria-expanded="true"
            data-bs-toggle="dropdown"
            className=" dropdown-toggle dropdown-toggle-split btn"
          >
            <span className="visually-hidden">Управление каналом</span>
          </button>
          <div
            aria-labelledby={channel.id}
            className="dropdown-menu dropdown-menu-end"
          >
            <a
              className="dropdown-item"
              role="button"
              href="#"
              onClick={() => dispatch(modalActions.openDeleteModal(channel))}
            >
              Удалить
            </a>
            <a
              className="dropdown-item"
              role="button"
              href="#"
              onClick={() => handleRenameClick(channel)}
            >
              Переименовать
            </a>
          </div>
        </div>
      )}
      {channel.id < 3 && (
        <button
          type="button"
          className={cn("w-100 rounded-0 text-start btn", {
            "btn-secondary": channel.id === currentChannel,
          })}
          onClick={() => {
            dispatch(currentChatActions.changeCurrentChannel(channel));
          }}
        >
          <span className="me-1">#</span>
          {channel.name}
        </button>
      )}
    </li>
  ));

  return (
    <ul
      id="channels-box"
      className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block"
    >
      {channelList}
    </ul>
  );
};

const Messages = ({ data }) => {
  console.log(data);

  const messagesList = data.map((massege) => {
    return (
      <div className="text-break mb-2" key={massege.id}>
        <b>{massege.username}</b>:{massege.body}
      </div>
    );
  });
  return (
    <div id="messages-box" className="chat-messages overflow-auto px-5 ">
      {messagesList}
    </div>
  );
};

export const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      const headers = { Authorization: `Bearer ${token}` };

      const [channelsResponse, messagesResponse] = await Promise.all([
        axios.get("/api/v1/channels", { headers }),
        axios.get("/api/v1/messages", { headers }),
      ]);
      console.log("messagesResponse.data", messagesResponse.data);
      dispatch(channelsActions.setChannels(channelsResponse.data));
      dispatch(messagesActions.setMessages(messagesResponse.data));
    };

    fetchData();
  }, [dispatch]);
  const dataChannels = useSelector((state) => state.channelsReducer);
  const dataMessages = useSelector((state) => state.messagesReducer);
  const modalOpen = useSelector((state) => state.modalReducer.activeModal);

  const idChannel = useSelector((state) => state.currentChatReducer.idChannel);
  const nameChannel = useSelector(
    (state) => state.currentChatReducer.nameChannel,
  );

  const currentDataMessages = dataMessages.messages.filter(
    (message) => message.channelId === idChannel,
  );

  const nameUser = useSelector((state) => state.currentChatReducer.userName);

  const handleSubmitMessage = (e) => {
    e.preventDefault();

    const text = e.target.elements.body.value;
    e.target.elements.body.value = "";
    console.log(e);

    const newMessage = { body: text, channelId: idChannel, username: nameUser };
    const token = localStorage.getItem("token");

    axios.post("/api/v1/messages", newMessage, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  const handleChannel = () => {
    dispatch(modalActions.openModal());
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
    return;
  };
  return (
    <>
      <div className="d-flex flex-column h-100">
        <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
          <div className="container">
            <a className="navbar-brand" href="/">
              Hexlet Chat
            </a>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>
        </nav>
        <div className="container h-100 my-4 overflow-hidden rounded shadow">
          <div className="row h-100 bg-white flex-md-row">
            <div className="col-4 col-md-2 border-end px-0 bg-light flex-column h-100 d-flex">
              <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
                <b>Каналы</b>
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
                  <span className="visually-hidden">+</span>
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
                    <b># {nameChannel} </b>
                  </p>
                  <span className="text-muted">
                    {currentDataMessages.length} сообщений
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
                        aria-label="Новое сообщение"
                        placeholder="Введите сообщение..."
                        className="border-0 p-0 ps-2 form-control"
                        
                      />
                      <button
                        type="submit"
                        //disabled=""
                        className="btn btn-group-vertical"
                      >
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
                        <span className="visually-hidden">Отправить</span>
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="Toastify"></div>
      {modalOpen && <Modal />}
    </>
  );
};
