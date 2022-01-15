import mongoose, { ConnectOptions } from "mongoose";

const uri = "mongodb+srv://root:451236@blockchain.ymv0l.mongodb.net/blockChain?retryWrites=true&w=majority";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(uri, options as ConnectOptions)

mongoose.Promise = global.Promise
export default mongoose