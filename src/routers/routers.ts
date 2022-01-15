import { Router } from "express";
import bscanController from "../controllers/bscanController/bscanController";
import usersController from "../controllers/usersController/usersController";
import wallestController from "../controllers/walletController/wallletController";
const app = Router();

app.post("/createUser", usersController.createUser)
app.post("/login", usersController.login)
app.get("/getWallets/:action/:address/:page", bscanController.getAllTransferEventsByAddressWallet)
app.post("/cardWallet", wallestController.createWallet)

export default app