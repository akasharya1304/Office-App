// import { Button, Typography } from "@mui/material";
import { IoMdArrowRoundBack } from "react-icons/io";
import Error from "~/images/404.jpeg";

const styles = {
  errorContainer: {
    background: `url(${Error})`,
    width: "100%",
    height: "100vh",
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    fontFamily: `"Poppins", sans-serif`,
  },
  innerErrorTextContainer: {
    fontFamily: `"Poppins", sans-serif`,
    width: "50%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "10% 0",
  },
  title: {
    fontSize: 72,
    fontWeight: 900,
    fontFamily: `"Poppins", sans-serif`,
    color: "#FFF",
  },
  button: {
    fontSize: 14,
    fontFamily: `"Poppins", sans-serif`,
    borderRadius: 20,
  },
};

function ErrorPage(props) {
  const { title } = props;
  return (
    <div style={styles.errorContainer}>
      <div style={styles.innerErrorTextContainer}>
        <p style={styles.title}>{title}</p>
        {props.children}
        <button
          href="/internal"
          variant="contained"
          style={styles.button}
          // startIcon={<IoMdArrowRoundBack />}
        >
          Back to safety
        </button>
      </div>
    </div>
  );
}

export default ErrorPage;
