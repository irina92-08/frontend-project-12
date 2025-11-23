export const NotFound = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 text-center">
          <h1>Страница не найдена</h1>
          <p>
            Но вы можете перейти
            <a href="/" className="btn btn-primary">
              {" "}
              на главную страницу
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};
