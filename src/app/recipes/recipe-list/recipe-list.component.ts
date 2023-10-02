import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[];
  recipeSubs:Subscription;

  // @Output() recipeSelected  = new EventEmitter<Recipe>();

  constructor(private recipeService:RecipeService,private router:Router) {}

  ngOnInit(): void {
    this.recipeSubs = this.recipeService.recipesChanged.subscribe((recipes:Recipe[])=>{
      this.recipes = recipes;
    })
    this.recipes = this.recipeService.getRecipes();
  }

  ngOnDestroy(): void {
    this.recipeSubs.unsubscribe();
  }

  // selectedRecipe(recipe:any){
  //   // recipe.preventDefault();
  //   // this.recipeSelected.emit(recipe);
  //   this.recipeService.recipeSelected.emit(recipe);
  // }

  // showRecipe(i:number){
  //   this.router.navigate(['/recipes',i])
  // }
}
