type User = {

    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    bookings?: Booking[];
}

type UserRecord = {
    id: string;
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    bookings?: Booking[];
}


type UserLogin = {
    email: string
    password: string
}
type UserRegister = {

    name: string;
    email: string;
    password: string;
    isAdmin: boolean;

}



type UserPassword = {
    password: string;
    email: string;
}
