import { useRouter } from "next/router";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight, AiOutlineClose, AiOutlineCloseCircle, AiOutlineEye } from "react-icons/ai";
import { BiImageAlt, BiTrashAlt } from "react-icons/bi";
import { CgRename } from "react-icons/cg";
import { MdDone } from "react-icons/md";
import { Context } from "vm";
import FileManager from "../../components/FIleManager";
import Loader from "../../components/Loader";
import AdimPanel from "../../components/layouts/AdimPanel";

export default function Services ({data, erro, url}: any) {
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
                        Serviços
                        <div className="absolute m-auto left-0 right-0 top-auto bottom-0 h-0 w-0 border-x-[11px] border-x-transparent border-b-[11px] border-b-blue-500"></div>
                    </li>
                </ul>
                
                {/* Butões Extras */}
                <div className="mt-12 overflow-hidden">
                    <button onClick={() => setCreateMenu(true)} className="bg-blue-500 p-4 rounded-sm shadow-sm text-white text-base font-medium">Adicionar Serviço</button>
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
                            Nome
                        </th>
                        <th scope="col" className="text-base font-medium text-white px-6 py-4 text-left">
                            Imagem
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
                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap">{space.name}</td>
                                <td className="text-base text-gray-900 font-light px-6 py-4 whitespace-nowrap overflow-hidden">{space.imageUrl != "" ? space.imageUrl.substring(0,10) + "..." : ''}</td>
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
        console.log(image)
        const result = await fetch(mainUrl + '/services/edit', {
            method: "POST",
            body: JSON.stringify({
                name: target.elements.name.value,
                imageUrl: image,
                active: target.elements.active.checked,
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
                        <h1 className="text-xl mb-8">Serviço, <span className="text-blue-500 border-b-[1px] border-blue-500">{data.name}</span></h1>
                        
                        <form onSubmit={onFormSubmit} className="flex flex-col">
                            {/* {error != "" && <h1 className="mb-4 text-center font-normal uppercase text-red-500">ERRO: {error}</h1>} */}
                            <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                                <CgRename className="text-2xl text-gray-900 opacity-25 stroke-none " />
                                <input type="text" name="name" id="name" placeholder="Nome" defaultValue={data.name} className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                            </div>

                            <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                                <BiImageAlt className="text-2xl text-gray-900 opacity-25 stroke-none " />
                                <input type="url" readOnly onClick={() => setChooseFile(true)} name="image" id="image" placeholder="Imagem" defaultValue={image} className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>

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

        const result = await fetch(mainUrl + `/services/${data._id}`, {
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

//Criar Espaço
function Add({close, mainUrl}: any) {

    const router = useRouter();
    const [image, setImage] = useState<any>("");
    const [chooseFile, setChooseFile] = useState(false);
    const [load, setLoad] = useState(false);

    const changeImage = (e: ChangeEvent) => {

        if(e.target) {

            const target = e.target as any;
            const file = target.files[0];
            setImage(file);
        }
    }

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

        const result = await fetch(mainUrl + '/services', {
            method: "POST",
            body: JSON.stringify({
                name: target.elements.name.value,
                imageUrl: image,
                active: target.elements.active.checked,
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
            {chooseFile && <FileManager returnLink={reciveImageChoose} close={closeFileMenu} ></FileManager>}
            {load && <Loader />}

            <div className="fixed left-0 top-0 w-screen h-screen flex items-center justify-center bg-gray-900 bg-opacity-50 z-[100]">
                <div className="relative bg-white p-4 shadow-md rounded-md w-full max-w-[350px]">
                    <div onClick={close} className="absolute right-0 top-0 w-8 h-8 bg-white rounded-full flex items-center justify-center translate-x-[50%] -translate-y-[50%] cursor-pointer hover:rotate-[360deg] text-gray-400 hover:text-red-500 duration-500"><AiOutlineCloseCircle className="h-7 w-7 rounded-full"/></div>
                    <h1 className="text-xl mb-8 text-center">Adicionar Serviço</h1>

                    <form onSubmit={addItem} className="flex flex-col">
                        {/* {error != "" && <h1 className="mb-4 text-center font-normal uppercase text-red-500">ERRO: {error}</h1>} */}
                        <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                            <CgRename className="text-2xl text-gray-900 opacity-25 stroke-none " />
                            <input type="text" name="name" id="name" placeholder="Nome" className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                        </div>

                        <div className="flex items-center bg-gray-100 bg-opacity-80 my-2 p-3 rounded-full">
                            <BiImageAlt className="text-2xl text-gray-900 opacity-25 stroke-none " />
                            {/* <input type="file" onChange={changeImage} name="image" id="image" placeholder="Image" hidden/> */}
                            <input type="url" readOnly onClick={() => setChooseFile(true)} name="image" id="image" placeholder="Imagem" defaultValue={image} className="autofill:bg-transparent bg-transparent border-none outline-none pl-2 text-base font-light"/>
                            {/* <label htmlFor="image"  className={`max-h-full max-w-full outline-none pl-2 text-[60%] font-light overflow-hidden ${image != null ? "text-gray-900" : "text-gray-400"}`}>{image != null ? image.toString(): 'Image'}</label> */}
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

    const res = await fetch(process.env['SERVER_URL_MAIN'] + "/services",
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