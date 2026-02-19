import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MallPlan } from '../../features/mall-plan/mall-plan';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, CommonModule,MallPlan],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent {

isMallPlanOpen = false;

openMallPlan() {
  this.isMallPlanOpen = true;
}

closeMallPlan() {
  this.isMallPlanOpen = false;
  }

}
