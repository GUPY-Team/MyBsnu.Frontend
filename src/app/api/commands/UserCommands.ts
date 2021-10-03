export interface CreateUserCommand {
    userName: string;
    email: string;
    password: string;
}

export interface UpdateUserClaimsCommand {
    userId: string;
    claims: string[];
}
