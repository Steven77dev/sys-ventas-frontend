import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Finanzas',
                items: [
                    { label: 'Cuadrar caja', icon: 'pi pi-fw pi-id-card', routerLink: ['/finanzas/cuadrar-caja'] },
               
                ]
            },
            {
                label: 'Comercial',
                items: [
                    { label: 'Atención de mesas', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
               
                ]
            },
            {
                label: 'Reportes',
                items: [
                    {
                        label: 'Finanzas', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Reporte 1', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                            { label: 'Reporte 2', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                        ]
                    },
                    {
                        label: 'Comercial', icon: 'pi pi-fw pi-bookmark',
                        items: [
                            { label: 'Reporte 1', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                            { label: 'Reporte 2', icon: 'pi pi-fw pi-id-card', routerLink: ['/uikit/formlayout'] },
                        ]
                    }
                ]
            }
        ];
    }
}