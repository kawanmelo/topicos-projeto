export interface Admin {
    id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
}

export interface AdminCreate {
    name: string;
    email: string;
    password: string;
}

export interface AdminUpdate {
    name?: string;
    email?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}
