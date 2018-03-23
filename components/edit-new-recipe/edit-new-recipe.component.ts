import { Component, OnInit } from '@angular/core';
import { Recipe } from '../../model/recipe';
import { RecipeService } from '../../services/recipe.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-edit-new-recipe',
  templateUrl: './edit-new-recipe.component.html',
  styleUrls: ['./edit-new-recipe.component.css']
})
export class EditNewRecipeComponent implements OnInit {
  recipe_in_progress: Recipe;

  constructor(private recipe_service: RecipeService, private router: Router) {
    this.recipe_in_progress = Recipe.createBlank();
    console.log(this.recipe_in_progress);
  }

  ngOnInit() {
  }

  addIngredient(): void {
    if (!this.recipe_in_progress) {
      this.recipe_in_progress.ingredients = [{ ingredient: null, measure: null }];
    } else {
      this.recipe_in_progress.ingredients.push({ ingredient: null, measure: null });
    }
  }
  removeIndexAt(index): void {
    this.recipe_in_progress.ingredients.splice(index, 1);
  }
  addInstruction(): void {
    if (!this.recipe_in_progress) {
      this.recipe_in_progress.instructions = [{ instruction: null, photo: null }];
    } else {
      this.recipe_in_progress.instructions.push({ instruction: null, photo: null });
    }
  }
  removeInstruction(index): void {
    this.recipe_in_progress.instructions.splice(index, 1);
  }
  addRecipeClicked(): void {
    this.recipe_service.addNewRecipe(this.recipe_in_progress)
      .then((recipe) => {
        this.router.navigate(['recipes', recipe.id]);
      });
  }
}
