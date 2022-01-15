import { Request, Response } from "express"
import IUser from "../../interface/IUser"
import usersModel from "../../model/usersSchemas"
import { createToken } from "../../middleware/authentication"

export default {
    async createUser(req: Request, res: Response) {
        try {
            //Fazer teste de duplicidade de Login nome e email/
            const { name, email, password }: IUser = req.body

            if (( name !== "") && ( email !== "") && (password !== "")) {
                //busca pelo nome
                const selectName = await usersModel.find({ name: name })
                if (selectName.length > 0)
                    return res.status(404).json({ msg: 'Usuario já existente, use outro nome!' })
                //busca pelo Email
                const selectEmail = await usersModel.find({ email: email })
                if (selectEmail.length > 0)
                    return res.status(404).json({ msg: 'E-mail já utilizado cadastre outro!' })
                //Cadastro de usuarios
                const user = await usersModel.create({ name, email, password })
                if (user.__v !== undefined) {
                    //
                    return res.status(201).json({ msg: 'Conta Criada Com sucesso!', })
                } else return res.status(404).json({ msg: 'Erro ao Criar Conta!' })

            } else return res.status(404).json({ msg: 'Por favor Preencha os dados corretamente' })
            //
        } catch (error) {
            console.log(`error: `, error)
            return res.status(500).json({ msg: 'Erro ao conectar no banco de dados' })
        }
    },
    async login(req: Request, res: Response) {
        try {
            const { email, password } = req.body
            if ((email !== "") && ( password !== "")) {
                const user = await usersModel.findOne({ email: email }).exec();

                if (!user) {
                    return res.status(400).send({ msg: "Usuario não existe" });
                }

                const comparePassword = await user.comparePassword(password)
                if (comparePassword) {
                    const token = createToken(email)
                    console.log(user.name)
                    return res.status(200).send({ token: token, msg: "Login feito com sucesso!",name: user.name });

                } else return res.status(400).send({ msg: "Usuario e senha não coincidem" });

            } else return res.status(404).json({ msg: 'Por favor Preencha os dados corretamente' })

        } catch (error) {
            return res.status(500).json({ msg: 'Erro Interno no sistema!' })
        }
    }
}