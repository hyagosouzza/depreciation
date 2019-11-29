import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginLayoutComponent } from './layouts/login/login-layout.component';
import { UserLoginComponent } from './layouts/login/users/user-login/user-login.component';
import { UserRegisterComponent } from './layouts/login/users/user-register/user-register.component';
import { MainLayoutComponent } from './layouts/home/main-layout.component';
import { ProfileComponent } from './layouts/home/profile/profile.component';
import { HomeComponent } from './layouts/home/home/home.component';
import { CreateAssetComponent } from './layouts/home/asset/create/create-asset.component';
import { ListAssetsComponent } from './layouts/home/asset/list/list-assets.component';

const routes: Routes = [
	{
		path: 'home',
		component: MainLayoutComponent,
		children: [
			{ path: '', component: HomeComponent },
			{ path: 'profile', component: ProfileComponent },
			{ path: 'bens', component: ListAssetsComponent },
			{ path: 'bens/novo', component: CreateAssetComponent },
		]
	},

	{
		path: '',
		component: LoginLayoutComponent,
		children: [
			{ path: '', component: UserLoginComponent },
			{ path: 'register', component: UserRegisterComponent }
		]
	},

	// otherwise redirect to home
	{ path: '**', redirectTo: '' }
];

@NgModule ({
	imports: [RouterModule.forRoot (routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
