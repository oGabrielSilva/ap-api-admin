import mongoose from 'mongoose'

export type TUserSignIn = {
  email: string
  password: string
}

export interface TUser extends TUserSignIn {
  name: string
  lastname: string
  avatar?: string
}

export type TSession = {
  id: mongoose.Types.ObjectId
  uid: string
}
