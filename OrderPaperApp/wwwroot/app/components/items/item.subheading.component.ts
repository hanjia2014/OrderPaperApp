import {
    Component,
    OnInit,
    ViewChild,
    Input,
    AfterViewInit
}                           from '@angular/core';
import { SubHeadingItem }   from '../../models/items';
import { ItemComponent }    from './item.component';

@Component({
    selector: 'item-subheading',
    template: `
                <div class="subheading">
                    <div class="row" style="cursor: move;">
                        <div class="col-md-8">
                            <a class="pointer" (click)="toggle($event, toggleId)">{{displayTitle()}}</a>
                        </div>
                        <div class="col-md-4">
                            <div class="pull-right">
                                <span *ngIf="isExpand" class="pointer" (click)="toggle($event, toggleId)">
                                    <img title="Collapse" src="{{imagesPath + 'chevron collapsing.png'}}">
                                </span>
                                <span *ngIf="isExpand == null || isExpand == false" class="pointer" (click)="toggle($event, toggleId)">
                                    <img title="Open" src="{{imagesPath + 'chevron expand.png'}}">
                                </span>
                                <span style="margin-right: 10px; margin-left: 10px;">Sub heading</span>
                                <img src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'">
                            </div>
                        </div>
                    </div>
                    <div id="{{toggleId}}" class="initially-hidden">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="subheading-col-lable">Full line</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.FullLine" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="subheading-col-lable">Column 1a</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col1a" />
                            </div>
                            <div class="col-md-3">
                                <div class="subheading-col-lable">Column 2a</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col2a" />
                            </div>
                            <div class="col-md-3">
                                <div class="subheading-col-lable">Column 3a</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col3a" />
                            </div>
                            <div class="col-md-3">
                                <div class="subheading-col-lable">Column 4a</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col4a" />
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-3">
                                <div class="subheading-col-lable">Column 1b</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col1b" />
                            </div>
                            <div class="col-md-3">
                                <div class="subheading-col-lable">Column 2b</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col2b" />
                            </div>
                            <div class="col-md-3">
                                <div class="subheading-col-lable">Column 3b</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col3b" />
                            </div>
                            <div class="col-md-3">
                                <div class="subheading-col-lable">Column 4b</div> <input type="text" class="form-control undraggable" [(ngModel)]="item.Col4b" />
                            </div>
                        </div>
                    </div>
                </div>
                `,
    styles: [],
    providers: []
})
export class ItemSubheadingComponent extends ItemComponent implements OnInit, AfterViewInit {
    @Input()
    item: SubHeadingItem;
    @Input()
    index: number;
    @Input()
    sectionIndex: number;
    isExpand: boolean;
    showTitle: string;
    constructor() {
        super();
    }
    ngOnInit() {
        this.toggleId = this.sectionIndex + '-section-' + this.index + '-subheading';
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

    displayTitle = (): string => {
        if (this.item.FullLine != null && this.item.FullLine != "")
            this.showTitle = this.item.FullLine;
        else if (this.item.Col1a != null && this.item.Col1a != "")
            this.showTitle = this.item.Col1a;
        else if (this.item.Col2a != null && this.item.Col2a != "")
            this.showTitle = this.item.Col2a;
        else if (this.item.Col3a != null && this.item.Col3a != "")
            this.showTitle = this.item.Col3a;
        else if (this.item.Col4a != null && this.item.Col4a != "")
            this.showTitle = this.item.Col4a;
        else if (this.item.Col1b != null && this.item.Col1b != "")
            this.showTitle = this.item.Col1b;
        else if (this.item.Col2b != null && this.item.Col2b != "")
            this.showTitle = this.item.Col2b;
        else if (this.item.Col3b != null && this.item.Col3b != "")
            this.showTitle = this.item.Col3b;
        else if (this.item.Col4b != null && this.item.Col4b != "")
            this.showTitle = this.item.Col4b;
        else
            this.showTitle = "Blank";
        return this.showTitle;
    }
}