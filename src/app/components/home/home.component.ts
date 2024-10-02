import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../../services/pokemonService";
import { CommonModule } from "@angular/common";

@Component({
	selector: "home",
	standalone: true,
	imports: [CommonModule],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
	public pokemonsList: any = [];
	private totalCount: number = 20;

	constructor(private pokemonService: PokemonService) {

	}
	ngOnInit(): void {
		for (let index = 1; index < this.totalCount; index++) {
			this.pokemonService.getPokemons(index.toString()).subscribe(
				{
					next: (x) => {
						this.pokemonsList.push({
							name: x.name,
							id: x.id,
							image: x.sprites.front_default
						})
					}
				}
			);
		}
		console.log('lista', this.pokemonsList);
	}
}
