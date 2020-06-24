export function _response(retcode: number, result?: any) {
    return Object.assign({}, { retcode, result })
}
export function _errorlog(message: string, data?: any) {
    return Object.assign({}, { message, data })
}
export const HTTP_SYMBOLS = {
    OK_RESPONSE: 0,
    WRONG_RESPONSE: 1,
    ERROR_RESPONSE: 2,
}