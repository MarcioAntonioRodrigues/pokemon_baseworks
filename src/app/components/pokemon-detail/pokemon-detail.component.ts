import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'pokemon-detail',
	standalone: true,
	imports: [],
	templateUrl: './pokemon-detail.component.html',
	styleUrl: './pokemon-detail.component.css'
})
export class PokemonDetailComponent implements OnInit {
	public pokemon: any;
	ngOnInit(): void {

	}

}
