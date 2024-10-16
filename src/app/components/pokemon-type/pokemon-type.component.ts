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
	@Input() pokemonsList: any;
	@Input() listView: any = [];

	//infinite-scroll
	public items: string[] = [];
	public isLoading = false;
	currentPage = 1;
	itemsPerPage = 10;
	totalItems = 200;

	constructor(private pokemonService: PokemonService,
		private router: Router) {

	}

	toogleLoading = () => this.isLoading = !this.isLoading;

	loadData = () => {
		this.toogleLoading();
		this.getPokemons(this.currentPage, this.itemsPerPage);
	}

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
		return of(this.pokemonsList)
			.pipe(delay(500));
	}

	public goToDetail(pokemon: any) {
		const pokemonId = pokemon ? pokemon.id : null;
		this.router.navigate(['/detail', pokemonId]);
	}
}
