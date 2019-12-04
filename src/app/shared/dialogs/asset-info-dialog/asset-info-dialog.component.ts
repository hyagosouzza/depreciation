import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Asset } from '../../../models/asset.model';
import { MetadadosService } from '../../../services/metadados.service';
import { OrganizationService } from '../../../services/organization.service';
import { AssetCategory } from '../../../models/asset-category.model';
import { Organization } from '../../../models/organization.model';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

@Component ({
	selector: 'app-asset-info-dialog',
	templateUrl: './asset-info-dialog.component.html',
	styleUrls: ['./asset-info-dialog.component.scss']
})
export class AssetInfoDialogComponent implements OnInit {

	asset: Asset = {};
	editing: boolean;
	date: Date;

	categories: AssetCategory[];
	organizations: Organization[];
	maxDate: Date = new Date ();

	constructor(
			private readonly _metadadosService: MetadadosService,
			private readonly _organizationService: OrganizationService,
			public dialogRef: MatDialogRef<AssetInfoDialogComponent>,
			@Inject (MAT_DIALOG_DATA) public data: any
	) {
		this.asset = data.asset;
		this.date = this.asset.date.toDate ();
		this.editing = data.editing;
	}

	ngOnInit() {
		this._loadCategories ();
		this._loadOrganizations ();
	}

	private async _loadCategories() {
		this.categories = (await this._metadadosService.fetchAllCategories ()).data ().categories as AssetCategory[];
	}

	private async _loadOrganizations() {
		this.organizations = this._organizationService.fetchAll ();
	}

	get placeholderDate() {
		return this.asset.date.toDate ().toLocaleDateString ();
	}

	formatDate() {
		this.asset.date = Timestamp.fromDate (this.date);
	}

	close() {
		this.dialogRef.close ();
	}

}
