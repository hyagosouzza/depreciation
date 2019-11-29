import { Component, OnInit } from '@angular/core';
import { AssetService } from '../../../../services/asset.service';
import { Asset } from '../../../../models/asset.model';
import { MatDialog } from '@angular/material';
import { DesactiveAssetDialogComponent } from '../../../../shared/dialogs/desactive-asset-dialog/desactive-asset-dialog.component';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';
import { ConfirmComponent } from '../../../../shared/dialogs/confirm/confirm.component';
import { AssetInfoDialogComponent } from '../../../../shared/dialogs/asset-info-dialog/asset-info-dialog.component';

@Component ({
	selector: 'app-list',
	templateUrl: './list-assets.component.html',
	styleUrls: ['./list-assets.component.scss']
})
export class ListAssetsComponent implements OnInit {

	assets: Asset[];

	constructor(private readonly _assetService: AssetService,
				public dialog: MatDialog) { }

	ngOnInit() {
		this._loadAssets ();
	}

	private async _loadAssets() {
		this.assets = (await this._assetService.fetchAll ()).docs.map (doc => {
			let asset: Asset;
			asset = doc.data () as Asset;
			asset.id = doc.id;
			return asset;
		}) as Asset[];
	}

	delete(id: string) {
		const dialogRef = this.dialog.open (ConfirmComponent, {
			width: '400px',
			data: {
				message: 'Deseja realmente excluir esse bem patrimonial?',
			}
		});

		dialogRef.afterClosed ().subscribe (result => {
			if (result) {
				this._assetService.delete (id);
				this._loadAssets ();
			}
		});
	}

	openDesactiveDialog(asset: Asset) {
		const dialogRef = this.dialog.open (DesactiveAssetDialogComponent, {
			width: '400px'
		});

		dialogRef.afterClosed ().subscribe (result => {
			if (result) {
				asset.desactive = {
					date: Timestamp.now (),
					reason: result,
					desactivated: true,
				};
				this._assetService.update (asset);
				this._loadAssets ();
			}
		});
	}

	reactive(asset: Asset) {
		asset.desactive = {
			desactivated: false,
		};
		this._assetService.update (asset);
	}

	openAssetInfoDialog(asset: Asset, editing = false) {
		const dialogRef = this.dialog.open (AssetInfoDialogComponent, {
			width: '600px',
			data: {
				asset,
				editing,
			}
		});

		dialogRef.afterClosed ().subscribe (result => {
			if (result) {
				this._assetService.update (result);
				this._loadAssets ();
			}
		});
	}

}
