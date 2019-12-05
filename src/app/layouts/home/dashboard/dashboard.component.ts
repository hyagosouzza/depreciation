import { Component, OnInit } from '@angular/core';
import { Organization } from '../../../models/organization.model';
import { Asset } from '../../../models/asset.model';
import { ChartData, ChartDataValues } from '../../../models/chart-data.model';
import { AssetService } from '../../../services/asset.service';
import { OrganizationService } from '../../../services/organization.service';
import { sum, groupBy } from 'lodash';
import { AssetCategory } from '../../../models/asset-category.model';
import { MetadadosService } from '../../../services/metadados.service';
import { DepreciationCalcService } from '../../../services/depreciation-calc.service';

@Component ({
	selector: 'depreciation-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	amountByOrganization: ChartDataValues[] = [];
	amountByCategory: ChartDataValues[] = [];
	desactivationByReason: ChartData[] = [];
	organizations: Organization[];
	categories: AssetCategory[];

	constructor(private readonly _assetService: AssetService,
				private readonly _organizationService: OrganizationService,
				private readonly _metadadosService: MetadadosService,
				private readonly _depreciationCalcService: DepreciationCalcService,
	) {}

	async ngOnInit() {
		this.organizations = await this._loadOrganizations ();
		this.categories = (await this._metadadosService.fetchAllCategories ()).data ().categories as AssetCategory[];

		this._loadAmountByOrganizationsValues ();
		this._loadDepreciationValueByCategory ();
		this._loadDesactivationByReason ();
	}

	private async _loadDesactivationByReason() {
		for (const org of this.organizations) {
			let assets: Asset[] = await this._loadAssetsFromOrganization (org);
			assets = assets.filter (asset => {
				return asset.desactive && asset.desactive.desactivated;
			});
			this.desactivationByReason = this._buildDesactivationByReason (assets);
		}
	}

	private async _loadDepreciationValueByCategory() {
		for (const org of this.organizations) {
			let assets: Asset[] = await this._loadAssetsFromOrganization (org);
			assets = assets.filter (asset => {
				return !asset.desactive || !asset.desactive.desactivated;
			});
			this.amountByCategory = this._buildDepreciationChartData (assets);
		}
	}

	private async _loadOrganizations(): Promise<Organization[]> {
		return (await this._organizationService.fetchAllAsync ()).docs.map (doc => {
			const org = doc.data ();
			org.id = doc.id;
			return org;
		});
	}

	private async _loadAssetsFromOrganization(organization: Organization): Promise<Asset[]> {
		return (await this._assetService.fetchAllFromOrganization (organization)).docs.map (doc => {
			return doc.data ();
		});
	}

	private async _loadAmountByOrganizationsValues() {
		for (const org of this.organizations) {
			let assets: Asset[] = await this._loadAssetsFromOrganization (org);
			assets = assets.filter (asset => {
				return !asset.desactive || !asset.desactive.desactivated;
			});
			this.amountByOrganization = [...this.amountByOrganization, (this._buildAmountChartData (org, assets))];
		}
	}

	private _buildAmountChartData(organization: Organization, assets: Asset[]): ChartDataValues {
		const amount = sum (assets.map (asset => {return asset.value}));
		return { name: organization.name, value: amount };
	}

	private _buildDesactivationByReason(assets: Asset[]): ChartDataValues[] {
		const chartDataValues: ChartDataValues[] = [];

		const desactivateGroups = groupBy (assets, 'desactive.reason');
		for (let [key, value] of Object.entries (desactivateGroups)) {
			chartDataValues.push ({ name: key, value: sum ((value as Asset[]).map (v => v.value)) });
		}

		return chartDataValues;
	}

	private _buildDepreciationChartData(assets: Asset[]): ChartDataValues[] {
		const chartDataValues = [];
		const categoryGroups = groupBy (assets, 'category');
		for (let [key, value] of Object.entries (categoryGroups)) {
			const valueAmount = sum ((value as Asset[]).map (v => {
				const currentCategory = this.categories.find (categ => categ.name === key);
				const actualValue = this._depreciationCalcService.calcShortDepreciation (v, currentCategory).value;

				return v.value - actualValue;
			}));
			chartDataValues.push ({ name: key, value: valueAmount })
		}

		return chartDataValues;
	}

}
