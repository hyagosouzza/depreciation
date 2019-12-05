import { Component, Input, OnInit } from '@angular/core';
import { ChartDataValues } from '../../../../models/chart-data.model';
import { ChartConfigService } from '../../../../services/chart-config.service';

@Component ({
	selector: 'depreciation-bar-chart',
	templateUrl: './bar-chart.component.html',
	styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit {

	@Input () values: ChartDataValues[];

	view: any[] = [600, 200];

	// options
	showXAxis = this._chartConfigService.showXAxis;
	showYAxis = this._chartConfigService.showYAxis;
	gradient = this._chartConfigService.gradient;
	showLegend = this._chartConfigService.showLegend;
	showXAxisLabel = this._chartConfigService.showXAxisLabel;
	xAxisLabel = 'Motivo';
	showYAxisLabel = this._chartConfigService.showYAxisLabel;
	yAxisLabel = 'Valor perdido';
	legendTitle = this._chartConfigService.legendTitle;

	colorScheme = this._chartConfigService.thirdyColorScheme;

	constructor(private readonly _chartConfigService: ChartConfigService) {}

	ngOnInit() {
	}

	formatValues(value) {
		const formatter = new Intl.NumberFormat ('pt-BR', {
			style: 'currency',
			currency: 'BRL',
			maximumSignificantDigits: 2
		});
		return formatter.format (value);
	}

}
