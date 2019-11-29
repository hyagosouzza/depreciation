import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component ({
	selector: 'app-login',
	templateUrl: './login-layout.component.html',
	styleUrls: ['./login-layout.component.scss']
})
export class LoginLayoutComponent implements OnInit {

	constructor(private readonly _router: Router,
				private readonly _authSerivce: AuthService,
	) {
		if (this._authSerivce.authenticated) {
			this._router.navigate (['/home']);
		}
	}

	ngOnInit() {
	}

}
