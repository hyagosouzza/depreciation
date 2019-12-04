import { Component, OnInit } from '@angular/core';
import { MetadadosService } from '../../../../services/metadados.service';
import { AssetCategory } from '../../../../models/asset-category.model';
import { Organization } from '../../../../models/organization.model';
import { OrganizationService } from '../../../../services/organization.service';
import { Asset } from '../../../../models/asset.model';
import { AssetService } from '../../../../services/asset.service';
import { NgForm } from '@angular/forms';

@Component ({
	selector: 'app-create',
	templateUrl: './create-asset.component.html',
	styleUrls: ['./create-asset.component.scss']
})
export class CreateAssetComponent implements OnInit {

	asset: Asset = {};

	categories: AssetCategory[];
	organizations: Organization[];
	maxDate: Date = new Date ();

	constructor(private readonly _metadadosService: MetadadosService,
				private readonly _organizationService: OrganizationService,
				private readonly _assetService: AssetService,
	) { }

	ngOnInit() {
		this._loadMetadados ();
		this._loadOrganizations ();
	}

	private async _loadMetadados() {
		this.categories = (await this._metadadosService.fetchAllCategories ()).data ().categories as AssetCategory[];
	}

	private async _loadOrganizations() {
		this.organizations = this._organizationService.fetchAll ();
	}

	createAsset(form: NgForm) {
		this._assetService.create (this.asset);
		form.resetForm ();
	}

}
