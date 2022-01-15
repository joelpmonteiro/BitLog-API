import { Request, Response } from "express";
import apiBscscan from "../../services/api-bscan/api-bscan";

export default {
    async getAllTransferEventsByAddressWallet(req: Request, res: Response) {
        try {
            console.log('test: ', req.params.address)
            const transferEvents = await apiBscscan.getAllTokenTransferEventByAddresWallet(
                { action: req.params.action, contractAddress: req.params.contractAddress, address: req.params.address, apikey: req.params.apikey, page: Number(req.params.page) })
            console.log(`dados: `, transferEvents.result.length >= 0)
            if (transferEvents.result.length > 0) {
                const newArrayTransferEvents = transferEvents.result.map((item: any) => {
                    if (item.to === req.params.address.toLowerCase() || item.from === req.params.address.toLowerCase()) {
                        item.nameWallet = 'Lion'
                        item.nameWalletContract = null
                    } else { item.nameWalletContract = 'Lion'; item.nameWallet = null }
                    return item
                })
                return res.status(200).json({ wallet: newArrayTransferEvents, msg: "" });
            } else return res.status(404).json({ msg: "Não existe eventos dessa wallet/Carteira" });
        } catch (error) {
            console.log(error)
            return res.status(500).json({ msg: "Erro interno no sistema!" });
        }
    }
}