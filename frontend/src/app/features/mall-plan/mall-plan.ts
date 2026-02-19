import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-mall-plan',
  imports: [CommonModule],
  templateUrl: './mall-plan.html',
  styleUrl: './mall-plan.css',
})
export class MallPlan {
  @Output() close = new EventEmitter<void>();

  closeModal() {
    this.close.emit();
  }

}
