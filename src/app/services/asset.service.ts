import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Asset } from '../models/asset.model';
import * as firebase from 'firebase';
import QuerySnapshot = firebase.firestore.QuerySnapshot;

const ASSET = 'asset';

@Injectable ({
	providedIn: 'root'
})
export class AssetService {

	constructor(private readonly _db: AngularFirestore) {
	}

	create(asset: Asset) {
		this._db.collection (ASSET).add (asset).then (value => {
			console.log (value);
		});
	}

	fetchAll(): Promise<QuerySnapshot> {
		return this._db.collection (ASSET).ref.get ();
	}

	delete(id: string) {
		this._db.collection (ASSET).doc (id).delete ();
	}

	update(asset: Asset) {
		this._db.collection (ASSET).doc (asset.id).update (asset);
	}

}
