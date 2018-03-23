import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { Location } from '@angular/common';

import 'rxjs/add/operator/switchMap';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {

  recipe: Recipe;

  constructor(private route: ActivatedRoute,
  private location: Location,
private recipe_service: RecipeService) {
  }

  ngOnInit(): void {
  this.route.paramMap.subscribe((params: ParamMap) => {
    const recipe_id = parseInt( params.get('recipe_id'), 10);
    this.recipe_service.getRecipeById(recipe_id)
    .then((recipe) => this.recipe = recipe);
   });
  }
  // findRecipeById(id: number) {
  //   for ( const recipe of this.recipes) {
  //     if (recipe.id === id) {
  //       return recipe;
  //     }
  //   }
  //   return null;
  // }
  goBackButtonPressed() {
    this.location.back();
  }
}
