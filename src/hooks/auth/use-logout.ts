import { useRouter } from "next/navigation";
import Cookie from "js-cookie";
import config from "@/config";

export function useLogout() {
    const router = useRouter();

    const logout = () => {
        Cookie.remove(config.ACCESS_TOKEN_COOKIE_KEY);
        localStorage.removeItem("gymnos_user");
        router.push("/login");
    };

    return logout;
}