import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ButtonModel, ErrorModel, Pokemon } from 'src/app/models';
import { PokemonsService } from 'src/app/services';
import { ModalService } from 'src/app/services';
import { getLanguage } from 'src/app/utils/get-browser-language';

@Component({
    selector: 'app-pokemon-details',
    templateUrl: './pokemon-details.component.html',
    styleUrls: ['./pokemon-details.component.scss']
})
export class PokemonDetailsComponent implements OnInit {
    pokemon: Pokemon = new Pokemon({
        id: '',
        image: {
            small: '',
            large: ''
        },
    });
    loading: boolean = false;

    constructor(
        private pokemonsService: PokemonsService,
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService,
        private translate: TranslateService
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.getPokemon(params.id)
        });
        this.setLanguage();
    }

    ngOnInit() {
    }

    private async getPokemon(id: string) {
        this.loading = true;
        try {
            const pokemon = await this.pokemonsService.getPokemonById(id);
            this.pokemon = new Pokemon({
                image: pokemon.data.images,
                name: pokemon.data.name,
                id: pokemon.data.id,
                types: pokemon.data.types,
                weaknesses: pokemon.data.weaknesses,
                resistances: pokemon.data.resistances,
                attacks: pokemon.data.attacks
            });
            this.loading = false;
        } catch (error) {
            if (error.status == 404) {

                const errorMessage = await this.translate.get('pokemonDetailsComponent.NOT_FOUND_ERROR').toPromise<string>();

                const errorButtonText = await this.translate.get('pokemonDetailsComponent.ERROR_BUTTON_TEXT').toPromise<string>();

                this.modalService.openModal<ErrorModel>(new ErrorModel({
                    message: errorMessage,
                    button: new ButtonModel({
                        text: errorButtonText,
                        title: errorButtonText,
                        routerLink: '/'
                    }),
                    image: {
                        path: 'assets/images/404.png',
                        alt: '404'
                    }
                }));
            }
            this.loading = false;
        }
    }

    private setLanguage() {
        const language = getLanguage();
        this.translate.setDefaultLang('pt');
        this.translate.use(language);
    }

    openModal() {
        this.modalService.openModal<Pokemon>(this.pokemon);
    }

}
