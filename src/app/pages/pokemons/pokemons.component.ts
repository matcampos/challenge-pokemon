import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Pokemon, PokemonFilter } from 'src/app/models';
import { PokemonsService } from 'src/app/services';

@Component({
    selector: 'app-pokemons',
    templateUrl: './pokemons.component.html',
    styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput', { static: false }) searchInput: ElementRef<HTMLInputElement>;
    pokemons: any[] = [];
    query: PokemonFilter = new PokemonFilter();
    searchForm: FormGroup;
    name: string = '';
    loading: boolean = false;
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, infinite: false };
    totalCount: number = 0;
    infiniteScrollDisabled: boolean = false;

    constructor(
        private pokemonsService: PokemonsService,
        private formBuilder: FormBuilder
    ) {
        this.searchForm = this.formBuilder.group({
            name: [,]
        });
    }

    ngOnInit() {
        if (window.innerWidth < 769) {
            this.infiniteScrollDisabled = true;
        }
    
        this.getPokemons();
        
    }

    ngAfterViewInit() {
        this.addSearchInputEventListener();
    }

    addSearchInputEventListener() {
        fromEvent(this.searchInput.nativeElement, 'keyup').pipe(debounceTime(200)).subscribe(() => {
            if (this.searchForm.controls.name.value != this.name) {

                this.name = this.searchForm.controls.name.value;

                // Validations
                if (
                    this.searchForm.controls.name.value
                    && this.searchForm.controls.name.value != null
                    && this.searchForm.controls.name.value != ''
                ) {
                    this.query.q = `name:${this.searchForm.controls.name.value}`;
                } else {
                    delete this.query.q;
                }

                // End of validations

                this.query.page = 1;
                this.getPokemons(true);
            }
        })
    }

    private async getPokemons(newRequest: boolean = false) {
        this.loading = true;

        try {
            if (newRequest) {
                this.pokemons = [];
            }

            const result = await this.pokemonsService.getPokemons(this.query);
            result.data.forEach(pokemon => {
                this.pokemons.push(
                    new Pokemon({
                        name: pokemon.name,
                        image: pokemon.images,
                        id: pokemon.id,
                        types: pokemon.types
                    })
                );
            });

            this.totalCount = result.totalCount;
            this.loading = false;

        } catch (error) {
            this.loading = false;
            console.log(error);
        }
    }

    onScroll() {
        this.query.page++;
        this.getPokemons();
    }

    slickInit(e) {
        console.log('slick initialized');
    }

    breakpoint(e) {
        console.log('breakpoint');
    }

    afterChange(e) {
        if ((e.currentSlide + 1) == this.pokemons.length && this.totalCount > this.pokemons.length) {
            this.query.page++;
            this.getPokemons();
        }
    }

    beforeChange(e) {
        console.log('beforeChange');
    }
}
