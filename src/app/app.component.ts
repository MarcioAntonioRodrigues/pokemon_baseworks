import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { PokemonService } from "./services/pokemonService";
import { HttpClientModule } from "@angular/common/http";

@Component({
	selector: "app-root",
	standalone: true,
	imports: [
		RouterOutlet,
		HomeComponent,
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
