import { Observable }               from 'rxjs/Observable';
import { Response }                 from '@angular/http';
import { OrderPaperWrapper }        from '../models/orderpaperwrapper';
import { OrderPaper }               from '../models/orderpaper';
import { Section, SectionSummary }  from '../models/section';
import { WasResponse }              from '../models/wasresponse';
import {
    CpdBillItem,
    CpdMotionItem,
    CpdReportItem
}                                   from '../models/items';
import { ConfigurationItem }        from '../models/configurationitem';

export interface ITogglable {
    toggle: (element: any, eleId: string) => void;
}

export interface IOrderPaperService {
    getOrderPaperList: () => Observable<OrderPaperWrapper[]>;
    getOrderPaper: (id: string) => Observable<OrderPaperWrapper>;
    save: (orderPaper: OrderPaper) => Observable<OrderPaperWrapper>;
    update: (orderPaper: OrderPaper) => Observable<Response>;
    delete: (id: string) => Observable<boolean>;
}

export interface ISectionService {
    getSectionSummaryList: () => Observable<SectionSummary[]>;
    getSectionDetails: (id: string) => Observable<Section>;
}

export interface IConfigurationService {
    getConfigurationList: () => Observable<Array<ConfigurationItem>>;
}

export interface ICpdService {
    getReports: (apiUrl: string) => Observable<Array<CpdReportItem>>;
    getReport: (apiUrl: string) => Observable<CpdReportItem>;
    getMotions: (apiUrl: string) => Observable<Array<CpdMotionItem>>;
    getMotion: (apiUrl: string) => Observable<CpdMotionItem>;
    getBills: (apiUrl: string) => Observable<Array<CpdBillItem>>;
    getBill: (apiUrl: string, id: string) => Observable<any>;
}

export interface IWordConvertService {
    generateWord: (id: number) => Observable<string>;
    getWordUrl: (id: number) => Observable<string>;
}

export interface IPdfGenerationService {
    generatePdf: (itemId: string) => Observable<WasResponse>;
}

export interface IEmailService {
    send: (Id: number) => Observable<any>;
    openEmailClient: (orderPaper: OrderPaper) => void;
}

export interface IPublishService {
    publish: (id: number) => Observable<any>;
}