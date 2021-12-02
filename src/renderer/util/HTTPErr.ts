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

  /**
   * Create HTTPErr instance
   * @param message (Optional) Standard Error parameter. A human-readable description of the error.
   * @param status (Optional) HTTP status code
   * @param res (Optional) Response
   */
  public constructor(message?: string, status?: number, res?: object) {
    super(message)
    this.name = 'HTTPErr'
    if (status) this.status = status
    if (res) this.res = res
  }
}

export default HTTPErr
