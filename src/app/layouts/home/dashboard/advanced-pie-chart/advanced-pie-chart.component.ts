import { Component, Input, OnInit } from '@angular/core';
import { ChartConfigService } from '../../../../services/chart-config.service';
import { ChartDataValues } from '../../../../models/chart-data.model';

@Component ({
	selector: 'depreciation-advanced-pie-chart',
	templateUrl: './advanced-pie-chart.component.html',
	styleUrls: ['./advanced-pie-chart.component.scss']
})
export class AdvancedPieChartComponent implements OnInit {

	@Input () values: ChartDataValues[];

	view: any[] = [900, 200];

	// options
	gradient = this._chartConfigService.gradient;

	colorScheme = this._chartConfigService.primaryColorScheme;

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
