import { Formik, Form, Field } from "formik";
import axios from "axios";
import { actions as currentChatActions } from "../assets/slices/currentValueChatSlice";
import { actions as channelsActions } from "../assets/slices/channelsSlice";
import { useDispatch } from "react-redux";

export const Modal = () => {
  const dispatch = useDispatch();
  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fade modal show"
      style={{display: "block"}}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <div className="modal-title h4">Добавить канал</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{
                name: "",
                error: false,
              }}
              onSubmit={async (
                values,
                { setSubmitting, setFieldValue, resetForm },
              ) => {
                setFieldValue("error", false);
                const token = localStorage.getItem("token");
                await axios
                  .post("/api/v1/channels", values, {
                    headers: {
                      Authorization: `Bearer ${token}`,
                    },
                  })
                  .then((response) => {
                    //const { id, name } = response.data;
                    dispatch(
                      currentChatActions.changeCurrentChannel(response.data),
                    );
                    dispatch(channelsActions.addChannel(response.data));
                    setSubmitting(false);
                    resetForm();
                  })
                  .catch((error) => {
                    console.log(error);
                    setFieldValue("error", true);
                  });
              }}
            >
              {({ isSubmitting, values }) => (
                <Form>
                  <div>
                    <Field
                      name="name"
                      required=""
                      id="name"
                      className="form-control mb-2"
                    />
                    <label htmlFor="name" className="visually-hidden">
                      Имя канала
                    </label>
                  </div>

                  {values.error && (
                    <div className="invalid-feedback">от 3 до 20 символов</div>
                  )}
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      disabled={isSubmitting}
                    >
                      Отменить
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary"
                      disabled={isSubmitting}
                    >
                      Отправить
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};
