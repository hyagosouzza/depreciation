import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase';
import { User } from '../models/user.model';

@Injectable ({
	providedIn: 'root'
})
export class AuthService {

	user: User;

	constructor(private readonly _auth: AngularFireAuth) {
		firebase.auth ().onAuthStateChanged ((user) => {
			if (user) {
				let userJSON = JSON.stringify ({
					name: user.displayName,
					email: user.email,
					id: user.uid,
				});
				localStorage.setItem ('user', userJSON);
			}
		});
		this.user = JSON.parse (localStorage.getItem ('user'));
	}

	get authenticated() {
		return !!this.user;
	}

	get currentUser(): any {
		return this.authenticated ? this.user : null;
	}

	signUp(email: string, password: string) {
		this._auth.auth.createUserWithEmailAndPassword (email, password)
				.then (() => {
					location.reload ();
				}).catch (error => {
			//
		});
	}

	signIn(email: string, password: string) {
		this._auth.auth.setPersistence (firebase.auth.Auth.Persistence.LOCAL)
				.then (() => {
					firebase.auth ().signInWithEmailAndPassword (email, password)
							.then (() => {
								location.reload ();
							}).catch (error => {
						//
					});
				})
				.catch (error => {
					//
				});
	}

	signOut() {
		this._auth.auth.signOut ();
		localStorage.clear ();
		location.reload ();
	}

	updateUser(user: User) {
		firebase.auth ().currentUser.updateProfile ({
			displayName: user.name,
		}).then (() => {
			firebase.auth ().currentUser.updateEmail (user.email).then (() => {
				// Update successful.
			}).catch (error => {
				console.log (error.message);
			});
			console.log ('Atualizado');
		}).catch (error => {
			console.log (error.message);
		});
	}

	resetPassword() {
		this._auth.auth.sendPasswordResetEmail (this.user.email)
				.then (() => {
					console.log ('Enviado')
				}).catch (error => {
			console.log (error.message);
		});
	}
}
