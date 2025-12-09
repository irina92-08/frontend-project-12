import { Formik, Form, Field } from "formik";
import logingImg from "../assets/images/loging.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import cn from "classnames";
import { useDispatch } from "react-redux";
import { actions as currentChatActions } from "../assets/slices/currentValueChatSlice";

import { useTranslation } from "react-i18next";

export const FormLoging = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  return (
    <div className="d-flex flex-column h-100">
      <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
        <div className="container">
          <a className="navbar-brand" href="/login">
            Hexlet Chat
          </a>
        </div>
      </nav>
      <div className="container-fluid h-100">
        <div className="row justify-content-center align-content-center h-100">
          <div className="col-12 col-md-8 col-xxl-6">
            <div className="card shadow-sm">
              <div className="card-body row p-5">
                <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                  <img
                    src={logingImg}
                    className="rounded-circle"
                    alt={t("loging.entrance")}
                  />
                </div>
                <div className="col-12 col-md-6 d-flex row justify-content-center align-content-center h-100">
                  <div className="col-12">
                    <h1 className="text-center mb-4">{t("loging.entrance")}</h1>
                    <Formik
                      initialValues={{
                        username: "",
                        password: "",
                        error: false,
                      }}
                      onSubmit={async (
                        values,
                        { setSubmitting, setFieldValue, resetForm },
                      ) => {
                        setFieldValue("error", false);
                        await axios
                          .post("api/v1/login", values)
                          .then((response) => {
                            const { token, username } = response.data;
                            if (!token) {
                              navigate("/login");
                              setSubmitting(false);
                            } else {
                              localStorage.setItem("token", token);
                              dispatch(
                                currentChatActions.setCurrentUserName(username),
                              );
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
                              placeholder={t("loging.username")}
                              id="username"
                              className={cn("form-control", {
                                "is-invalid": values.error,
                              })}
                            />
                            <label htmlFor="username">
                              {t("loging.username")}
                            </label>
                          </div>
                          <div className="form-floating mb-4">
                            <Field
                              name="password"
                              required=""
                              placeholder={t("loging.password")}
                              type="password"
                              id="password"
                              className={cn("form-control", {
                                "is-invalid": values.error,
                              })}
                            />
                            <label className="form-label" htmlFor="password">
                              {t("loging.password")}
                            </label>
                            {values.error && (
                              <div className="invalid-feedback">
                                {t("loging.invalidFeedback")}
                              </div>
                            )}
                          </div>
                          <button
                            type="submit"
                            className="w-100 mb-3 btn btn-outline-primary"
                            disabled={isSubmitting}
                          >
                            {t("loging.entrance")}
                          </button>
                        </Form>
                      )}
                    </Formik>
                  </div>
                </div>
              </div>
              <div className="card-footer p-4">
                <div className="text-center">
                  <span>{t("loging.noAccount")} </span>
                  <a href="/signup">{t("loging.signup")}</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
