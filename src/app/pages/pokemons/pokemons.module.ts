import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonsComponent } from './pokemons.component';
import { PokemonsRoutingModule } from './pokemons-routing.module';
import { PokemonCardModule } from 'src/app/modules';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/utils/http-loader-factory';
import { HttpClient } from '@angular/common/http';

@NgModule({
    declarations: [PokemonsComponent],
    imports: [
        CommonModule,
        PokemonsRoutingModule,
        PokemonCardModule,
        InfiniteScrollModule,
        ReactiveFormsModule,
        FormsModule,
        SlickCarouselModule,
        TranslateModule.forChild({
            loader: {
                provide: TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps: [HttpClient]
              },
            isolate: false
        })
    ]
})
export class PokemonsModule { }
