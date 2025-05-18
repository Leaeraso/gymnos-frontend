import { verifyAuthToken } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function NotFound() {
    if (await verifyAuthToken()) {
        redirect("/dashboard");
    }
    redirect("/login");
}