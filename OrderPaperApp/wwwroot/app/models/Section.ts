import { Item, GroupItem } from './Items';

export class Section {
    IsFrontPage: boolean;
    IsIncluded: boolean;
    Id: string;
    Name: string;
    Items: Array<Item>;
    Groups: Array<Array<Item>>;
    GroupItems: Array<GroupItem>;
    SubHeading: string;
    Details: string;
    Speeches: string;
    Subheading: Subheading;
    HideSequenceNumber: boolean;
    TitleEditingAllowed: boolean;
    constructor() {
        this.Items = new Array<Item>();
        this.Groups = new Array<Array<Item>>();
        this.GroupItems = new Array<GroupItem>();
        this.Subheading = new Subheading();
    }
}

export class SectionSummary {
    Id: number;
    Text: string;
}

export class Subheading {
    FullLine: string;
    Col1a: string;
    Col2a: string;
    Col3a: string;
    Col4a: string;
    Col1b: string;
    Col2b: string;
    Col3b: string;
    Col4b: string;
}