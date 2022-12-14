import { FormEvent, useState } from "react";
import {BiEnvelope, BiLockAlt} from "react-icons/bi";
import { useCookies } from 'react-cookie';
import { useRouter } from "next/router";
import Loader from "../../components/Loader";

export default function Login() {
    
    const router = useRouter();

    //Loader Controller
    const [load, setLoad] = useState(false);

    const onFormSubmit = async (e: FormEvent) => {

        e.preventDefault();
        setLoad(true);

        const target = e.target as any;

        const result = await fetch('/api/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                email: target.elements.email.value,
                password: target.elements.password.value,
                keepSession: target.elements.keepSession.checked
            })
        })
        
        setLoad(false);

        if(result.status === 201) {
            return await router.push("/admin/home")
        }
        else {
            const data = await result.json();
            console.log(data.message)
            
        }        
    }

    return (
        <>
            {load && <Loader />}
            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 relative w-screen h-screen flex justify-center items-center z-0 overflow-hidden">
                <form onSubmit={onFormSubmit} className="relative bg-white bg-opacity-60 pt-40 pb-40 px-10 z-0 rounded-xl shadow-md">
                        <div className="z-10 relative flex flex-col">
                            
                            <h1 className="mb-2 text-gray-900 uppercase font-bold text-3xl text-center">Login</h1>
                            <h5 className="mb-10 text-sm font-light text-center">Por favor realizar o login para entrar!</h5>
                            
                        
                            <div className="flex items-center bg-white bg-opacity-80 my-4 p-3 rounded-full">
                                <BiEnvelope className="text-2xl text-gray-900 opacity-25 stroke-none " />
                                <input type="email" name="email" id="email" placeholder="Email" required className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                            </div>

                            <div className="flex items-center bg-white bg-opacity-80 my-4 p-3 rounded-full">
                                <BiLockAlt className="text-2xl text-gray-900 opacity-25 stroke-none " />
                                <input type="password" name="password" id="password" placeholder="Password" required className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                            </div>

                            <div className="flex my-0">
                                <input type="checkbox" name="keepSession" id="keepSession" className="cursor-pointer"/>
                                <label htmlFor="keepSession" className="pl-2 font-light cursor-pointer">Lembrar</label>
                            </div>

                            <input type="submit" value="Login" className="bg-gray-900 p-3 rounded-full text-white uppercase text-sm my-4 cursor-pointer hover:bg-blue-900 duration-300 transition-all "/>
                        </div>
                        <div className="absolute w-full h-full bg-white bg-opacity-30 -rotate-6 left-0 top-0 z-0"></div>
                </form>
            </div>
        </>
    )
}