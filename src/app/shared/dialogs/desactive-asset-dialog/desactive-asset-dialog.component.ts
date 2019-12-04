import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component ({
	selector: 'app-desactive-asset-dialog',
	templateUrl: './desactive-asset-dialog.component.html',
	styleUrls: ['./desactive-asset-dialog.component.scss']
})
export class DesactiveAssetDialogComponent implements OnInit {

	reason = '';
	reasons = ['Venda', 'Extravio', 'Roubo', 'Furto', 'Perda', 'Acidente', 'Outros'];

	constructor(
			public dialogRef: MatDialogRef<DesactiveAssetDialogComponent>,
			@Inject (MAT_DIALOG_DATA) public data: any
	) { }

	ngOnInit() {
	}

	close() {
		this.dialogRef.close ();
	}

}
