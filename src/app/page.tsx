import config from "@/config";
import { redirect } from "next/navigation";

export default function Home() {
  redirect(config.PATH_HOME_PAGE)
}
