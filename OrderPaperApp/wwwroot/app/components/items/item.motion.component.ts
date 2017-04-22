import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit
}                               from '@angular/core';
import {
    MotionItem,
    CpdMotionItem
}                               from '../../models/items';
import { ItemComponent }        from './item.component';
import { OrderPaperService }    from '../../services/app.services';
import { AppSettings }          from '../../settings/app.settings';

@Component({
    selector: 'item-motion',
    template: `
                <div class="motion">
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
                            <select2-ajax [id]="sectionIndex + '-' + groupIndex + '-' + index + '-motion-title-cpd'" [apiUrl]="cpdAjaxUrl" [cssClass]="'form-control undraggable'" (selected)="motionSelect($event)"></select2-ajax>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Title</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Title" cols="30" rows="5"></textarea>
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
                                <span>Member</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Member" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>CPD</span>
                                <textarea class="form-control undraggable" readonly [(ngModel)]="item.CpdMember" cols="30" rows="5"></textarea>
                            </div>
                        </div>

                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Motion</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Motion" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>CPD</span>
                                <textarea readonly class="form-control undraggable" [(ngModel)]="item.CpdMotion" cols="30" rows="5"></textarea>
                            </div>
                        </div>

                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Date</span>
                                <date-picker [id]="sectionIndex + '-' + groupIndex + '-' + index + '-date'" [readonly]="true" [showClear]="true" [IncludeTime]="false" [initialValue]="item.Date" (onValueChange)="dateChange($event)"></date-picker>
                            </div>
                            <div class="form-group col-md-1">
                                <label>&nbsp;</label>
                                <img class="undraggable nopadding noborder" height="10" src="{{imagesPath + 'CPD arrow.png'}}" />
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>CPD</span>
                                <input type="text" readonly class="form-control undraggable" [(ngModel)]="item.CpdDate" />
                            </div>
                        </div>

                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Speeches</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Speeches" cols="30" rows="5"></textarea>
                            </div>
                            <div class="form-group col-md-1">
                            </div>
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Details</span>
                                <textarea class="form-control undraggable" [(ngModel)]="item.Details" cols="30" rows="5"></textarea>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="row nopadding">
                            <div class="form-group col-md-5 nopadding" style="width: 45%">
                                <span>Print Sequence</span>
                                <input class="form-control undraggable" type="number" onkeypress='return event.charCode >= 48 && event.charCode <= 57' [(ngModel)]="item.PrintSequence" />
                            </div>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: [OrderPaperService]
})
export class ItemMotionComponent extends ItemComponent implements OnInit, AfterViewInit {
    @Input()
    item: MotionItem;
    @Input()
    index: number;
    isExpand: boolean;
    @Input()
    isGroupChild: boolean = false;
    @Input()
    groupIndex: number;
    motionTitleOptions: any;
    @Input()
    sectionIndex: number;
    @Input()
    motionOptions = [];
    cpdAjaxUrl: string = AppSettings.API_CPDMOTIONACCESS_ENDPOINT;
    error: any;

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        this.motionTitleOptions = [{ id: "monday", text: "monday" }, { id: "tuesday", text: "tuesday" }];

        if (this.isGroupChild) {
            this.toggleId = this.Guid() + '-' + this.sectionIndex + '-' + this.index + '-' + this.groupIndex + '-motion';
        }
        else {
            this.toggleId = this.Guid() + '-' + this.sectionIndex + '-' + this.index + '-motion';
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

    dateChange = (value: string) => {
        this.item.Date = value;
    }

    titleSelect = (e: string) => {
        if (e != null && e != '') {
            if (this.motionOptions.length > 0) {
                var text = this.findOption(this.motionOptions, e);
                this.item.Title = text;
                this.item.CpdTitle = text;
                this.orderPaperService.getMotion(e).subscribe(
                    (data: CpdMotionItem) => {
                        this.item.CpdMember = data.member;
                        this.item.CpdMotion = data.motion;
                        this.item.CpdDate = data.date;

                        this.item.Member = data.member;
                        this.item.Motion = data.motion;
                        this.item.Date = data.date;
                    },
                    (err: any) => this.error = err);
            }
        }
        if (e == null || e == '') {
            this.item.CpdTitle = null;
            this.item.CpdMotion = null;
            this.item.CpdMember = null;
        }
    }

    motionSelect = (e: string) => {
        if (e != null && e != '') {
            this.orderPaperService.getMotion(e).subscribe(
                (data: CpdMotionItem) => {
                    this.item.BusinessItemId = data.business_item_id;
                    this.item.CpdMember = data.member;
                    this.item.CpdMotion = data.motion;
                    this.item.CpdDate = data.date;
                    this.item.CpdTitle = data.business_item_title;

                    this.item.Title = data.business_item_title;
                    this.item.Member = data.member;
                    this.item.Motion = data.motion;
                    this.item.Date = data.date;

                    //clear free text
                    this.item.Speeches = this.item.Details = '';
                },
                (err: any) => this.error = err);
        }
    }
}