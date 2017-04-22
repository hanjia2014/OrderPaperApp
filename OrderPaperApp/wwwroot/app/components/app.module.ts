import { NgModule }                                     from '@angular/core';
import { BrowserModule }                                from '@angular/platform-browser';
import { FormsModule }                                  from '@angular/forms';
import { HttpModule, Response }                         from '@angular/http';
import { LocationStrategy, HashLocationStrategy }       from '@angular/common';
import { Select2Component }                             from '../directives/select2';
import { Select2AjaxComponent }                         from '../directives/select2ajax';
import { DatePickerComponent }                          from '../directives/datepicker';
import { MODAL_DIRECTIVES, ModalComponent }             from '../directives/modal/modal';
import { Tabs }                                         from '../directives/tabs/tabs';
import { Tab }                                          from '../directives/tabs/tab';
import { Dragula }                                      from '../directives/dragula/dragula.directive';
import { VerticalMenuComponent }                        from '../directives/vertical-menu/vertical-menu';
import { DND_DIRECTIVES }                               from '../directives/dnd/ng2-dnd';
import { Sortable }                                     from '../directives/sortable/sortable';
import { Collapse }                                     from '../directives/collapse';
import { Ng2PaginationModule }                          from '../directives/pagination/ng2-pagination';
import { FroalaEditorDirective, FroalaViewDirective }   from '../directives/froala-editor/froala.directives';
import { NKDatetimeModule }                             from '../directives/datetime/ng2-datetime.module';
import { routing }                                      from './app.routes';
import { MasterComponent }                              from './master.component';
import { HomeComponent }                                from './home.component';
import { OrderPaperDetailsComponent }                   from './orderpaper.details.component';
import { OrderPaperSectionComponent }                   from './orderpaper.section.component';
import { OrderPaperSectionSubheadingComponent }         from './orderpaper.section.subheading.component';
import { OrderPaperSectionDetailsComponent }            from './orderpaper.section.details.component';
import { OrderPaperPublishingAuditHistoryComponent }    from './orderpaper.publishing.audit.history.component';
import { ItemBillComponent }                            from './items/item.bill.component';
import { ItemLineComponent }                            from './items/item.line.component';
import { ItemReportComponent }                          from './items/item.report.component';
import { ItemMotionComponent }                          from './items/item.motion.component';
import { ItemGroupComponent }                           from './items/item.group.component';
import { ItemSubheadingComponent }                      from './items/item.subheading.component';

@NgModule({
    imports:
    [
        BrowserModule,
        HttpModule,
        FormsModule,
        Ng2PaginationModule,
        NKDatetimeModule,
        routing
    ],
    declarations:
    [
        DND_DIRECTIVES,
        Select2Component,
        Select2AjaxComponent,
        DatePickerComponent,
        MODAL_DIRECTIVES,
        ModalComponent,
        Tabs,
        Tab,
        Dragula,
        Sortable,
        Collapse,
        FroalaEditorDirective,
        VerticalMenuComponent,
        MasterComponent,
        HomeComponent,
        OrderPaperDetailsComponent,
        OrderPaperSectionComponent,
        OrderPaperSectionDetailsComponent,
        OrderPaperSectionSubheadingComponent,
        OrderPaperPublishingAuditHistoryComponent,
        ItemBillComponent,
        ItemLineComponent,
        ItemReportComponent,
        ItemMotionComponent,
        ItemGroupComponent,
        ItemSubheadingComponent
    ],
    bootstrap:
    [
        MasterComponent
    ],
    providers:
    [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        }
    ]
})
export class AppModule { }