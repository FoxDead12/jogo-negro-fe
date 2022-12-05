import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    
    const token = req.body.token;

    if(token == '') {
        return res.status(400).json({message: "token does not exist!"})
    }

    //Api para validar token;
    res.status(200).json({message: "sucess!"})
}