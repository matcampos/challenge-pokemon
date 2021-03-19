import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonDetailsComponent } from './pokemon-details.component';
import { PokemonDetailsRoutingModule } from './pokemon-details-routing.module';
import { RouterModule } from '@angular/router';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from 'src/app/utils/http-loader-factory';
import { HttpClient } from '@angular/common/http';



@NgModule({
  declarations: [PokemonDetailsComponent],
  imports: [
    CommonModule,
    PokemonDetailsRoutingModule,
    RouterModule,
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
export class PokemonDetailsModule { }
