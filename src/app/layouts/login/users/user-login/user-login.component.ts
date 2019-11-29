import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { Router } from '@angular/router';

@Component ({
	selector: 'app-user-login',
	templateUrl: './user-login.component.html',
	styleUrls: ['./user-login.component.scss']
})
export class UserLoginComponent implements OnInit {

	hide = true;

	email = '';
	password = '';

	constructor(private readonly _auth: AuthService,
				private readonly _router: Router,
	) { }

	ngOnInit() {
	}

	signIn() {
		this._auth.signIn (this.email, this.password);
	}

	get disableForm() {
		return this.email.length == 0 || this.password.length == 0;
	}

}
