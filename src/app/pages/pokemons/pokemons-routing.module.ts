import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PokemonsComponent } from './pokemons.component';

const routes: Routes = [
    {
        path: '',
        component: PokemonsComponent
    },
    {
        path: 'details/:id',
        loadChildren: () => import('./pokemon-details/pokemon-details.module').then(m => m.PokemonDetailsModule)
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PokemonsRoutingModule { }
