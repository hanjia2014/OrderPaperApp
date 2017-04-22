import { Component, Input, Output, EventEmitter }   from '@angular/core';
import { LineItem }                                 from '../../models/items';
import { AppSettings }                              from '../../settings/app.settings';

@Component({
    selector: 'item-line',
    template: ` <div class="item-line">
                    <span title="Delete line" class="pointer pull-right">
                        <img (click)="delete()" class="delete-line" src="{{imagesPath + 'delete.png'}}">
                    </span>
                    <div class="row">
                        <hr title="drag the line"/>
                    </div>
                </div>
                `,
    styles: [`.item-line hr{
                color: #696969; 
                background-color: rgb(209,90,73); 
                height: 8px;
                margin-top: 0px;
                cursor: move;
            }
            .delete-line{
                margin-right:-100px;
                margin-top: -11px;
            }
            `],
    providers: []
})
export class ItemLineComponent {
    @Input()
    line: LineItem;
    @Output()
    onDeleteLine = new EventEmitter<LineItem>();
    imagesPath: string = AppSettings.IMAGE_PATH;

    constructor() {
    }
    delete = () => {
        this.onDeleteLine.next(this.line);
    }
}