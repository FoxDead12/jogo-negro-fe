import { Context } from "vm";
import AdimPanel from "../../layouts/AdimPanel";
import Router from 'next/router';


export default function Spaces ({data}: any) {

    return (
        <AdimPanel>
            <h1>Espaços</h1>
            <h2>{data}</h2>
        </AdimPanel>
    )
}

Spaces.getInitialProps = async (context: Context) => {

    const token = context?.req?.cookies['token'] || ''
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
        //Pagina Login
        if (context.res) {
            // On the server, we'll use an HTTP response to
            // redirect with the status code of our choice.
            // 307 is for temporary redirects.
            context.res.writeHead(307, { Location: '/admin' })
            context.res.end()
        } else {
            // On the client, we'll use the Router-object
            // from the 'next/router' module.
            Router.replace('/admin')
        }
        
    }


    const services = await fetch(process.env['SERVER-URL-MAIN'] + '/spaces')
    console.log(services)


    return {
        data: "OLA"
    }
}