import config from "../config/config";
import { Client, Account, ID } from "appwrite";
export class AuthService {
    client = new Client();
    
    constructor(){

        this.client
            .setEndpoint(config.appwriteUrl)
            .setProject(config.appwriteProjectId);
        this.account = new Account(this.client);
    }
    async logout(){
        try {
            await this.account.deleteSessions();
        } catch (error) {
            return error;
        }
    }
    async getCurrentUser(){
        try {
           const user = await this.account.get();
           return user
            
        } catch (error) {
            throw error;
        }
        return null;
    }
    async login({email , password}){
         try {
            return await this.account.createEmailPasswordSession(email , password)
         } catch (error) {
            throw error;
         }
    }
    async createAccount ({email , password , name}){
        try {
           const userAccount=  await this.account.create(ID.unique(), email , password , name);
            if (userAccount) {
                return this.login(email , password);
            } else {
                return  userAccount;
            }
        } catch (error) {
            throw error;
        }

    }
}

const authService = new AuthService();

export default authService;