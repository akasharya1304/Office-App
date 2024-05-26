import bcryptjs from "bcryptjs";
import { prisma } from "./database.server";
import { createCookieSessionStorage, redirect } from "@remix-run/node";

// session cookies
const SESSION_SECRET = process.env.SESSION_SECRET;
const sessionCookies = createCookieSessionStorage({
  cookie: {
    secure: process.env.NODE_ENV === "production",
    secrets: [SESSION_SECRET],
    sameSite: "lax",
    maxAge: 30 * 24 * 60 * 60, // 30 days
    httpOnly: true,
  },
});

// session function
async function createUserSession(userId, redirectPath) {
  const session = await sessionCookies.getSession();
  session.set("userId", userId);

  return redirect(redirectPath, {
    headers: {
      "Set-Cookie": await sessionCookies.commitSession(session),
    },
  });
}

// get Session Stored in Browser Already
export async function getUserFromSession(request) {
  const session = await sessionCookies.getSession(request.headers.get('Cookie'))
  const userId = session.get('userId')

  if(!userId){
    return null
  }

  return userId;
}

// require User session for api route 
export async function requireUserSession(request) {
  const userId = await getUserFromSession(request)

  if(!userId){
    throw redirect("/auth?mode=login")   // this throw here stop further operation automatically 
  }
  
  return userId
}

// destroy Session Stored in Browser Already
export async function destroyUserSession(request) {
  const session = await sessionCookies.getSession(request.headers.get('Cookie'))

  return redirect("/auth", {
    headers: {
      "Set-Cookie": await sessionCookies.destroySession(session),
    },
  });
}

// login & signUp functions
export async function signUp({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (existingUser) {
    const error = new Error("Email id already exist");
    error.status = 422;
    throw error;
  }

  const passwordHash = await bcryptjs.hash(password, 12);
  const user = await prisma.user.create({
    data: { email: email, password: passwordHash },
  });
  return createUserSession(user.id, "/internal");
}

export async function login({ email, password }) {
  const existingUser = await prisma.user.findFirst({ where: { email } });
  if (!existingUser) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  const passwordCorrect = await bcryptjs.compare(
    password,
    existingUser.password
  );
  if (!passwordCorrect) {
    const error = new Error("Invalid credentials");
    error.status = 401;
    throw error;
  }

  return createUserSession(existingUser.id, "/internal");
}
