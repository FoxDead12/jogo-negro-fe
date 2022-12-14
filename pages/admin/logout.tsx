import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCookies } from "react-cookie";

export default function Logout () {

    const router = useRouter();
    const [cookies, setCookie, removeToken] = useCookies(['token']);
    useEffect(() => {

        logout();
        async function logout() {

            await removeToken("token", {path: "/"});
            return await router.push("/admin/login");
        }
    })

    return (
        <h1>LOGOUT</h1>
    )
}