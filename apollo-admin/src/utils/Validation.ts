class Validation {
  private constructor() {}

  public static email(email: string): boolean {
    const errors: Array<boolean> = []
    const arr: Array<string> = email.split('')
    const obj = { at: arr.includes('@'), dot: arr.includes('.') }
    const afterAt = email.split('@')[1]
    const beforeAt = email.split('@')[0]

    if (!afterAt || (afterAt !== undefined && afterAt.length < 4)) {
      errors.push(true)
    }
    if (!beforeAt || (beforeAt !== undefined && beforeAt.length < 2)) {
      errors.push(true)
    }
    if (!obj.at) errors.push(true)

    if (!obj.dot) errors.push(true)

    if (email.split(' ').length > 1) errors.push(true)

    return errors.length <= 0
  }

  public static password(password: string) {
    return password.length >= 8
  }
}

export default Validation
