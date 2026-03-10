import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const isAuthenticated: boolean = this.authService.isAuthenticated()

    if (isAuthenticated && state.url === '/login') {
      this.router.navigate(['/dashboard']);
      return false;
    }

    if (!isAuthenticated && state.url !== '/login') {
      this.router.navigate(['/login']);
      return false;
    }

    return true;
  }
}