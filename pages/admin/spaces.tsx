import { Context } from "vm";
import { useRouter } from 'next/router';
import { MdDone } from "react-icons/md";
import { AiOutlineClose, AiOutlineEye, AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineUser, AiOutlineCloseCircle } from "react-icons/ai";
import { BiBuildingHouse, BiEnvelope, BiImageAlt, BiTrashAlt } from "react-icons/bi";
import { FormEvent, useEffect, useState } from "react";
import { CgRename } from "react-icons/cg";
import { GrLocation } from "react-icons/gr";
import AdimPanel from "../../layouts/AdimPanel";
import Loader from "../../components/Loader";


export default function Spaces ({data, erro, url}: any) {

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

                <Table data={data} mainUrl={url} />

            </AdimPanel>
        </>
    )
}

function Table({data, mainUrl}: any) {

    const [spaces, setSpaces] = useState([]);
    const [min, setMin] = useState(0);
    const [max, setMax] = useState(9);

    const [currentObject, setCurrentObject] = useState();
    const [menu, setMenu] = useState(false);
    const [deleteM, setDeleteMenu] = useState(false);

    //Aqui definimos qual espaços vamos mostar
    // Metodos da Tabela
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
        
        if(min + 10 < data.length) {

            setMin(min + 10);
            setMax(max + 10);              
        }
    }

    //Metodos do Menu
    const openMenu = (space: any) => {

        setCurrentObject(space);
        setMenu(true);
    }

    const closeMenu = () => {

        setMenu(false);
    }

    //Metodos Delete
    const openDelete = (space: any) => {
        setCurrentObject(space);
        setDeleteMenu(true)
    }

    const closeDelete = () => {

        setDeleteMenu(false);
    }

    return (
        <>
            {/* Tabela */}
            { menu && <Menu data={currentObject} close={closeMenu} mainUrl={mainUrl} />}
            { deleteM && <Delete data={currentObject} close={closeDelete} mainUrl={mainUrl}/>}
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
                                    <AiOutlineEye onClick={() => openMenu(space)} className="w-6 h-6 text-blue-500 cursor-pointer"/>
                                    <BiTrashAlt onClick={() => openDelete(space)} className="w-6 h-6 text-red-500 cursor-pointer ml-4"/>
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
function Menu({data, close, mainUrl}: any) {

    const router = useRouter();
    const [load, setLoad] = useState(false);

    const onFormSubmit = async (e: FormEvent) => {

        e.preventDefault();
        setLoad(true);

        const target = e.target as any;

        const result = await fetch(mainUrl + '/spaces/edit', {
            method: "POST",
            body: JSON.stringify({
                name: target.elements.name.value,
                location: target.elements.location.value,
                imageUrl: target.elements.image.value,
                mapsUrl: target.elements.maps.value,
                id: data._id
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            },
            credentials: "include"
        })
        
        
        if(result.status === 201) {
            console.log("SUCESS")
        }
        else {
            const data = await result.json();
            console.log(data.message)
        }  

        router.push('')
        setLoad(false);
    }

    return (
        <>
            {load && <Loader />}
            <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
                    <div className="relative bg-white p-4 shadow-md rounded-md max-w-[350px]">
                        <div onClick={close} className="absolute right-0 top-0 w-8 h-8 bg-white rounded-full flex items-center justify-center translate-x-[50%] -translate-y-[50%] cursor-pointer hover:rotate-[360deg] text-gray-400 hover:text-red-500 duration-500"><AiOutlineCloseCircle className="h-7 w-7 rounded-full"/></div>
                        <h1 className="text-xl mb-8">Espaço de Treino, <span className="text-blue-500 border-b-[1px] border-blue-500">{data.name}</span></h1>
                        
                        <form onSubmit={onFormSubmit} className="flex flex-col">
                            {/* {error != "" && <h1 className="mb-4 text-center font-normal uppercase text-red-500">ERRO: {error}</h1>} */}
                            <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                                <CgRename className="text-2xl text-gray-900 opacity-25 stroke-none " />
                                <input type="text" name="name" id="name" placeholder="Nome" defaultValue={data.name} className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                            </div>

                            <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                                <BiBuildingHouse className="text-2xl text-gray-900 opacity-25 stroke-none " />
                                <input type={"text"} name="location" id="location" placeholder="Localização" defaultValue={data.location} className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                            </div>

                            <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                                <BiImageAlt className="text-2xl text-gray-900 opacity-25 stroke-none " />
                                <input type="url" name="image" id="image" placeholder="Imagem" defaultValue={data.imageUrl} className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                            </div>

                            <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                                <GrLocation className="text-2xl text-gray-900 opacity-25 stroke-none" />
                                <input type="url" name="maps" id="maps" placeholder="Maps" defaultValue={data.mapsUrl} className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                            </div>

                            <input type="submit" value="Salvar" className="bg-blue-500 p-3 rounded-full text-white uppercase text-sm mt-4 cursor-pointer hover:bg-blue-600 duration-300 transition-all "/>
                            <h5 className="text-xs text-center mt-4 text-gray-500 ">Caso queira editar os dados basta mudar os dados que necessita e clicar em 'SALVAR'</h5>
                        </form>
                    </div>
            </div>
        </>
    )
}

function Delete({data, close, mainUrl}: any) {

    const router = useRouter();
    const [load, setLoad] = useState(false);

    const onFormSubmit = async (e: FormEvent) => {

        e.preventDefault();
        setLoad(true);

        const result = await fetch(mainUrl + `/spaces/${data._id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Credentials": "true"
            },
            credentials: "include"
        })
        
        
        if(result.status === 200) {
            console.log("SUCESS")
        }
        else {
            const data = await result.json();
            console.log(data.message)
        }  

        router.push('')
        close();
        setLoad(false);
    }

    return (
        <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
            <div className="relative bg-white p-4 shadow-md rounded-md max-w-[350px]">
                <div onClick={close} className="absolute right-0 top-0 w-8 h-8 bg-white rounded-full flex items-center justify-center translate-x-[50%] -translate-y-[50%] cursor-pointer hover:rotate-[360deg] text-gray-400 hover:text-red-500 duration-500"><AiOutlineCloseCircle className="h-7 w-7 rounded-full"/></div>
                <h1 className="text-xl mb-8">Espaço de Treino, <span className="text-blue-500 border-b-[1px] border-blue-500">{data.name}</span></h1>
                
                <form onSubmit={onFormSubmit} className="flex flex-col">
                    {/* {error != "" && <h1 className="mb-4 text-center font-normal uppercase text-red-500">ERRO: {error}</h1>} */}
                    <h1 className="text-center font-normal text-lg border-red-500">Confirme antes de contiunar !!!</h1>

                    <input type="submit" value="Apagar" className="bg-red-500 p-3 rounded-full text-white uppercase text-sm mt-4 cursor-pointer hover:bg-red-600 duration-300 transition-all "/>
                    <h5 className="text-xs text-center mt-4 text-gray-500 ">Caso queira apagar os dados basta mudar os dados que necessita e clicar em 'APAGAR'. Depois de clicar não tem volta a dar!!!</h5>
                </form>
            </div>
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
                data: data,
                url: process.env['SERVER-URL-MAIN'],
                token: token
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