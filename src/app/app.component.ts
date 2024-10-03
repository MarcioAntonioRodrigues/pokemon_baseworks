import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HttpClientModule } from "@angular/common/http";

import { PokemonService } from "./services/pokemonService";

import { HomeComponent } from "./components/home/home.component";
import { PokemonDetailComponent } from "./components/pokemon-detail/pokemon-detail.component";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterOutlet,
		HomeComponent,
		PokemonDetailComponent,
		HttpClientModule,
	],
	providers: [
		PokemonService,
	],
	templateUrl: "./app.component.html",
	styleUrl: "./app.component.css",
})
export class AppComponent {
	title = "pokemonProject";
}
