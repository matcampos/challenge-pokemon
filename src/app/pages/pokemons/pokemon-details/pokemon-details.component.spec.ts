import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { PokemonByIdResponse, PokemonResponse } from 'src/app/models';
import { PokemonsService } from 'src/app/services';

import { PokemonDetailsComponent } from './pokemon-details.component';

describe('PokemonDetailsComponent', () => {
    let component: PokemonDetailsComponent;
    let fixture: ComponentFixture<PokemonDetailsComponent>;
    let mockPokemonsService: jasmine.SpyObj<PokemonsService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PokemonDetailsComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
            ],
            providers: [{
                provide: PokemonsService,
                useValue: jasmine.createSpyObj<PokemonsService>('PokemonsService', ['getPokemonById'])
            },
            {
                provide: ActivatedRoute,
                useValue: {
                    params: of({ id: 'aaaa' })
                }
            }],
        })
            .compileComponents();
        mockPokemonsService = TestBed.get(PokemonsService);

        mockPokemonsService.getPokemonById.and.returnValue(new Promise((resolve) => resolve(new PokemonByIdResponse(
            {
                data: new PokemonResponse({
                    id: 'aaa'
                })
            }
        ))))
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PokemonDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
