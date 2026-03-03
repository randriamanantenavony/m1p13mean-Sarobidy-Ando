import { ChangeDetectorRef, Component } from '@angular/core';
import { DashboardService } from '../../services/dashboard/dashboard';
import { CommonModule, NgIf } from '@angular/common';
import { formatDate } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { Router } from '@angular/router';
import { getAuthData } from '../../services/auth/auth.util';
import { Footer } from '../footer/footer';


registerLocaleData(localeFr);

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, NgIf,Footer],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardBoutique {

  shopId! : string; // exemple : ID boutique
  caDuJour = 0;
  ventesDuJour = 0;
  commandesEnAttente = 0;
  stockFaible = 0;
  produitsEnStock = 0;
  stockParCategorie: any[] = [];
  topArticles: any[] = [];
  topClients: any[] = [];

  today: string = formatDate(new Date(), 'dd/MM/yyyy', 'fr');

  constructor(private dashboardService: DashboardService,  private cdr: ChangeDetectorRef, private router: Router ) { }

  ngOnInit(): void {
   const authData = getAuthData(this.router);
    if (!authData) {
      console.log('Données manquantes');
      return;
    }
    this.loadDashboard();
  }

loadDashboard() {
  console.log("🚀 loadDashboard() appelé");

  this.dashboardService.getKPIs().subscribe({
    next: (data) => {
      console.log("✅ Réponse KPI reçue :", data);

      if (!data) {
        console.warn("⚠️ data est vide ou undefined");
        return;
      }

      console.log("📊 CA du jour :", data.caDuJour);
      console.log("🛒 Ventes du jour :", data.ventesDuJour);
      console.log("⏳ Commandes en attente :", data.commandesEnAttente);
      console.log("⚠️ Stock faible :", data.stockFaible);
      console.log("📦 Produits en stock :", data.produitsEnStock);
      console.log("📂 Stock par catégorie :", data.stockParCategorie);
      console.log("🏆 Top articles :", data.topArticles);
      console.log("👑 Top clients :", data.topClients);

      this.caDuJour = data.caDuJour;
      this.ventesDuJour = data.ventesDuJour;
      this.commandesEnAttente = data.commandesEnAttente;
      this.stockFaible = data.stockFaible;
      this.produitsEnStock = data.produitsEnStock;
      this.stockParCategorie = data.stockParCategorie;
      this.topArticles = data.topArticles;
      this.topClients = data.topClients;

      console.log("🎯 Variables locales mises à jour :", {
        caDuJour: this.caDuJour,
        ventesDuJour: this.ventesDuJour,
        commandesEnAttente: this.commandesEnAttente,
        stockFaible: this.stockFaible
      });

      this.cdr.detectChanges();
      console.log("🔄 detectChanges() exécuté");
    },

    error: (err) => {
      console.error("❌ Erreur récupération KPI :", err);
    }
  });
}
}
