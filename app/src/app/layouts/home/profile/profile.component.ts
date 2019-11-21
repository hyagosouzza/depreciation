import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../../../models/user.model';

@Component ({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

	user: User;
	updateEnable = false;

	constructor(private readonly _authService: AuthService,
				private readonly _db: AngularFirestore,
	) {
		this.user = this._authService.currentUser;
	}

	ngOnInit() {
	}

	toogleUpdate() {
		this.updateEnable = !this.updateEnable;
	}

	updateUser() {
		this._authService.updateUser (this.user);
	}

	resetPassword() {
		this._authService.resetPassword ();
	}

}
