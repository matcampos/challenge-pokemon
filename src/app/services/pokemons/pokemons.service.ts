import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PokemonFilter, PokemonByIdResponse, PokemonResponseList } from 'src/app/models';
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

    async getPokemonById(id: string): Promise<PokemonByIdResponse> {
        return this.httpClient.get<PokemonByIdResponse>(`${this.apiUrl}/cards/${id}`).toPromise();
    }
}
