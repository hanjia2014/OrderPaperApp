/// <reference path="../typings/spin.d.ts" />
/// <reference path="../typings/globals/jasmine/index.d.ts" />
import { inject, TestBed, async }               from '@angular/core/testing';
import { ReflectiveInjector }                   from '@angular/core';
import { MockBackend, MockConnection }          from '@angular/http/testing';
import {
    BrowserDynamicTestingModule,
    platformBrowserDynamicTesting
}                                               from "@angular/platform-browser-dynamic/testing";
import {
    Http,
    BaseRequestOptions,
    ConnectionBackend,
    RequestOptions,
    Response,
    ResponseOptions,
    RequestMethod,
    HttpModule
}                                               from '@angular/http';
import { OrderPaperService }                    from '../app/services/app.services';
import { OrderPaperWrapper }                    from '../app/models/orderpaperwrapper';
import {
    Item,
    SubHeadingItem,
    MotionItem,
    BillItem,
    ReportItem,
    LineItem,
    GroupItem
}                                               from '../app/models/items';
import { Section }                              from '../app/models/section';
import { OrderPaper }                           from '../app/models/orderpaper';
import { OrderPaperSectionDetailsComponent }    from '../app/components/orderpaper.section.details.component';

describe('item test', () => {
    beforeEach(() => {
        // Must reset the test environment before initializing it.
        TestBed.resetTestEnvironment();

        TestBed.initTestEnvironment(BrowserDynamicTestingModule, platformBrowserDynamicTesting())
            .configureTestingModule({
            providers: [
                OrderPaperService,
                Section,
                MockBackend,
                BaseRequestOptions,
                { provide: ConnectionBackend, useClass: MockBackend },
                { provide: RequestOptions, useClass: BaseRequestOptions },
                Http
            ],
            imports: [
                HttpModule
            ],
        });
    });
    

    it('should create bill item', async(inject([Section], (section: Section) => {
        section.Items.push(new BillItem());
        expect(section.Items[0].Type).toEqual("Bill");
    })));

    it('should create motion item', async(inject([Section], (section: Section) => {
        section.Items.push(new MotionItem());
        expect(section.Items[0].Type).toEqual("Motion");
    })));

    it('should create report item', async(inject([Section], (section: Section) => {
        section.Items.push(new ReportItem());
        expect(section.Items[0].Type).toEqual("Report");
    })));

    it('should create line item', async(inject([Section], (section: Section) => {
        section.Items.push(new LineItem());
        expect(section.Items[0].Type).toEqual("Line");
    })));

});