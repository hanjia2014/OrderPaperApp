import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'tab',
    styles: [`
    .pane{
      padding: 1em;
    }
  `],
    template: `
    <div [hidden]="!active" class="pane container" style="padding-left: 10%">
      <ng-content></ng-content>
    </div>
  `
})
export class Tab {
    @Input() title: string;
    active: boolean = false;
    @Output()
    onActiveChange = new EventEmitter<string>();
}