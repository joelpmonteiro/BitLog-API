import mongoose from "../config/mongoDB";
import IUser from '../interface/IUser';
import bcrypt from "bcrypt";
const SALT_WORK_FACTOR = 15;

const usersSchema = new mongoose.Schema<IUser>({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
})

usersSchema.pre("save", async function (next) {
    try {
        if (this.isModified("password")) {

            const gerarHash = await bcrypt.genSalt(SALT_WORK_FACTOR);
            const passwordHash = await bcrypt.hash(this.password, gerarHash);
            console.log(passwordHash)
            this.password = passwordHash
            return next();
        }
    } catch (err: any) {
        next(err);
    }

})

usersSchema.methods.comparePassword = async function comparePassword(plaintext) {
    return await bcrypt.compare(plaintext, this.password);
};


const usersModel = mongoose.model<IUser>('userModel', usersSchema)

export default usersModel