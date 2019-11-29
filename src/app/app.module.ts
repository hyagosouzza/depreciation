import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
import { CreateOrganizationComponent } from './shared/dialogs/create-organization/create-organization.component';
import { OrganizationService } from './services/organization.service';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { MenuComponent } from './layouts/home/menu/menu.component';
import { OrganizationListComponent } from './layouts/home/organization/list/organization-list.component';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ConfirmComponent } from './shared/dialogs/confirm/confirm.component';
import { ProfileComponent } from './layouts/home/profile/profile.component';
import { HomeComponent } from './layouts/home/home/home.component';
import { CreateAssetComponent } from './layouts/home/asset/create/create-asset.component';
import { ListAssetsComponent } from './layouts/home/asset/list/list-assets.component';
import { MatDatepickerModule, MatMenuModule, MatNativeDateModule, MatOptionModule, MatSelectModule } from '@angular/material';
import { IConfig, NgxMaskModule } from 'ngx-mask';
import { MetadadosService } from './services/metadados.service';
import { NgxCurrencyModule } from 'ngx-currency';
import { DesactiveAssetDialogComponent } from './shared/dialogs/desactive-asset-dialog/desactive-asset-dialog.component';
import { AssetInfoDialogComponent } from './shared/dialogs/asset-info-dialog/asset-info-dialog.component';

export let options: Partial<IConfig> | (() => Partial<IConfig>);

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
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,

		NgxMaskModule.forRoot (options),
		NgxCurrencyModule,

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
	],
	providers: [
		AuthService,
		OrganizationService,
		MetadadosService,
	],
	entryComponents: [CreateOrganizationComponent, ConfirmComponent, DesactiveAssetDialogComponent, AssetInfoDialogComponent],
	bootstrap: [AppComponent]
})
export class AppModule {}
