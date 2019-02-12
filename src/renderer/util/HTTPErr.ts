class HTTPErr extends Error {
  public res: any

  public constructor(message: string, res?: any) {
    super(message)

    if (res) this.res = res
  }
}

export default HTTPErr
