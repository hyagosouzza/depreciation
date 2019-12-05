import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import br from '@angular/common/locales/br';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MainLayoutComponent } from './layouts/home/main-layout.component';
import { RouterModule } from '@angular/router';
import { environment } from '../environments/environment';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { SharedModule } from './shared/shared.module';
import { LoginLayoutComponent } from './layouts/login/login-layout.component';
import { UserLoginComponent } from './layouts/login/users/user-login/user-login.component';
import { UserRegisterComponent } from './layouts/login/users/user-register/user-register.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { CreateOrganizationComponent } from './layouts/home/dialogs/create-organization/create-organization.component';
import { OrganizationService } from './services/organization.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MenuComponent } from './layouts/home/menu/menu.component';
import { OrganizationListComponent } from './layouts/home/organization/list/organization-list.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmComponent } from './layouts/home/dialogs/confirm/confirm.component';
import { ProfileComponent } from './layouts/home/profile/profile.component';
import { HomeComponent } from './layouts/home/home/home.component';
import { CreateAssetComponent } from './layouts/home/asset/create/create-asset.component';
import { ListAssetsComponent } from './layouts/home/asset/list/list-assets.component';
import { MatDatepickerModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { NgxMaskModule } from 'ngx-mask';
import { MetadadosService } from './services/metadados.service';
import { NgxCurrencyModule } from 'ngx-currency';
import { DesactiveAssetDialogComponent } from './layouts/home/dialogs/desactive-asset-dialog/desactive-asset-dialog.component';
import { AssetInfoDialogComponent } from './layouts/home/dialogs/asset-info-dialog/asset-info-dialog.component';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FiltersComponent } from './layouts/home/asset/list/filters/filters.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { DepreciationDialogComponent } from './layouts/home/dialogs/depreciation-dialog/depreciation-dialog.component';
import { CurrencyPipe, DatePipe, registerLocaleData } from '@angular/common';
import { DashboardComponent } from './layouts/home/dashboard/dashboard.component';
import { AdvancedPieChartComponent } from './layouts/home/dashboard/advanced-pie-chart/advanced-pie-chart.component';
import { ChartConfigService } from './services/chart-config.service';
import { HorizontalChartComponent } from './layouts/home/dashboard/horizontal-chart/horizontal-chart.component';
import { BarChartComponent } from './layouts/home/dashboard/grouped-bar-chart/bar-chart.component';

registerLocaleData (br, 'pt-BR');

@NgModule ({
	declarations: [
		AppComponent,
		MainLayoutComponent,
		LoginLayoutComponent,
		UserLoginComponent,
		UserRegisterComponent,
		MenuComponent,
		OrganizationListComponent,
		ProfileComponent,
		HomeComponent,
		CreateAssetComponent,
		ListAssetsComponent,
		FiltersComponent,
		DashboardComponent,
		AdvancedPieChartComponent,
		HorizontalChartComponent,
		BarChartComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		NgxMaskModule.forRoot (),
		NgxCurrencyModule,
		NgxChartsModule,

		RouterModule.forRoot ([]),
		SharedModule,
		AppRoutingModule,

		AngularFireModule.initializeApp (environment.firebase),
		AngularFirestoreModule,
		AngularFireAuthModule,

		MatSidenavModule,
		MatCheckboxModule,
		FormsModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatIconModule,
		MatListModule,
		MatToolbarModule,
		MatOptionModule,
		MatSelectModule,
		MatDatepickerModule,
		MatNativeDateModule,
		MatMenuModule,
		FilterPipeModule,
		MatTableModule,
		MatSortModule,
		MatTooltipModule,
	],
	providers: [
		AuthService,
		OrganizationService,
		MetadadosService,
		DatePipe,
		CurrencyPipe,
		ChartConfigService,
	],
	entryComponents: [CreateOrganizationComponent, ConfirmComponent, DesactiveAssetDialogComponent, AssetInfoDialogComponent, DepreciationDialogComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}
