import { IUser } from "./user.model";


export interface IState {
  users: IUser[],
  userSelected: {
    posts: IPost[],
  }
  loading: boolean;
  error: Error | null
}

export interface IPost {
  userId: number,
  id: number,
  title: string,
  body: string
}
