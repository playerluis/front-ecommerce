export enum HttpStatusCode {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
    NotImplemented = 501,
    BadGateway = 502,
    ServiceUnavailable = 503,
    GatewayTimeout = 504
}

export enum HttpMethod {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    DELETE = 'DELETE',
    PATCH = 'PATCH',
    HEAD = 'HEAD',
    OPTIONS = 'OPTIONS',
    CONNECT = 'CONNECT',
    TRACE = 'TRACE',
}

export enum ContentType {
    JSON = 'application/json',
    FORM_URLENCODED = 'application/x-www-form-urlencoded',
    FORM_DATA = 'multipart/form-data"',
    TEXT_PLAIN = 'text/plain',
    TEXT_HTML = 'text/html',
    OCTET_STREAM = 'application/octet-stream',
    XML = 'application/xml',
    PDF = 'application/pdf',
    ZIP = 'application/zip'
}