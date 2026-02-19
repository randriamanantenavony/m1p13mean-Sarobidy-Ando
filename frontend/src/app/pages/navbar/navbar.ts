import { Component, OnInit, OnDestroy, HostListener, Input } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {

  // ── Inputs (à brancher sur tes services) ──
  @Input() cartCount   = 0;
  @Input() favCount    = 0;
  @Input() user: { name?: string; email?: string; avatar?: string } | null = null;

  // ── État UI ──
  isScrolled   = false;
  menuOpen     = false;
  searchOpen   = false;
  profileOpen  = false;
  searchQuery  = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {}

  // ── Scroll → effet navbar ──
  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 20;
  }

  // ── Clic extérieur → ferme dropdown profil ──
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.profile-wrap')) {
      this.profileOpen = false;
    }
  }

  // ── Toggles ──
  toggleMenu():        void { this.menuOpen    = !this.menuOpen; }
  closeMenu():         void { this.menuOpen    = false; }
  toggleSearch():      void { this.searchOpen  = !this.searchOpen; if (!this.searchOpen) this.searchQuery = ''; }
  toggleProfileMenu(): void { this.profileOpen = !this.profileOpen; }

  // ── Recherche ──
  doSearch(): void {
    if (!this.searchQuery.trim()) return;
    this.router.navigate(['/recherche'], { queryParams: { q: this.searchQuery } });
    this.searchOpen = false;
    this.searchQuery = '';
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  // ── Initiales avatar ──
  getInitials(name?: string): string {
    if (!name) return '?';
    return name
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  }

  // ── Déconnexion (branche ton AuthService) ──
  logout(): void {
    // this.authService.logout();
    this.router.navigate(['/login']);
    this.profileOpen = false;
    this.menuOpen    = false;
  }
}
