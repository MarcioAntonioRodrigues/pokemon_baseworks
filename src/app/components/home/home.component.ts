import { Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { Component, OnInit, ViewChild } from "@angular/core";
import { PokemonService } from "../../services/pokemonService";
import { MatFormFieldModule } from '@angular/material/form-field';
import { PokemonTypeComponent } from "../pokemon-type/pokemon-type.component";
import { MatIconModule } from '@angular/material/icon';

@Component({
	selector: "home",
	standalone: true,
	imports: [CommonModule,
		InfiniteScrollModule,
		PokemonTypeComponent,
		MatFormFieldModule,
		MatSelectModule,
		MatIconModule,
		MatInputModule],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {

	public right: number = 200;
	public left: number = -200;
	public currentPage: number = 1;

	public listView: any = [];
	public pokemonsList: any = [];
	public pokemonTypesList: any = [];

	public transform: any = "translateX(0px)";

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
		this.child.resetValues();
		fetch(item.url)
			.then(res => res.json())
			.then(data => this.child.pokemonsList = data.pokemon)
			.then(() => this.child.getPokemons())
	}

	public slideBy(value: number) {
		const caroussel = document.getElementById("caroussel");
		if (caroussel)
			caroussel.scrollBy({ left: value, behavior: 'smooth' });
	}
}
