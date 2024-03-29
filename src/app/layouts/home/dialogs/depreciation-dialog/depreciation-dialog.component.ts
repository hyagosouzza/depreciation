import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Asset } from '../../../../models/asset.model';
import { DepreciationCalcService } from '../../../../services/depreciation-calc.service';
import { ChartData } from '../../../../models/chart-data.model';
import { MetadadosService } from '../../../../services/metadados.service';
import { AssetCategory } from '../../../../models/asset-category.model';
import { CurrencyPipe, DatePipe, formatCurrency, formatDate, formatNumber, getLocaleId } from '@angular/common';
import { ChartConfigService } from '../../../../services/chart-config.service';

@Component ({
	selector: 'depreciation-depreciation-dialog',
	templateUrl: './depreciation-dialog.component.html',
	styleUrls: ['./depreciation-dialog.component.scss']
})
export class DepreciationDialogComponent implements OnInit {

	asset: Asset;

	view: any[] = [800, 350];

	// options
	showXAxis = this._chartConfigService.showXAxis;
	showYAxis = this._chartConfigService.showYAxis;
	gradient = this._chartConfigService.gradient;
	showLegend = this._chartConfigService.showLegend;
	showXAxisLabel = this._chartConfigService.showXAxisLabel;
	xAxisLabel = this._chartConfigService.xAxisLabel;
	showYAxisLabel = this._chartConfigService.showYAxisLabel;
	yAxisLabel = this._chartConfigService.yAxisLabel;
	legendTitle = this._chartConfigService.legendTitle;
	timeline = this._chartConfigService.timeline;

	colorScheme = this._chartConfigService.primaryColorScheme;

	values: ChartData[] = [];

	category: AssetCategory;

	constructor(
			public dialogRef: MatDialogRef<DepreciationDialogComponent>,
			@Inject (MAT_DIALOG_DATA) public data: any,
			private readonly _depreciationCalcService: DepreciationCalcService,
			private readonly _metadadosService: MetadadosService,
			@Inject (LOCALE_ID) private _locale: string,
			private readonly _chartConfigService: ChartConfigService,
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
