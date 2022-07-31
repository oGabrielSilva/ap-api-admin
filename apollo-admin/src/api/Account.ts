import axios from 'axios'
import Env from '../config/Env'

interface IBodySignIn {
  email: string
  password: string
}

interface IBodySignUp extends IBodySignIn {
  name: string
  lastName: string
  avatar?: File
}

class Account {
  private base: string

  private constructor(route: string) {
    this.base = ((Env.isDevMode && Env.baseDev) || '').concat(route)
  }

  // eslint-disable-next-line class-methods-use-this
  private formData(body: IBodySignUp) {
    const formData = new FormData()
    if (body.avatar && body.avatar.name) formData.append('avatar', body.avatar)
    formData.append('name', body.name)
    formData.append('lastName', body.lastName)
    formData.append('email', body.email)
    formData.append('password', body.password)
    return formData
  }

  public static async signIn(body: IBodySignIn) {
    const account = new Account('/signin')
    return axios({
      method: 'post',
      url: account.base,
      data: body,
    })
  }

  public static async signUp(body: IBodySignUp) {
    const account = new Account('/signup')
    const formData = account.formData(body)

    return axios({
      method: 'post',
      url: account.base,
      data: formData,
    })
  }
}

export default Account
