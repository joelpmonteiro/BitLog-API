import { Request, Response } from "express";
import apiColaventhq from "../../services/api-covalenthq/api-colaenthq";


export default {
    async getHistoricalPriceTokens(req: Request, res: Response) {
        try {
            const api = {
                chain_id: 56, actual_money: "USD"
            }
            if (req.params.token !== undefined) {
                const { token } = req.params
                const ret = await apiColaventhq.getHistoricalTokenPrices({ chain_id: api.chain_id, actual_money: api.actual_money, contract_address: token })
                return res.status(200).json(ret)
            } else return res.status(404).json({ msg: 'token nao encontrado ou invalido!' })

        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: 'Internal Error' })
        }
    },
    async getPriceVolatility(req: Request, res: Response) {
        try {
            const ret = await apiColaventhq.getPriceVolatility({})
            console.log(ret)
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: 'Internal Error' })
        }
    }
}