import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { retry, } from 'rxjs/operators';
import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest
} from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(
        request: HttpRequest<any>,
        next: HttpHandler
    ): Observable<HttpEvent<any>> {

        request = request.clone({
            setHeaders: {
                'X-Api-Key': environment.API_KEY
            }
        })

        return next.handle(request)
            .pipe(retry(2));
    }
}
