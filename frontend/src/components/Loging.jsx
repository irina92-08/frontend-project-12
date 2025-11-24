import { Formik, Form, Field } from "formik";
import logingImg from "../assets/images/loging.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cn from "classnames";

export const FormComponent = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <img src={logingImg} className="rounded-circle" alt="Войти" />
              </div>
              <div className="col-12 col-md-6 d-flex row justify-content-center align-content-center h-100">
                <div className="col-12">
                  <h1 className="text-center mb-4">Войти</h1>
                  <Formik
                    initialValues={{ username: "", password: "", error: false }}
                    onSubmit={async (
                      values,
                      { setSubmitting, setFieldValue, resetForm },
                    ) => {
                      setFieldValue("error", false);
                      await axios
                        .post("api/v1/login", values)
                        .then((response) => {
                          const { token } = response.data;
                          if (!token) {
                            navigate("/login");
                            setSubmitting(false);
                          } else {
                            localStorage.setItem("token", token);
                            navigate("/");
                            setSubmitting(false);
                            resetForm();
                          }
                        })
                        .catch((error) => {
                          console.log(error);
                          console.log(error.response?.status);

                          if (error.response?.status === 401) {
                            setFieldValue("error", true);
                          }
                        });
                    }}
                  >
                    {({ isSubmitting, values }) => (
                      <Form autoComplete="off">
                        <div className="form-floating mb-3">
                          <Field
                            name="username"
                            required=""
                            placeholder="Ваш ник"
                            id="username"
                            className={cn("form-control", {
                              "is-invalid": values.error,
                            })}
                          />
                          <label htmlFor="username">Ваш ник</label>
                        </div>
                        <div className="form-floating mb-4">
                          <Field
                            name="password"
                            required=""
                            placeholder="Пароль"
                            type="password"
                            id="password"
                            className={cn("form-control", {
                              "is-invalid": values.error,
                            })}
                          />
                          <label className="form-label" htmlFor="password">
                            Пароль
                          </label>
                          {values.error && (
                            <div className="invalid-feedback">
                              Неверные имя пользователя или пароль
                            </div>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="w-100 mb-3 btn btn-outline-primary"
                          disabled={isSubmitting}
                        >
                          Войти
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="#">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
