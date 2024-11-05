import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PokemonService } from '../../services/pokemonService';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { IPokemon } from '../../models/Pokemon';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'pokemon-detail',
	standalone: true,
	imports: [CommonModule, MatProgressBarModule],
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
			id: null,
			name: null,
			types: null,
			height: null,
			weight: null,
			baseExperience: null,
			urlImage: null,
			abilities: null,
			stats: null,
		}
	}

	ngOnInit(): void {
		const pokemonId: any = this.route.snapshot.paramMap.get('id');
		this.pokemonService.getPokemonDetail(pokemonId).subscribe({
			next: res => {
				this.pokemon = {
					id: res.id,
					name: res.name,
					types: res.types,
					height: res.height,
					weight: res.weight,
					baseExperience: res.base_experience,
					urlImage: res.sprites.other.dream_world.front_default,
					abilities: res.abilities,
					stats: res.stats
				}
			},
			error: err => console.log('Error:', err)
		});
	}

	public backToHome() {
		this.router.navigateByUrl('/');
	}

}
