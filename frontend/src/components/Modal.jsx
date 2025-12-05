import { Formik, Form, Field } from "formik";
import axios from "axios";
import { actions as currentChatActions } from "../assets/slices/currentValueChatSlice";
import { actions as modalActions } from "../assets/slices/modalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as yup from "yup";
import cn from "classnames";

// Выносим FormikModal в отдельный компонент
const FormikModal = ({
  initialValue,
  modalContext,
  statusModal,
  channelId,
  dataChannels,
  onClose,
}) => {
  const dispatch = useDispatch();

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "от 3 до 20 символов")
      .max(20, "от 3 до 20 символов")
      .required("Обязательное поле")
      .test("unique-name", "Должно быть уникальным", function (value) {
        const dataNames = dataChannels.channels
          .filter((channel) => {
            // При переименовании исключаем текущий канал из проверки
            if (statusModal === "rename" && channelId) {
              return channel.id !== channelId;
            }
            return true;
          })
          .map((channel) => channel.name);

        return !dataNames.includes(value);
      }),
  });

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        name: initialValue || "",
        error: false,
      }}
      validateOnChange={true}
      validateOnBlur={true}
      validationSchema={schema}
      onSubmit={async (values, { setSubmitting, setFieldValue, resetForm }) => {
        setFieldValue("error", false);
        const token = localStorage.getItem("token");

        try {
          const response = await axios({
            method: modalContext.method,
            url: modalContext.url,
            data: { name: values.name },
            headers: { Authorization: `Bearer ${token}` },
          });

          if (statusModal === "add" || statusModal === "rename") {
            dispatch(currentChatActions.changeCurrentChannel(response.data));
          }

          dispatch(modalActions.closeModal());
          resetForm();
        } catch (error) {
          console.error("Ошибка при отправке формы:", error);
          setFieldValue("error", true);
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ isSubmitting, errors, touched, handleSubmit }) => (
        <Form onSubmit={handleSubmit}>
          <div>
            <Field
              name="name"
              required
              id="name"
              className={cn("form-control mb-2", {
                "is-invalid": errors.name && touched.name,
              })}
              autoFocus
            />
            <label htmlFor="name" className="visually-hidden">
              Имя канала
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
              Отменить
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
  );
};

// Выносим DeleteModal в отдельный компонент
const DeleteModal = ({ modalContext, channelId, dataChannels, onClose }) => {
  const dispatch = useDispatch();

  const handleDelete = async () => {
    const token = localStorage.getItem("token");

    try {
      await axios({
        method: modalContext.method,
        url: modalContext.url,
        headers: { Authorization: `Bearer ${token}` },
      });

      // Если удален текущий канал, переключаемся на первый доступный
      const channels = dataChannels.channels;
      const remainingChannels = channels.filter((ch) => ch.id !== channelId);
      if (remainingChannels.length > 0) {
        dispatch(currentChatActions.changeCurrentChannel(remainingChannels[0]));
      }

      dispatch(modalActions.closeModal());
    } catch (error) {
      console.error("Ошибка при удалении канала:", error);
    }
  };

  return (
    <>
      <p className="lead">Уверены?</p>
      <div className="d-flex justify-content-end">
        <button
          type="button"
          className="me-2 btn btn-secondary"
          onClick={onClose}
        >
          Отменить
        </button>
        <button type="button" className="btn btn-danger" onClick={handleDelete}>
          {modalContext.modalButton}
        </button>
      </div>
    </>
  );
};

// Основной компонент Modal
export const Modal = () => {
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modalReducer);
  const { initialValue, statusModal, channelId } = modal;

  const dataChannels = useSelector((state) => state.channelsReducer);

  // Инициализация modalContext с значениями по умолчанию
  const modalContext = {
    modalTitle: "",
    modalButton: "",
    url: "",
    method: "",
  };

  // Исправленный switch-case с break
  switch (statusModal) {
    case "rename":
      modalContext.modalTitle = "Переименовать канал";
      modalContext.modalButton = "Переименовать";
      modalContext.url = `/api/v1/channels/${channelId}`;
      modalContext.method = "patch";
      break;

    case "add":
      modalContext.modalTitle = "Добавить канал";
      modalContext.modalButton = "Отправить";
      modalContext.url = `/api/v1/channels`;
      modalContext.method = "post";
      break;

    case "delete":
      modalContext.modalTitle = "Удалить канал";
      modalContext.modalButton = "Удалить";
      modalContext.url = `/api/v1/channels/${channelId}`;
      modalContext.method = "delete";
      break;

    default:
      // modalContext.modalTitle = "Модальное окно";
      // modalContext.modalButton = "Подтвердить";
      console.log("Неизвестный запрос");
      break;
  }

  const handleCloseModal = () => {
    dispatch(modalActions.closeModal());
  };

  // // Если модальное окно не должно отображаться
  // if (!statusModal) {
  //   return null;
  // }

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      style={{ display: "block" }}
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
            ></button>
          </div>
          <div className="modal-body">
            {statusModal === "delete" ? (
              <DeleteModal
                modalContext={modalContext}
                channelId={channelId}
                dataChannels={dataChannels}
                onClose={handleCloseModal}
              />
            ) : (
              <FormikModal
                initialValue={initialValue}
                modalContext={modalContext}
                statusModal={statusModal}
                channelId={channelId}
                dataChannels={dataChannels}
                onClose={handleCloseModal}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
