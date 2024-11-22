import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";
import { CommonModule } from '@angular/common';

import { PokemonService } from "./services/pokemonService";

import { HomeComponent } from "./components/home/home.component";
import { PokemonDetailComponent } from "./components/pokemon-detail/pokemon-detail.component";
import { HeaderComponent } from "./components/header/header.component";
import { MatIconModule } from "@angular/material/icon";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";

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
		MatFormFieldModule,
		MatInputModule
	],
	providers: [
		PokemonService,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "pokemonProject";
	sideNavWidth = "200px";
	searchNavPosition = "-130px";
	isSideNavOpen = false;

	public openNav() {
		this.isSideNavOpen = !this.isSideNavOpen;
		if (!this.isSideNavOpen) {
			this.sideNavWidth = "200px";
			this.searchNavPosition = "-130px";
		}
		else {
			this.sideNavWidth = "60px";
			this.searchNavPosition = "60px";
		}
	}
}
