import { Injectable } from '@angular/core';

@Injectable ({
	providedIn: 'root'
})
export class ChartConfigService {

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

	formatter = new Intl.NumberFormat ('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		maximumSignificantDigits: 2
	});

	primaryColorScheme = {
		domain: ['#30b579', '#6666ff', '#C7B42C', '#ff0066']
	};

	secondaryColorScheme = {
		domain: ['#6666ff', '#30b579', '#C7B42C', '#ff0066']
	};

	thirdyColorScheme = {
		domain: ['#ff0066', '#6666ff', '#30b579', '#C7B42C']
	};

	constructor() { }
}
