import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Organization } from '../../../../models/organization.model';
import { ConfirmComponent } from '../../dialogs/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationService } from '../../../../services/organization.service';
import { AssetService } from '../../../../services/asset.service';

@Component ({
	selector: 'app-organization-list',
	templateUrl: './organization-list.component.html',
	styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

	@Output () createOrganization = new EventEmitter ();
	@Output () deleteOrganization = new EventEmitter ();

	organizations: Organization[];
	counts: number[] = [];
	orgToEdit: string;
	name = '';

	constructor(public dialog: MatDialog,
				private readonly _organizationService: OrganizationService,
				private readonly _assetService: AssetService,
	) { }

	ngOnInit() {
		this.fetchOrganizations ();
	}

	async fetchOrganizations() {
		this.organizations = (await this._organizationService.fetchAllAsync ()).docs.map (doc => {
			const org = doc.data ();
			org.id = doc.id;
			return org;
		});
		this._loadCounts ();
	}

	private _loadCounts() {
		this.organizations.forEach (async org => {
			this.counts.push ((await this._assetService.fetchAllFromOrganization (org)).size);
		});
	}

	toogleEdit(id?: string) {
		this.orgToEdit = id ? id : null;
	}

	openDialog(id: string): void {
		const dialogRef = this.dialog.open (ConfirmComponent, {
			width: '400px',
			data: { title: 'Confirma Exclusão', message: 'Deseja mesmo remover este setor?' }
		});

		dialogRef.afterClosed ().subscribe (result => {
			if (result) {
				this._organizationService.deleteOrganization (id);
				this.fetchOrganizations ();
				this.deleteOrganization.emit ();
			}
		});
	}

	editOrganization(organization: Organization) {
		organization.name = this.name;
		this._organizationService.updateOrganization (organization);
		this.toogleEdit ();
		this.fetchOrganizations ();
	}

	getCount(organization: Organization) {
		return this.counts[this.organizations.indexOf (organization)];
	}

}
