import { AuthApi, RegisterRequest, AuthResponse } from "../api/authApi";
import { PurchaseContext } from "../context/purchaseContext";
import { generateUniqueEmail } from "../factories/userFactory";

export class RegisterUserScene {
    constructor( private readonly authApi: AuthApi) {}

    async registerUser( context: PurchaseContext): Promise<AuthResponse> {
        
        const email = generateUniqueEmail();
        const requestBody: RegisterRequest = {
            email,
            password: context.user.password,
            name: context.user.name
        };

        const response = await this.authApi.register(requestBody);

        if (response.status() !== 201) {
            throw new Error(`User registration failed. Status: ${response.status()}`);
        }

        const body =await response.json() as AuthResponse;

        context.user.email = body.user.email;
        context.user.id = body.user.id;
        context.user.name = body.user.name;
        context.user.token = body.token;

        return body;
    }
}