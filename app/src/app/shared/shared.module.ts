import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { CreateOrganizationComponent } from './dialogs/create-organization/create-organization.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { DesactiveAssetDialogComponent } from './dialogs/desactive-asset-dialog/desactive-asset-dialog.component';
import { MatDatepickerModule, MatSelectModule } from '@angular/material';
import { AssetInfoDialogComponent } from './dialogs/asset-info-dialog/asset-info-dialog.component';
import { NgxCurrencyModule } from 'ngx-currency';


@NgModule ({
  declarations: [NavbarComponent, CreateOrganizationComponent, ConfirmComponent, DesactiveAssetDialogComponent, AssetInfoDialogComponent],
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
    NgxCurrencyModule
  ],
	exports: [NavbarComponent]
})
export class SharedModule {}
