type User = {

    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    createdAt: Date;
    bookings?: Booking[];
}

