import { IBscscan, IBscscanTokenSupply } from "../../interface/IBscscan";
import api from "../axios";


export default {
    //Token Transfer Events' by Address
    /*
    * Action: tipo de ação da bscscan
    * ContractAddress: endereço da wallet do jogo/aqui é onde define qual jogo vai ser escolhido para buscar as transferencias e eventos
    * address: endereço wallet da pessoa que está jogando o jogo.
    * apikey: Chave da api da bscscan/permissão e etc
    *: Promise<Object[]>
    */
    async getAllTokenTransferEventByAddresWallet({ action, contractAddress, address, page }: IBscscan) {
        try { //contractaddress=${contractAddress}
            const transferEvents = await api.get(`?module=account&action=${action}&address=${address}&page=${page}&offset=25&startblock=0&endblock=999999999&sort=desc&apikey=${process.env.tokenBscScan}`)
            if (transferEvents.status === 200 && transferEvents.data.message === "OK" && transferEvents.data.result.length >= 0) {
                return transferEvents.data;
            }
            return transferEvents.data;
        } catch (error) {
            throw new Error(`Erro ao fazer requisição para api: ${error}`);

        }
    },
    async getBEP_20TokenTotalSupplybyContratact({ contractAddress }: IBscscanTokenSupply) {
        try {
            const bep20 = await api.get(`?module=stats&action=tokensupply&contractaddress=${contractAddress}&apikey=${process.env.tokenBscScan}`)
            if (bep20.status === 200) return bep20.data
            return []
        } catch (error) {
            throw new Error(`Erro ao fazer requisição para api: ${error}`);
        }
    },
    async getBEP_20TokenCirculationSupplybyContratact({ contractAddress }: IBscscanTokenSupply) {
        try {
            const bep20 = await api.get(`?module=stats&action=tokenCsupply&contractaddress=${contractAddress}&apikey=${process.env.tokenBscScan}`)
            if (bep20.status === 200) return bep20.data
            return []
        } catch (error) {
            throw new Error(`Erro ao fazer requisição para api: ${error}`);
        }
    }
}