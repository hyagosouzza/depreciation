import { Component, OnInit } from '@angular/core';
import { Organization } from '../../../models/organization.model';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { OrganizationService } from '../../../services/organization.service';
import { CreateOrganizationComponent } from '../../../shared/dialogs/create-organization/create-organization.component';

@Component ({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  organizations: Organization[] = [];

  constructor(private readonly _router: Router,
              public dialog: MatDialog,
              private readonly _organizationService: OrganizationService,
  ) { }

  ngOnInit() {
    this.fetchOrganizations ();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open (CreateOrganizationComponent, {
      width: '400px'
    });

    dialogRef.afterClosed ().subscribe (result => {
      if (result) {
        this._organizationService.createOrganization (result);
      }
    });
  }

  fetchOrganizations() {
    this.organizations = this._organizationService.fetchAll ();
  }

}
