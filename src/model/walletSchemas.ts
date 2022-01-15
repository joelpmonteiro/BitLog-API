import mongoose from "../config/mongoDB";
import IWallet from "../interface/IWallet";

const walletSchema = new mongoose.Schema<IWallet>({
    name: { type: String, required: true },
    typeAccount: { type: Number, required: true },
    addressWallet: { type: String, required: true },
    visibility: { type: Number, required: true }
})

const walletsModel = mongoose.model<IWallet>('walletModel', walletSchema)

export default walletsModel