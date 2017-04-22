/// <reference path="../../../typings/jqueryui.d.ts" />
import { Directive, ElementRef, EventEmitter, Output, Input, AfterViewInit } from '@angular/core';

@Directive({
    selector: '[sortable]'
})
export class Sortable implements AfterViewInit {
    @Output() onStopSort = new EventEmitter();
    @Input() handle: string;

    constructor(private el: ElementRef) {
        
    }

    ngAfterViewInit() {
        var options = {
            //placeholder: "sortable-hightlight",
            handle: ".drag-handle",
            start: (e: any, ui: any) => {
                $(this).attr('original-index', ui.item.index());
            },
            stop: (event, ui) => {
                var updatedIndex = ui.item.index();
                var originalIndex = $(this).attr('original-index');
                this.onStopSort.emit({ original: originalIndex, updated: updatedIndex }); // How to pass the params event and ui...?
            }
        };

        $(this.el.nativeElement).sortable(options);
    }
}