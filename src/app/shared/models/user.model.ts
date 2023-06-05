export type User = {
    id?: number,
    name: string,
    email: string,
    password: string,
    address: string,
    zip: string,
    country:string,
    isAdmin: boolean,
    isActive: boolean,
    wishlist: number[]
}