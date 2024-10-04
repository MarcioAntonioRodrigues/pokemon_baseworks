import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PokemonService {

    public pokemonsList: Array<any> = [];
    public baseUrl: string = "https://pokeapi.co/api/v2/pokemon/";

    constructor(private http: HttpClient) { }

    public getPokemonDetail(pokemonId: string): Observable<any> {
        return this.http.get(`${this.baseUrl}${pokemonId}`).pipe();
    }
}