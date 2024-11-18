import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';

import { PokemonService } from "./services/pokemonService";

import { HomeComponent } from "./components/home/home.component";
import { PokemonDetailComponent } from "./components/pokemon-detail/pokemon-detail.component";
import { HeaderComponent } from "./components/header/header.component";
import { MatIconModule } from "@angular/material/icon";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterOutlet,
		HomeComponent,
		HeaderComponent,
		PokemonDetailComponent,
		HttpClientModule,
		CommonModule,
		MatIconModule,
		MatSidenavModule
	],
	providers: [
		PokemonService,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "pokemonProject";
	sideNavWidth = "250px";
	searchNavWidth = "0px"
	isSideNavOpen = false;

	public openNav() {
		this.isSideNavOpen = !this.isSideNavOpen;
		if (!this.isSideNavOpen) {
			this.sideNavWidth = "250px";
			this.searchNavWidth = "0px";
		}
		else {
			this.sideNavWidth = "100px";
			this.searchNavWidth = "250px";
		}
	}
}
