import { Router } from "express";
import bscanController from "../controllers/bscanController/bscanController";
import usersController from "../controllers/usersController/usersController";
import wallestController from "../controllers/walletController/wallletController";
import colaventhq from "../controllers/colaventhqController/colaventhqController"
// import { createClient } from 'redis';

// import api from "../services/api-covalenthq/api-colaenthq"

const app = Router();
//bscan
app.post("/createUser", usersController.createUser)
app.post("/login", usersController.login)
app.get("/getWallets/:action/:address/:page", bscanController.getAllTransferEventsByAddressWallet)
app.post("/cardWallet", wallestController.createWallet)
app.get("/tokenSupplyContractAddress/:token", bscanController.getTokenSupplyByContractAddres)
app.get("/TokenCirculatingSupply/:token", bscanController.getTokenCirculatingSupply)

//api- covalenthq
app.get("/getHistoricalPriceTokens/:token/:from?/:to?", colaventhq.getHistoricalPriceTokens)
app.get("/getPriceVolatility", colaventhq.getPriceVolatility)
// app.get("/test/:id", async (req: Request, res: Response) => {
//     const id: string = req.params.id
//     console.log(typeof id)
//     const client = createClient({
//         legacyMode: true
//     });
//     client.on('error', (err) => console.log('Redis Client Error', err));
//     await client.connect();
//     const getItem = await client.v4.get(id);
//     //console.log(getItem)
//     if (!getItem) {
//         const result = await api.get(`56/address/${id}/portfolio_v2/?key=${process.env.apiKey}`)
//         await client.v4.set(id, JSON.stringify(result.data), 'EX', 60)
//         await client.v4.expire(id, 60);
//         return res.status(200).json({ result: result.data })
//     } else {
//         console.log(`entrou`)
//         return res.status(200).json({ result: JSON.parse(getItem) })
//     }
//     // await client.v4.set(id, 'value', {
//     //     NX: true
//     // });


//     //const result = await api.get(`56/address/0x7746470733738eBA82357A9E38ACFF69a21BE8A2/portfolio_v2/?key=${process.env.apiKey}`)
//     // console.log(result)
//     //return res.status(200).json({ result: result.data })
// })
export default app