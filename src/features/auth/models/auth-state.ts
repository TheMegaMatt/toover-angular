import { ParsedToken, User } from "firebase/auth";

export type AuthUser = User | null | undefined;

export interface AuthState {
    user: AuthUser;
    token: string | null,
    claims: Claims;
}

export interface Claims extends ParsedToken {
    roles?: string[];
}