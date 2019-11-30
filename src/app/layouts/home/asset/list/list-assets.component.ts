import { Component, OnInit, ViewChild } from '@angular/core';
import { AssetService } from '../../../../services/asset.service';
import { Asset } from '../../../../models/asset.model';
import { MatDialog } from '@angular/material';
import { DesactiveAssetDialogComponent } from '../../../../shared/dialogs/desactive-asset-dialog/desactive-asset-dialog.component';
import { ConfirmComponent } from '../../../../shared/dialogs/confirm/confirm.component';
import { AssetInfoDialogComponent } from '../../../../shared/dialogs/asset-info-dialog/asset-info-dialog.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { OrganizationService } from '../../../../services/organization.service';
import { MetadadosService } from '../../../../services/metadados.service';
import { Organization } from '../../../../models/organization.model';
import { AssetCategory } from '../../../../models/asset-category.model';
import Timestamp = firebase.firestore.Timestamp;
import * as firebase from 'firebase';

@Component ({
	selector: 'app-list',
	templateUrl: './list-assets.component.html',
	styleUrls: ['./list-assets.component.scss']
})
export class ListAssetsComponent implements OnInit {

	assets: Asset[];
	organizations: Organization[];
	categories: AssetCategory[];

	displayedColumns: string[] = ['organization', 'name', 'category', 'value', 'date', 'options'];
	dataSource: MatTableDataSource<Asset>;

	@ViewChild (MatSort, { static: true }) sort: MatSort;

	constructor(private readonly _assetService: AssetService,
				private readonly _organizationService: OrganizationService,
				private readonly _metadadosService: MetadadosService,
				public dialog: MatDialog) {
		this._loadOrganizations ();
		this._loadCategories ();
	}

	ngOnInit() {
		if (this.dataSource) {
			this.dataSource.sort = this.sort;
		}
		this._loadAssets ();
	}

	private async _loadOrganizations() {
		this.organizations = this._organizationService.fetchAll ();
	}

	private async _loadCategories() {
		this.categories = (await this._metadadosService.fetchAllCategories ()).data ().categories as AssetCategory[];
	}

	private async _loadAssets() {
		this.assets = (await this._assetService.fetchAll ()).docs.map (doc => {
			let asset: Asset;
			asset = doc.data () as Asset;
			asset.id = doc.id;
			return asset;
		}) as Asset[];
		this.dataSource = new MatTableDataSource (this.assets);
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

	organizationNameById(id: string): string {
		const org = this.organizations.find (org => {
			return org.id === id;
		});

		return org ? org.name : 'Não infomado';

	}

	categoryByName(name: string): AssetCategory {
		return this.categories.find (category => {
			return category.name === name;
		})
	}

	textAboutCategory(name: string): string {
		const category = this.categoryByName (name);

		return category ? 'Vida útil: ' + category.lifeTime + ' anos, ' + 'Depreciação anual: ' + category.annualRate + '%' : 'Não informado';
	}

	applyFilter(filter: string) {
		console.log (filter);
		this.dataSource.filterPredicate = this.tableFilter ();
		this.dataSource.filter = filter;
	}

	tableFilter(): (data: Asset, filter: string) => boolean {
		return function (data, filter): boolean {
			const searchTerms = JSON.parse (filter);
			const aboutDesactive = searchTerms.status != 'active';

			const matchName = data.name.toLowerCase ().indexOf ((searchTerms.name || '').toLowerCase ()) !== - 1;
			const matchCategory = data.category.indexOf (searchTerms.category || '') !== - 1;
			const matchStatus = searchTerms.status && searchTerms.status.length > 0 ?
					data.desactive.desactivated == aboutDesactive : true;

			return matchName && matchCategory && matchStatus;
		};
	}

}
