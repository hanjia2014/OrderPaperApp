export class CpdBillItem {
    business_item_id: number;
    business_item_title: string;
    short_title: string;
    bill_number: string;
    member_original_name: string;
}

export class CpdMotionItem {
    business_item_id: number;
    business_item_title: string;
    title: string;
    motion: string;
    member: string;
    date: string;
}

export class CpdReportItem {
    business_item_id: number;
    business_item_title: string;
    title: string;
    shoulder: string;
    committee: string;
    latestEvent: string;
    government_response: string;
}

export class Item {
    BusinessItemId: number;
    Sequence: number;
    Type: string;
    Title: string;
    IsGrouppedItem: boolean;
    HasLine: boolean;
    IsNew: boolean;
    IsBusinessItem: boolean;
    Details: string;
    CpdTitle: string;
    constructor() {
        this.IsNew = true;
        this.Title = "Untitled";
    }
}

export class SubHeadingItem extends Item {
    FullLine: string;
    Col1a: string;
    Col2a: string;
    Col3a: string;
    Col4a: string;
    Col1b: string;
    Col2b: string;
    Col3b: string;
    Col4b: string;
    constructor() {
        super();
        this.Type = "Subheading";
        this.Title = "Sub heading";
    }
}

export class MotionItem extends Item {
    Date: string;
    Member: string;
    Speeches: string;
    Motion: string;
    CpdDate: string;
    CpdMotion: string;
    CpdMember: string;
    PrintSequence: number;
    constructor() {
        super();
        this.Type = "Motion";
        this.IsBusinessItem = true;
    }
}

export class BillItem extends Item {
    Number: string;
    Member: string;
    Stage: string;
    IsCurrentSittingWeek: boolean;
    IsFollowingSittingWeek: boolean;
    IsMajorityAmendments: boolean;
    IsConsiderationItem: boolean;
    IsBlank: boolean;
    Indication: string;
    Speeches: string;
    LatestEvent: string;
    CpdNumber: string;
    CpdMember: string;
    DocumentId: string;
    Url: string;
    constructor() {
        super();
        this.Type = "Bill";
        this.IsBusinessItem = true;
    }
}

export class ReportItem extends Item {
    Shoulder: string;
    Committee: string;
    LatestEvent: string;
    Speeches: string;
    GovernmentResponse: string;
    CpdShoulder: string;
    CpdCommittee: string;
    CpdLatestEvent: string;
    CpdGovernmentResponse: string;
    constructor() {
        super();
        this.Type = "Report";
        this.IsBusinessItem = true;
    }
}

export class LineItem extends Item {
    constructor() {
        super();
        this.Type = "Line";
        this.IsNew = false;
    }
}

export class GroupItem extends Item {
    From: number;
    To: number;
    Items: Array<Item>;
    constructor() {
        super();
        this.Items = new Array<Item>();
        this.Type = "Group";
    }
}