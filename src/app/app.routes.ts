import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './components/pokemon-detail/pokemon-detail.component';
import { HomeComponent } from './components/home/home.component';


export const routes: Routes = [
    { path: "", component: HomeComponent },
    { path: "detail/:id", component: PokemonDetailComponent },
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }