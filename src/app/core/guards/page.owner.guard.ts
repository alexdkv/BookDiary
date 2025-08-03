import { inject } from "@angular/core";
import { CanActivateFn, Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

export const PageOwnerGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    const IDFromUrl = Number(route.paramMap.get('id'));
    const currentUserId = authService.currentUser()?.id;

    if(IDFromUrl === currentUserId){
        return true;
    }else{
        return router.createUrlTree(['/unathorized']);
    }

    
}