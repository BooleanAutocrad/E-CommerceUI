export class UserResponse{
    userId: number
    userName: string
    userEmail: string
    userAddress: string;
    jwt: string;

    constructor(){
        this.userId = 0,
        this.userName = ''
        this.userEmail = ''
        this.userAddress = ''
        this.jwt = '';
    }
}