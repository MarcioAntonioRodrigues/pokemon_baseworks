import { delay, of } from 'rxjs';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { PokemonService } from '../../services/pokemonService';

@Component({
	selector: 'pokemon-type',
	standalone: true,
	imports: [CommonModule, InfiniteScrollModule],
	templateUrl: './pokemon-type.component.html',
	styleUrl: './pokemon-type.component.css'
})
export class PokemonTypeComponent {
	public pokemonsList: any = [];
	public listView: any = [];

	// infinite-scroll //
	public totalItems = 200;
	public itemsPerPage = 10;
	public isLoading = false;
	public items: string[] = [];
	public currentPage: number = 1;
	// infinite-scroll //

	constructor(private pokemonService: PokemonService,
		private router: Router) { }

	resetValues = () => {
		this.listView = [];
		this.currentPage = 1;
	}

	toogleLoading = () => this.isLoading = !this.isLoading;

	appendData = () => {
		this.toogleLoading();
		this.getPokemons(this.currentPage, this.itemsPerPage).subscribe({
			next: res => this.items = [...this.items, ...res],
			complete: () => this.toogleLoading()
		});
	}

	onScroll = () => {
		this.currentPage += this.itemsPerPage;
		this.appendData();
	}

	public getPokemons = (page = 1, itemsPerPage = 10) => {
		const startIndex = page;
		const endIndex = startIndex + itemsPerPage;

		for (let index = startIndex; index < endIndex; index++) {
			if (index < this.totalItems) {
				const url = this.pokemonsList[index]?.pokemon?.url;
				if (url) {
					this.pokemonService.getPokemonsByUrl(url).subscribe(
						{
							next: (x) => {
								this.listView.push({
									name: x.name,
									id: x.id,
									image: x.sprites.front_default
								},)
							},
							complete: () => this.toogleLoading()
						}
					);
				}
			}
		}
		return of(this.pokemonsList)
			.pipe(delay(500));
	}

	public goToDetail(pokemon: any) {
		const pokemonId = pokemon ? pokemon.id : null;
		this.router.navigate(['/detail', pokemonId]);
	}
}
