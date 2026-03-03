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

  planImageUrl = 'https://www.bing.com/th/id/OIP.43TSh92B1_HNt58V88cgQwHaFj?w=243&h=211&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2';
  closeModal() {
    this.close.emit();
  }

openFullscreen(): void {
  window.open(this.planImageUrl, '_blank');
}

downloadPlan(): void {
  const a = document.createElement('a');
  a.href = this.planImageUrl;
  a.download = 'plan-centre-commercial.jpg';
  a.target = '_blank';
  a.click();
}



}
