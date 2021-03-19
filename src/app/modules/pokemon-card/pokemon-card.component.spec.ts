import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { Pokemon } from 'src/app/models';

import { PokemonCardComponent } from './pokemon-card.component';

describe('PokemonCardComponent', () => {
    let component: PokemonCardComponent;
    let fixture: ComponentFixture<PokemonCardComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PokemonCardComponent],
            imports: [
                RouterTestingModule,
                TranslateModule.forRoot()
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PokemonCardComponent);
        component = fixture.componentInstance;
        component.pokemon = new Pokemon({
            name: 'pokemon teste',
            image: {
                small: '',
                large: ''
            },
            id: 'aaaa',
            types: []
        });
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
