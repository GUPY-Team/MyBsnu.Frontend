export interface UserListModel {
    id: string;
    email: string;
    userName: string;
}

export interface User extends UserListModel {
    claims: Claim[];
}

export interface Claim {
    type: string;
    value: string;
}
