 import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    
    if(req.method === "GET") {

        //1º Buscar Nome Ficheiros
        const rs = await fetch(process.env['SERVER_URL_MAIN'] + "/files", {
            method: 'GET',
            headers: {
                'Cookie': `token=${req.cookies.token};`
            },
        });
    
        if(rs.status == 200 || rs.status == 201) {
            const data = await rs.json();
            return res.status(200).json(data);
        }
        else {
            const data = await rs.json();
            return res.status(rs.status).json(data);
        }        
    } 
    
    if(req.method === "POST") {

        const formData = new FormData();
        formData.append("image", req.body)

        console.log(formData)
        const rs = await fetch(process.env['SERVER_URL_MAIN'] + '/files/upload', {
            method: 'POST',
            body: formData,
            headers: {
                'Cookie': `token=${req.cookies.token};`
            }
        });

        if(rs.status == 200 || rs.status == 201) {
            return res.status(200).json({message: "Upload com sucesso!!"});
        }
        else {
            const data = await rs.json();
            return res.status(rs.status).json(data);
        }
    }
    
    res.status(500).json({message: "wrong method request!"})
}