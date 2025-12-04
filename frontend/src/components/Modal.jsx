import { Formik, Form, Field } from "formik";
import axios from "axios";
import { actions as currentChatActions } from "../assets/slices/currentValueChatSlice";
import { actions as modalActions } from "../assets/slices/modalSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import * as yup from "yup";
import cn from "classnames";

export const Modal = () => {
  const dispatch = useDispatch();
  const dataChannels = useSelector((state) => state.channelsReducer);

  const schema = yup.object().shape({
    name: yup
      .string()
      .min(3, "от 3 до 20 символов")
      .max(20, "от 3 до 20 символов")
      .required("Обязательное поле")
      .test("unique-name", "Дожно быть уникальным", function (value) {
        const dataNames = dataChannels.channels.map((channel) => channel.name);

        return !dataNames.includes(value);
      }),
  });

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
            <div className="modal-title h4">Добавить канал</div>
            <button
              type="button"
              aria-label="Close"
              data-bs-dismiss="modal"
              className="btn btn-close"
              onClick={() => dispatch(modalActions.changesModal(false))}
            ></button>
          </div>
          <div className="modal-body">
            <Formik
              initialValues={{
                name: "",
                error: false,
              }}
              validateOnChange={true}
              validateOnBlur={true}
              validationSchema={schema}
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

                    setSubmitting(false);
                    resetForm();
                  })
                  .catch((error) => {
                    console.log(error);
                    setFieldValue("error", true);
                  });
              }}
            >
              {({ isSubmitting, errors, handleSubmit }) => (
                <Form onSubmit={handleSubmit}>
                  <div>
                    <Field
                      name="name"
                      required=""
                      id="name"
                      className={cn("form-control mb-2", {
                        "is-invalid": errors.name,
                      })}
                    />
                    <label htmlFor="name" className="visually-hidden">
                      Имя канала
                    </label>
                  </div>

                  {errors.name && (
                    <div className="invalid-feedback d-block">
                      {errors.name}
                    </div>
                  )}
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="me-2 btn btn-secondary"
                      disabled={isSubmitting}
                      onClick={() => dispatch(modalActions.changesModal(false))}
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
