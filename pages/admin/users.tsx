import Router from "next/router";
import { Context } from "vm";
import AdimPanel from "../../components/layouts/AdimPanel";

export default function Users () {

    return (
        <AdimPanel>
            <h1>Utilizadores</h1>
        </AdimPanel>
    )
}

export async function getServerSideProps(context: Context) {
    
    const token = context.req.cookies['token'] || '';
    const result = await fetch("http://localhost:3000/api/validate", 
        {
            method: 'POST',
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                token: token,
            })
        }
    );
        
    if(result.status == 400) {
        return {
            redirect: {
                destination: '/admin',
                permanent: true,
            },
        }
        
    }

    return {
        props: {}, // will be passed to the page component as props
    }
}