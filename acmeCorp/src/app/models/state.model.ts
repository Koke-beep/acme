import { IUser } from "./user.model";

export interface IState {
  users: Map<number, IUser>
  idUserSelected?: number
  currentComments: IComment[]
  loading: boolean;
  error: Error | null
}

export interface IPost {
  userId: number
  id: number
  title: string
  body: string,
  comments?: IComment[]
}

export interface IComment {
  postId: number
  id: number
  name: string
  email: string
  body: string
}

export type IUserCollection = Map<number, IUser>
