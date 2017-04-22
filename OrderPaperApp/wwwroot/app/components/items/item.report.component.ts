import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit
}                                   from '@angular/core';
import { ReportItem, CpdReportItem }from '../../models/items';
import { ItemComponent }            from './item.component';
import { OrderPaperService }        from '../../services/app.services';
import { AppSettings }              from '../../settings/app.settings';

@Component({
    selector: 'item-report',
    template: `
                <div class="report">
                    <div class="row" style="cursor: move;">
                        <div class="col-md-9">
                            <a href="#" (click)="toggle($event, toggleId)">{{item.Title}}</a>
                        </div>
                        <div class="col-md-3">
                            <div class="pull-right">
                                <span *ngIf="isExpand" class="pointer" (click)="toggle($event, toggleId)">
                                    <img title="Collapse" src="{{imagesPath + 'chevron collapsing.png'}}">
                                </span>
                                <span *ngIf="isExpand == null || isExpand == false" class="pointer" (click)="toggle($event, toggleId)">
                                    <img title="Open" src="{{imagesPath + 'chevron expand.png'}}">
                                </span>
                                <span style="margin-right: 10px; margin-left: 10px;">{{item.Type}}</span>
                                <img *ngIf="isGroupChild == false" src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'">
                            </div>
                        </div>
                    </div>
                    <div id="{{toggleId}}" class="initially-hidden">
                        <div class="spacer"></div>
                        <div class="row cpd-select">
                            <select2-ajax [id]="sectionIndex + '-' + groupIndex + '-' + index + '-report-title-cpd'" [apiUrl]="cpdAjaxUrl" [cssClass]="'form-control undraggable'" (selected)="reportSelect($event)"></select2-ajax>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Title</span>
                                <textarea type="text" class="form-control undraggable" [(ngModel)]="item.Title" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>CPD</span>
                                <textarea class="form-control undraggable" readonly [(ngModel)]="item.CpdTitle" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Shoulder</span>
                                <input type="text" class="form-control undraggable" [(ngModel)]="item.Shoulder" />
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>CPD</span>
                                <input class="form-control undraggable" readonly [(ngModel)]="item.CpdShoulder" />
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Committee</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Committee" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>CPD</span>
                                <textarea class="form-control undraggable" readonly [(ngModel)]="item.CpdCommittee" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Latest event</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.LatestEvent" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>CPD</span>
                                <textarea class="form-control undraggable" readonly [(ngModel)]="item.CpdLatestEvent" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Government Response</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.GovernmentResponse" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>CPD</span>
                                <textarea class="form-control undraggable" readonly [(ngModel)]="item.CpdGovernmentResponse" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Details</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Details" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Speeches</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Speeches" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: [OrderPaperService]
})
export class ItemReportComponent extends ItemComponent implements OnInit, AfterViewInit {
    @Input()
    item: ReportItem;
    @Input()
    index: number;
    isExpand: boolean;
    @Input()
    isGroupChild: boolean = false;
    @Input()
    groupIndex: number;
    reportTitleOptions: any;
    @Input()
    sectionIndex: number;
    @Input()
    reportOptions = [];
    cpdAjaxUrl: string = AppSettings.API_CPDREPORTACCESS_ENDPOINT;
    error: any;

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        this.reportTitleOptions = [{ id: "monday", text: "monday" }, { id: "tuesday", text: "tuesday" }];

        if (this.isGroupChild) {
            this.toggleId = this.Guid() + '-' + this.sectionIndex + '-' + this.index + '-' + this.groupIndex + '-report';
        }
        else {
            this.toggleId = this.Guid() + '-' + this.sectionIndex + '-' + this.index + '-report';
        }
    }

    ngAfterViewInit() {
        $('.undraggable')
            .on('focus', function (e) {
                $('.item-li').attr("draggable", "false");
            })
            .on('blur', function (e) {
                $('.item-li').attr("draggable", "true");
            });
    }

    toggle(element: any, eleId: string) {
        element.preventDefault();

        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }

    titleSelect = (e: string) => {
        if (e != null && e != '') {
            if (this.reportOptions.length > 0) {
                var text = this.findOption(this.reportOptions, e);
                this.item.Title = text;
                this.item.CpdTitle = text;
                this.orderPaperService.getReport(e).subscribe(
                    (data: CpdReportItem) => {
                        this.item.CpdShoulder = data.shoulder;
                        this.item.CpdCommittee = data.committee;
                        this.item.CpdLatestEvent = data.latestEvent;

                        this.item.Shoulder = data.shoulder;
                        this.item.Committee = data.committee;
                        this.item.LatestEvent = data.latestEvent;
                    },
                    (err: any) => this.error = err);
            }
        }
        if (e == null || e == '') {
            this.item.CpdTitle = null;
            this.item.CpdCommittee = null;
            this.item.CpdLatestEvent = null;
            this.item.CpdShoulder = null;
        }
    }

    reportSelect = (e: string) => {
        if (e != null && e != '') {
            this.orderPaperService.getReport(e).subscribe(
                (data: CpdReportItem) => {
                    this.item.BusinessItemId = data.business_item_id;

                    this.item.CpdShoulder = data.shoulder;
                    this.item.CpdCommittee = data.committee;
                    this.item.CpdLatestEvent = data.latestEvent;
                    this.item.CpdTitle = data.business_item_title;
                    this.item.CpdGovernmentResponse = data.government_response;

                    this.item.Title = data.business_item_title;
                    this.item.Shoulder = data.shoulder;
                    this.item.Committee = data.committee;
                    this.item.LatestEvent = data.latestEvent;
                    this.item.GovernmentResponse = data.government_response;

                    //clear free text
                    this.item.Details = '';
                    this.item.Speeches = '';
                },
                (err: any) => this.error = err);
        }
    }
}