import { Component, OnInit } from '@angular/core';

import { Recipe } from '../../model/recipe';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  use_dark_background: boolean;
  current_styles: any;

  recipes: Recipe[];
  recipes_loaded: boolean;

  constructor(private router: Router, private recipe_service: RecipeService) {
    this.use_dark_background = false;
    this.current_styles = { 'font-size': '150%' };  
  }
  ngOnInit() {
    this.recipe_service.getAllRecipe()
    .then((recipes) => {
      this.recipes = recipes;
      this.recipes_loaded = true;
    });
  }

  // public addRecipeClicked() {
  //   this.recipes.unshift(this.recipe_in_progress);
  //   this.recipe_in_progress = Recipe.createBlank();
  // }
  public ZoomInOnRecipe(recipe) {
    console.log('User clicked on recipe');
    console.log(JSON.stringify(recipe, null, 2));
  }

  public toggleBackground() {
    this.use_dark_background = !this.use_dark_background;
  }

  public toggleFontSize() {
    if (this.current_styles['font-size'] === '150%') {
      this.current_styles['font-size'] = '175%';
    } else {
      this.current_styles['font-size'] = '150%';
    }
  }

  userClickedOnRecipe(recipe_id): void {
    this.router.navigateByUrl('/recipes/' + recipe_id);
  }
  addNewRecipe(): void {
    this.router.navigateByUrl('/editnewreceipe');
  }
}
