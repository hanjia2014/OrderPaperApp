import {
    AUTO_STYLE,
    trigger,
    state,
    animate,
    transition,
    style,
    HostBinding,
    Component,
    OnInit,
    Input,
    Output,
    EventEmitter,
    AfterViewInit
}                               from '@angular/core';
import { BaseComponent }        from './base.component';
import { OrderPaper }           from '../models/orderpaper';
import { Section }              from '../models/section';
import { Item,
    LineItem,
    MotionItem,
    GroupItem,
    ReportItem,
    BillItem
}                               from '../models/items';
import { AppSettings }          from '../settings/app.settings';
import { OrderPaperService }    from '../services/app.services';

@Component({
    selector: 'order-paper-section',
    template: `
                <div class="row" (mouseover)="hoverVisible = true" (mouseleave)="hoverVisible = false">
                    <div class="col-md-11 panel panel-default margin-left-15 no-padding-right" style="margin-bottom: 5px;" [class.highlight-section]="isSelected">
                        <div class="panel-body no-padding-left">
                            <div class="drag-handle" style="cursor: move;">
                                <span title="Include in Order Paper" class="pointer">
                                    <img (click)="section.IsIncluded = !section.IsIncluded" style="height: 20px;" src="{{section.IsIncluded ? imagesPath + 'included.png' : imagesPath + 'excluded.png'}}">
                                </span>
                                <span title="Show on front page" class="pointer">
                                    <img (click)="section.IsFrontPage = !section.IsFrontPage" style="height: 20px; margin-right: 15px; margin-left: 12px;" src="{{section.IsFrontPage ? imagesPath + 'on front cover.png' : imagesPath + 'Not on front cover.png'}}">
                                </span>
                                <a *ngIf="isSelected == false" (click)="toggle($event, index + '-section', true)">{{section.Name}}</a>
                                <select2 *ngIf="isSelected && section.TitleEditingAllowed == false" [id]="index + '-section-list'" [width]="'500px'" [enableSearch]="true" [multiple]="false" [initialValue]="section.Id" [data]="availableSections" (selected)="sectionChange($event)">
                                </select2>

                                <input *ngIf="isSelected && section.TitleEditingAllowed" class="form-control input-sm" style="display:inline; height:34px; width:500px" [(ngModel)]="section.Name" />

                                <div class="pull-right">
                                    <span *ngIf="isSelected" class="pointer" (click)="toggle($event, index + '-section', true)">
                                        <img title="Collapse" src="{{imagesPath + 'chevron collapsing.png'}}">
                                    </span>
                                    <span *ngIf="isSelected == false" class="pointer" (click)="toggle($event, index + '-section', true)">
                                        <img title="Open" src="{{imagesPath + 'chevron expand.png'}}">
                                    </span>
                                    <img src="{{imagesPath + 'dragndrop.png'}}" style="margin-left: 10px;" height="23" [style.visibility]="hoverVisible ? 'visible' : 'hidden'">
                                </div>
                            </div>
                            <div id="{{index + '-section'}}" class="initially-hidden" style="width: 100%; margin-top: 15px;">
                                <order-paper-section-details [index]="index" [section]="section" [billOptions]="billOptions" [reportOptions]="reportOptions" [motionOptions]="motionOptions"></order-paper-section-details>
                            </div>
                        </div>
                    </div>
                    <a [style.visibility]="hoverVisible ? 'visible' : 'hidden'" (click)="deleteSection()">
                        <img style="padding: 15px;" title="Delete Section" src="{{imagesPath + 'delete.png'}}">
                    </a>
                </div>
                `,
    styles: [`
               a{
                    cursor: pointer;
                }
            `],
    providers: [OrderPaperService]
})
export class OrderPaperSectionComponent implements OnInit, AfterViewInit {
    @Input()
    section: Section;
    hoverVisible: boolean;
    @Input()
    isSelected: boolean;
    @Input()
    index: number;
    @Input()
    sectionOptions: any;
    @Output()
    onSelectSection: EventEmitter<Section> = new EventEmitter<Section>();
    @Output()
    onDeleteSection: EventEmitter<number> = new EventEmitter<number>();
    imagesPath: string = AppSettings.IMAGE_PATH;
    updatedSectionSelect: string;
    availableSections: any;
    spinElm: HTMLElement;
    spinner: Spinner = new Spinner({ radius: 10, color: '#2ebcc5' });
    error: any;
    @Input()
    billOptions = [];
    @Input()
    motionOptions = [];
    @Input()
    reportOptions = [];

    constructor(private orderPaperService: OrderPaperService) {
    }
    ngOnInit() {
        if (this.section != null && this.sectionOptions != null) {
            this.cloneSectionList();
            if (this.isFreeTextSection())
                this.availableSections.push({ id: this.section.Name, text: this.section.Name });
        }
    }

    cloneSectionList = () => {
        this.availableSections = [];
        this.sectionOptions.forEach(option => {
            this.availableSections.push({ id: option.id, text: option.text });
        });
    }

    sectionChange = (e: string) => {
        if (e != null && this.section.Id != e) {
            this.updatedSectionSelect = e;
            this.section.Id = e;
            this.availableSections.forEach(option => {
                if (option.id == e)
                    this.section.Name = option.text;
            });
            this.selectedSection();
        }
    }

    selectedSection = () => {
        //fetch from api
        if (this.isFreeTextSection() == false) {
            this.spinElm = document.getElementById("saveSpinner");
            this.spinner.spin(this.spinElm);
            this.orderPaperService.getSectionDetails(this.section.Id).subscribe(
                (data: any) => {
                    if (data != null) {
                        this.section.Id = data.Id.toString();
                        this.section.Name = data.Name;
                        this.section.Subheading = data.Subheading;
                        this.section.Details = data.Details;
                        this.section.Speeches = data.Speeches;
                        this.section.HideSequenceNumber = data.HideSequenceNumber;
                        this.section.TitleEditingAllowed = data.TitleEditingAllowed;
                        this.spinner.stop();

                        if (this.availableSections != null) {
                            for (var i = this.availableSections.length - 1; i >= 0; i--) {
                                var option = this.availableSections[i];
                                if(option.id == option.text)
                                    this.availableSections.splice(i, 1);
                            }
                        }
                    }
                },
                (err: any) => {
                    this.error = err;
                    this.spinner.stop();
                });
        }
    }

    private isFreeTextSection = (): boolean => {
        var isFreeText = true;
        this.sectionOptions.forEach(item => {
            if (item.id == this.section.Id)
                isFreeText = false;
        });
        return isFreeText;
    }

    ngAfterViewInit() {
    }

    selectSection = () => {
        this.onSelectSection.next(this.section);
    }

    deleteSection = () => {
        this.onDeleteSection.next(this.index);
    }

    toggle(element: any, eleId: string, isCallbackRequired: boolean) {
        //element.preventDefault();
        this.isSelected = !this.isSelected;
        if(isCallbackRequired)
            this.selectSection();
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }
}