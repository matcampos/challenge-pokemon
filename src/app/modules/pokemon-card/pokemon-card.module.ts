import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonCardComponent } from './pokemon-card.component';
import { RouterModule } from '@angular/router';



@NgModule({
    declarations: [PokemonCardComponent],
    imports: [
        CommonModule,
        RouterModule
    ],
    exports: [PokemonCardComponent]
})
export class PokemonCardModule { }
