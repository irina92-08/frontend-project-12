import { Formik, Form, Field } from "formik";
import signupImg from "../assets/images/signup.jpg";
import * as yup from "yup";
import cn from "classnames";
import { actions as currentChatActions } from "../assets/slices/currentValueChatSlice";
import axios from "axios";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export const FormSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const schema = yup.object().shape({
    username: yup
      .string()
      .min(3, "от 3 до 20 символов")
      .max(20, "от 3 до 20 символов")
      .required("Обязательное поле"),

    password: yup
      .string()
      .min(6, "Не менее 6 символов")
      .required("Обязательное поле"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null], "Пароли должны совпадать"),
  });

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/login">
            Hexlet Chat
          </a>
        </div>
      </nav>
      <div className="container">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
                <div>
                  <img
                    src={signupImg}
                    className="rounded-circle"
                    alt="Регистрация"
                  />
                </div>
                <Formik
                  initialValues={{
                    username: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validateOnChange={true}
                  validateOnBlur={false}
                  validationSchema={schema}
                  onSubmit={async (
                    values,
                    { setSubmitting, resetForm, setFieldError },
                  ) => {
                    await axios
                      .post("api/v1/signup", values)
                      .then((response) => {
                        const { token, username } = response.data;

                        localStorage.setItem("token", token);
                        dispatch(
                          currentChatActions.setCurrentUserName(username),
                        );
                        navigate("/");
                        setSubmitting(false);
                        resetForm();
                      })
                      .catch((error) => {
                        console.log(error);
                        console.log(error.response?.status);

                        if (error.response?.status === 409) {
                          setFieldError(
                            "username",
                            "Такой пользователь уже существует",
                          );
                        } else {
                          setFieldError(
                            "form",
                            "Ошибка регистрации. Попробуйте снова.",
                          );
                        }
                        setSubmitting(false);
                      });
                  }}
                >
                  {({ errors, isSubmitting, handleSubmit, touched }) => (
                    <Form className="w-50" onSubmit={handleSubmit}>
                      <h1 className="text-center mb-4">Регистрация</h1>
                      <div className="form-floating mb-3">
                        <Field
                          placeholder="От 3 до 20 символов"
                          name="username"
                          autoComplete="username"
                          //   required=""
                          id="username"
                          className={cn("form-control", {
                            "is-invalid": errors.username && touched.username,
                          })}
                        />
                        <label className="form-label" htmlFor="username">
                          Имя пользователя
                        </label>
                        {errors.username && touched.username && (
                          <div className="invalid-tooltip">
                            {errors.username}
                          </div>
                        )}
                      </div>
                      <div className="form-floating mb-3">
                        <Field
                          placeholder="Не менее 6 символов"
                          name="password"
                          aria-describedby="passwordHelpBlock"
                          //   required=""
                          autoComplete="new-password"
                          type="password"
                          id="password"
                          className={cn("form-control", {
                            "is-invalid": errors.password && touched.password,
                          })}
                        />
                        {errors.password && touched.password && (
                          <div className="invalid-tooltip">
                            {errors.password}
                          </div>
                        )}
                        <label className="form-label" htmlFor="password">
                          Пароль
                        </label>
                      </div>
                      <div className="form-floating mb-4">
                        <Field
                          placeholder="Пароли должны совпадать"
                          name="confirmPassword"
                          //   required=""
                          autoComplete="new-password"
                          type="password"
                          id="confirmPassword"
                          className={cn("form-control", {
                            "is-invalid":
                              errors.confirmPassword && touched.confirmPassword,
                          })}
                        />
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className="invalid-tooltip">
                            {errors.confirmPassword}
                          </div>
                        )}
                        <label className="form-label" htmlFor="confirmPassword">
                          Подтвердите пароль
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="w-100 btn btn-outline-primary"
                        disabled={isSubmitting}
                      >
                        Зарегистрироваться
                      </button>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
