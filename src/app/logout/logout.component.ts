import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from '../_guards/auth.service';

@Component({
    selector: 'app-logout',
    templateUrl: './logout.component.html',
    styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

    id: string;
    constructor(private router: Router, public authService: AuthService) { }

    ngOnInit() {
        this.id = localStorage.getItem('token');
        console.log('Logout');
        this.authService.logout();
        this.router.navigate(['/']);
    }


}
