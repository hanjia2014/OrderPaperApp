export class AppSettings {
    public static sp_host: string;
    public static get API_ENDPOINT(): string { return '/api/orderpaper'; }
    public static get API_SECTION_ENDPOINT(): string { return '/api/section'; }
    public static get API_CONFIGURATION_ENDPOINT(): string { return '/api/configuration'; }
    public static get API_CPDDATAACCESS_ENDPOINT(): string { return '/api/cpddataaccess'; }
    public static get API_CPDBILLACCESS_ENDPOINT(): string { return '/api/cpdbillaccess'; }
    public static get API_CPDMOTIONACCESS_ENDPOINT(): string { return '/api/cpdmotionaccess'; }
    public static get API_CPDREPORTACCESS_ENDPOINT(): string { return '/api/cpdreportaccess'; }
    public static get API_EMAIL_ENDPOINT(): string { return '/api/email'; }
    public static get API_WORDCONVERTER_ENDPOINT(): string { return '/api/wordconverter'; }
    public static get IMAGE_PATH(): string { return 'content/images/icons/'; }
    public static get SP_HOST(): string { return this.sp_host; }
    public static set SP_HOST(value: string) { this.sp_host = value; }
}