import { Component, OnInit } from "@angular/core";
import { PokemonService } from "../../services/pokemonService";
import { CommonModule } from "@angular/common";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { delay, Observable, of } from 'rxjs';

@Component({
	selector: "home",
	standalone: true,
	imports: [CommonModule, InfiniteScrollModule],
	templateUrl: "./home.component.html",
	styleUrl: "./home.component.css",
})
export class HomeComponent implements OnInit {
	public pokemonsList: any = [];

	//infinite-scroll
	public items: string[] = [];
	public isLoading = false;
	currentPage = 1;
	itemsPerPage = 10;
	totalItems = 200;

	constructor(private pokemonService: PokemonService) { }

	ngOnInit(): void {
		this.loadData();
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
		})
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
				this.pokemonService.getPokemonDetail(index.toString()).subscribe(
					{
						next: (x) => {
							this.pokemonsList.push({
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
}
