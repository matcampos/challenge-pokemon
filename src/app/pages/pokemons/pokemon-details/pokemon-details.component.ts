import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from 'src/app/models';
import { PokemonsService } from 'src/app/services';
import { ModalService } from 'src/app/services/helpers/modal/modal.service';

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

    constructor(
        private pokemonsService: PokemonsService,
        private activatedRoute: ActivatedRoute,
        private modalService: ModalService
    ) {
        this.activatedRoute.params.subscribe(params => {
            this.getPokemon(params.id)
        });
    }

    ngOnInit() {
    }

    private async getPokemon(id: string) {
        try {
            const pokemon = await this.pokemonsService.getPokemonById(id);
            this.pokemon = new Pokemon({
                image: pokemon.data.images,
                name: pokemon.data.name,
                id: pokemon.data.id,
                types: pokemon.data.types,
                weaknesses: pokemon.data.weaknesses,
                resistances: [],
                attacks: pokemon.data.attacks
            });
        } catch (error) {
            console.log(error)
        }
    }

    openModal() {
        this.modalService.openModal(this.pokemon);
    }

}
