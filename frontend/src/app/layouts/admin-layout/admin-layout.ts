import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router  } from '@angular/router';

@Component({
    selector: 'app-admin-layout',
    standalone: true,
    imports: [
        RouterOutlet, 
        RouterLink, 
        RouterLinkActive
    ],
    templateUrl: './admin-layout.html',
    styleUrl: './admin-layout.css'
})  

export class AdminLayout {

    constructor(private router: Router) {}
    mostrarModalLogout = false;

    abrirModalLogout(): void {
        this.mostrarModalLogout = true;
    }

    cancelarLogout(): void {
        this.mostrarModalLogout = false;
    }

    confirmarLogout(): void {
        localStorage.removeItem('token');
        this.router.navigate(['/login']);
    }

    isSidebarOpen = false;
    toggleSidebar() {
        this.isSidebarOpen = !this.isSidebarOpen;
    }

}