import Rollbar from "rollbar";

const rollbarConfig = {
  accessToken:
    "c0026754848148b3b0664af4de8b6edda408e2487d74b64dcc2707bd6724de0b96d0dd086ae83782469c9ee8d77195b3",
  captureUncaught: true,
  captureUnhandledRejections: true,
  environment: "production",
  payload: {
    client: {
      javascript: {
        source_map_enabled: true,
        code_version: "1.0.0",
      },
    },
  },
};

const rollbar = new Rollbar(rollbarConfig);

if (typeof window !== "undefined") {
  window.Rollbar = rollbar;
}

export default rollbar;
