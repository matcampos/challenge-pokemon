import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { of } from 'rxjs';
import { Pokemon, PokemonByIdResponse, PokemonResponse, Resistances } from 'src/app/models';
import { PokemonsService } from 'src/app/services';

import { PokemonDetailsComponent } from './pokemon-details.component';

describe('PokemonDetailsComponent', () => {
    let component: PokemonDetailsComponent;
    let fixture: ComponentFixture<PokemonDetailsComponent>;
    let mockPokemonsService: jasmine.SpyObj<PokemonsService>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            declarations: [PokemonDetailsComponent],
            imports: [
                RouterTestingModule,
                HttpClientTestingModule,
                TranslateModule.forRoot(),
            ],
            providers: [{
                provide: PokemonsService,
                useValue: jasmine.createSpyObj<PokemonsService>('PokemonsService', ['getPokemonById'])
            },
            {
                provide: ActivatedRoute,
                useValue: {
                    params: of({
                        id: 'aaaa'
                    })
                }
            }],
        })
            .compileComponents();
        mockPokemonsService = TestBed.get(PokemonsService);

        mockPokemonsService.getPokemonById.and.returnValue(new Promise((resolve) => resolve(new PokemonByIdResponse(
            {
                data: new PokemonResponse({
                    id: 'aaa',
                    name: 'aaaa',
                    resistances: new Array<Resistances>(
                        new Resistances({
                            type: 'aaa',
                            value: 'aaa'
                        })
                    )
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


    it('Test open modal', waitForAsync(async () => {
        const spy = spyOn(component, 'openModal');

        const result = await mockPokemonsService.getPokemonById('aaaa');

        component.pokemon = new Pokemon({
            id: result.data.id,
            name: result.data.name,
            attacks: result.data.attacks,
            image: {
                small: '',
                large: ''
            }
        })

        let button = fixture.debugElement.nativeElement.querySelector('#openModalButton');
        button.click();
        
        fixture.detectChanges();

        expect(spy).toHaveBeenCalled();
    }));
});
