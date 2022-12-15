import { Context } from "vm";
import AdimPanel from "../../components/layouts/AdimPanel";
import { FaSadTear } from "react-icons/fa";

export default function Home () {

    return (
        <AdimPanel>

            <div className="flex w-full h-full items-center justify-center">
                <h1 className="flex items-center justify-center text-xl bg-white p-4 rounded-sm shadow-sm tracking-wider">PAGE NOT IMPLEMENTE WET <FaSadTear className="text-blue-500 w-8 h-8 ml-4"/></h1>
            </div>

        </AdimPanel>
    )
}

export async function getServerSideProps(context: Context) {
    
    const token = context.req.cookies['token'] || '';
    const result = await fetch("https://jogodenegro.pt/api/validate", 
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