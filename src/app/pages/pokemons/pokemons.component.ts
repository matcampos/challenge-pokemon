import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Pokemon, PokemonFilter } from 'src/app/models';
import { PokemonsService } from 'src/app/services';
import { EventEmitterHelper } from 'src/app/utils/event-emitter';
import { getLanguage } from 'src/app/utils/get-browser-language';

@Component({
    selector: 'app-pokemons',
    templateUrl: './pokemons.component.html',
    styleUrls: ['./pokemons.component.scss']
})
export class PokemonsComponent implements OnInit, AfterViewInit {
    @ViewChild('searchInput') searchInput: ElementRef<HTMLInputElement>;
    pokemons: Pokemon[] = [];
    query: PokemonFilter = new PokemonFilter();
    searchForm: FormGroup;
    name: string = '';
    loading: boolean = false;
    slideConfig = { "slidesToShow": 1, "slidesToScroll": 1, infinite: false };
    totalCount: number = 0;
    infiniteScrollDisabled: boolean = false;

    constructor(
        private pokemonsService: PokemonsService,
        private formBuilder: FormBuilder,
        private translate: TranslateService
    ) {
        this.searchForm = this.formBuilder.group({
            name: [,]
        });
        this.setLanguage();

        EventEmitterHelper.get('language').subscribe(_ => this.setLanguage());
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

    @HostListener('window:resize', ['$event']) onResize(event) {
        if (event.target.innerWidth < 769) {
            this.infiniteScrollDisabled = true;
        } else {
            this.infiniteScrollDisabled = false;
        }
    }

    private setLanguage() {
        const language = getLanguage();
        this.translate.setDefaultLang('pt');
        this.translate.use(language);
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
                this.pokemons = [];
                this.getPokemons();
            }
        })
    }

    private async getPokemons() {
        this.loading = true;

        try {

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
