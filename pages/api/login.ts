import { NextApiRequest, NextApiResponse } from "next";
import Cookies from 'cookies'


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    if(req.method === "POST") {
        
        await fetch(process.env['SERVER-URL-MAIN'] + '/users/login', {
            method: "POST",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            },
            body: JSON.stringify({
                email: req.body.email,
                password: req.body.password,
                keepSession: req.body.keepSession
            })
        })
        .then(result => result.json())
        .then(data => {

            //Gerar COOKIE
            if(data?.statusCode) {return res.status(500).json(data);}
            
            if(req.body.keepSession == true) {
                res.setHeader('Set-Cookie', 'token='+ data.token +'; Max-Age='+ 3600 * 720 +'; Path=/');
            }
            else {
                res.setHeader('Set-Cookie', 'token='+ data.token +'; Max-Age='+ 3600 * 24 +'; Path=/');
            }

            res.status(201).json(data);
        })
        .catch(error => {

            console.log(error)
            res.status(500).json(error);
        })
    }
    else {
        res.status(500).json({message: "wrong method request!"})
    }
}