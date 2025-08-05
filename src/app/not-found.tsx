import config from "@/config";
import { redirect } from "next/navigation";

export default function NotFound() {
    redirect(config.PATH_HOME_PAGE);
}