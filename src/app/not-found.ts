import { getCookie } from "cookies-next";
import { redirect } from "next/navigation";

export default function NotFound() {
    if (getCookie('authToken')) {
        redirect("/dashboard");
    }
    redirect("/login");
}