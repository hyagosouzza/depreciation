import { Component, OnInit } from '@angular/core';
import { Organization } from '../../../models/organization.model';
import { ConfirmComponent } from '../../../shared/dialogs/confirm/confirm.component';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationService } from '../../../services/organization.service';

@Component ({
	selector: 'app-organization-list',
	templateUrl: './organization-list.component.html',
	styleUrls: ['./organization-list.component.scss']
})
export class OrganizationListComponent implements OnInit {

	organizations: Organization[];
	orgToEdit: string;
	name = '';

	constructor(public dialog: MatDialog,
				private readonly _organizationService: OrganizationService,
	) { }

	ngOnInit() {
		this.fetchOrganizations ();
	}

	fetchOrganizations() {
		this.organizations = this._organizationService.fetchAll ();
	}

	toogleEdit(id?: string) {
		this.orgToEdit = id ? id : null;
	}

	openDialog(id: string): void {
		const dialogRef = this.dialog.open (ConfirmComponent, {
			width: '400px',
			data: { title: 'Confirma Exclusão', message: 'Deseja mesmo remover esta organização?' }
		});

		dialogRef.afterClosed ().subscribe (result => {
			if (result) {
				this._organizationService.deleteOrganization (id);
				this.fetchOrganizations ();
			}
		});
	}

	editOrganization(organization: Organization) {
		organization.name = this.name;
		this._organizationService.updateOrganization (organization);
		this.toogleEdit ();
		this.fetchOrganizations ();
	}

}
