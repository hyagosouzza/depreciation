import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Asset } from '../../../models/asset.model';
import { DepreciationCalcService } from '../../../services/depreciation-calc.service';
import { ChartData } from '../../../models/chart-data.model';
import { MetadadosService } from '../../../services/metadados.service';
import { AssetCategory } from '../../../models/asset-category.model';
import { CurrencyPipe, DatePipe, formatCurrency, formatDate, formatNumber, getLocaleId } from '@angular/common';

@Component ({
	selector: 'depreciation-depreciation-dialog',
	templateUrl: './depreciation-dialog.component.html',
	styleUrls: ['./depreciation-dialog.component.scss']
})
export class DepreciationDialogComponent implements OnInit {

	asset: Asset;

	view: any[] = [800, 350];

	// options
	showXAxis = true;
	showYAxis = true;
	gradient = false;
	showLegend = true;
	showXAxisLabel = true;
	xAxisLabel = 'Data';
	showYAxisLabel = true;
	yAxisLabel = 'Valor';
	legendTitle = 'Legenda';
	timeline = true;

	colorScheme = {
		domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
	};

	values: ChartData[] = [];

	category: AssetCategory;

	constructor(
			public dialogRef: MatDialogRef<DepreciationDialogComponent>,
			@Inject (MAT_DIALOG_DATA) public data: any,
			private readonly _depreciationCalcService: DepreciationCalcService,
			private readonly _metadadosService: MetadadosService,
			@Inject (LOCALE_ID) private _locale: string,
	) {
		this.asset = data.asset;
		this._loadDepreciationCalc ();
	}

	async ngOnInit() {
		this.category = await this._metadadosService.findCategory (this.asset.category);
	}

	close() {
		this.dialogRef.close ();
	}

	private async _loadDepreciationCalc() {
		this.values = await this._depreciationCalcService.calcAssetDepreciation (this.asset);
	}

	formatValues(value) {
		const formatter = new Intl.NumberFormat ('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			maximumSignificantDigits: 2
		});
		return formatter.format (value);
	}

	onSelect($event: {}) {
		console.log ($event);
	}
}
