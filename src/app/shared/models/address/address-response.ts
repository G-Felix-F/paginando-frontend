import { UserResponse } from "../user/user-response";

export interface AddressResponse {
    id: string;
    street: string;
    number: string;
    complement: string;
    city: string;
    state: string;
    zipCode: string;
    user: UserResponse;
}