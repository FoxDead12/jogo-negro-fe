import { useRouter } from "next/router";
import { Context } from "vm";

export default function Index() {

    return <></>
}

export async function getServerSideProps(context: Context) {
    
    const token: string = context.req.cookies['token'];
    if(!token) {
        return {
            redirect: {
              destination: "/admin/login",
              permanent: true,
            }
        };  
    }
    else {
        return {
            redirect: {
              destination: "/admin/home",
              permanent: true,
            }
        };
    }
    
    
}