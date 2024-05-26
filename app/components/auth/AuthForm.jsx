import {
  Form,
  Link,
  useActionData,
  useNavigation,
  useSearchParams,
} from "@remix-run/react";
import { FaLock, FaUserPlus } from "react-icons/fa";
import Logo from "~/images/Logo.jpg";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import SnackbarComponent from "../utils/SnackbarComponent";


function AuthForm(props) {
  const validateError = useActionData();
  const navigation = useNavigation();
  const [searchParams] = useSearchParams();
  const authMode = searchParams.get("mode") || "login";
  const [windowSize, setWindowSize] = useState(
    typeof window !== "undefined" && window.innerWidth
  );

  console.log(windowSize);

  const submitBtnCaption = authMode === "login" ? "Login" : "Create User";
  const toggleBtnCaption =
    authMode === "login" ? "Create a new User" : "Log in with existing user";

  const isSubmitting = navigation.state !== "idle";

  return (
    <div 
    elevation={3} 
    className="w-4/5 lg:w-1/2 h-fit
    flex flex-col md:flex-row justify-evenly items-center
    rounded-3xl
    bg-gradient-to-r from-drawerStart to-drawerEnd bg-no-repeat
    "
    >
      <div className="w-2/5 h-fit">
        <div className="cursor-pointer">
          <img
            src={`${Logo}`}
            className="w-3/4 h-screen-1/10 md:h-screen-1/2 
            object-contain bg-inherit ml-6 my-3 md:my-0"
            alt="Logo"
            height={"100%"}
            width={"100%"}
          />
        </div>
      </div>
      <div className="md:w-4/5 xs:w-full h-full">
        <Form 
        method="post" 
        id="auth-form" 
        className="flex flex-col justify-start items-center w-full py-4 px-0"
        >
          <div className="flex justify-evenly items-center mb-8">
            <div className="flex justify-center items-center text-whiteColor 
             w-11 h-11 rounded-2xl border-2"
            >
              {authMode === "login" ? <FaLock /> : <FaUserPlus />}
            </div>
            <p className="text-2xl font-semibold pl-7 m-0 text-whiteColor bg-inherit">
              {authMode === "login" ? "LOGIN" : "SIGN UP"}
            </p>
          </div>
          <p className="flex justify-between w-4/5 my-4">
            <label htmlFor="email" className="text-whiteColor">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="h-6 w-2/5 xs:w-3/5 rounded-2xl text-base py-1 px-2"
              required
            />
          </p>
          <p className="flex justify-between w-4/5 my-4">
            <label htmlFor="password" className="text-whiteColor">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              minLength={7}
              className="h-6 w-2/5 xs:w-3/5 rounded-2xl text-base py-1 px-2"
            />
          </p>
          {/* {validateError && (
            <ul>
              {Object.values(validateError).map((err) => (
                <li key={err}>{err}</li>
              ))}
            </ul>
          )} */}
          <div className="flex flex-col items-end w-4/5">
            <button
              size="large"
              aria-label="menu"
              variant="contained"
              tabIndex={-1}
              disabled={isSubmitting}
              className="text-base xs:text-lg font-semibold rounded-2xl
              text-whiteColor bg-drawerStart border-0
              w-full mx-0 my-2"
            >
              {isSubmitting ? "Authenticate..." : submitBtnCaption}
            </button>
            <Link
              to={authMode === "login" ? "?mode=signup" : "?mode=login"}
              className="flex justify-center w-full xs:text-sm text-whiteColor no-underline"
            >
              {toggleBtnCaption}
            </Link>
          </div>
        </Form>
      </div>
      {validateError && (
        <SnackbarComponent
          snackbarOpen={true}
          snackbarMessage={validateError?.credential}
          snackbarType={"error"}
        />
      )}
    </div>
  );
}

export default AuthForm;
