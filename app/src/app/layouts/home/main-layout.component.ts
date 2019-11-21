import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component ({
	selector: 'app-home',
	templateUrl: './main-layout.component.html',
	styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {


	constructor(private readonly _router: Router,
				private readonly _authSerivce: AuthService,
	) {
		if (!this._authSerivce.authenticated) {
			this._router.navigate (['/login']);
		}
	}

	ngOnInit() {}

}
