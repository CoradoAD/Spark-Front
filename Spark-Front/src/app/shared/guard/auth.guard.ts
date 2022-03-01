import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.authservice.userIsconnected()
      .pipe(
        switchMap(isLogged => {
          console.log("isLogged = " + isLogged);
          if (isLogged) {
            console.log("is Connected");
            return of(true);
          }
          this.router.navigateByUrl("login");
          return of(false);
        })
      );
  }
}