import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const token = req.cookies.token;
    
    if(req.method === "GET") {

        //1º Buscar Nome Ficheiros
        const result = await fetch(process.env['SERVER_URL_MAIN'] + "/files",
            {
                method: 'GET',
                headers: {
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                Cookie: `token=${token}`
            },
        });
    
        const data = await result.json(); 
        if(result.status == 200) {
            return res.status(200).json(data)
        }
        
        res.status(400).json(data)
    } 
    else {

        const result = await fetch(process.env['SERVER_URL_MAIN'] + "/files/upload",
        {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Access-Control-Allow-Origin": "*",
                    "Access-Control-Allow-Credentials": "true",
                    Cookie: `token=${token}`,
                    // 'Content-Type': 'multipart/form-data; Boundary=MyBoundary',
                },
                body: req.body,
        });
        const data = await result.json(); 
        console.log(req.body)
        console.log(data)
    }   
    
    res.status(500).json({message: "wrong method request!"})
}