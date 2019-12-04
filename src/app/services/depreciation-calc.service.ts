import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Asset } from '../models/asset.model';
import * as moment from 'moment';
import 'moment/locale/pt-br';
import { ChartData } from '../models/chart-data.model';
import { now } from 'moment';
import { AssetCategory } from '../models/asset-category.model';
import { MetadadosService } from './metadados.service';
import { formatDate } from '@angular/common';

@Injectable ({
	providedIn: 'root'
})
export class DepreciationCalcService {

	categories: AssetCategory[];

	formatter = new Intl.NumberFormat ('pt-BR', {
		style: 'currency',
		currency: 'BRL',
		maximumSignificantDigits: 2
	});

	constructor(
			private readonly _metadadosService: MetadadosService,
			@Inject (LOCALE_ID) private _locale: string,
	) {
		this._metadadosService.fetchAllCategories ().then (categories => {
			this.categories = categories.data ().categories;
		})
	}

	async calcAssetDepreciation(asset: Asset): Promise<ChartData[]> {
		const diffInYears = this._diffInYears (asset);

		return await this._buildChartDatas (asset, diffInYears);
	}

	private _diffInYears(asset: Asset): number {
		const dateOfAsset = moment (asset.date.toDate ());
		const now = moment (new Date ());

		return now.diff (dateOfAsset, 'years', true);
	}

	private async _buildChartDatas(asset: Asset, diffInYears: number): Promise<ChartData[]> {
		const chartData: ChartData = {
			name: asset.name,
			series: [{
				name: formatDate (asset.date.toDate (), 'dd/MM/yyyy', this._locale),
				value: asset.value,
			},
				{
					name: formatDate (new Date (), 'dd/MM/yyyy', this._locale),
					value: await this._simpleLinearCalc (asset, diffInYears),
				}],
		};
		if (diffInYears <= 1) {
			return [chartData];
		} else {
			return [await this._complexLinearCalc (asset, diffInYears)];
		}
	}

	calcShortDepreciation(asset: Asset, category: AssetCategory): any {
		const diffInYears = this._diffInYears (asset);

		const annualRate = (category.annualRate / 100) * (category.lifeTime - diffInYears) * asset.value;
		const depreciation = (asset.value - annualRate) / category.lifeTime;
		const newValue = asset.value - depreciation;
		const percentDiff = 1 - newValue / asset.value;

		return { value: newValue, percent: percentDiff, fullyDeprecated: diffInYears >= category.lifeTime }
	}

	private async _simpleLinearCalc(asset: Asset, diffInYears: number): Promise<number> {
		const category: AssetCategory = this.categories.find (categ => {
			return categ.name == asset.category;
		});

		const annualRate = (category.annualRate / 100) * (category.lifeTime - diffInYears) * asset.value;
		const depreciation = (asset.value - annualRate) / category.lifeTime;
		return asset.value - depreciation;
	}

	private async _complexLinearCalc(asset: Asset, diffInYears: number): Promise<ChartData> {
		const chatDataList: ChartData = {
			name: asset.name,
			series: [{
				name: formatDate (asset.date.toDate (), 'dd/MM/yyyy', this._locale),
				value: asset.value,
			}],
		};

		for (let i = 1; i < diffInYears; i ++) {
			const name = moment (asset.date.toDate ()).add (i, 'y').toDate ();
			const value = await this._simpleLinearCalc (asset, i);

			chatDataList.series.push ({
				name: formatDate (name, 'dd/MM/yyyy', this._locale),
				value: value,
			})
		}

		if (diffInYears % 1 !== 0) {
			const diff = diffInYears;
			const name = moment (asset.date.toDate ()).add (diff, 'y').toDate ();
			const value = await this._simpleLinearCalc (asset, diff);

			chatDataList.series.push ({
				name: formatDate (name, 'dd/MM/yyyy', this._locale),
				value: value
			})
		}

		return chatDataList;
	}
}
