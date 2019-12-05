import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component ({
	selector: 'app-confirm',
	templateUrl: './confirm.component.html',
	styleUrls: ['./confirm.component.scss']
})
export class ConfirmComponent implements OnInit {

	title = 'Confirma Ação';
	message = 'Deseja confirmar esta operação?';

	constructor(
			public dialogRef: MatDialogRef<ConfirmComponent>,
			@Inject (MAT_DIALOG_DATA) public data: any
	) {
		this.title = data.title ? data.title : this.title;
		this.message = data.message ? data.message : this.message;
	}

	ngOnInit() {
	}

	close() {
		this.dialogRef.close ();
	}

}
