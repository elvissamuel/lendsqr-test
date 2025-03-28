
export interface IUser {
  id: number;
  createdAt: string;
  userName: string;
  email: string;
  password: string;
  orgName: string;
  phoneNumber: string;
  status: string;
}

export interface IAdmin {
  id: number;
  createdAt: string;
  name: string;
  email: string;
  password: string;
}

export interface ILoginResponse {
  success: boolean;
  message: string;
  user?: IAdmin;
}