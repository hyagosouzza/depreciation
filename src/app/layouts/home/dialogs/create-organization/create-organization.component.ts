import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component ({
	selector: 'app-create-organization',
	templateUrl: './create-organization.component.html',
	styleUrls: ['./create-organization.component.scss']
})
export class CreateOrganizationComponent implements OnInit {

	name = '';

	constructor(
			public dialogRef: MatDialogRef<CreateOrganizationComponent>,
			@Inject (MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
	}

	close() {
		this.dialogRef.close ();
	}

}
