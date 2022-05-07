import { iResponse } from "./response";
import { userType } from "./user";

export class userResponse implements iResponse {
    code: number;
    status: boolean;
    message: string;
    user?: userType
    token?: string
}