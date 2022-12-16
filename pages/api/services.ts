import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {

    if(req.method === "POST") {
        const rs = await fetch(process.env['SERVER_URL_MAIN'] + '/services', {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",   
                'Cookie': `token=${req.cookies.token};`
            }
        });

        if(rs.status == 200 || rs.status == 201) {
            return res.status(200).json({message: "Serviço criado com sucesso!!"});
        }
        else {
            const data = await rs.json();
            return res.status(rs.status).json(data);
        }
    }

    if(req.method === "PUT") {
        
        const rs = await fetch(process.env['SERVER_URL_MAIN'] + '/services/edit', {
            method: "POST",
            body: JSON.stringify(req.body),
            headers: {
                "Content-type": "application/json; charset=UTF-8",   
                'Cookie': `token=${req.cookies.token};`
            }
        });   

        if(rs.status == 200 || rs.status == 201) {
            return res.status(200).json({message: "Serviço editado com sucesso!!"});
        }
        else {
            const data = await rs.json();
            return res.status(rs.status).json(data);
        }
    }

    if(req.method === "DELETE") {

        const rs = await fetch(process.env['SERVER_URL_MAIN'] + `/services/${req.body._id}`, {
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",   
                'Cookie': `token=${req.cookies.token};`
            }
        });

        if(rs.status == 200 || rs.status == 201) {
            return res.status(200).json({message: "Serviço apagado com sucesso!!"});
        }
        else {
            const data = await rs.json();
            return res.status(rs.status).json(data);
        }
    }
}