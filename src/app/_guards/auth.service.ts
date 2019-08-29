import {Injectable} from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor() {
    }

    logout(): void {
        localStorage.removeItem('rid');
        localStorage.removeItem('fname');
        localStorage.removeItem('email');
        localStorage.removeItem('profile_photo');
        localStorage.removeItem('user_logs_status');
        localStorage.setItem('isLoggedIn', 'false');
        localStorage.removeItem('token');
    }
}
