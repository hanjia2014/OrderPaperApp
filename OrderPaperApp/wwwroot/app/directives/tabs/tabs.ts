import {
    Component,
    ContentChildren,
    QueryList,
    AfterContentInit,
    Output,
    EventEmitter
}                       from '@angular/core';
import { Tab }          from './tab';
import { AppSettings }  from '../../settings/app.settings';

@Component({
    selector: 'tabs',
    template: `
        <nav class="nav-black" style="height: 80px;">
            <ul class="nav nav-tabs container" style="padding-left: 10%; padding-top: 15px;">
                <li>
                    <img src="{{imagesPath + 'OP logo.png'}}" width="85" style="margin-left: -110px; margin-top: -10px; margin-right: 20px;">
                </li>
                <li *ngFor="let tab of tabs" (click)="selectTab(tab)">
                    <a class="list-unstyled content-tab" style="color:white; margin-bottom: 7px;">{{tab.title}}
                    </a>
                    <span [style.background-color]="tab.active ? '#263a55' : '#142840'" [class.active-span]="tab.active" [class.non-active-span]="!tab.active" class="mega-close" style="display: block; cursor: pointer;">&nbsp;</span>
                </li>
                <li style="margin-left: 50px;">
                    <a id="link-new-order-paper" style="color:white;" (click)="createNewOrderPaper()">New Order Paper</a>
                    <!--<img (click)="createNewOrderPaper()" title="Create new order paper" class="pointer" src="{{imagesPath + 'add new op.png'}}">
                    <span style="color:white">
                        New Order Paper
                    </span>-->
                </li>
                <li style="margin-left: 50px;">
                    <a style="color:white;" id="link-manage-sections" target="_blank" href="{{sectionSPUrl}}">Manage Sections</a>
                </li>
            </ul>
        </nav>
        <ng-content></ng-content>
    `,
    styles: [`a {cursor: pointer; cursor: hand;}
            .active-span { 
                background: url('../../../content/images/icons/white up arrow.png') no-repeat scroll center center;
            }
            .non-active-span:hover {
                background: url('../../../content/images/icons/white down arrow.png') no-repeat scroll center center;
            }
            .nav-black{
                background-color: #142840;
            }
            .nav-tabs {
                border-bottom: none;
            }
            .nav-tabs > li > a:hover{
                border-color: none;
            }
            
            .nav > li > a:focus, .nav > li > a:hover {
                text-decoration: none;
                background-color: #142840;
            }

            .nav-tabs > li > a{
                border: 1px solid #142840;
            }
            .nav > li > a {
                padding-bottom: 6px;
            }
            .new-order-paper {
                border-radius: 4px;
                border-color: #abded2 !important;
            }
            a.btn.btn-parliament.new-order-paper:hover {
                border-color: #abded2 !important;
                color: #333 !important;
                background-color: #abded2 !important;
            }
            a#link-new-order-paper:hover {
                text-decoration: underline;
            }
            a#link-manage-sections:hover{
                text-decoration: underline;
            }
            `]
})
export class Tabs implements AfterContentInit {
    @Output()
    onCreateNewOrderPaper = new EventEmitter();
    @ContentChildren(Tab) tabs: QueryList<Tab>;
    imagesPath: string = AppSettings.IMAGE_PATH;
    sectionSPUrl: string;

    // contentChildren are set
    ngAfterContentInit() {
        // get all active tabs
        let activeTabs = this.tabs.filter((tab) => tab.active);
        // if there is no active tab set, activate the first
        if (activeTabs.length === 0) {
            this.selectTab(this.tabs.first);
        }
    }

    selectTab(tab: Tab) {
        if (tab.active) {
            tab.active = false;
        }
        else {
            // deactivate all tabs
            this.tabs.forEach(tab => tab.active = false);
            // activate the tab the user has clicked on.
            tab.active = true;

            tab.onActiveChange.next(tab.title);
        }
    }

    createNewOrderPaper = () => {
        this.tabs.forEach(tab => tab.active = tab.title == 'History');
        this.onCreateNewOrderPaper.emit();
    }

    collapseAll = () => {
        this.tabs.forEach(tab => tab.active = false);
    }

    openHistoryTab = () => {
        this.tabs.forEach(tab => tab.active = tab.title == 'History');
    }
}