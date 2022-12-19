import Image from "next/image";
import { useRouter } from "next/router";
import { ChangeEvent, ChangeEventHandler, FormEvent, useEffect, useState } from "react"
import { AiOutlineCloseCircle } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";
import { getCookie } from 'cookies-next';


const myLoader = ({ src, width, quality }: any) => {
    return `${process.env.NEXT_PUBLIC_SERVER_URL_MAIN}/uploads/${src}?w=${width}&q=${quality || 75}`
}


export default function FileManager({returnLink, close}: any) {

    const [files, setFiles] = useState([]);
    const [selected, setSelected] = useState<any>(null);
    const router = useRouter();
    const [state, setState] = useState(false);

    useEffect(() => {
        fetch('/api/files')
        .then((res) => res.json())
        .then((data) => {
            setFiles(data.files);
        })

    }, [state])

    const changeSelected = (e: any, i: number, fileName: string) => {
        
        if(e?.target?.src) {

            const url = e.target.src;
            setSelected({
                name: url,
                fileName: fileName,
                id: i
            } as any)
        }
        else {
            setSelected({
                name: "",
                id: i
            } as any)
        }
        
    }

    const getChoosedImage = () => {

        returnLink(selected.name);
        close();
    }

    const uploadFile = async (e: FormEvent) => {

        const target = e.target as any;
        const files = target.files;

        const formData = new FormData();
        formData.append('image', files[0]);

        const rs = await fetch(process.env.NEXT_PUBLIC_SERVER_URL_MAIN + "/files/upload", {
            credentials: "include",
            method: 'POST',
            body: formData,
            mode: 'cors'
        })

        if(rs.status == 201) {
            setState(!state)
        }
        else {
            const data = await rs.json();
            console.log(data?.message)
        }
    }

    const deleteFile = async () => {

        if(selected.name != "") {
            const rs = await fetch('/api/files', {
                method: 'DELETE',
                body: JSON.stringify({
                    fileName: selected.fileName
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                }
            });
    
            if(rs.status == 200) {
                setState(!state)
            }
            else {
                const data = await rs.json();
                console.log(data?.message)
            }
                
        }
    }

    return (
        <div className="z-[200] bg-gray-900 bg-opacity-50 fixed w-screen h-screen left-0 top-0 flex justify-center items-center">
            <div className="relative flex flex-col gap-2 bg-white p-5 rounded-md shadow-md">
                {/* Mostrar Ficheiros */}
                <div onClick={close} className="absolute right-0 top-0 w-8 h-8 bg-white rounded-full flex items-center justify-center translate-x-[50%] -translate-y-[50%] cursor-pointer hover:rotate-[360deg] text-gray-400 hover:text-red-500 duration-500"><AiOutlineCloseCircle className="h-7 w-7 rounded-full"/></div>

                <h1 className="text-xl leading-5">As suas Imagens:</h1>
                <h3 className="text-xs text-gray-300 pb-2 mb-6 border-b-[1px] border-blue-500">Clique na imagem que desejar!</h3>
                
                <div className="grid grid-cols-4 max-h-[300px] overflow-y-scroll">
                    {
                        files.map((img, i) => {
                            return <div key={i}  className="flex relative flex-col items-center justify-between w-[100px] h-auto m-2 select-none">
                                <Image  onClick={(e) => changeSelected(e, i, img)} className={` w-full h-full rounded-sm shadow-lg cursor-pointer object-cover ${selected?.id == i ? 'border-2 border-blue-500' : ''}`} loader={myLoader} src={img} alt={"Image" + i} width={100} height={100}/>
                                <h5 className="text-[60%] text-center m-2">{img}</h5>
                            </div>
                        })
                    }

                    <div onClick={() => changeSelected("", (files.length+1), "")} className={`flex relative flex-col items-center justify-between w-[100px] h-[100px] m-2 select-none  bg-gray-100 ${selected?.id == (files.length+1) ? 'border-2 border-blue-500' : 'border-[1px]'}`}>
                        {/* <Image  onClick={() => changeSelected("", (files.length+1))} className={`rounded-sm shadow-lg cursor-pointer overflow-hidden ${selected?.id == (files.length+1) ? 'border-2 border-blue-500' : ''}`} src={""} alt={""} width={100} height={100}/> */}
                        <h5 className="text-base text-center m-2">None</h5>
                    </div>
                </div>
                
                <div className="flex flex-row justify-end items-center">
                    <div className="bg-yellow-500 disabled:bg-gray-400 rounded-sm text-white mt-4 hover:bg-yellow-600 duration-300 transition-all mr-4">
                        <label htmlFor="upload" className="w-full h-full cursor-pointer"><FiUpload className="m-3"/></label>
                        <input type="file" name="upload" id="upload" hidden onChangeCapture={(e) => uploadFile(e)} accept="image/*"/>
                    </div>
                    <input onClick={deleteFile} disabled={selected == null ? true : false} type="submit" value="Apagar" className="bg-red-500 disabled:bg-gray-400 p-3 rounded-sm text-white uppercase text-sm mt-4 cursor-pointer hover:bg-red-600 duration-300 transition-all mr-4"/>
                    <input onClick={getChoosedImage} disabled={selected == null ? true : false} type="submit" value="Salvar" className="bg-blue-500 disabled:bg-gray-400 p-3 rounded-sm text-white uppercase text-sm mt-4 cursor-pointer hover:bg-blue-600 duration-300 transition-all "/>
                </div>
            </div>
        </div>
    )
}

