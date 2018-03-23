import { Injectable } from '@angular/core';

import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Recipe } from '../model/recipe';

const RECIPE_SERVER = 'http://localhost:8080';

@Injectable()
export class RecipeService {

  // recipes: Recipe[];

  constructor(private http: Http) {
    // this.recipes = [
    //   Recipe.recipeFromJson(
    //     {
    //       'id': 1,
    //       'title': 'Banana Bread',
    //       'description': 'This is my favourite banana bread recipe! My mother taught me how to make this one warm summer afternoon.',
    //       'feeds_this_many': 4,
    //       'preparation_time': 60,
    //       'ingredients': [
    //         { 'ingredient': 'plain flour', 'measure': '285g' },
    //         { 'ingredient': 'butter, softened', 'measure': '110g + a bit extra for tin' },
    //         { 'ingredient': 'eggs, large', 'measure': '2' },
    //         { 'ingredient': 'caster sugar', 'measure': '225g' },
    //         { 'ingredient': 'chocolate chips', 'measure': '1/2 cup' },
    //         { 'ingredient': 'salt', 'measure': '1/2 tsp' },
    //         { 'ingredient': 'sugar', 'measure': '1/2 cup' },
    //         { 'ingredient': 'bicarbonate of soda', 'measure': '1 tsp' },
    //         { 'ingredient': 'ripe bananas, mashed', 'measure': '4' },
    //         { 'ingredient': 'vanilla extract', 'measure': '1 tsp' }
    //       ],
    //       'instructions': [
    //         { 'instruction': 'Preheat the oven to 180C/350F/Gas 4', 'photo': null },
    //         { 'instruction': 'Sift the flour, bicarbonate of soda and salt into a large mixing bowl', 'photo': null },
    //         { 'instruction': 'In a separate bowl, cream the butter and sugar together until light and fluffy', 'photo': null },
    //         {
    //           'instruction': 'Add the eggs, mashed bananas, buttermilk, and vanilla extract to the butter and sugar mixture and mix well. Fold in the flour mixture.', 'photo': null
    //         },
    //         { 'instruction': 'Grease a 20cm x 12.5cm/8in x 5in loaf tin and pour the cake mixture into the tin.', 'photo': null },
    //         { 'instruction': 'Transfer to the oven and bake for about an hour, or until well-risen and golden-brown.', 'photo': null },
    //         {
    //           'instruction': 'Remove from the oven and cool in the tin for a few minutes, then turn out onto a wire rack to cool completely before serving.', 'photo': null
    //         }
    //       ],
    //       'cover_photo': null,
    //       'keywords': [
    //         'banana', 'bread', 'cake', 'dessert', 'sweet', 'chocolate', 'chip'
    //       ]
    //     }
    //   ),
    //   Recipe.recipeFromJson(
    //     {
    //       'id': 2,
    //       'title': 'Farmstead Tofu',
    //       'description': 'This is a dish from rural Hunan province in China and has tofu, some flavouring, and lots of chili peppers.',
    //       'feeds_this_many': 2,
    //       'preparation_time': 45,
    //       'ingredients': [
    //         { 'ingredient': 'garlic', 'measure': '1/2 bulb, slice' },
    //         { 'ingredient': 'ginger', 'measure': '10g, sliced' },
    //         { 'ingredient': 'thai red chillis', 'measure': '10, finely chopped' },
    //         { 'ingredient': 'large red chillis', 'measure': '3, chopped' },
    //         { 'ingredient': 'Guilin hot pepper sauce', 'measure': '1 tbsp' },
    //         { 'ingredient': 'bacon', 'measure': '2-3 strips, chopped up' },
    //         { 'ingredient': 'green onions', 'measure': 'green parts of one bunch, coarsely chopped' },
    //         { 'ingredient': 'tofu', 'measure': '1 500g pack, sliced' },
    //         { 'ingredient': 'salt', 'measure': '1/4 tsp' },
    //         { 'ingredient': '生抽', 'measure': '1 tsp' }
    //       ],
    //       'instructions': [
    //         { 'instruction': 'Deep fry the tofu slices in hot oil', 'photo': null },
    //         { 'instruction': 'Remove tofu from pot, put aside oil', 'photo': null },
    //         { 'instruction': 'Add 2 tbsp oil on high heat.', 'photo': null },
    //         { 'instruction': 'Add garlic, ginger, chillis, guilin hot papper sauce, bacon.', 'photo': null },
    //         { 'instruction': 'Cook until garlic a bit soft, maybe 1 mninute.', 'photo': null },
    //         { 'instruction': 'Add tofu and green onions. Fry 2 minutes', 'photo': null },
    //         { 'instruction': 'Add salt, stir', 'photo': null },
    //         { 'instruction': 'Add 生抽, stir', 'photo': null },
    //         { 'instruction': 'Add 125ml of water, str', 'photo': null },
    //         { 'instruction': 'Fry for another minute or two, serve over steamed rice.', 'photo': null }
    //       ],
    //       'cover_photo': null,
    //       'keywords': [
    //         '农家豆腐', 'tofu', 'hunan', 'spicy', 'chinese'
    //       ]
    //     }
    //   )
    // ];
  }

  getAllRecipe(): Promise<Recipe[]> {
    // return new Promise((resolve, reject) => {
    //   setTimeout(() => {
    //     resolve(this.recipes);
    //   }, 1000);
    // });
    return this.http
      .get(RECIPE_SERVER + '/v1/recipes.json')
      .toPromise()
      .then(response => response.json().data as Recipe[])
      .catch(this.handleError);
  }
  getRecipeById(recipe_id): Promise<Recipe> {
    return this.http
      .get(RECIPE_SERVER + `/v1/recipes/${recipe_id}.json`)
      .toPromise()
      .then(response => response.json().data as Recipe)
      .catch(this.handleError);
  }
  // new Promise((resolve, reject) => { 
  // for (const recipe of this.recipes) {
  //   if (recipe.id === recipe_id) {
  //       resolve(recipe);
  //       return;
  //     }
  //   }
  //   reject(Error('No recipe exists with that Id.'));
  // });

  addNewRecipe(recipe: Recipe): Promise<Recipe> {
    console.log(recipe);
    return this.http
      .put(RECIPE_SERVER + '/v1/recipes.json', recipe)
      .toPromise()
      .then(response => response.json().data as Recipe)
      .catch(this.handleError);

    //this.recipes.push(recipe);
  }

  private handleError(error: any): Promise<any> {
    console.error('Error occured');
    return Promise.reject(error.message || error);
  }
}

