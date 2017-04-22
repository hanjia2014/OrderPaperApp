import { Component, OnInit, Input, Output, EventEmitter }       from '@angular/core';
import { ReportItem, MotionItem, BillItem, GroupItem  }         from '../../models/items';
import { ItemComponent }                                        from './item.component';

@Component({
    selector: 'item-group',
    template: `
                <div class="group">
                    <p style="cursor: move;">
                        <span>
                            Group
                        </span>
                        <a class="pull-right" style="cursor: pointer;">
                            <img (click)="removeGroup()" style="margin-right: 10px;" title="Ungroup" src="{{imagesPath + 'group_remove.png'}}">
                            <img src="{{imagesPath + 'dragndrop.png'}}" height="23" [style.visibility]="hoverVisible ? 'visible' : 'hidden'">
                        </a>
                    </p>
                    <div class="row">
                        <div class="col-md-4">
                            <select2 [id]="sectionIndex + '-' + groupIndex + '-group-from'" [label]="'From: '" [initialValue]="group.From" [checkNumber]="group.To" [checkOperation]="'Less'" [width]="'125px'" [placeholder]="'From'" [enableSearch]="false" [multiple]="false" [data]="sequenceOptions" (selected)="sequenceFromChange($event)"></select2>
                        </div>
                        <div class="col-md-5">
                            <select2 [id]="sectionIndex + '-' + groupIndex + '-group-to'" [label]="'To: '" [initialValue]="group.To" [checkNumber]="group.From" [checkOperation]="'Greater'" [width]="'125px'" [placeholder]="'To'" [enableSearch]="false" [multiple]="false" [data]="sequenceOptions" (selected)="sequenceToChange($event)"></select2>
                            <a (click)="addItems()" [class.inactive]="disableSelect">
                                Select
                            </a>
                        </div>
                    </div>
                    <div class="row">
                        <div dnd-sortable-container [dropZones]="['drop-zone']" [sortableData]="group.Items">
                            <ol class="list-sortable">
                                <li class="panel panel-default item-li group-child" *ngFor="let item of group.Items; let i = index" dnd-sortable [sortableIndex]="i">
                                    <div class="panel-body">
                                        <span *ngIf="item.Type == 'Bill'">
                                            <item-bill [index]="i" [item]="item" [billOptions]="billOptions" [groupIndex]="groupIndex" [isGroupChild]="true"></item-bill>
                                        </span>
                                        <span *ngIf="item.Type == 'Report'">
                                            <item-report [index]="i" [item]="item" [reportOptions]="reportOptions" [groupIndex]="groupIndex" [isGroupChild]="true"></item-report>
                                        </span>
                                        <span *ngIf="item.Type == 'Motion'">
                                            <item-motion [index]="i" [item]="item" [motionOptions]="motionOptions" [groupIndex]="groupIndex" [isGroupChild]="true"></item-motion>
                                        </span>
                                    </div>
                                </li>
                            </ol>
                        </div>
                    </div>
                </div>
                `,
    styles: [`
                .group-child{
                    margin: 15px;
                }
                a{
                    cursor: pointer;
                }
            `],
    providers: []
})
export class ItemGroupComponent extends ItemComponent implements OnInit {
    @Input()
    group: GroupItem;
    @Input()
    groupIndex: number;
    @Input()
    sectionIndex: number;
    @Input()
    dropZone: string;
    @Output()
    onAddItems = new EventEmitter<GroupItem>();
    @Output()
    onRemoveGroup = new EventEmitter<GroupItem>();
    @Input()
    sequenceOptions: any = [];
    @Input()
    billOptions = [];
    @Input()
    motionOptions = [];
    @Input()
    reportOptions = [];
    @Input()
    hoverVisible: boolean;
    addFrom: number;
    addTo: number;

    disableSelect: boolean;

    constructor() {
        super();
    }

    ngOnInit() {
        if (this.group != null) {
            this.addFrom = this.group.From;
            this.addTo = this.group.To;
        }
    }

    addItems = () => {
        this.group.From = this.addFrom;
        this.group.To = this.addTo;
        this.onAddItems.next(this.group);
    }

    removeGroup = () => {
        this.onRemoveGroup.next(this.group);
    }

    validateSequences() {
        if (this.group.From == null) return true;
        if (this.group.To == null) return true;
        if (this.group.From >= this.group.To) return true;
        return false;
    }

    sequenceFromChange = (e: string) => {
        if (e != null) {
            if (e != 'invalid') {
                var from = Number(e);
                if (this.validateSequence(from, this.group.To)) {
                    this.addFrom = from;
                    this.addTo = this.group.To;
                    this.disableSelect = false;
                }
            } else {
                this.disableSelect = true;
            }
        }
    }

    sequenceToChange = (e: string) => {
        if (e != null) {
            if (e != 'invalid') {
                var to = Number(e);
                if (this.validateSequence(this.group.From, to)) {
                    this.addFrom = this.group.From;
                    this.addTo = to;
                    this.disableSelect = false;
                }
            } else {
                this.disableSelect = true;
            }
        }
    }

    validateSequence = (from: number, to: number): boolean => {
        return from == null || to == null || to >= from;
    }
}