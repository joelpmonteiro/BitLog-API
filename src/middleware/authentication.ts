import { sign, verify } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"

import ILogin from '../interface/ILogin';
if (process.env.SECRETE_KEY !== "production") {
  require("dotenv").config();
}
const secretKey: string = `chaveSecretKeyDAAPI`


export function createToken({ name }: ILogin): string {
  if (name !== null) {
    const token = sign({ name }, secretKey, {
      expiresIn: 7200, //2h
    })
    return token
  } else return ""

}

export function authorizationLogin(req: Request, res: Response, next: NextFunction) {
  try {
    if (req.headers["authorization"] !== undefined) {
      const token: string = req.headers["authorization"]
      console.log(`token: ${token}`)
      if (!token) {
        return res
          .status(401)
          .send({ auth: false, Mensagem: "Token foi expirado ou nao informado, para que está ação seja permitido!" });
      }

      verify(token, secretKey, (err, decoded) => {
        if (err)
          return res.status(403).send({ Mensagem: "Falha na Autentificação" });
        //req.usuario = decoded.id;
        next();
      });

    } else return res.status(404).send({ Mensagem: "Não foi possivel permitir essá ação, relogue e tente novamente!" });

  } catch (error) {
    return res.status(500).send({ Mensagem: "Erro Interno no sistema" });
  }
}

