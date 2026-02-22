import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MallPlan } from '../../features/mall-plan/mall-plan';
import { ListeCategory } from '../liste-category/liste-category';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule,MallPlan,ListeCategory],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {

@Output() selectCategory = new EventEmitter<string>();

isMallPlanOpen = false;
showCategories = false;

constructor(private router: Router) {}

toggleCategories() {
  console.log('Toggle categories parent');
  this.showCategories = !this.showCategories;
  console.log('showCategories parent :', this.showCategories);
}


openMallPlan() {
  this.isMallPlanOpen = true;
}

closeMallPlan() {
  this.isMallPlanOpen = false;
  }

  handleCategory(categoryId: string) {
  console.log('Catégorie sélectionnée par l’enfant :', categoryId);
  // par exemple navigation ou ouverture d'un autre composant
  this.selectCategory.emit(categoryId);
  this.showCategories = false;
}

}
