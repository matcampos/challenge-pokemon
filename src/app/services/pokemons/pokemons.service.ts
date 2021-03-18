import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonFilter, PokemonResponse, PokemonResponseList } from 'src/app/models';
import { environment } from 'src/environments/environment';
import { stringify } from 'querystring';

@Injectable({
    providedIn: 'root'
})
export class PokemonsService {
    private apiUrl: string = environment.API_URL;
    constructor(
        private httpClient: HttpClient
    ) { }

    async getPokemons(filter: PokemonFilter): Promise<PokemonResponseList> {
        return this.httpClient.get<PokemonResponseList>(`${this.apiUrl}/cards?${stringify(filter)}`).toPromise();
    }

    async getPokemonById(id: string): Promise<PokemonResponse> {
        return this.httpClient.get<PokemonResponse>(`${this.apiUrl}/cards/${id}`).toPromise();
    }
}
