import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class PokemonService {

    public pokemonsList: Array<any> = [];
    public baseUrl: string = "https://pokeapi.co/api/v2/";

    constructor(private http: HttpClient) { }

    public getPokemonDetail(pokemonId: string): Observable<any> {
        return this.http.get(`${this.baseUrl}pokemon/${pokemonId}`).pipe();
    }

    public getPokemonTypes(): Observable<any> {
        return this.http.get(`${this.baseUrl}type/`).pipe();
    }

    public getPokemonsByUrl(url: string): Observable<any> {
        return this.http.get(url).pipe();
    }
}