import { Context } from "vm";
import AdimPanel from "../../layouts/AdimPanel";
import Router from 'next/router';
import { MdDone } from "react-icons/md";
import { AiOutlineClose, AiOutlineEye, AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { useEffect, useState } from "react";

export default function Spaces ({data, erro}: any) {

    return (
        <>
        
            {erro && <h1>ERROR: {erro.message}</h1>}
            <AdimPanel>
                                    
                {/* Header */}
                <ul className="overflow-hidden w-full bg-white shadow-sm rounded-sm flex">
                    <li className="relative p-4 text-gray-900 text-base tracking-wide">
                        Espaços de Treino
                        <div className="absolute m-auto left-0 right-0 top-auto bottom-0 h-0 w-0 border-x-[11px] border-x-transparent border-b-[11px] border-b-blue-500"></div>
                    </li>
                </ul>
                
                {/* Butões Extras */}
                <div className="mt-12 overflow-hidden">
                    <button className="bg-blue-500 p-4 rounded-sm shadow-sm text-white text-base font-medium">Adicionar Espaço</button>
                </div>

                <Table data={data}/>

            </AdimPanel>
        </>
    )
}

function Table({data}: any) {

    const [spaces, setSpaces] = useState([]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(9);
    

    //Aqui definimos qual espaços vamos mostar
    useEffect(() => {

        const arrayTemp: any = [];
        data.forEach((space: any, i: number) => {

            if(i >= min && i <= max) {
                arrayTemp.push(space);
            }
        });

        setSpaces(arrayTemp);
        
    }, [data, min])

    const onClickLeft = () => {

        if(min != 0) {
            setMin(min - 10);
            setMax(max - 10); 
        }
    }
    
    const onClickRight = () => {
        
        console.log(data.length);
        if(min + 10 < data.length) {

            setMin(min + 10);
            setMax(max + 10);              
        }
    }


    return (
        <>
            {/* Tabela */}
            <Menu data={data[0]}/>

            <table className="overflow-hidden mt-4 w-full bg-white">
                <thead className="border-b bg-blue-500">
                    <tr>
                        <th scope="col" className="text-base font-medium text-white px-6 py-4 text-left">
                            #
                        </th>
                        <th scope="col" className="text-base font-medium text-white px-6 py-4 text-left">
                            Ativo
                        </th>
                        <th scope="col" className="text-base font-medium text-white px-6 py-4 text-left">
                            Nome
                        </th>
                        <th scope="col" className="text-base font-medium text-white px-6 py-4 text-left">
                            Localização
                        </th>
                        <th scope="col" className="text-base font-medium text-white px-6 py-4 text-left">
                            Imagem
                        </th>
                        <th scope="col" className="text-base font-medium text-white px-6 py-4 text-left">
                            Link Maps
                        </th>
                        <th scope="col" className="text-base font-medium text-white px-6 py-4 text-left">
                            Ações
                        </th>
                    </tr>
                </thead>
                <tbody className="w-full">

                    {spaces.map((space: any, i: number) => {
                        
                        const index = min + i + 1;

                        return (
                            <tr className={'border-b ' + ((i + 1) % 2 == 0 ? 'bg-gray-100' : '')} key={i}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{index}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"><MdDone className="w-5 h-5 text-green-500"/></td> {/* <AiOutlineClose className="w-5 h-5 text-red-500"/> */}
                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">{space.name}</td>
                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">{space.location}</td>
                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">{space.imageUrl}</td>
                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">{space.mapsUrl}</td>
                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap flex justify-start items-center">
                                    <AiOutlineEye className="w-6 h-6 text-blue-500 cursor-pointer"/>
                                    <BiTrashAlt className="w-6 h-6 text-red-500 cursor-pointer ml-4"/>
                                </td>
                            </tr>  
                        )
                    })
                    }
                                    
                </tbody>
            </table>
            
            <div className="pt-4 w-full flex justify-center items-center">
                <button onClick={onClickLeft} className="bg-blue-500 p-2 hover:bg-opacity-90 mr-2 rounded-sm shadow-sm active:bg-gray-200"><AiOutlineArrowLeft className="w-6 h-6 text-white"/></button>
                <button onClick={onClickRight} className="bg-blue-500 p-2 hover:bg-opacity-90 ml-2 rounded-sm shadow-sm active:bg-gray-200"><AiOutlineArrowRight className="w-6 h-6 text-white"/></button>
            </div>
        </>
    )
}
//Menu para visualizar o Espaco
function Menu({data}: any) {

    return (
        <div className="fixed left-0 top-0 w-screen h-screen bg-gray-900 bg-opacity-30 flex justify-center items-center">
            <form className="bg-white p-4 rounded-sm shadow-sm">
                <h1>A ver o espaço, {data.name}</h1>
            </form>
        </div>
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

    const res = await fetch(process.env['SERVER-URL-MAIN'] + "/spaces",
    {
        headers: {
            Cookie: `token=${token}`
        },
    }
    );
    
    const data = await res.json();
    
    if(res.status == 200) {
        return {
            props: {
                data: data
            }, // will be passed to the page component as props
        }
    }
    else {
        return {
            props: {
                erro: data
            }, // will be passed to the page component as props
        }
    }
}