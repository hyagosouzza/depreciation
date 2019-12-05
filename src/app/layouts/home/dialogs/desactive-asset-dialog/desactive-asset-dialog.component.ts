import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { MetadadosService } from '../../../../services/metadados.service';

@Component ({
	selector: 'app-desactive-asset-dialog',
	templateUrl: './desactive-asset-dialog.component.html',
	styleUrls: ['./desactive-asset-dialog.component.scss']
})
export class DesactiveAssetDialogComponent implements OnInit {

	reason = '';
	reasons = [];

	constructor(
			public dialogRef: MatDialogRef<DesactiveAssetDialogComponent>,
			private readonly _metadadosService: MetadadosService,
			@Inject (MAT_DIALOG_DATA) public data: any
	) { }

	async ngOnInit() {
		this.reasons = ((await this._metadadosService.findAllReasons ()).data ().reasons) as string[];
	}

	close() {
		this.dialogRef.close ();
	}

}
