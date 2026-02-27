import { Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgIf],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardBoutique {

  shopId = '698b04d85bfcbccb80e5e06a'; // exemple : ID boutique
  caDuJour = 0;
  ventesDuJour = 0;
  commandesEnAttente = 0;
  stockFaible = 0;
  produitsEnStock = 0;
  stockParCategorie: any[] = [];
  topArticles: any[] = [];
  topClients: any[] = [];

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.loadDashboard();
  }

  loadDashboard() {
    console.log('this is my data');
    this.dashboardService.getKPIs(this.shopId).subscribe({
      next: (data) => {
        this.caDuJour = data.caDuJour;
        this.ventesDuJour = data.ventesDuJour;
        this.commandesEnAttente = data.commandesEnAttente;
        this.stockFaible = data.stockFaible;
        this.produitsEnStock = data.produitsEnStock;
        this.stockParCategorie = data.stockParCategorie;
        this.topArticles = data.topArticles;
        this.topClients = data.topClients;
        console.log('data :', data);
      },
      error: (err) => console.error('Erreur récupération KPI:', err)
    });
  }
}
