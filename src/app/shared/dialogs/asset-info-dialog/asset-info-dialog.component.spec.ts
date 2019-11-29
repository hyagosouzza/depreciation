import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssetInfoDialogComponent } from './asset-info-dialog.component';

describe ('AssetInfoDialogComponent', () => {
	let component: AssetInfoDialogComponent;
	let fixture: ComponentFixture<AssetInfoDialogComponent>;

	beforeEach (async (() => {
		TestBed.configureTestingModule ({
			declarations: [AssetInfoDialogComponent]
		})
				.compileComponents ();
	}));

	beforeEach (() => {
		fixture = TestBed.createComponent (AssetInfoDialogComponent);
		component = fixture.componentInstance;
		fixture.detectChanges ();
	});

	it ('should create', () => {
		expect (component).toBeTruthy ();
	});
});
