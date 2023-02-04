import { useRouter }  from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose, AiOutlineCloseCircle, AiOutlineEye } from "react-icons/ai";
import { BiTrashAlt } from "react-icons/bi";
import { RxTextAlignJustify } from "react-icons/rx";
import { CgRename } from "react-icons/cg";
import { MdDone } from "react-icons/md";
import { Context } from "vm";
import FileManager from "../../components/FIleManager";
import AdimPanel from "../../components/layouts/AdimPanel";
import Loader from "../../components/Loader";
import { getCookie } from 'cookies-next';

export default function Texts ({data, erro, url}: any) {

    const [createMenu, setCreateMenu] = useState(false);

    const closeCreateMenu = () => {

        setCreateMenu(false);
    }

    return (
        <>
            {erro && <h1>ERROR: {erro.message}</h1>}
            {createMenu && <Add close={closeCreateMenu} mainUrl={url}/>}
            <AdimPanel>
                {/* Header */}
                <ul className="overflow-hidden w-full bg-white shadow-sm rounded-sm flex">
                    <li className="relative p-4 text-gray-900 text-base tracking-wide">
                        Textos
                        <div className="absolute m-auto left-0 right-0 top-auto bottom-0 h-0 w-0 border-x-[11px] border-x-transparent border-b-[11px] border-b-blue-500"></div>
                    </li>
                </ul>

                <div className="mt-12 overflow-hidden">
                    <button onClick={() => setCreateMenu(true)} className="bg-blue-500 p-4 rounded-sm shadow-sm text-white text-base font-medium">Adicionar Texto</button>
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
        data?.forEach((space: any, i: number) => {

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
                            Titulo
                        </th>
                        <th scope="col" className="text-base font-medium text-white px-6 py-4 text-left">
                            Descrição
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
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{space.active ? <MdDone className="w-5 h-5 text-green-500"/> : <AiOutlineClose className="w-5 h-5 text-red-500"/>}</td> 
                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">{space.title}</td>
                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">{space.description != "" ? space.description.substring(0,10) + "..." : ''}</td>
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
    const [chooseFile, setChooseFile] = useState(false);
    const [image, setImage] = useState<any>("");

    useEffect(() => {

        setImage(data.imageUrl);
    }, [data])

    const onFormSubmit = async (e: FormEvent) => {

        e.preventDefault();
        setLoad(true);

        const target = e.target as any;
        const result = await fetch(`/api/texts`, {
            method: "PUT",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
            body: JSON.stringify({
                title: target.elements.title.value,
                description: target.elements.description.value,
                active: target.elements.active.checked,
                _id: data._id
            })
        })
        
        
        if(result.status === 200) {

        }
        else {
            const data = await result.json();
            console.log(data.message)
        }  

        router.push('')
        setLoad(false);
    }

    const reciveImageChoose = (url: string) => {

        setImage(url)
    }

    const closeFileMenu = () => {
        setChooseFile(false)
    }

    return (
        <>
            {load && <Loader />}
            {chooseFile && <FileManager returnLink={reciveImageChoose} close={closeFileMenu} ></FileManager>}
            <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
                    <div className="relative bg-white p-4 shadow-md rounded-md max-w-[350px]">
                        <div onClick={close} className="absolute right-0 top-0 w-8 h-8 bg-white rounded-full flex items-center justify-center translate-x-[50%] -translate-y-[50%] cursor-pointer hover:rotate-[360deg] text-gray-400 hover:text-red-500 duration-500"><AiOutlineCloseCircle className="h-7 w-7 rounded-full"/></div>
                        <h1 className="text-xl mb-8">Texto, <span className="text-blue-500 border-b-[1px] border-blue-500">{data.title}</span></h1>
                        
                        <form onSubmit={onFormSubmit} className="flex flex-col">
                            {/* {error != "" && <h1 className="mb-4 text-center font-normal uppercase text-red-500">ERRO: {error}</h1>} */}
                            <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                                <CgRename className="text-2xl text-gray-900 opacity-25 stroke-none " />
                                <input type="text" name="title" id="title" placeholder="Titulo" defaultValue={data.title} className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                            </div>

                            <div className="flex items-start bg-gray-100 bg-opacity-80 my-2 p-3 rounded-lg">
                                <RxTextAlignJustify className="text-2xl text-gray-900 opacity-25 stroke-none " />
                                <textarea name="description" id="description" maxLength={3500} cols={20} rows={10} placeholder="Descrição" defaultValue={data.description} className="autofill:bg-transparent bg-transparent border-none outline-none text-base font-light resize-none"></textarea>
                            </div>
                            
                            <div className="flex items-center bg-opacity-80 m-0 p-3 rounded-full">
                                <input type="checkbox" name="active" id="active" defaultChecked={data.active} />
                                <h5 className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light">Mostar Item?</h5>
                            </div>

                            <input type="submit" value="Salvar" className="bg-blue-500 p-3 rounded-full text-white uppercase text-sm mt-4 cursor-pointer hover:bg-blue-600 duration-300 transition-all "/>
                            <h5 className="text-xs text-center mt-4 text-gray-500 ">Caso queira editar os dados basta mudar os dados que necessita e clicar em 'SALVAR'</h5>
                        </form>
                    </div>
            </div>
        </>
    )
}

//Apagar Espaço
function Delete({data, close, mainUrl}: any) {

    const router = useRouter();
    const [load, setLoad] = useState(false);

    const onFormSubmit = async (e: FormEvent) => {

        e.preventDefault();
        setLoad(true);
        const result = await fetch(`/api/texts`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",   
            },
            body: JSON.stringify({_id: data._id})
        })
        
        
        if(result.status === 200) {
            
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
                <h1 className="text-xl mb-8">Texto, <span className="text-blue-500 border-b-[1px] border-blue-500">{data.title}</span></h1>
                
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

//Criar Espaço
function Add({close, mainUrl}: any) {

    const router = useRouter();
    const [image, setImage] = useState<any>("");
    const [chooseFile, setChooseFile] = useState(false);
    const [load, setLoad] = useState(false);

    // Files Menu
    const reciveImageChoose = (url: string) => {

        setImage(url)
    }

    const closeFileMenu = () => {
        setChooseFile(false)
    }

    const addItem = async (e: FormEvent) => {
        e.preventDefault();

        setLoad(true);

        const target = e.target as any;
        const result = await fetch('/api/texts', {
            method: "POST",
            body: JSON.stringify({
                title: target.elements.title.value,
                description: target.elements.description.value,
                active: target.elements.active.checked,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8",   
            }
        })
        
        if(result.status === 200) {
            close();
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
            {chooseFile && <FileManager returnLink={reciveImageChoose} close={closeFileMenu} ></FileManager>}
            {load && <Loader />}

            <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
                <div className="relative bg-white p-4 shadow-md rounded-md w-full max-w-[350px]">
                    <div onClick={close} className="absolute right-0 top-0 w-8 h-8 bg-white rounded-full flex items-center justify-center translate-x-[50%] -translate-y-[50%] cursor-pointer hover:rotate-[360deg] text-gray-400 hover:text-red-500 duration-500"><AiOutlineCloseCircle className="h-7 w-7 rounded-full"/></div>
                    <h1 className="text-xl mb-8 text-center">Adicionar Texto</h1>

                    <form onSubmit={addItem} className="flex flex-col">
                        {/* {error != "" && <h1 className="mb-4 text-center font-normal uppercase text-red-500">ERRO: {error}</h1>} */}
                        <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                            <CgRename className="text-2xl text-gray-900 opacity-25 stroke-none " />
                            <input type="text" name="title" id="title" placeholder="Titulo" className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                        </div>

                        <div className="flex items-start bg-gray-100 bg-opacity-80 my-2 p-3 rounded-lg">
                            <RxTextAlignJustify className="text-2xl text-gray-900 opacity-25 stroke-none " />
                            <textarea name="description" id="description" maxLength={3500} cols={20} rows={10} placeholder="Descrição" className="autofill:bg-transparent bg-transparent border-none outline-none ml-2 text-base font-light resize-none"></textarea>
                        </div>

                        <div className="flex items-center bg-opacity-80 m-0 p-3 rounded-full">
                            <input type="checkbox" name="active" id="active" defaultChecked={false} />
                            <h5 className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light">Mostar Item?</h5>
                        </div>

                        <input type="submit" value="Criar" className="bg-blue-500 p-3 rounded-full text-white uppercase text-sm mt-4 cursor-pointer hover:bg-blue-600 duration-300 transition-all "/>
                        <h5 className="text-xs text-center mt-4 text-gray-500 "></h5>
                    </form>
                </div>
            </div>
        </>
    )
}


export async function getServerSideProps(context: Context) {
    
    const token = context.req.cookies['token'] || '';
    const result = await fetch(process.env.HOST_URL_MAIN + "/api/validate", 
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

    const res = await fetch(process.env['SERVER_URL_MAIN'] + "/texts",
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
                url: process.env['SERVER_URL_MAIN'],
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