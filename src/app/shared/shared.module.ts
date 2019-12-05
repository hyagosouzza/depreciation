import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CreateOrganizationComponent } from '../layouts/home/dialogs/create-organization/create-organization.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ConfirmComponent } from '../layouts/home/dialogs/confirm/confirm.component';
import { DesactiveAssetDialogComponent } from '../layouts/home/dialogs/desactive-asset-dialog/desactive-asset-dialog.component';
import { MatDatepickerModule, MatSelectModule } from '@angular/material';
import { AssetInfoDialogComponent } from '../layouts/home/dialogs/asset-info-dialog/asset-info-dialog.component';
import { NgxCurrencyModule } from 'ngx-currency';
import { DepreciationDialogComponent } from '../layouts/home/dialogs/depreciation-dialog/depreciation-dialog.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { MatCardModule } from '@angular/material/card';


@NgModule ({
	declarations: [NavbarComponent, CreateOrganizationComponent, ConfirmComponent, DesactiveAssetDialogComponent, AssetInfoDialogComponent, DepreciationDialogComponent],
	imports: [
		CommonModule,
		MatToolbarModule,
		RouterModule,
		MatIconModule,
		MatFormFieldModule,
		MatInputModule,
		FormsModule,
		MatDialogModule,
		MatButtonModule,
		MatSelectModule,
		MatDatepickerModule,
		NgxCurrencyModule,
		NgxChartsModule,
		MatCardModule
	],
	exports: [NavbarComponent]
})
export class SharedModule {}
