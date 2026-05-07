import { Component, OnInit } from '@angular/core';
import * as AOS from 'aos';

@Component({
  selector: 'app-quienes-somos',
  standalone: true,
  templateUrl: './quienes-somos.html',
  styleUrls: ['./quienes-somos.css']
})
export class QuienesSomos implements OnInit {
  ngOnInit() {
    AOS.init({
      duration: 1000,
      once: true
    });
}}