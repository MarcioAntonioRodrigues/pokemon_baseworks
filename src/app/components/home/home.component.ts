import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PokemonService } from "../../services/pokemonService";
import { PokemonTypeComponent } from "../pokemon-type/pokemon-type.component";

@Component({
	selector: "home",
	standalone: true,
	imports: [CommonModule, InfiniteScrollModule, PokemonTypeComponent],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
	public listView: any = [];
	public pokemonsList: any = [];
	public pokemonTypesList: any = [];

	@ViewChild(PokemonTypeComponent) child: PokemonTypeComponent;

	constructor(private pokemonService: PokemonService) { }

	ngOnInit(): void {
		this.getPokemonTypes();
	}

	private resetValues() {
		this.listView = [];
	}

	public getPokemonTypes() {
		this.pokemonService.getPokemonTypes().subscribe({
			next: res => {
				this.pokemonTypesList = res.results;
			}
		});
	}

	public onClickPokemonTypeBtn(url: string) {
		this.resetValues();
		fetch(url)
			.then(res => res.json())
			.then(data => this.pokemonsList = data.pokemon)
			.then(() => this.child.getPokemons())
	}

	public getPokemonsByType(url: string) {
		this.pokemonService.getPokemonsByUrl(url).subscribe({
			next: res => {
				this.pokemonsList = res.pokemon;
			}
		})
	}
}
