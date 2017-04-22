import { ConfigurationItem } from '../models/configurationitem';

export class AppConstants {
    public static get PROGRESS_PREVIEW(): string { return 'Preview'; }
    public static get PROGRESS_WORD(): string { return 'Word'; }
    public static get PROGRESS_PUBLISH(): string { return 'Publish'; }
    public static get PROGRESS_PRINT(): string { return 'Print'; }
    public static CPD_DATA_URL: string; 
    public static CONFIGURATION_LIST: Array<ConfigurationItem>;
    public static get COL_NUMBER(): string { return 'Number'; }
    public static get COL_DAY(): string { return 'Day'; }
    public static get COL_STATUS(): string { return 'Status'; }
}