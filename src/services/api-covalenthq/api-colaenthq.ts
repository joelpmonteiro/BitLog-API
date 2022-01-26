import { ICovalenthq, ICovalenthqPriceVolatility } from "../../interface/ICovalenthq";
import api from "../axiosCovalenthq";


export default {
    //Token Transfer Events' by Address
    /*
    * Action: tipo de ação da bscscan
    * ContractAddress: endereço da wallet do jogo/aqui é onde define qual jogo vai ser escolhido para buscar as transferencias e eventos
    * address: endereço wallet da pessoa que está jogando o jogo.
    * apikey: Chave da api da bscscan/permissão e etc
    *: Promise<Object[]>
    */
    async getHistoricalTokenPrices({ chain_id, actual_money, contract_address, page_number, page_size, data_from, data_to }: ICovalenthq) {
        try {
            console.log({ chain_id, actual_money, contract_address, page_number, page_size, data_from, data_to })
            const historical = await api.get(`pricing/historical_by_addresses_v2/${chain_id}/${actual_money}/${contract_address}/?quote-currency=${actual_money} ${data_from !== undefined ? `&from=${data_from}&to=${data_to}&` : '&'}format=JSON&key=${process.env.apiKey}`)
            if (historical.status === 200) return historical.data
            return []
        } catch (error) {
            console.log(error)
            throw new Error(`Erro ao fazer requisição para api: ${error}`);

        }
    },
    async getPriceVolatility({ tickers, page_number, page_size }: ICovalenthqPriceVolatility) {
        try {
            const price = await api.get(`pricing/volatility/?format=JSON&key=${process.env.apiKey}`)
            if (price.status === 200) return price.data;
            return []
        } catch (error) {
            throw new Error(`Erro ao fazer requisição para api: ${error}`);

        }
    }
}