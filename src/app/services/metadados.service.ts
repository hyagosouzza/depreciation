import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import DocumentSnapshot = firebase.firestore.DocumentSnapshot;
import * as firebase from 'firebase';
import { AssetCategory } from '../models/asset-category.model';

const META_DADOS = 'metadados';
const ASSETS = 'assets';
const METHODS = 'methods';

@Injectable ({
	providedIn: 'root'
})
export class MetadadosService {

	constructor(private readonly _db: AngularFirestore) {
	}

	fetchAllCategories(): Promise<DocumentSnapshot> {
		return this._db.collection (META_DADOS).doc (ASSETS).ref.get ();
	}

	async findCategory(name: string): Promise<AssetCategory> {
		return ((await this.fetchAllCategories ()).data ().categories as AssetCategory[]).find (categ => {
			return categ.name == name;
		});
	}
}

