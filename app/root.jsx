import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  isRouteErrorResponse,
  useRouteError,
} from "@remix-run/react";
import ErrorPage from "./components/utils/ErrorPage";
// import SnackbarComponent from "./components/utils/SnackbarComponent";
import stylesheet from "~/tailwind.css?url";
import { SnackbarComponent } from "./components/utils/SnackbarComponent";

const styles = {
  bodyCSS: {
    margin: 0,
    fontFamily: `"Poppins", sans-serif`,
    userSelect: "none",
    scrollBehavior: "smooth",
  },
};

export const meta = () => {
  return [
    { title: "Office Bills" },
    { name: "description", content: "Welcome to Remix Office Bills!" },
  ];
};

function Document({ title, children }) {
  return (
    <html lang="en">
      <head>
        {title && <title>{title}</title>}
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={styles.bodyCSS}>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body style={styles.bodyCSS}>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export function ErrorBoundary() {
  const error = useRouteError();
  console.log(error, error.data);

  // when true, this is what used to go to `CatchBoundary`
  if (isRouteErrorResponse(error)) {
    return (
      <Document title={error.statusText}>
      { console.log("IF:",error, error.data)}
        {/* <SnackbarComponent
        open={true}
        message={error?.data?.message || error?.data}
        type="error"
        /> */}
        <ErrorPage title="An error!">
        <p>{error.message || "Something went wrong !"}</p>
      </ErrorPage>
      </Document>
    );
  }

  // 'ErrorBoundary'
  return (
    <Document title="An error!">
     { console.log("Else:",error, error.data)}
      <ErrorPage title="An error!">
        <p>{error.message || "Something went wrong !"}</p>
      </ErrorPage>
    </Document>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: stylesheet },
  ];
}
