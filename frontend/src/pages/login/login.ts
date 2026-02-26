import { ApiService } from '../../app/shared/service/api.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiEndpoints } from '../../app/shared/constants/api-endpoints';

export interface LoginData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css'],
})
export class Login implements OnInit {

  data: LoginData = {
    email: "",
    password: ""
  };

  errorMessage: string = "";

  constructor(
    private apiService: ApiService,
    private router: Router,
  ) {}

  ngOnInit(): void {}

login(): void {
  this.errorMessage = "";
  console.log("Data envoyée :", this.data);

  this.apiService.create(ApiEndpoints.USER.LOGIN, this.data)  
  .subscribe({
      next: (res: any) => {
        console.log("Réponse API :", res);

        // Vérifier si la réponse contient un rôle (succès)
        if (res.role) {
          sessionStorage.setItem('user', JSON.stringify(res));

          const role = res.role.trim().toUpperCase();
          switch (role) {
            case 'ADMIN':
              this.router.navigate(['/admin']);
              break;
            case 'CLIENT':
              this.router.navigate(['/client']);
              break;
            case 'BOUTIQUE':
              this.router.navigate(['/boutique']);
              break;
            default:
              this.router.navigate(['/login']);
          }

        } else {
          // Cas improbable, juste pour sécurité
          this.errorMessage = "Mot de passe ou email incorrect";
        }
      },
      
      error: (err: any) => {
        console.error("Erreur API :", err);
        
        // Récupérer le message d'erreur du backend de plusieurs façons possibles
        if (err.error?.message) {
          this.errorMessage = err.error.message;
        } else if (err.message) {
          this.errorMessage = err.message;
        } else if (typeof err.error === 'string') {
          this.errorMessage = err.error;
        } else {
          this.errorMessage = 'Une erreur est survenue lors de la connexion';
        }
        
        console.log("Message d'erreur affichés :", this.errorMessage);
        
        // Forcer la détection de changement pour afficher le message d'erreur
      }
    });
    
}
}