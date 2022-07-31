import axios from 'axios'
import Env from '../config/Env'

interface IBodySignIn {
  email: string
  password: string
}

class Account {
  private base: string

  private constructor() {
    this.base = (Env.isDevMode && Env.baseDev) || ''
  }

  public static async signIn(body: IBodySignIn) {
    const account = new Account()
    return axios({
      method: 'post',
      url: account.base,
      data: body,
    })
  }
}

export default Account
