import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component ({
	selector: 'app-user-profile',
	templateUrl: './user-register.component.html',
	styleUrls: ['./user-register.component.scss']
})
export class UserRegisterComponent implements OnInit {

	email = '';
	password = '';

	constructor(private readonly _auth: AuthService) { }

	ngOnInit() {
	}

	signUp() {
		this._auth.signUp (this.email, this.password);
	}

	get disableForm() {
		return this.email.length == 0 || this.password.length == 0
	}

}
