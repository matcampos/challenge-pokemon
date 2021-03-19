import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';
import { PokemonsService } from './pokemons.service';
import { PokemonByIdResponse, PokemonFilter, PokemonResponse, PokemonResponseList } from 'src/app/models';

describe('PokemonsService', () => {
    let httpMock: HttpTestingController;
    let service: jasmine.SpyObj<PokemonsService>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                {
                    provide: PokemonsService,
                    useValue: jasmine.createSpyObj<PokemonsService>('PokemonsService', ['getPokemons', 'getPokemonById'])
                }
            ]
        });

        httpMock = TestBed.get(HttpTestingController);
        service = TestBed.get(PokemonsService);

        service.getPokemons.and.returnValue(new Promise((resolve) => resolve(new PokemonResponseList(
        ))))

        service.getPokemonById.and.returnValue(new Promise((resolve) => resolve(new PokemonByIdResponse())))

        
    });

    it('get pokemons', async () => {

        const filter = new PokemonFilter();

        const result = await service.getPokemons(filter);

        expect(result).toEqual(new PokemonResponseList());
    });

    it('get pokemons by id', async () => {

        const result = await service.getPokemonById('teste')

        expect(result).toEqual(new PokemonByIdResponse());

    });
});
