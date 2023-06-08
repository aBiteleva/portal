import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {RepositoryKey} from "../repository-key";

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authData = localStorage.getItem(RepositoryKey.TOKEN);
        if (authData) {
            req = req.clone({
                setHeaders: {
                    Authorization: 'Bearer ' + authData
                }
            });
        }
        return next.handle(req);
    }
}
