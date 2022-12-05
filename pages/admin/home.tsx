import Router from "next/router";
import { Context } from "vm";
import AdimPanel from "../../layouts/AdimPanel";

export default function Home () {

    return (
        <AdimPanel>
            <h1>Home</h1>
        </AdimPanel>
    )
}

Home.getInitialProps = async (context: Context) => {

    const token = context?.req?.cookies['token'] || '';
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
            await context.res.writeHead(307, { Location: '/admin' })
            return await context.res.end()
        } else {
            // On the client, we'll use the Router-object
            // from the 'next/router' module.
            return await Router.replace('/admin')
        }
        
    }

    return {
        data: "OLA"
    }
}