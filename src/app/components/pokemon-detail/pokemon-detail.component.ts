import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { PokemonService } from '../../services/pokemonService';
import { IPokemon } from '../../models/Pokemon';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'pokemon-detail',
	standalone: true,
	imports: [CommonModule],
	templateUrl: './pokemon-detail.component.html',
	styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {
	public pokemon: IPokemon;

	constructor(
		private route: ActivatedRoute,
		private router: Router,
		private pokemonService: PokemonService) {
		this.pokemon = {
			name: null,
			stats: null,
			urlImage: null,
		}
	}

	ngOnInit(): void {
		const pokemonId: any = this.route.snapshot.paramMap.get('id');
		this.pokemonService.getPokemonDetail(pokemonId).subscribe({
			next: res => {
				this.pokemon = {
					name: res.name,
					urlImage: res.sprites.front_default,
					stats: res.stats
				}
			},
			error: err => console.log('Error:', err)
		});
	}

}
