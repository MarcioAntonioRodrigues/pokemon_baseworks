import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PokemonService } from "../../services/pokemonService";
import { MatFormFieldModule } from '@angular/material/form-field';
import { PokemonTypeComponent } from "../pokemon-type/pokemon-type.component";

@Component({
	selector: "home",
	standalone: true,
	imports: [CommonModule,
		InfiniteScrollModule,
		PokemonTypeComponent,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
	public listView: any = [];
	public pokemonsList: any = [];
	public currentPage: number = 1;
	public pokemonTypesList: any = [];

	@ViewChild(PokemonTypeComponent) child: PokemonTypeComponent;

	constructor(private pokemonService: PokemonService,
		private router: Router) {
		this.child = new PokemonTypeComponent(pokemonService, router);
	}

	ngOnInit(): void {
		this.getPokemonTypes();
	}

	public getPokemonTypes() {
		this.pokemonService.getPokemonTypes().subscribe({
			next: res => {
				this.pokemonTypesList = res.results;
			}
		});
	}

	public onClickPokemonTypeBtn(item: any) {
		this.changeSelectedBtnColor(item);
		this.child.resetValues();
		fetch(item.url)
			.then(res => res.json())
			.then(data => this.child.pokemonsList = data.pokemon)
			.then(() => this.child.getPokemons())
	}

	public changeSelectedBtnColor(item: any) {
		item.selected = true;
		this.pokemonTypesList.map((x: any) => {
			if (x.name != item.name) { x.selected = false }
		});
	}
}
