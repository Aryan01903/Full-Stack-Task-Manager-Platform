import UserModel from "../models/user.js";
import type { IUser } from "../types/user.js";

class Services{
    static async register(data: IUser){
        const response = {
            data: null,
            status: false
        }
        try{
            const docData = new UserModel();
            docData.name = data.name;
            docData.email = data.


        }catch(err){
            throw err;
        }
    }
}