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
    private name: string = '';
    loading: boolean = false;

    constructor(
        private pokemonsService: PokemonsService,
        private formBuilder: FormBuilder
    ) {
        this.searchForm = this.formBuilder.group({
            name: [,]
        });
    }

    ngOnInit() {
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
                this.pokemons = new Array<Pokemon>();
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
}
