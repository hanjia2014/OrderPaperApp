import { Component, OnInit, Input }         from '@angular/core';
import { BaseComponent }                    from './base.component';
import { OrderPaper }                       from '../models/orderpaper';
import { Section }                          from '../models/section';
import {
    Item,
    LineItem,
    MotionItem,
    GroupItem,
    ReportItem,
    BillItem,
    SubHeadingItem,
    CpdBillItem,
    CpdMotionItem
}                                           from '../models/items';
import { DND_PROVIDERS, DND_DIRECTIVES }    from '../directives/dnd/ng2-dnd';
import { OrderPaperService }                from '../services/app.services';
import { AppConstants }                     from '../settings/app.constants';

@Component({
    selector: 'order-paper-section-details',
    template: `
                <div id="spinner"></div>
                <div class="row">
                    <div class="col-md-11" style="padding-left: 90px; padding-right: 0px;">
                        <div class="panel panel-default" style="margin-bottom: 0px;">
                            <div class="panel-body">
                                <div class="row">
                                    <div class="col-md-12">
                                        <a class="pointer" (click)="toggle($event, toggleId)">Details and Speeches</a>
                                    </div>
                                </div>
                                <div id="{{toggleId}}" class="initially-hidden">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <span>Details</span>
                                            <br />
                                            <textarea class="form-control" [(ngModel)]="section.Details" cols="40" rows="5"></textarea>
                                        </div>
                                        <div class="col-md-6">
                                            <span>Speeches</span>
                                            <br />
                                            <textarea class="form-control" [(ngModel)]="section.Speeches" cols="40" rows="5"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="spacer"></div>
                        <div class="panel panel-default" style="margin-bottom: 0px;">
                            <div class="panel-body">
                                <order-paper-section-subheading [subheading]="section.Subheading" [index]="index"></order-paper-section-subheading>
                            </div>
                        </div>
                    </div>
                </div>
                <div *ngIf="section">
                    <div class="row" dnd-sortable-container [dropZones]="['items-drop-zone']" [sortableData]="section.Items">
                        <div *ngFor="let item of section.Items; let i = index" dnd-sortable [sortableIndex]="i" [dropEnabled]="true" (onDragEnd)="sortingItems()" (onDragOver)="sortingItems()" (onDropSuccess)="sortingItems()" class="item-li col-md-12" [class.line-row]="item.Type == 'Line'">
                            <div class="row item-row" (mouseover)="item.hoverVisible = true" (mouseleave)="item.hoverVisible = false">
                                <div class="col-md-1 group-tick-box">
                                    <div *ngIf="item.Type != 'Group' && item.Type != 'Line' && item.Type != 'Subheading'" class="group-tick-box">
                                        <img class="vcenter group-icon" title="Group" src="{{imagesPath + 'group.png'}}" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'" (click)="addGroup(item, i)">
                                    </div>
                                </div>
                                <div class="col-md-1 vcenter">
                                    <div *ngIf="isAboveLine(i)" [style.visibility]="section.HideSequenceNumber == false ? 'visible' : 'hidden'">
                                        <div *ngIf="item.Type != 'Group' && item.Type != 'Line' && item.Type != 'Subheading'" class="pull-right">
                                            {{item.Sequence}}
                                        </div>
                                        <div *ngIf="item.Type == 'Group'" class="pull-right">
                                            {{item.From + '-' + item.To}}
                                        </div>
                                    </div>
                                </div>
                                <div *ngIf="item.Type != 'Line'" class="{{item.Type == 'Group' ? 'panel panel-primary nopadding col-md-8 item-box' : 'panel panel-default nopadding col-md-8 item-box'}}">
                                    <div class="panel-body">
                                        <span *ngIf="item.Type == 'Bill'">
                                            <item-bill [sectionIndex]="index" [billOptions]="billOptions" [index]="i" [item]="item"></item-bill>
                                        </span>
                                        <span *ngIf="item.Type == 'Report'">
                                            <item-report [sectionIndex]="index" [reportOptions]="reportOptions" [index]="i" [item]="item"></item-report>
                                        </span>
                                        <span *ngIf="item.Type == 'Motion'">
                                            <item-motion [sectionIndex]="index" [motionOptions]="motionOptions" [index]="i" [item]="item"></item-motion>
                                        </span>
                                        <span *ngIf="item.Type == 'Group'">
                                            <item-group [group]="item" [billOptions]="billOptions" [hoverVisible]="item.hoverVisible" [motionOptions]="motionOptions" [reportOptions]="reportOptions" [sequenceOptions]="getSequence()" [sectionIndex]="index" [groupIndex]="i" (onRemoveGroup)="removeGroup($event, i)" (onAddItems)="addItemsToGroup($event, i)"></item-group>
                                        </span>
                                        <span *ngIf="item.Type == 'Subheading'">
                                            <item-subheading [sectionIndex]="index" [index]="i" [item]="item"></item-subheading>
                                        </span>
                                    </div>
                                </div>
                                <span *ngIf="item.Type == 'Line'" class="col-md-8 item-box">
                                    <item-line [line]="section" (onDeleteLine)="deleteLine($event, i)"></item-line>
                                </span>
                                <div class="col-md-1 trash-bin-box" [class.vcenter]="item.Type != 'Line'">
                                    <div *ngIf="item.Type != 'Group' && item.Type != 'Line'">
                                        <img (click)="removeItem(item, i)" title="Delete item" [style.visibility]="item.hoverVisible ? 'visible' : 'hidden'" src="{{imagesPath + 'delete.png'}}" style="cursor: pointer">
                                    </div>
                                </div>
                            </div>
                        </div>  
                    </div>
                </div>
                <div class="spacer"></div>
                <div class="row">
                    <div class="col-md-11" style="padding-left: 90px;">
                        <select2 [id]="index + '-item-types'" [width]="'125px'" [enableSearch]="false" [multiple]="false" [initialValue]="'Bill'" [data]="itemTypes" (selected)="itemSelect($event)"></select2>
                        <a class="btn btn-parliament" (click)="addItem()">Add Item</a>
                    </div>
                </div>
                 `,
    styles: [`
               .new-item{
                    border-style: dashed;
                    border-color: gray;
                    border-width: 2px; 
                }
                .group-tick-box {
                    width: 2%;
                    margin-left: -5px;
                }
                .item-box {
                    width: 80%;
                }
                .trash-bin-box {
                    width: 3%;
                }
                .line-row{
                    height: 20px;
                }
                .item-row{
                    margin-top: 10px;
                }
            `],
    providers: [DND_PROVIDERS, OrderPaperService]
})
export class OrderPaperSectionDetailsComponent extends BaseComponent implements OnInit {
    @Input()
    section: Section;
    @Input()
    index: number;
    error: any;
    itemTypes = [{ id: "Bill", text: "Bill" }, { id: "Motion", text: "Motion" }, { id: "Report", text: "Report" }, { id: "Line", text: "Line" }, { id: "Subheading", text: "Sub heading" }];
    selectedItemType: string;
    listElm: HTMLElement = document.getElementById("spinner");
    @Input()
    billOptions = [];
    @Input()
    motionOptions = [];
    @Input()
    reportOptions = [];
    toggleId: string;

    constructor(private orderPaperService: OrderPaperService) {
        super();
    }
    ngOnInit() {
        this.selectedItemType = 'Bill';
        this.toggleId = 'section-' + this.index;
    }

    hasLineAlready = (): boolean => {
        var found = false;
        this.section.Items.forEach(item => {
            if (item.Type == "Line")
                found = true;
        });
        return found;
    }

    isAboveLine(index: number): boolean {
        if (this.hasLineAlready() == false) return true;
        for (var i = 0; i < this.section.Items.length; i++) {
            if (this.section.Items[i].Type == "Line") {
                return index < i;
            }
        }
        return true;
    }

    updateSequence(oldIndex: number, newIndex: number) { }

    sortingItems(e: any) {
        var sequence = 1;
        this.section.Items.forEach((item) => {
            if (item.Type != 'Line' && item.Type != 'Subheading') {
                if (item.Type == "Group") {
                    var group = (item as GroupItem);
                    group.From = sequence;
                    for (var i = 0; i < group.Items.length; i++) {
                        var grouppedItem = group.Items[i];
                        grouppedItem.Sequence = i + sequence;
                    }
                    group.To = group.Items[group.Items.length - 1].Sequence;
                    sequence = sequence + group.Items.length - 1;
                }
                item.Sequence = sequence++;
            }
        });
    }

    addItem = () => {
        var item = null;
        switch (this.selectedItemType) {
            case "Line":
                if (this.hasLineAlready() == false) {
                    item = new LineItem();
                }
                break;
            case "Bill":
                item = new BillItem();
                (<BillItem>item).Sequence = this.getNextSequenceNumber();
                break;
            case "Report":
                item = new ReportItem();
                (<ReportItem>item).Sequence = this.getNextSequenceNumber();
                break;
            case "Motion":
                item = new MotionItem();
                (<MotionItem>item).Sequence = this.getNextSequenceNumber();
                break;
            case "Subheading":
                item = new SubHeadingItem();
                break;
        }
        if (item != null) {
            this.section.Items.push(item);
            //this is for refresh 'From' and 'To' for existing group item(s)
            for (var i = this.section.Items.length - 1; i >= 0; i--) {
                var next = this.section.Items[i];
                if (next.Type == 'Group') {
                    this.addItemsToGroup(<GroupItem>next, i);
                }
            }
        }
    }
    deleteLine = (line: LineItem, index: number) => {
        this.section.Items.splice(index, 1);
    }

    addGroup = (item: Item, index: number) => {
        var group = new GroupItem();
        group.From = item.Sequence;
        group.To = item.Sequence;
        group.Items.push(item);
        this.section.Items.splice(index, 1);
        this.section.Items.splice(index, 0, group);
    }

    itemSelect = (e: string) => {
        this.selectedItemType = e;
    }

    removeGroup = (group: GroupItem, index: number) => {
        var existingItems = group.Items;
        this.section.Items.splice(index, 1);
        existingItems.forEach((item) => {
            this.section.Items.splice(index++, 0, item);
        });
    }

    removeItem = (item: Item, index: number) => {
        this.section.Items.splice(index, 1);
        this.sortingItems(null);
    }

    addItemsToGroup = (group: GroupItem, index: number) => {
        var newIndex = index;
        this.removeGroup(group, index);

        var newGroup = new GroupItem();
        newGroup.From = group.From;
        newGroup.To = group.To;

        for (var i = this.section.Items.length - 1; i >= 0; i--) {
            var item = this.section.Items[i];
            if (item.Sequence >= newGroup.From && item.Sequence <= newGroup.To) {
                if (item.Sequence == newGroup.From) {
                    newIndex = i;
                }
                newGroup.Items.push(item);
                this.section.Items.splice(i, 1);
            }
        }

        newGroup.Items = newGroup.Items.reverse();

        this.section.Items.splice(newIndex, 0, newGroup);
    }

    private getNextSequenceNumber = () => {
        if (this.section.Items == null || this.section.Items.length == 0)
            return 1;
        else if (this.section.Items.length == 1 && this.section.Items[0].Type == "Subheading")
            return 1;
        for (var i = this.section.Items.length - 1; i >= 0; i--) {
            var item = this.section.Items[i];
            if (item.IsBusinessItem)
                return item.Sequence + 1;
            if (item.Type == "Group")
                return (<GroupItem>item).To + 1;
        }
    }

    private getSequence = () => {
        var list = [];
        for (var i = 0; i < this.section.Items.length; i++) {
            var item = this.section.Items[i];
            if (item.IsBusinessItem) {
                if (item.Sequence != null) {
                    var sequence = item.Sequence.toString();
                    list.push({ id: sequence, text: sequence });
                }
            }
            else if (item.Type == "Group") {
                var group = <GroupItem>item;
                for (var j = 0; j < group.Items.length; j++) {
                    var item = group.Items[j];
                    if (item.Sequence != null) {
                        var sequence = item.Sequence.toString();
                        list.push({ id: sequence, text: sequence });
                    }
                }
            }
        }

        return list;
    }

    toggle(element: any, eleId: string) {
        element.preventDefault();

        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }
}