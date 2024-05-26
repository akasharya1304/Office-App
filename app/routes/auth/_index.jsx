import { getUserFromSession, login, signUp } from "~/data/auth.server";
import { validateCredentials } from "~/data/validation.server";
import AuthPageLayout from "~/Layout/authPageLayout";
import AuthForm from "~/components/auth/AuthForm";


export const meta = () => {
  return [
    { title: "Auth" },
    { name: "description", content: "Welcome to authentication" },
  ];
};

export default function Index() {
  return (
    <AuthPageLayout>
      <AuthForm />
    </AuthPageLayout>
  );
}

export function loader({request}) {
  return getUserFromSession(request)
}

export async function action({ request }) {
  const searchParams = new URL(request.url).searchParams;
  const authMode = searchParams.get("mode") || "login";
  const formData = await request.formData();
  const credential = Object.fromEntries(formData);

  try {
    validateCredentials(credential);
  } catch (error) {
    return error;
  }
  try {
    if (authMode === "login") {
      return await login(credential);
    } else {
      return await signUp(credential);
    }
  } catch (error) {
    if (error.status === 422 || error.status === 401) {
      return { credential: error.message };
    }
  }
}
