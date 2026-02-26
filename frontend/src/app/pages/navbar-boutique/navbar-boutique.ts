import { Component, HostListener, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  label: string;
  route: string;
  icon: string;
  children?: NavItem[];
}

@Component({
  selector: 'app-shop-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar-boutique.html',
  styleUrls: ['./navbar-boutique.css'],
})
export class ShopNavbarComponent  {
  @Input() unreadCount = 7;
  @Input() shopName    = 'Ma Boutique';
  @Input() avatarUrl   = '';

  isMobileMenuOpen = false;
  isScrolled       = false;
  openDropdown: string | null = null;

  navItems: NavItem[] = [
    {
      label: 'Dashboard', route: '/dashboard',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    },
    {
      label: 'Commandes', route: '/commandes',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
      children: [
        { label: 'Toutes les commandes',        route: '/commandes/liste',          icon: '' },
        { label: 'Historique des paiements',    route: '/commandes/paiements',      icon: '' },
        { label: 'Annulations / Remboursements', route: '/commandes/remboursements', icon: '' },
      ],
    },
    {
      label: 'Ventes & Stocks', route: '/ventes-stocks',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>`,
      children: [
        { label: 'Inventaire produits', route: '/ventes-stocks/inventaire', icon: '' },
        { label: 'Rapports de ventes',  route: '/ventes-stocks/rapports',   icon: '' },
      ],
    },
    {
      label: 'Promotions', route: '/promotions',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>`,
    },
    {
      label: 'Clients', route: '/clients',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>`,
    },
    {
      label: 'Analytique', route: '/analytique',
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>`,
    },
  ];

  /* ── Listeners ─────────────────────────────────────────── */

  @HostListener('window:scroll')
  onScroll() { this.isScrolled = window.scrollY > 10; }

  /** Ferme les dropdowns si on clique en dehors */
  @HostListener('document:click', ['$event'])
  onDocumentClick(e: MouseEvent) {
    const t = e.target as HTMLElement;
    if (!t.closest('.navbar__nav-item') && !t.closest('.navbar__profile-wrap')) {
      this.openDropdown = null;
    }
  }

  /* ── Méthodes ──────────────────────────────────────────── */

  /** Ouvre/ferme le hamburger menu */
  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    if (!this.isMobileMenuOpen) this.openDropdown = null;
  }

  /** Ouvre/ferme un dropdown */
  toggleDropdown(key: string, e: MouseEvent) {
    e.stopPropagation();
    this.openDropdown = this.openDropdown === key ? null : key;
  }

  /** Ferme tout */
  closeMobileMenu() {
    this.isMobileMenuOpen = false;
    this.openDropdown = null;
  }

  get badgeDisplay() { return this.unreadCount > 99 ? '99+' : String(this.unreadCount); }

  get initials() {
    return this.shopName.split(' ').map(w => w[0]).slice(0, 2).join('').toUpperCase();
  }
}
