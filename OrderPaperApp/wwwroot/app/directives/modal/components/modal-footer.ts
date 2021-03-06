import { Component, Input, Output, EventEmitter, Type } from '@angular/core';
import { ModalComponent } from './modal';

@Component({
    selector: 'modal-footer',
    template: `
        <div class="modal-footer">
            <ng-content></ng-content>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-primary" (click)="modal.close()">{{closeButtonLabel}}</button>
            <button *ngIf="showDefaultButtons" type="button" class="btn btn-default" data-dismiss="modal" (click)="modal.dismiss()">{{dismissButtonLabel}}</button>
        </div>
    `
})
export class ModalFooterComponent {
    @Input('show-default-buttons') showDefaultButtons: boolean = false;
    @Input('dismiss-button-label') dismissButtonLabel: string = "Cancel";
    @Input('close-button-label') closeButtonLabel: string = "Ok";
    constructor(private modal: ModalComponent) { }
}
