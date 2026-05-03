import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface Campaign {
  id: number;
  title: string;
  location: string;
  dates: string;
  description?: string;
  progress?: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './landing.html',
  styleUrl: './landing.css',
})
export class Landing {

  readonly campaigns: Campaign[] = [
    {
      id: 1,
      title: 'Campaña CABA: Verano 2024',
      location: 'Plaza de Mayo, CABA',
      dates: '15–20 Enero',
      progress: 80,
    },
    {
      id: 2,
      title: 'Unidos por el Hospital Italiano',
      location: 'Buenos Aires, Arg',
      dates: '25 Enero – 5 Feb',
      description: 'Abastece nuestro banco de sangre.',
    },
    {
      id: 3,
      title: 'Suma tu gota de vida Córdoba',
      location: 'Córdoba Capital',
      dates: 'Febrero 2024',
      description: 'Campañas itinerantes en toda la provincia.',
    },
  ];
}
