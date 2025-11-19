import { Formik } from "formik";
import logingImg from "../assets/images/loging.jpg";

export const FormComponent = () => {
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
                    initialValues={{ name: "", password: "" }}
                    onSubmit={(values) => {
                      console.log(values);
                    }}
                  >
                    {(
                      values,
                      // handleChange,
                      //isSubmitting,
                    ) => (
                      <form>
                        <div className="form-floating mb-3">
                          <label htmlFor="username">Ваш ник</label>
                          <input
                            name="username"
                            autoComplete="username"
                            required=""
                            placeholder="Ваш ник"
                            id="username"
                            className="form-control"
                            value={values.name}
                            // onChange={handleChange}
                          />
                        </div>
                        <div className="form-floating mb-4">
                          <label className="form-label" htmlFor="password">
                            Пароль
                          </label>
                          <input
                            name="password"
                            autoComplete="current-password"
                            required=""
                            placeholder="Пароль"
                            type="password"
                            id="password"
                            className="form-control"
                            value={values.password}
                            //onChange={handleChange}
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-100 mb-3 btn btn-outline-primary"
                        >
                          Войти
                        </button>
                      </form>
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
