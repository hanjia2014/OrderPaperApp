import { Component,
    AfterViewInit,
    OnInit,
    Input,
    Output,
    EventEmitter,
    ViewChild,
    ViewChildren,
    QueryList
}                                           from '@angular/core';
import { Response }                         from '@angular/http';
import { BaseComponent }                    from './base.component';
import { OrderPaperSectionComponent }       from './orderpaper.section.component';
import { OrderPaperService }                from '../services/app.services';
import { AppSettings }                      from '../settings/app.settings';
import { AppConstants }                     from '../settings/app.constants';
import { OrderPaper }                       from '../models/orderpaper';
import { Section, SectionSummary }          from '../models/section';
import { WasResponse }                      from '../models/wasresponse';
import { AuditHistory }                     from '../models/audithistory';
import { OrderPaperWrapper }                from '../models/orderpaperwrapper';
import { DND_PROVIDERS, DND_DIRECTIVES }    from '../directives/dnd/ng2-dnd';
import { ModalComponent }                   from '../directives/modal/modal';
import {
    Item,
    LineItem,
    MotionItem,
    GroupItem,
    ReportItem,
    BillItem,
    SubHeadingItem,
    CpdBillItem,
    CpdMotionItem,
    CpdReportItem
}                                           from '../models/items';

@Component({
    selector: 'order-paper-details',
    template: `
                <div>
                    <div *ngIf="orderPaper">
                        <div class="row">
                            <div class="col-md-3">
                                <h3>Order Paper details</h3>
                                <br/>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                Date
                            </div>
                            <div class="col-md-4" style="margin-left: 15px;">
                                Sitting hours
                            </div>
                            <div class="col-md-2" style="padding: 0px; width: 150px">
                                Status
                            </div>
                            <div class="col-md-1" style="padding: 0px;">
                                Number
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-2">
                                <date-picker [id]="'orderPaperDate'" [checkEmpty]="true" [IncludeTime]="false" [width]="'150px'" [readonly]="true" [initialValue]="orderPaper.SittingDay" (onValueChange)="dateChange($event)"></date-picker>
                            </div>             
                            <div id="div-orderpaper-sitting-hours" class="col-md-4" style="margin-left: 15px;">
                                <select2 [id]="'orderPaperSittingHours'" [width]="'250px'" *ngIf="orderPaper.hasFreetextSittingHours == false" [checkEmptyEleId]="'#div-orderpaper-sitting-hours'" [enableSearch]="false" [initialValue]="orderPaper.SittingHours" [multiple]="false" [data]="sittingHoursOptions" (selected)="sittingHoursChange($event)"></select2>
                                <textarea *ngIf="orderPaper.hasFreetextSittingHours" class="form-control" style="height:34px; width:250px; display: inline" [class.has-error]="orderPaper.SittingHours == null || orderPaper.SittingHours == ''" [(ngModel)]="orderPaper.SittingHours"></textarea>
                                <a class="pointer" (click)="setSittingHours()">{{orderPaper.hasFreetextSittingHours ? 'Remove' : 'New'}}</a>
                            </div>             
                            <div class="col-md-2" style="padding: 0px; width: 150px">
                                <select2 [id]="'orderPaperStatus'" [enableSearch]="false" [initialValue]="orderPaper.Status" [width]="'125px'" [multiple]="false" [data]="statusOptions" (selected)="statusChange($event)"></select2>
                            </div>             
                            <div class="col-md-1" style="padding: 0px; width: 70px;">
                                <input class="form-control input-sm" style="height:34px;" type="number" [class.has-error]="orderPaper.Number==null || orderPaper.Number==''" onkeypress='return event.charCode >= 48 && event.charCode <= 57' [(ngModel)]="orderPaper.Number" />
                            </div>
                        </div>
                        <br />
                        <div class="spacer"></div>
                        <div class="row">
                            <div class="col-md-10">
                                <div *ngIf="orderPaper.Id != null" class="pull-left">
                                    <div style="display: inline">
                                        <img class="pointer" title="Preview" (click)="progress('Preview')" src="{{imagesPath + ((orderPaper.Id != null && orderPaper.Id != -1) ? 'preview highlighted with arrow.png' : 'disabled preview.png')}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" title="Word" (click)="progress('Word')" src="{{imagesPath + (orderPaper.containPreview() ? 'word highlighted with arrow.png' : 'disabled word.png')}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" title="Publish to web" (click)="progress('Publish')" src="{{imagesPath + ((orderPaper.containPreview() || orderPaper.containWord()) ? 'publish highlighted with arrow.png' : 'disabled publish.png')}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" title="Send to printer" (click)="progress('Print')" src="{{imagesPath + (orderPaper.containPublish() ? 'print highlighted with arrow.png' : 'disabled print.png')}}">
                                    </div>
                                </div>
                                <div class="pull-right" style="padding-top: 10px;">
                                    <a (click)="cancel()">Cancel</a>
                                    <a class="btn btn-parliament" [ngClass]='{disabled: checkMandatory()}' (click)="save($event)">Save Order Paper</a>
                                </div>
                            </div>
                        </div>
                        <div class="centered" id="saveSpinner" style="z-index: 100;"></div>
                        <div class="container row detail-block">
                            <span>
                                Sections
                            </span>
                            <br/>
                            <select2 [id]="'section-options-list'" [multiple]="false" [width]="'500px'" [placeholder]="'Select'" [enableSearch]="true" [data]="sectionOptions" (selected)="addSectionChange($event)"></select2>
                            <a class="btn btn-parliament" [class.inactive]="addSection==null || addSection==''" (click)="addSelectedSection()">Add section</a>
                            <div class="spacer">
                            </div>
                            <ul sortable id="sortable-section" (onStopSort)="stopSort($event)">
                                <li *ngFor="let section of orderPaper.Sections; let i = index" class="item-li">
                                    <order-paper-section [section]="section" [index]="i" [sectionOptions]="sectionOptions" [billOptions]="billOptions" [reportOptions]="reportOptions" [motionOptions]="motionOptions" [isSelected]="selectedSection != null && section.Name == selectedSection.Name" (onSelectSection)="selectSection($event, i)" (onDeleteSection)="deleteSection($event)"></order-paper-section>
                                </li>  
                            </ul>
                        </div>
                        <br />
                        <div class="row">
                            <div class="col-md-10">
                                <div *ngIf="orderPaper.Id != null" class="pull-left">
                                    <div style="display: inline">
                                        <img class="pointer" title="Preview" (click)="progress('Preview')" src="{{imagesPath + ((orderPaper.Id != null && orderPaper.Id != -1) ? 'preview highlighted with arrow.png' : 'disabled preview.png')}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" title="Word" (click)="progress('Word')" src="{{imagesPath + (orderPaper.containPreview() ? 'word highlighted with arrow.png' : 'disabled word.png')}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" title="Publish to web" (click)="progress('Publish')" src="{{imagesPath + ((orderPaper.containPreview() || orderPaper.containWord()) ? 'publish highlighted with arrow.png' : 'disabled publish.png')}}">
                                    </div>
                                    <div style="display: inline">
                                        <img class="pointer" title="Send to printer" (click)="progress('Print')" src="{{imagesPath + (orderPaper.containPublish() ? 'print highlighted with arrow.png' : 'disabled print.png')}}">
                                    </div>
                                </div>
                                <div class="pull-right" style="padding-top: 10px;">
                                    <a (click)="cancel()">Cancel</a>
                                    <a class="btn btn-parliament" [ngClass]='{disabled: checkMandatory()}' (click)="save($event)">Save Order Paper</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <modal [animation]="animation" [keyboard]="keyboard" [backdrop]="backdrop" (onClose)="closed()" (onDismiss)="dismissed()"
                       (onOpen)="opened()" [cssClass]="cssClass" #modal>
                    <modal-header [show-close]="true">
                        <h4 class="modal-title">
                            <span *ngIf="deletingType != 'publish-warning' && deletingType != 'print-warning' && deletingType != 'publish error' && deletingType != 'publish success' && deletingType != 'saving error' && deletingType != 'preview-warning' && deletingType != 'saved' && deletingType != 'section'">{{orderPaper != null && orderPaper.Id == -1 ? 'Confirm to cancel Order Paper' : 'Confirm to cancel' }}</span>
                            <span *ngIf="deletingType == 'saving error'">Error</span>
                            <span *ngIf="deletingType == 'saved'">Saved</span>
                            <span *ngIf="deletingType == 'section'">Confirm to delete Section</span>
                            <span *ngIf="deletingType == 'preview-warning'">Save Order Paper before Previewing</span>
                            <span *ngIf="deletingType == 'publish success'">Request to publish successful</span>
                            <span *ngIf="deletingType == 'publish error'">Published failed</span>
                            <span *ngIf="deletingType == 'publish-warning'">Save and Preview Order Paper before Publishing</span>
                            <span *ngIf="deletingType == 'print-warning'">Save, Preview and Publish the Order Paper before Sending to the Printer</span>
                        </h4>
                    </modal-header>
                    <modal-body>
                        <div *ngIf="deletingType == 'orderpaper'">
                            {{orderPaper != null && orderPaper.Id == -1 ? 'You have not saved this Order Paper. Are you sure you want to Cancel?' : 'You have unsaved changes. Are you sure you want to Cancel?' }}
                        </div>
                        <div *ngIf="deletingType == 'section'">
                            You are about to delete a Section from the Order Paper. Are you sure you want to delete?
                        </div>
                        <div *ngIf="deletingType == 'saving error'">
                            {{error.Message}}
                        </div>
                        <div *ngIf="deletingType == 'saved'">
                            The Order Paper has been saved successfully
                        </div>
                        <div *ngIf="deletingType == 'preview-warning'">
                            You must Save the Order Paper before you can Preview it in Word.
                        </div>
                        <div *ngIf="deletingType == 'publish-warning'">
                            You have unsaved data, you should Save and then click Preview before you publish to the web.
                        </div>
                        <div *ngIf="deletingType == 'print-warning'">
                            You have unsaved data, you should Save and then click buttons ‘Preview’ and ‘Publish to web’ before you action ‘Send to printer’.
                        </div>
                        <div *ngIf="deletingType == 'publish success'">
                            This Order Paper has been released for publishing. Please check Parliament’s website to confirm that publishing has been completed.
                        </div>
                        <div *ngIf="deletingType == 'publish error'">
                            {{publishErrorMsg}}
                        </div>
                    </modal-body>
                    <modal-footer [close-button-label]="deletingType == 'preview-warning' || deletingType == 'publish-warning' || deletingType == 'print-warning' ? 'Save' : 'Ok'" [show-default-buttons]="true"></modal-footer>
                </modal>
                `,
    styles: [],
    providers: [OrderPaperService]
})
export class OrderPaperDetailsComponent extends BaseComponent implements OnInit, AfterViewInit {
    @Input()
    orderPaper: OrderPaper;
    @Input()
    isDirty: boolean;
    @Output()
    onSave = new EventEmitter();
    @Output()
    onCancel = new EventEmitter();
    selectedSection: Section;
    error: any;
    publishErrorMsg: string;
    statusOptions = [{ id: "Provisional", text: "Provisional" }, { id: "Final", text: "Final" }];
    sittingHoursOptions = [{ id: "2pm to 6pm and 7:30pm to 10pm", text: "2pm to 6pm and 7:30pm to 10pm" }, { id: "2pm to 6pm", text: "2pm to 6pm" }];
    @Input()
    sectionOptions: any;
    sectionDeleteIndex: number;
    isRemoveVisible: boolean;
    addSection: string;
    spinElm: HTMLElement;
    publishProgressValid: boolean;
    billOptions = [];
    motionOptions = [];
    reportOptions = [];
    //modal
    @ViewChild('modal')
    modal: ModalComponent;
    //froala
    options: Object = {
        placeholderText: 'Edit Your Content Here!',
        charCounterCount: false
    }
    editorContent: string = 'My Document\'s Title'
    deletingType = '';

    @ViewChildren(OrderPaperSectionComponent)
    childrenSectionComponents: QueryList<OrderPaperSectionComponent>;

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
    }

    setSittingHours = () => {
        this.orderPaper.hasFreetextSittingHours = !this.orderPaper.hasFreetextSittingHours;
        this.orderPaper.SittingHours = this.orderPaper.hasFreetextSittingHours ? '' : '2pm to 6pm and 7:30pm to 10pm';

    }

    private getBillOptions = () => {
        this.spinElm = document.getElementById("saveSpinner");
        this.spinner.spin(this.spinElm);
        this.orderPaperService.getBills().subscribe(
            (data: Array<CpdBillItem>) => {
                if (data != null) {
                    data.forEach(bill => {
                        this.billOptions.push({ id: bill.business_item_id.toString(), text: bill.short_title });
                    });
                }
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    private getMotionOptions = () => {
        this.spinElm = document.getElementById("saveSpinner");
        this.spinner.spin(this.spinElm);
        this.orderPaperService.getMotions().subscribe(
            (data: Array<CpdMotionItem>) => {
                if (data != null) {
                    data.forEach(motion => {
                        this.motionOptions.push({ id: motion.business_item_id.toString(), text: motion.title });
                    });
                }
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    private getReportOptions = () => {
        this.spinElm = document.getElementById("saveSpinner");
        this.spinner.spin(this.spinElm);
        this.orderPaperService.getReports().subscribe(
            (data: Array<CpdReportItem>) => {
                if (data != null) {
                    data.forEach(report => {
                        this.reportOptions.push({ id: report.business_item_id.toString(), text: report.title });
                    });
                }
                this.spinner.stop();
            },
            (err: any) => this.error = err);
    }

    ngAfterViewInit() {

        $('.undraggable')
            .on('focus', function (e) {
                $('.item-li').attr("draggable", "false");
                console.log("focus");
            })
            .on('blur', function (e) {
                $('.item-li').attr("draggable", "true");
                console.log("blur");
            });

        //$('.item-li').draggable({ cancel: 'a' });
    }
    dateChange = (value: string) => {
        this.orderPaper.SittingDay = value;
    }

    selectSection = (value: Section, index: number) => {
        //this.selectedSection = value;
        var children = this.childrenSectionComponents.toArray();
        for (var i = 0; i < children.length; i++) {
            if (i != index && children[i].isSelected) {
                children[i].toggle(children[i], i + '-section', false);
            }
        }
    }

    deleteSection = (value: number) => {
        this.sectionDeleteIndex = value;
        this.deletingType = "section";
        this.modal.open();
    }

    statusChange = (e: string) => {
        if (e != null)
            this.orderPaper.Status = e;
    }

    addSectionChange = (e: string) => {
        if (e != null)
            this.addSection = e;
    }

    sittingHoursChange = (e: string) => {
        this.orderPaper.SittingHours = e;
    }

    addSelectedSection = () => {
        if (this.addSection != null && this.addSection != '') {
            if (this.isFreeTextSection()) {
                var section = new Section();
                section.Id = this.addSection;
                section.Name = this.addSection;
                this.orderPaper.Sections.push(section);
            }
            else {
                //fetch from api
                this.spinElm = document.getElementById("saveSpinner");
                this.spinner.spin(this.spinElm);
                this.orderPaperService.getSectionDetails(this.addSection).subscribe(
                    (data: any) => {
                        if (data != null) {
                            var section = new Section();
                            section.Id = data.Id.toString();
                            section.Name = data.Name;
                            section.Subheading = data.Subheading;
                            section.Details = data.Details;
                            section.Speeches = data.Speeches;
                            section.HideSequenceNumber = data.HideSequenceNumber;
                            section.TitleEditingAllowed = data.TitleEditingAllowed;
                            this.orderPaper.Sections.push(section);
                            this.spinner.stop();
                        }
                    },
                    (err: any) => {
                        this.error = err;
                        this.spinner.stop();
                    });
            }
        }
    }

    private isFreeTextSection = (): boolean => {
        var isFreeText = true;
        this.sectionOptions.forEach(item => {
            if (item.id == this.addSection)
                isFreeText = false;
        });
        return isFreeText;
    }

    checkMandatory(): boolean {
        return this.orderPaper.Number == null || this.orderPaper.Number.toString() == ''
            || this.orderPaper.SittingDay == null || this.orderPaper.SittingDay == ''
            || this.orderPaper.SittingHours == null || this.orderPaper.SittingHours == ''
            || this.orderPaper.Status == null || this.orderPaper.Status == ''
            || this.isDirty == false;
    }

    updateSequence(oldIndex: number, newIndex: number) { }

    stopSort = (e: any) => {
        var original = e.original;
        var updated = e.updated;
        var updatedSection = this.orderPaper.Sections[original];
        //remove item from original index
        this.orderPaper.Sections.splice(original, 1);
        //add the item to updated index
        this.orderPaper.Sections.splice(updated, 0, updatedSection);

    }

    save = (e: any) => {
        this.spinElm = document.getElementById("saveSpinner");
        //begin for the defect 3987 fix
        var date = $("#orderPaperDate-dateValue");
        if (date != null && date.val() != null) {
            this.orderPaper.SittingDay = date.val();
        }
        //end for the defect 3987 fix

        if (this.orderPaper.Id != null && this.orderPaper.Id != -1) {
            this.update(e);
            return;
        }

        this.spinner.spin(this.spinElm);
        this.orderPaper.Id = null;
        var paperString = JSON.stringify(this.orderPaper);
        e.preventDefault();
        this.orderPaperService.save(this.orderPaper).subscribe(
            (data: OrderPaperWrapper) => {
                if (data.OrderPaperJson != null && data.OrderPaperJson != "") {
                    var op = JSON.parse(data.OrderPaperJson);
                    (<any>Object).assign(this.orderPaper, op);
                    if (data.Id != null) {
                        this.orderPaper.Id = data.Id;
                    }
                }
                this.onSave.next();
                this.spinner.stop();

                this.deletingType = "saved";
                this.modal.open();
            },
            (err: any) => {
                if (err != null && err._body != null) {
                    var error = JSON.parse(err._body);
                    if (error != null && error.Message != null) {
                        this.error = error;
                        this.deletingType = "saving error";
                        this.modal.open();
                    }
                }
                this.spinner.stop();
            });
    }

    update = (e: any) => {
        var paperString = JSON.stringify(this.orderPaper);
        e.preventDefault();
        this.spinner.spin(this.spinElm);
        this.orderPaperService.update(this.orderPaper).subscribe(
            (data: Response) => {
                this.onSave.next();
                this.spinner.stop();

                this.deletingType = "saved";
                this.modal.open();
            },
            (err: any) => {
                if (err != null && err._body != null) {
                    var error = JSON.parse(err._body);
                    if (error != null && error.Message != null) {
                        this.error = error;
                        this.deletingType = "saving error";
                        this.modal.open();
                    }
                }
                this.spinner.stop();
            });
    }

    cancel = () => {
        this.deletingType = "orderpaper";
        if (this.isDirty)
            this.modal.open();
        else {
            this.onCancel.next();
        }
    }

    private generateWord = () => {
        this.spinElm = document.getElementById("saveSpinner");
        this.spinner.spin(this.spinElm);
        this.orderPaperService.generateWord(this.orderPaper.Id).subscribe(
            (data: string) => {
                this.orderPaper.WordUrl = data;
                this.publishProgressValid = true;
                var newWindow = window.open(this.orderPaper.WordUrl);
                this.updateProgressSteps(AppConstants.PROGRESS_PREVIEW);
                this.spinner.stop();
            },
            (err: any) => {
                if (err != null && err._body != null) {
                    var error = JSON.parse(err._body);
                    this.publishProgressValid = false;
                    if (error != null && error.Message != null) {
                        this.error = error;
                        this.deletingType = "saving error";
                        this.modal.open();
                    }
                }
                this.spinner.stop();
            });
    }

    progress = (value: string) => {
        if (value.localeCompare(AppConstants.PROGRESS_PREVIEW) == 0) {
            if (this.orderPaper.Id != null && this.orderPaper.Id != -1) {
                if (this.isDirty) {
                    this.deletingType = "preview-warning";
                    this.modal.open();
                } else {
                    this.generateWord();
                }
            }
        }
        else if (value.localeCompare(AppConstants.PROGRESS_WORD) == 0 && this.orderPaper.containPreview() && this.orderPaper.WordUrl != '') {
            var newWindow = window.open(this.orderPaper.WordUrl);
        }
        else if (value.localeCompare(AppConstants.PROGRESS_PUBLISH) == 0 && (this.orderPaper.containPreview() || this.orderPaper.containWord())) {
            if (this.orderPaper.Id != null && this.orderPaper.Id != -1) {
                if (this.isDirty) {
                    this.deletingType = "publish-warning";
                    this.modal.open();
                } else {
                    $.spin('true');
                    //get word file name
                    var fullUrl = this.orderPaper.WordUrl.split('/');
                    var fileName = fullUrl[fullUrl.length - 1];

                    this.orderPaperService.generatePdf(fileName).subscribe(
                        (data: WasResponse) => {
                            if (data != null && data.Destination != null && data.Message == "Success") {
                                this.orderPaper.PdfUrl = data.Destination;
                            }

                            this.orderPaperService.publish(this.orderPaper.Id).subscribe(
                                (publishResponse: any) => {
                                    $.spin('false');
                                    this.publishProgressValid = true;
                                    this.updateProgressSteps(AppConstants.PROGRESS_PUBLISH);
                                    this.deletingType = "publish success";
                                    this.modal.open();
                                },
                                (err: any) => {
                                    if (err != null) {
                                        var error = JSON.parse(err._body);
                                        this.publishErrorMsg = error.Message;
                                        this.deletingType = "publish error";
                                        this.modal.open();
                                    }
                                    $.spin('false');
                                });
                        },
                        (err: any) => {
                            if (err != null && err._body != null) {
                                var error = JSON.parse(err._body);
                                if (error != null && error.Message != null) {
                                    this.error = error;
                                    this.deletingType = "saving error";
                                    this.modal.open();
                                }
                            }
                            $.spin('false');
                        });
                }
            }
        }
        else if (value.localeCompare(AppConstants.PROGRESS_PRINT) == 0 && this.orderPaper.containPublish()) {
            if (this.orderPaper.Id != null && this.orderPaper.Id != -1) {
                if (this.isDirty) {
                    this.deletingType = "print-warning";
                    this.modal.open();
                } else {
                    this.spinElm = document.getElementById("saveSpinner");
                    this.spinner.spin(this.spinElm);

                    this.orderPaperService.openEmailClient(this.orderPaper);
                    this.publishProgressValid = true;
                    this.spinner.stop();
                }
            }
        }
    }
    //modal
    opened() {

    }

    navigate() {

    }

    open() {
        this.modal.open();
    }
    closed() {
        if (this.deletingType == "saved") {
        }
        else if (this.deletingType == "publish success" || this.deletingType == "publish error") {
        }
        else if (this.deletingType == "saving error") {
        }
        else if (this.deletingType == "orderpaper") {
            this.orderPaper = null;
            this.onCancel.next();
        }
        else if (this.deletingType == "preview-warning" || this.deletingType == "publish-warning" || this.deletingType == "print-warning") {
            this.save(event);
        }
        else {
            if (this.selectedSection != null && this.orderPaper.Sections[this.sectionDeleteIndex].Name == this.selectedSection.Name) {
                if (this.selectedSection != null)
                    this.selectedSection = null;
            }
            this.orderPaper.Sections.splice(this.sectionDeleteIndex, 1);
        }
    }
    dismissed() {

    }

    updateProgressSteps = (step: string) => {
        var included = false;
        this.orderPaper.PublishingProgress.forEach((item: string) => {
            if (item == step)
                included = true;
        });
        if (included == false) {
            this.orderPaper.PublishingProgress.push(step);
        }
        this.spinElm = document.getElementById("saveSpinner");
        this.spinner.spin(this.spinElm);
        var paperString = JSON.stringify(this.orderPaper);
        this.orderPaperService.update(this.orderPaper).subscribe(
            (data: Response) => {
                this.onSave.next();
                this.spinner.stop();
            },
            (err: any) => {
                if (err != null && err._body != null) {
                    var error = JSON.parse(err._body);
                    if (error != null && error.Message != null) {
                        this.error = error;
                        this.deletingType = "saving error";
                        this.modal.open();
                    }
                }
                this.spinner.stop();
            });

    }
}