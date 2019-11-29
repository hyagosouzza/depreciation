import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component ({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

	constructor(private readonly _authService: AuthService) { }

	ngOnInit() {
	}

	signOut() {
		this._authService.signOut ();
	}

}
