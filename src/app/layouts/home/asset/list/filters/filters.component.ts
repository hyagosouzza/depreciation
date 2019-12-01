import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AssetCategory } from '../../../../../models/asset-category.model';
import { MetadadosService } from '../../../../../services/metadados.service';

@Component ({
	selector: 'app-filters',
	templateUrl: './filters.component.html',
	styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

	@Output () filters = new EventEmitter ();

	name: string;
	status: string;
	category: string[];

	categories: AssetCategory[];

	constructor(private readonly _metadadosService: MetadadosService) { }

	ngOnInit() {
		this._loadMetadados ();
	}

	private async _loadMetadados() {
		this.categories = (await this._metadadosService.fetchAllCategories ()).data ().categories as AssetCategory[];
	}

	emitFilters() {
		this.filters.emit (JSON.stringify ({
			name: this.name,
			category: this.category,
			status: this.status
		}));
	}

	clearFilters() {
		this.name = '';
		this.category = [];
		this.status = '';
		this.emitFilters ();
	}

}
