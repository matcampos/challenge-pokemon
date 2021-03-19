import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { Pokemon, PokemonResponse, PokemonResponseList } from 'src/app/models';
import { PokemonCardModule } from 'src/app/modules';
import { PokemonsService } from 'src/app/services';
import { PokemonsComponent } from './pokemons.component';

describe('PokemonsComponent', () => {
    let component: PokemonsComponent;
    let fixture: ComponentFixture<PokemonsComponent>;
    let mockPokemonsService: jasmine.SpyObj<PokemonsService>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [PokemonsComponent],
            imports: [
                PokemonCardModule,
                InfiniteScrollModule,
                ReactiveFormsModule,
                FormsModule,
                HttpClientTestingModule,
                SlickCarouselModule,
                RouterTestingModule,
                TranslateModule.forRoot(),
            ],
            providers: [{
                provide: PokemonsService,
                useValue: jasmine.createSpyObj<PokemonsService>('PokemonsService', ['getPokemons'])
            }],
        })
            .compileComponents();
        mockPokemonsService = TestBed.get(PokemonsService);

        mockPokemonsService.getPokemons.and.returnValue(new Promise((resolve) => resolve(new PokemonResponseList(
            {
                data: [new PokemonResponse()]
            }
        ))))
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(PokemonsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();

    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('Test api call', () => {
        component.ngOnInit();
        fixture.detectChanges();
        expect(mockPokemonsService.getPokemons).toHaveBeenCalled();
    });

    it('Test add search input listener call', () => {
        const spy = spyOn(component, 'addSearchInputEventListener');
        component.ngAfterViewInit();
        expect(spy).toHaveBeenCalled();
    });

    it('Test add search input listener call with search form value != name variable value', () => {

        function generateKeyUpEvent(value: string): KeyboardEvent {
            const event: KeyboardEvent = new KeyboardEvent('keyup', { bubbles: true, cancelable: true });
            Object.defineProperty(event, 'target', { value: { value } });
            return event;
        }

        component.searchForm.controls.name.setValue('a');

        component.ngAfterViewInit();

        fixture.detectChanges()

        component.searchInput.nativeElement.dispatchEvent(generateKeyUpEvent('a'));

        expect(component.searchForm.controls.name.value).toEqual('a');
    });

    it('Test add search input listener call with search form value equals "" and != of name variable value', () => {
        function generateKeyUpEvent(value: string): KeyboardEvent {
            const event: KeyboardEvent = new KeyboardEvent('keyup', { bubbles: true, cancelable: true });
            Object.defineProperty(event, 'target', { value: { value } });
            return event;
        }

        component.name = 'a'

        component.searchForm.controls.name.setValue('');

        component.ngAfterViewInit();

        fixture.detectChanges()

        component.searchInput.nativeElement.dispatchEvent(generateKeyUpEvent('a'));

        expect(component.searchForm.controls.name.value).toEqual('');
    });


    it('SimulateScollEvent', () => {
        const spy = spyOn(component, 'onScroll');

        component.onScroll();

        expect(spy).toHaveBeenCalled()
    });

    it('test nextArrow', async () => {

        component.ngAfterViewInit();
        
        component.pokemons = [
            new Pokemon({
                name: 'aaa',
                image: {
                    small: '',
                    large: ''
                },
                types: []
            }),
            new Pokemon({
                name: 'aaa',
                image: {
                    small: '',
                    large: ''
                },
                types: []
            })
        ]

        const spy = spyOn(component, 'afterChange');

        component.totalCount = 10;

        component.afterChange({
            currentSlide: 1,
        })

        fixture.detectChanges();

        expect(spy).toHaveBeenCalled()
    })

});