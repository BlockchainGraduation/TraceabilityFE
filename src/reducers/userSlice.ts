

interface Auth{
    login:boolean;
    user: object;
}
interface User{
    id:string;
    firstName:string;
    lastName:string;
    username:string;
    email:string;
    phone: string;
    image: string;
    walletAddress: string;
    role: string;
    geographicalAddress: string;
    isActive: boolean;
}
const initialUser: User = {
    id:'',
    firstName:'',
    lastName:'',
    username:'',
    email:'',
    phone: '',
    image: '',
    walletAddress: '',
    role: '',
    geographicalAddress: '',
    isActive: false
}