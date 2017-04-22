import {
    Component,
    AfterViewInit,
    OnInit,
    Input
}                                           from '@angular/core';
import { Response }                         from '@angular/http';
import { OrderPaperService }                from '../services/app.services';
import { AppSettings }                      from '../settings/app.settings';
import { AppConstants }                     from '../settings/app.constants';
import { OrderPaper }                       from '../models/orderpaper';

@Component({
    selector: 'publishing-audit-history',
    template: `
                <div class="row">
                    <div class="col-md-9">
                        <a href="#" (click)="toggle($event, toggleId)">Publishing Progress</a>
                        <span *ngIf="isExpand" class="pointer pull-right" (click)="toggle($event, toggleId)">
                            <img title="collapse" src="{{imagesPath + 'chevron collapsing.png'}}">
                        </span>
                    </div>
                </div>
                <div id="{{toggleId}}" class="initially-hidden">
                    <div class="col-md-9">
                        <table *ngIf="orderPaper != null && orderPaper.AuditHistoryList != null && orderPaper.AuditHistoryList.length > 0" class="table">
                            <thead>
                                <tr>
                                    <th>
                                        Name
                                    </th>
                                    <th>
                                        Date
                                    </th>
                                    <th>
                                        Time
                                    </th>
                                    <th>
                                        Function
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr *ngFor="let audit of orderPaper.AuditHistoryList; let i = index">
                                    <td>
                                        {{audit.Name}}
                                    </td>
                                    <td>
                                        {{audit.Date}}
                                    </td>
                                    <td>
                                        {{audit.Time}}
                                    </td>
                                    <td>
                                        {{audit.Function}}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                `,
    styles: [],
    providers: [OrderPaperService]
})
export class OrderPaperPublishingAuditHistoryComponent implements OnInit, AfterViewInit {
    @Input()
    orderPaper: OrderPaper;
    toggleId: string = 'audit-history';
    isExpand: boolean;
    imagesPath: string = AppSettings.IMAGE_PATH;

    constructor(private orderPaperService: OrderPaperService) {
    }
    ngOnInit() {
        
    }

    ngAfterViewInit() {
    }

    toggle(element: any, eleId: string) {
        element.preventDefault();

        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }
}