interface IUser {
    name: string;
    email: string;
    password: string;
    comparePassword(password: string): boolean;
}

export default IUser