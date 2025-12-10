import React from "react";
import rollbar from "./rollbar-config";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    rollbar.error("React Error Boundary поймал ошибку", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="alert alert-warning m-3">
          <h4>Что-то пошло не так 😔</h4>
          <p>Мы уже знаем об этой проблеме и скоро всё починим.</p>
          <button
            onClick={() => window.location.reload()}
            className="btn btn-primary"
          >
            Обновить страницу
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
