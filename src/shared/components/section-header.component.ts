import {Component, input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {NgClass} from "@angular/common";

@Component({
    selector: 'oa-section-header',
    standalone: true,
    imports: [
        RouterLink,
        TranslateModule,
        NgClass
    ],
    template: `
        <div class="pb-5 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
            <h3 class="text-lg leading-6 font-medium text-gray-900">{{ title() }}</h3>
            @if (actions()?.length) {
                <div class="flex mt-3 sm:mt-0 sm:ml-4 gap-2">
                    @for (action of actions(); track $index) {
                        @if(action.type == 'button') {
                            <button (click)="action.action()" type="button" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                                    [ngClass]="{
                            'text-white bg-red-600 hover:bg-red-700 focus:ring-red-500': action.variant == 'danger',
                            'bg-cyan-600 hover:bg-cyan-700 focus:ring-cyan-500': action.variant == 'primary',
                            'bg-white hover:bg-cyan-200 text-cyan-600 shadow-none hover:shadow-sm': action.variant == 'secondary'}"
                            >{{action?.label ?? '' | translate}}</button>
                        }

                        @if(action.type == 'link') {
                            <a [routerLink]="action.route" class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">{{action?.label! | translate}}</a>
                        }
                    }
                </div>
            }
        </div>
    `,
    styles: ``
})
export class SectionHeaderComponent {
    title = input.required<string>();
    actions = input<HeaderAction[]>();
}

export type ButtonAction = {
    label: string;
    type: 'button';
    variant?: 'primary' | 'secondary' | 'danger';
    action: () => void;
};

export type LinkAction = {
    label: string;
    type: 'link';
    route: string | any[];
};

export type HeaderAction = ButtonAction | LinkAction;
