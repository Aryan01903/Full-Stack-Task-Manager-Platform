export interface IUserPayload {
  id?: string
  name?: string;
  email?: string;
  password?: string;
}

export interface ILoginResponse {
  user: IUserPayload;
  token: string;
}