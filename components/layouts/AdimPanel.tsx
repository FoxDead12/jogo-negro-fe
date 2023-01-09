import { SlDocs } from "react-icons/sl";
import { BsHouseDoor } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import { MdWorkOutline } from "react-icons/md";
import { ImExit } from "react-icons/im";
import { GiWeightLiftingUp } from "react-icons/gi";
import Link from "next/link";
import Head from "next/head";

export default function AdimPanel ({children}: any) {
    return (

        <>
            <Head>
                <title>Painel</title>
                <link rel="icon" type="image/x-icon" href="/panel.ico"></link>
                <meta name="robots" content="noindex, nofollow" /> 
            </Head>
            <div className="w-screen h-screen grid grid-cols-[200px_minmax(0px,_1fr)_0px]">
                <div className="bg-gray-800">
                    <h1 className="pt-4 pb-2 pl-5 text-lg uppercase font-bold text-white">Jogo de Negro</h1>
                    <ul className="flex flex-col">
                        <li className="font-normal text-lg capitalize text-white hover:bg-gray-800 border-l-0 border-blue-600 hover:border-l-4 cursor-pointer"><Link className="flex justify-start items-center w-full h-full py-4 pl-2" href={"/admin"}><BsHouseDoor className="mx-3 text-xl"/>Home</Link></li>
                        <li className="font-normal text-lg capitalize text-white hover:bg-gray-800 border-l-0 border-blue-600 hover:border-l-4 cursor-pointer"><Link className="flex justify-start items-center w-full h-full py-4 pl-2" href={"/admin/texts"}><SlDocs className="mx-3 text-xl"/>Textos</Link></li>
                        <li className="font-normal text-lg capitalize text-white hover:bg-gray-800 border-l-0 border-blue-600 hover:border-l-4 cursor-pointer"><Link className="flex justify-start items-center w-full h-full py-4 pl-2" href={"/admin/spaces"}><GiWeightLiftingUp className="mx-3 text-xl"/>Espaços</Link></li>
                        <li className="font-normal text-lg capitalize text-white hover:bg-gray-800 border-l-0 border-blue-600 hover:border-l-4 cursor-pointer"><Link className="flex justify-start items-center w-full h-full py-4 pl-2" href={"/admin/services"}><MdWorkOutline className="mx-3 text-xl"/>Serviços</Link></li>
                        <li className="font-normal text-lg capitalize text-white hover:bg-gray-800 border-l-0 border-blue-600 hover:border-l-4 cursor-pointer"><Link className="flex justify-start items-center w-full h-full py-4 pl-2" href={"/admin/logout"}><ImExit className="mx-3 text-xl"/>Sair</Link></li>
                    </ul>
                </div>

                <div className="bg-gray-200 p-4">
                    {children}
                </div>
            </div>
        </>
    )
}