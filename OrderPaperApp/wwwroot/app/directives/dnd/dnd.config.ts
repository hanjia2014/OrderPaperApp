// Copyright (C) 2016 Sergey Akopkokhyants
// This project is licensed under the terms of the MIT license.
// https://github.com/akserg/ng2-dnd

import {Injectable} from '@angular/core';
import {isString} from './dnd.utils';

@Injectable()
export class DataTransferEffect {

    static COPY = new DataTransferEffect('copy');
    static LINK = new DataTransferEffect('link');
    static MOVE = new DataTransferEffect('move');
    static NONE = new DataTransferEffect('none');

    constructor(public name: string) { }
}

@Injectable()
export class DragImage {
    constructor(
        public imageElement: string | HTMLElement,
        public x_offset: number = 0,
        public y_offset: number = 0) {
            if (isString(this.imageElement)) {
                // Create real image from string source
                let imgScr: string = <string>this.imageElement;
                this.imageElement = new HTMLImageElement();
                (<HTMLImageElement>this.imageElement).src = imgScr;
            }
        }
}

@Injectable()
export class DragDropConfig {
    public onDragStartClass: string = "dnd-drag-start";
    public onDragEnterClass: string = "dnd-drag-enter";
    public onDragOverClass: string = "dnd-drag-over";
    public onSortableDragClass: string = "dnd-sortable-drag";

    public dragEffect: DataTransferEffect = DataTransferEffect.MOVE;
    public dropEffect: DataTransferEffect = DataTransferEffect.MOVE;
    public dragCursor: string = "move";
    public dragImage: DragImage;
}