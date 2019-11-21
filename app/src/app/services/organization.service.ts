import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Organization } from '../models/organization.model';

const ORGANIZATION = 'organization';

@Injectable ({
	providedIn: 'root'
})
export class OrganizationService {

	user: User;

	constructor(private readonly _db: AngularFirestore,
				private readonly _authService: AuthService,
	) {
		this.user = this._authService.currentUser;
	}

	createOrganization(name: string) {

		const organization = {
			name,
			user: this.user.id,
		};

		this._db.collection (ORGANIZATION).add (organization)
				.then (() => {
					console.log ('Criado');
				})
				.catch (error => {
					console.log (error.message);
				})
	}

	fetchAll(): Organization[] {

		const organizations = [];
		this._db.collection (ORGANIZATION).ref.where ('user', '==', this.user.id)
				.onSnapshot (querySnapshot => {
					querySnapshot.forEach (doc => {
						const org = doc.data ();
						org.id = doc.id;
						organizations.push (org);
					})
				});

		return organizations;
	}

	deleteOrganization(id: string) {
		this._db.collection (ORGANIZATION).ref.doc (id).delete ()
				.then (() => {
					console.log ('Deletado');
				})
				.catch (error => {
					console.log (error.message);
				})
	}

	updateOrganization(organization: Organization) {
		this._db.collection (ORGANIZATION).ref.doc (organization.id).update ({
			name: organization.name
		})
				.then (() => {
					console.log ('Atualizado');
				})
				.catch (error => {
					console.log (error.message);
				})
	}
}
