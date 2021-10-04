import { Component } from '@angular/core';

interface PanelCard {
    title: string;
    icon: string;
    link: string;
}

@Component({
    selector: 'app-admin-view',
    templateUrl: './admin-view.component.html',
    styleUrls: ['./admin-view.component.scss']
})
export class AdminViewComponent {

    public panelCards: ReadonlyArray<PanelCard> = [
        {
            icon: 'people',
            title: 'ADMIN_PANEL.USERS',
            link: '/admin/users'
        },
        {
            icon: 'class',
            title: 'ADMIN_PANEL.COURSES',
            link: '/admin/courses'
        },
        {
            icon: 'school',
            title: 'ADMIN_PANEL.TEACHERS',
            link: '/admin/teachers'
        },
        {
            icon: 'meeting_room',
            title: 'ADMIN_PANEL.AUDIENCES',
            link: '/admin/audiences'
        },
        {
            icon: 'groups',
            title: 'ADMIN_PANEL.GROUPS',
            link: '/admin/groups'
        }
    ];

}
