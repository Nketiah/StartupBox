export interface User {
    id: string
    fullName: string
    email: string
    password: string
    role: "admin" | "user" | "guest"
}