import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, } from 'rxjs/operators';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {
        return next.handle(request)
            .pipe(retry(2));
    }
}
