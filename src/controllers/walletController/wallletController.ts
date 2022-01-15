import { Request, Response } from "express"
import IWallet from "../../interface/IWallet";
import walletModel from "../../model/walletSchemas";
//import apiBscscan from "../../services/api-bscan/api-bscan";
export default {
  async createWallet(req: Request, res: Response) {
    try {
      const { name, typeAccount, addressWallet, visibility }: IWallet = req.body
      console.log({ name, typeAccount, addressWallet, visibility })
      
      if (name && Number.isInteger(typeAccount) && addressWallet && Number.isInteger(visibility)) {
        const wallet = await walletModel.create({ name, typeAccount, addressWallet, visibility })

        if (wallet.name !== "") {

          return res.status(200).json({ msg: "Carteira Cadastrada com sucesso!" })

        } else return res.status(404).json({ msg: "Erro ao cadastrar Wallets!" })

      } else return res.status(404).json({ msg: "Preencha os dados corretamente por favor!" })
      //
    } catch (error) {
      console.log(error)
      return res.status(500).json({ msg: "Erro Interno no sistema" })
    }
  },
}