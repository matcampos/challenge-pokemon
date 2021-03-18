import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons.component';
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonCardModule } from 'src/app/modules';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';

@NgModule({
    declarations: [PokemonsComponent],
    imports: [
        CommonModule,
        PokemonsRoutingModule,
        PokemonCardModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        FormsModule,
        SlickCarouselModule
    ]
})
export class PokemonsModule { }
