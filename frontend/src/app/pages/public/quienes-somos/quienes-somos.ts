import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as AOS from 'aos';

@Component({
    selector: 'app-quienes-somos',
    standalone: true,
    templateUrl: './quienes-somos.html',
    styleUrls: ['./quienes-somos.css']
})

export class QuienesSomos implements OnInit {

    constructor(private cdr: ChangeDetectorRef) {}

    missionTypes: string[] = ['A+', 'B+', 'AB+', 'O+'];
    visionTypes: string[] = ['O-', 'A-', 'B-', 'AB-'];

    currentMissionType: string = 'A+';
    currentVisionType: string = 'O-';

    private missionIndex = 0;
    private visionIndex = 0;

    ngOnInit(): void {

        AOS.init({
            duration: 1000,
            once: true
        });

        setInterval(() => {
            this.missionIndex = (this.missionIndex + 1) % this.missionTypes.length;
            this.currentMissionType = this.missionTypes[this.missionIndex];
            this.cdr.detectChanges();
        }, 2500);

        setInterval(() => {
            this.visionIndex = (this.visionIndex + 1) % this.visionTypes.length;
            this.currentVisionType = this.visionTypes[this.visionIndex];
            this.cdr.detectChanges();
        }, 3000);

    }

}