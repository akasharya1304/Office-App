import { redirect } from "@remix-run/node";

export let loader = () => {
  return redirect("/internal");
};

export default function Index() {
  return null;
}