import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { PokemonsService } from './pokemons.service';
import { PokemonByIdResponse, PokemonFilter, PokemonResponse, PokemonResponseList } from 'src/app/models';

describe('PokemonsService', () => {
    let httpMock: HttpTestingController;
    let service: PokemonsService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
        });

        httpMock = TestBed.get(HttpTestingController);
        service = TestBed.get(PokemonsService);
    });

    it('get pokemons', async () => {
        const filter = new PokemonFilter();

        service.getPokemons(filter).then(pokemons => {
            expect(pokemons).toBe(new PokemonResponseList());
        });

    });

    it('get pokemons by id', async () => {

        service.getPokemonById('teste').then(pokemon => {
            expect(pokemon).toBe(new PokemonByIdResponse());
        });

    });
});
