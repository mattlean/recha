/**
 * HTTP error class that supports HTTP status codes & responses
 * @extends Error
 * @member message A human-readable description of the error. Usually the response status text.
 * @member name Name of Error
 * @member res HTTP response
 * @member status HTTP status
 */
class HTTPErr extends Error {
  public name: string

  public res: object

  public status: number

  public constructor(message?: string, status?: number, res?: object) {
    super(message)
    this.name = 'HTTPErr'
    if (status) this.status = status
    if (res) this.res = res
  }
}

export default HTTPErr
