import { Status }                                   from './constants';
import { Item, MotionItem, BillItem, ReportItem }   from './Items';
import { Section }                                  from './Section';
import { AuditHistory }                             from './audithistory';
import { AppConstants }                             from '../settings/app.constants';

export class OrderPaper {
    Id: number;
    SittingDay: string;
    Status: string;
    Number: number;
    Version: number;
    SittingHours: string;
    Sections: Array<Section>;
    Progress: string;
    PublishingProgress: Array<string>;
    AuditHistoryList: Array<AuditHistory>;
    WordUrl: string;
    PdfUrl: string;
    hasFreetextSittingHours: boolean;

    constructor() {
        this.Sections = new Array<Section>();
        this.PublishingProgress = new Array<string>();
        this.AuditHistoryList = new Array<AuditHistory>();
        this.hasFreetextSittingHours = false;
    }

    public containPreview = (): boolean => {
        return this.PublishingProgress.indexOf(AppConstants.PROGRESS_PREVIEW) >= 0;
    }

    public containWord = (): boolean => {
        return this.PublishingProgress.indexOf(AppConstants.PROGRESS_WORD) >= 0;
    }

    public containPublish = (): boolean => {
        return this.PublishingProgress.indexOf(AppConstants.PROGRESS_PUBLISH) >= 0;
    }

    public containPrint = (): boolean => {
        return this.PublishingProgress.indexOf(AppConstants.PROGRESS_PRINT) >= 0;
    }
}