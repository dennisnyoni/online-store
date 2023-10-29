import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  getErrorMessage(statusCode: number): string {
    switch (statusCode) {
      case 400:
        return 'The request is malformed or contains invalid parameters. status code: '+statusCode;
      case 401:
        return 'The request requires authentication or the provided credentials are invalid. status code: '+statusCode;
      case 403:
        return 'The you may not have permission to access the resource. status code: '+statusCode;
      case 404:
        return 'The requested resource was not found on the server. status code: '+statusCode;
      case 500:
        return 'An error occurred on the server. status code: '+statusCode;
      case 502:
        return 'The server, while acting as a gateway or proxy, received an invalid response from an upstream server. status code: '+statusCode;
      case 503:
        return 'The server, while acting as a gateway or proxy, received an invalid response from an upstream server. status code: '+statusCode;
      default:
        return 'An unknown error occurred. status code: '+statusCode;
    }
  }
}
