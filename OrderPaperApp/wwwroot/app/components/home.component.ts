import { Component, OnInit, NgZone, ViewChild } from '@angular/core';
import { BaseComponent }                        from './base.component';
import { Tabs }                                 from '../directives/tabs/tabs';
import {
    Item,
    BillItem,
    MotionItem,
    ReportItem,
    GroupItem,
    SubHeadingItem
}                                               from '../models/items';
import { Section, SectionSummary }              from '../models/section';
import { OrderPaper }                           from '../models/orderpaper';
import { SelectedOP }                           from '../models/selectedop';
import { OrderPaperWrapper }                    from '../models/orderpaperwrapper';
import { ConfigurationItem }                    from '../models/configurationitem';
import { OrderPaperService }                    from '../services/app.services';
import { ModalComponent }                       from '../directives/modal/modal';
import { AppConstants }                         from '../settings/app.constants';

@Component({
    selector: 'home',
    template: `
                <div class="navbar-fixed-top" style="position: relative; background-color: #263a55">
                    <tabs (onCreateNewOrderPaper)="createNewOrderPaper()">
                        <tab [title]="'History'" (onActiveChange)="onCheckTabMode($event)">
                            <div class="col-md-9 nopadding">
                                <div>
                                    <h3 class="header-green-text pull-left">Order Paper history</h3>
                                </div>
                                <table *ngIf="orderPaperSummary != null && orderPaperSummary.length > 0" id="orderpaper-history-list" class="table history-list">
                                    <thead>
                                        <tr class="header-green-text">
                                            <th>
                                                <a class="pointer" (click)="sortByNumber()">Number <img [style.visibility]="sorting_column == 'Number' ? 'visible' : 'hidden'" title="{{sorting_number_descending ? 'Sort descending' : 'Sort ascending'}}" src="{{sorting_number_descending ? imagesPath + 'white down arrow.png' : imagesPath + 'white up arrow.png'}}"></a>
                                            </th>
                                            <th>
                                                <a class="pointer" (click)="sortBySittingDay()">Sitting day <img [style.visibility]="sorting_column == 'Day' ? 'visible' : 'hidden'" title="{{sorting_sitting_day_descending ? 'Sort descending' : 'Sort ascending'}}" src="{{sorting_sitting_day_descending ? imagesPath + 'white down arrow.png' : imagesPath + 'white up arrow.png'}}"></a>
                                            </th>
                                            <th>
                                                <a class="pointer" (click)="sortByStatus()">Status <img [style.visibility]="sorting_column == 'Status' ? 'visible' : 'hidden'" title="{{sorting_status_descending ? 'Sort descending' : 'Sort ascending'}}" src="{{sorting_status_descending ? imagesPath + 'white down arrow.png' : imagesPath + 'white up arrow.png'}}"></a>
                                            </th>
                                            <th>Version</th>
                                            <th>Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr (mouseover)="hoverId = summary.Id" (mouseleave)="hoverId = null" *ngFor="let summary of orderPaperSummary | paginate: { itemsPerPage: 15, currentPage: p }; let i = index" class="header-white-text">
                                            <td class="pointer" [class.header-select-highlight]="(selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id) || hoverId == summary.Id" (click)="selectOrderPaper(summary.Id)">
                                                <img title="{{selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id ? 'Current Order Paper' : hoverId == summary.Id ? 'Open Order Paper' : ''}}" width=21 [style.visibility]="selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id || hoverId == summary.Id" src="{{ selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id ? imagesPath + 'folder_open.png' : hoverId == summary.Id ? imagesPath + 'folder_closed.png' : ''}}">
                                                {{summary.Number}}
                                            </td>
                                            <td class="pointer" [class.header-select-highlight]="(selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id) || hoverId == summary.Id" (click)="selectOrderPaper(summary.Id)">
                                                <a class="header-table-link">
                                                    {{summary.SittingDay}}
                                                </a>
                                            </td>
                                            <td class="pointer" [class.header-select-highlight]="(selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id) || hoverId == summary.Id" (click)="selectOrderPaper(summary.Id)">
                                                {{summary.Status}}
                                            </td>
                                            <td class="pointer" [class.header-select-highlight]="(selectedOrderPaper != null && summary.Id == selectedOrderPaper.Id) || hoverId == summary.Id" (click)="selectOrderPaper(summary.Id)">
                                                {{summary.Version}}
                                            </td>
                                            <td>
                                                <a>
                                                    <img title="Delete Order Paper" src="{{imagesPath + 'delete.png'}}" (click)="deleteOrderPaper(summary, i)">
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                                <div id="spinner"></div>
                                <div *ngIf="orderPaperSummary != null && orderPaperSummary.length > 0">
                                    <pagination-controls class="pull-right" (pageChange)="p = $event"></pagination-controls>
                                </div>
                            </div>
                        </tab>
                        <!--<tab [title]="'Search'" (onActiveChange)="onCheckTabMode($event)">
                        </tab>-->
                    </tabs>
                    <div style="background-color: #edecec;">
                        <div class="container" style="padding-left: 10%;">
                            <order-paper-details [orderPaper]="selectedOrderPaper" [isDirty]="checkDirty()" (onCancel)="orderPaperCancelCallback()" (onSave)="orderPaperSaveCallback()" [sectionOptions]="sectionOptions"></order-paper-details>
                        </div>
                    </div>
                    <modal [animation]="animation" [keyboard]="keyboard" [backdrop]="backdrop" (onClose)="closed()" (onDismiss)="dismissed()"
                       (onOpen)="opened()" [cssClass]="cssClass" #modal>
                        <modal-header [show-close]="true">
                            <h4 class="modal-title" *ngIf="modalType == modalType_Delete">Confirm to delete Order Paper</h4>
                            <h4 class="modal-title" *ngIf="modalType == modalType_Save">Confirm to open another Order Paper</h4>
                        </modal-header>
                        <modal-body>
                            <div *ngIf="modalType == modalType_Delete">You are about to delete an Order Paper. Are you sure you want to delete?</div>
                            <div *ngIf="modalType == modalType_Save">You have unsaved changes to the existing Order Paper. Are you sure you want to open another Order Paper without saving the existing Order Paper?</div>
                        </modal-body>
                        <modal-footer [show-default-buttons]="true"></modal-footer>
                    </modal>
                </div>
                <!--<div class="footer">
                    <div style="margin-top: 40px;">
                        <img *ngIf="selectedOrderPaper != null" src="{{imagesPath + 'smiley.png'}}" height="23">
                    </div>
                </div>-->
                `,
    styles: [`
                a{
                    cursor:pointer
                }
                .header-select-highlight{
                    background-color: #142840;
                }
                .header-green-text{
                    color: #2ebcc5;
                }
                .header-green-text a{
                    color: #2ebcc5;
                }
                .header-white-text{
                    color: #fdfdfd;
                }
                .header-table-link{
                    color: #fdfdfd;
                }
                .header-table-link : hover{
                    color: #abded2;
                }
                .history-list > tbody > tr: hover {
                    background-color: #142840;
                }
                .history-list > tbody > tr > td {
                    border-top: none;
                    padding: 6px;
                }

                .history-list > thead > tr > th {
                    border-bottom: none;
                    font-weight: normal;
                }
            `],
    providers: [OrderPaperService]
})
export class HomeComponent extends BaseComponent implements OnInit {
    hoverId: number;
    orderPaperStatus = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
    isPreviewMode: boolean;
    selectedOrderPaper: OrderPaper;
    error: any;
    orderPaperSummary: Array<OrderPaperWrapper> = new Array<OrderPaperWrapper>();
    listElm: HTMLElement = document.getElementById("spinner");
    @ViewChild(Tabs)
    tabs: Tabs;
    originalOP: OrderPaper;
    isDirty: boolean = false;
    //modal
    @ViewChild('modal')
    modal: ModalComponent;
    sectionOptions = [];
    deletedSummary: OrderPaperWrapper;
    deletedIndex: number;
    //modal
    modalType: string;
    modalType_Save: string = "Saving confirm";
    modalType_Delete: string = "Deleting confirm";
    modal_selected_id: string;
    //sorting
    sorting_number_descending: boolean;
    sorting_status_descending: boolean;
    sorting_sitting_day_descending: boolean = true;
    sorting_column: string = AppConstants.COL_DAY;

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        this.listElm = document.getElementById("spinner");
        this.getOrderPaperSummary();
        this.getSectionSummary();
        this.getCpdDataUrl();
    }

    getCpdDataUrl = () => {
        this.orderPaperService.getConfigurationList().subscribe(
            (data: Array<ConfigurationItem>) => {
                if (data != null && data.length > 0) {
                    AppConstants.CONFIGURATION_LIST = data;
                    data.forEach((item: ConfigurationItem) => {
                        if (item.Key == "Sections Management Url") {
                            this.tabs.sectionSPUrl = item.Value;
                        }
                    });
                }
            },
            (err: any) => this.error = err);
    }

    orderPaperSaveCallback = () => {
        this.getOrderPaperSummary();

        var json = JSON.stringify(this.selectedOrderPaper);
        this.originalOP = new OrderPaper();
        var op = JSON.parse(json);
        (<any>Object).assign(this.originalOP, op);
        this.isDirty = false;
    }

    orderPaperCancelCallback = () => {
        if (this.selectedOrderPaper.Id == -1) {
            this.selectedOrderPaper = null;
            this.tabs.openHistoryTab();
        } else {
            var json = JSON.stringify(this.originalOP);
            this.selectedOrderPaper = new OrderPaper();
            var op = JSON.parse(json);
            (<any>Object).assign(this.selectedOrderPaper, op);
        }

        this.isDirty = false;
    }

    getOrderPaperSummary = () => {
        this.spinner.spin(this.listElm);
        this.orderPaperService.getOrderPaperList().subscribe(
            (data: Array<OrderPaperWrapper>) => {
                (<any>Object).assign(this.orderPaperSummary, data);
                //update version number when an order paper saved first time and change it after save
                if (this.selectedOrderPaper != null) {
                    this.orderPaperSummary.forEach((summary: OrderPaperWrapper) => {
                        if (summary.Id == this.selectedOrderPaper.Id && summary.Version != this.selectedOrderPaper.Version) {
                            this.selectedOrderPaper.Version = summary.Version;
                        }
                    });
                }
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    getSectionSummary = () => {
        this.orderPaperService.getSectionSummaryList().subscribe(
            (data: Array<SectionSummary>) => {
                data.forEach((option: SectionSummary) => {
                    this.sectionOptions.push({id: option.Id, text: option.Text});
                });
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    onCheckTabMode = (value: string) => {
        this.isPreviewMode = value == 'Preview';
    }

    selectOrderPaper = (id: string) => {
        if (this.selectedOrderPaper != null && this.isDirty) {
            this.modalType = this.modalType_Save;
            this.modal_selected_id = id;
            this.modal.open();
        }
        else {
            this.downloadOrderPaper(id);
        }
    }

    checkDirty = (): boolean => {
        if (this.isDirty) return true;
        if (this.originalOP == null && this.selectedOrderPaper != null) {
            this.isDirty = true;
        }
        if (this.originalOP != null && this.selectedOrderPaper != null) {
            this.isDirty = this.originalOP.Number != this.selectedOrderPaper.Number ||
                this.originalOP.Status != this.selectedOrderPaper.Status ||
                this.originalOP.SittingHours != this.selectedOrderPaper.SittingHours ||
                this.originalOP.SittingDay != this.selectedOrderPaper.SittingDay ||
                //this.originalOP.PublishingProgress.length != this.selectedOrderPaper.PublishingProgress.length ||
                this.originalOP.Sections.length != this.selectedOrderPaper.Sections.length;
            if (this.isDirty) return true;
            //for (var i = 0; i < this.originalOP.PublishingProgress.length; i++) {
            //    var source = this.originalOP.PublishingProgress[i];
            //    var target = this.selectedOrderPaper.PublishingProgress[i];
            //    this.isDirty = source != target;
            //}

            if (this.isDirty) return true;
            else {
                for (var i = 0; i < this.originalOP.Sections.length; i++) {
                    var originalSection = this.originalOP.Sections[i];
                    var targetSection = this.selectedOrderPaper.Sections[i];
                    this.isDirty = originalSection.Name != targetSection.Name ||
                        originalSection.Details != targetSection.Details ||
                        originalSection.Speeches != targetSection.Speeches ||
                        originalSection.IsFrontPage != targetSection.IsFrontPage ||
                        originalSection.IsIncluded != targetSection.IsIncluded ||
                        originalSection.Items.length != targetSection.Items.length ||
                        originalSection.Subheading.FullLine != targetSection.Subheading.FullLine ||
                        originalSection.Subheading.Col1a != targetSection.Subheading.Col1a ||
                        originalSection.Subheading.Col2a != targetSection.Subheading.Col2a ||
                        originalSection.Subheading.Col3a != targetSection.Subheading.Col3a ||
                        originalSection.Subheading.Col4a != targetSection.Subheading.Col4a ||
                        originalSection.Subheading.Col1b != targetSection.Subheading.Col1b ||
                        originalSection.Subheading.Col2b != targetSection.Subheading.Col2b ||
                        originalSection.Subheading.Col3b != targetSection.Subheading.Col3b ||
                        originalSection.Subheading.Col4b != targetSection.Subheading.Col4b;
                    if (this.isDirty) return true;
                    else {
                        for (var j = 0; j < originalSection.Items.length; j++) {
                            var sourceItem = originalSection.Items[j];
                            var targetItem = targetSection.Items[j];
                            this.isDirty = sourceItem.Type != targetItem.Type || sourceItem.Title != targetItem.Title;
                            if (this.isDirty) return true;
                            else {
                                if (sourceItem.Type == "Bill")
                                    this.isDirty = this.checkDirtyBill(<BillItem>sourceItem, <BillItem>targetItem);
                                if (sourceItem.Type == "Motion")
                                    this.isDirty = this.checkDirtyMotion(<MotionItem>sourceItem, <MotionItem>targetItem);
                                if (sourceItem.Type == "Report")
                                    this.isDirty = this.checkDirtyReport(<ReportItem>sourceItem, <ReportItem>targetItem);
                                if (sourceItem.Type == "Subheading")
                                    this.isDirty = this.checkDirtySubheading(<SubHeadingItem>sourceItem, <SubHeadingItem>targetItem);
                                if (sourceItem.Type == "Group")
                                    this.isDirty = this.checkDirtyGroup(<GroupItem>sourceItem, <GroupItem>targetItem);
                                if (this.isDirty) return true;
                            }
                        }
                    }
                }
            }
        }

        return this.isDirty;
    }

    private checkDirtyGroup = (source: GroupItem, target: GroupItem): boolean => {
        var dirty = false;
        dirty = source.From != target.From || source.To != target.To || source.Items.length != target.Items.length;
        if (dirty) return true;
        else {
            for (var j = 0; j < source.Items.length; j++) {
                var sourceItem = source.Items[j];
                var targetItem = target.Items[j];
                this.isDirty = sourceItem.Type != targetItem.Type || sourceItem.Title != targetItem.Title;
                if (this.isDirty) return true;
                else {
                    if (sourceItem.Type == "Bill")
                        this.isDirty = this.checkDirtyBill(<BillItem>sourceItem, <BillItem>targetItem);
                    if (sourceItem.Type == "Motion")
                        this.isDirty = this.checkDirtyMotion(<MotionItem>sourceItem, <MotionItem>targetItem);
                    if (sourceItem.Type == "Report")
                        this.isDirty = this.checkDirtyReport(<ReportItem>sourceItem, <ReportItem>targetItem);
                    if (sourceItem.Type == "Subheading")
                        this.isDirty = this.checkDirtySubheading(<SubHeadingItem>sourceItem, <SubHeadingItem>targetItem);
                    if (this.isDirty) return true;
                }
            }
        }
        return dirty;
    }

    private checkDirtySubheading = (source: SubHeadingItem, target: SubHeadingItem): boolean => {
        var dirty = false;
        dirty = source.FullLine != target.FullLine ||
            source.Col1a != target.Col1a ||
            source.Col2a != target.Col2a ||
            source.Col3a != target.Col3a ||
            source.Col4a != target.Col4a ||
            source.Col1b != target.Col1b ||
            source.Col2b != target.Col2b ||
            source.Col3b != target.Col3b ||
            source.Col4b != target.Col4b;

        return dirty;
    }

    private checkDirtyBill = (source: BillItem, target: BillItem): boolean => {
        var dirty = false;
        dirty = source.CpdMember != target.CpdMember ||
            source.CpdNumber != target.CpdNumber ||
            source.CpdTitle != target.CpdTitle ||
            source.Details != target.Details ||
            source.IsConsiderationItem != target.IsConsiderationItem ||
            source.IsCurrentSittingWeek != target.IsCurrentSittingWeek ||
            source.IsFollowingSittingWeek != target.IsFollowingSittingWeek ||
            source.IsMajorityAmendments != target.IsMajorityAmendments ||
            source.LatestEvent != target.LatestEvent ||
            source.Member != target.Member ||
            source.Number != target.Number ||
            source.Speeches != target.Speeches ||
            source.Stage != target.Stage;

        return dirty;
    }

    private checkDirtyMotion = (source: MotionItem, target: MotionItem): boolean => {
        var dirty = false;
        dirty = source.CpdMember != target.CpdMember ||
            source.CpdTitle != target.CpdTitle ||
            source.Details != target.Details ||
            source.Member != target.Member ||
            source.Speeches != target.Speeches ||
            source.Date != target.Date ||
            source.CpdMember != target.CpdMember ||
            source.CpdMotion != target.CpdMotion ||
            source.Motion != target.Motion ||
            source.PrintSequence != target.PrintSequence;
        return dirty;
    }

    private checkDirtyReport = (source: ReportItem, target: ReportItem): boolean => {
        var dirty = false;
        dirty = source.CpdTitle != target.CpdTitle ||
            source.Details != target.Details ||
            source.LatestEvent != target.LatestEvent ||
            source.Committee != target.Committee ||
            source.CpdCommittee != target.CpdCommittee ||
            source.CpdLatestEvent != target.CpdLatestEvent ||
            source.CpdShoulder != target.CpdShoulder ||
            source.Shoulder != target.Shoulder ||
            source.CpdGovernmentResponse != target.CpdGovernmentResponse ||
            source.GovernmentResponse != target.GovernmentResponse ||
            source.Speeches != target.Speeches;

        return dirty;
    }

    private cloneOriginalOP = (opJson: string) => {
        this.originalOP = new OrderPaper();
        var op = JSON.parse(opJson);
        (<any>Object).assign(this.originalOP, op);
    }

    private downloadOrderPaper = (id: string) => {
        this.spinner.spin(this.listElm);
        this.orderPaperService.getOrderPaper(id).subscribe(
            (data: OrderPaperWrapper) => {
                this.selectedOrderPaper = new OrderPaper();
                var nextNumber = 0;
                if (data.OrderPaperJson != null && data.OrderPaperJson != "") {
                    var op = JSON.parse(data.OrderPaperJson);
                    (<any>Object).assign(this.selectedOrderPaper, op);
                    //assign selected op to original to detect any changes made later
                    this.cloneOriginalOP(data.OrderPaperJson);
                    if (this.originalOP != null && this.originalOP.Id == null && id != "-1") {
                        //the newly created op has id=null in orderpaperjson column
                        this.originalOP.Id = data.Id;
                    }

                    if (this.selectedOrderPaper != null) {
                        nextNumber = parseInt(this.selectedOrderPaper.Number.toString()) + 1;
                    }
                }
                this.selectedOrderPaper.Id = id == "-1" ? -1 : data.Id;
                if (id == "-1") {
                    this.selectedOrderPaper.SittingDay = data.SittingDay;
                    this.selectedOrderPaper.Status = "Provisional";
                    this.selectedOrderPaper.SittingHours = "2pm to 6pm and 7:30pm to 10pm";
                    this.selectedOrderPaper.Number = nextNumber == 0 ? 1 : nextNumber;
                    this.selectedOrderPaper.PublishingProgress = new Array<string>();
                    this.selectedOrderPaper.WordUrl = '';
                    this.selectedOrderPaper.PdfUrl = '';
                }
                else {
                    this.selectedOrderPaper.Version = data.Version;
                }

                this.spinner.stop();
                this.tabs.collapseAll();
                this.isDirty = false;
            },
            (err: any) => this.error = err);
    }

    createNewOrderPaper = () => {
        this.selectOrderPaper("-1");
    }

    deleteOrderPaper = (summary: OrderPaperWrapper, index: number) => {
        this.modalType = this.modalType_Delete;
        this.deletedSummary = summary;
        this.deletedIndex = index;
        this.modal.open();
    }

    updateSequence(oldIndex: number, newIndex: number) { }

    //modal
    opened() {

    }

    navigate() {

    }

    open() {
        this.modal.open();
    }
    closed() {
        if (this.modalType == this.modalType_Delete) {
            this.spinner.spin(this.listElm);
            this.orderPaperService.delete(this.deletedSummary.Id.toString()).subscribe(
                (data: boolean) => {
                    if (data) {
                        for (var i = this.orderPaperSummary.length - 1; i >= 0; i--) {
                            var summary = this.orderPaperSummary[i];
                            if (summary.Id == this.deletedSummary.Id) {
                                this.orderPaperSummary.splice(i, 1);
                            }
                        }
                    }
                    this.spinner.stop();
                },
                (err: any) => this.error = err
            );
        }
        else if (this.modalType == this.modalType_Save) {
            this.downloadOrderPaper(this.modal_selected_id);
        }
    }
    dismissed() {

    }

    // op number sorting
    sortByNumber = () => {
        this.sorting_column = AppConstants.COL_NUMBER;
        if (this.sorting_number_descending == null || this.sorting_number_descending == false) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                if (a.Number * 1 > b.Number * 1) return -1;
                else if (a.Number * 1 < b.Number * 1) return 1;
                else return 0;
            });
        }
        if (this.sorting_number_descending) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                if (a.Number * 1 < b.Number * 1) return -1;
                else if (a.Number * 1 > b.Number * 1) return 1;
                else return 0;
            });
        }

        this.sorting_number_descending = !this.sorting_number_descending;
    }

    sortByStatus = () => {
        this.sorting_column = AppConstants.COL_STATUS;

        if (this.sorting_status_descending == null || this.sorting_status_descending == false) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                if (a.Status > b.Status) return -1;
                else if (a.Status < b.Status) return 1;
                else return 0;
            });
        }
        if (this.sorting_status_descending) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                if (a.Status < b.Status) return -1;
                else if (a.Status > b.Status) return 1;
                else return 0;
            });
        }

        this.sorting_status_descending = !this.sorting_status_descending;
    }

    sortBySittingDay = () => {
        this.sorting_column = AppConstants.COL_DAY;

        if (this.sorting_sitting_day_descending == null || this.sorting_sitting_day_descending == false) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                var a_day = this.parseDate(a.SittingDay);
                var b_day = this.parseDate(b.SittingDay);
                if (a_day > b_day) return -1;
                else if (a_day < b_day) return 1;
                else return 0;
            });
        }
        if (this.sorting_sitting_day_descending) {
            this.orderPaperSummary.sort((a: OrderPaperWrapper, b: OrderPaperWrapper) => {
                var a_day = this.parseDate(a.SittingDay);
                var b_day = this.parseDate(b.SittingDay);
                if (a_day < b_day) return -1;
                else if (a_day > b_day) return 1;
                else return 0;
            });
        }

        this.sorting_sitting_day_descending = !this.sorting_sitting_day_descending;
    }

    private parseDate = (s: string): Date => {
        var months = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11
        };
        var p = s.split('-');
        var year = parseInt(p[2]);
        var month = months[p[1]];
        var day = parseInt(p[0]);
        return new Date(year, month, day);
    }
}