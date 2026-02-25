import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PromotionService } from '../../services/promotions/promotion';
import { ProductService } from '../../services/products/product';
import { CommonModule } from '@angular/common';
import { ListPromotions } from '../list-promotions/list-promotions';

@Component({
  selector: 'app-create-promotions',
  imports: [CommonModule,ReactiveFormsModule, ListPromotions],
  templateUrl: './create-promotions.html',
  styleUrl: './create-promotions.css',
})
export class PromotionFormComponent implements OnInit {

  promotionForm!: FormGroup;
  loading = false;
  products: any[] = [];
  shopId = '698b04d85bfcbccb80e5e06a'; // id boutique actuelle

  constructor(
    private fb: FormBuilder,
    private promoService: PromotionService,
    private productService: ProductService
  ) {}

  ngOnInit(): void {
    this.promotionForm = this.fb.group({
      productId: ['', Validators.required],
      title: ['', [Validators.required, Validators.maxLength(100)]],
      description: [''],
      discountPercent: [0, [Validators.required, Validators.min(1), Validators.max(100)]],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      shopId: [this.shopId, Validators.required]
    });

    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProductsByShop(this.shopId)
      .subscribe(data => this.products = data);
  }

  confirming = false;

showConfirmModal() {
  this.confirming = true;
}

  confirmSave() {
    this.confirming = false;
    this.onSubmit(); // ici tu mets la logique de sauvegarde
  }

  cancelSave() {
    this.confirming = false;
  }


  onSubmit() {
    if (this.promotionForm.invalid) return;
    const { startDate, endDate } = this.promotionForm.value;
    if (new Date(startDate) > new Date(endDate)) {
      alert('La date de début ne peut pas être après la date de fin !');
      return;
    }
    this.loading = true;
    this.promoService.createPromotion(this.promotionForm.value)
      .subscribe({
        next: res => {
          alert('Promotion enregistrée avec succès !');
          this.promotionForm.reset({ shopId: this.shopId, discountPercent: 0 });
          this.loading = false;
        },
        error: err => {
          console.error(err);
          alert('Erreur lors de l’enregistrement de la promotion.');
          this.loading = false;
        }
      });
  }
}
