/// <reference path="../../typings/core-js.d.ts" />
import { Injectable }                               from '@angular/core';
import { Http, Response, Headers, RequestOptions }  from '@angular/http';
import { Observable }                               from 'rxjs/Observable';
import { OrderPaper }                               from '../models/orderpaper';
import { OrderPaperWrapper }                        from '../models/orderpaperwrapper';
import { Section, SectionSummary }                  from '../models/section';
import {
    CpdBillItem,
    CpdMotionItem,
    CpdReportItem
}                                                   from '../models/items';
import { WasResponse }                              from '../models/wasresponse';
import { ConfigurationItem }                        from '../models/configurationitem';
import {
    IOrderPaperService,
    ISectionService,
    IConfigurationService,
    ICpdService,
    IWordConvertService,
    IPdfGenerationService,
    IEmailService,
    IPublishService
}                                                   from '../interfaces/app.interfaces';
import { AppSettings }                              from '../settings/app.settings';
import { AppConstants }                             from '../settings/app.constants';
import 'rxjs/Rx';
import 'rxjs/add/operator/map';

@Injectable()
export class OrderPaperService implements IOrderPaperService, ISectionService, IConfigurationService, ICpdService, IWordConvertService, IPdfGenerationService, IEmailService, IPublishService {

    constructor(private http: Http) {

    }

    //IOrderPaperService
    getOrderPaperList = (): Observable<Array<OrderPaperWrapper>> => {
        return this.http.get(AppSettings.API_ENDPOINT + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getOrderPaper = (id: string): Observable<OrderPaperWrapper> => {
        return this.http.get(AppSettings.API_ENDPOINT + '/' + id + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    delete = (id: string): Observable<boolean> => {
        return this.http.delete(AppSettings.API_ENDPOINT + '/' + id + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                return false;
            } else {
                return true;
            }
        });
    }

    save(orderPaper: OrderPaper): Observable<OrderPaperWrapper> {
        var body = JSON.stringify({ name: "AA" });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let wrapper = new OrderPaperWrapper();
        wrapper.Id = orderPaper.Id;
        wrapper.Number = orderPaper.Number;
        wrapper.SittingDay = orderPaper.SittingDay;
        wrapper.Status = orderPaper.Status;
        wrapper.OrderPaperJson = JSON.stringify(orderPaper);

        return this.http.post(AppSettings.API_ENDPOINT + AppSettings.SP_HOST, wrapper, options).map((res: Response) => {
            //OK or CREATED
            if (res.status != 200 && res.status != 201) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                var result = res.json();
                return res.json();
            }
        })
    }

    update(orderPaper: OrderPaper): Observable<Response> {
        var body = JSON.stringify({ name: "AA" });
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        let wrapper = new OrderPaperWrapper();
        wrapper.Id = orderPaper.Id;
        wrapper.Number = orderPaper.Number;
        wrapper.SittingDay = orderPaper.SittingDay;
        wrapper.Status = orderPaper.Status;
        wrapper.Version = orderPaper.Version;
        wrapper.OrderPaperJson = JSON.stringify(orderPaper);

        return this.http.put(AppSettings.API_ENDPOINT + '/' + orderPaper.Id + AppSettings.SP_HOST, wrapper, options).map((res: Response) => {
            //OK or CREATED
            if (res.status != 200 && res.status != 201) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                var result = res.json();
                return res.json();
            }
        })
    }

    //ISectionService
    getSectionSummaryList = (): Observable<Array<SectionSummary>> => {
        return this.http.get(AppSettings.API_SECTION_ENDPOINT + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getSectionDetails = (id: string): Observable<any> => {
        return this.http.get(AppSettings.API_SECTION_ENDPOINT + '/' + id + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    //IConfigurationService
    getConfigurationList = (): Observable<Array<ConfigurationItem>> => {
        return this.http.get(AppSettings.API_CONFIGURATION_ENDPOINT + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    //ICpdService
    getReports = (): Observable<Array<CpdReportItem>> => {
        return this.http.get(AppSettings.API_CPDDATAACCESS_ENDPOINT + '/?type=report&' + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getReport = (id: string): Observable<CpdReportItem> => {
        return this.http.get(AppSettings.API_CPDREPORTACCESS_ENDPOINT + '/' + AppSettings.SP_HOST + '&id=' + id).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getMotions = (): Observable<Array<CpdMotionItem>> => {
        return this.http.get(AppSettings.API_CPDDATAACCESS_ENDPOINT + '/?type=motion&' + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getMotion = (id: string): Observable<CpdMotionItem> => {
        return this.http.get(AppSettings.API_CPDMOTIONACCESS_ENDPOINT + '/' + AppSettings.SP_HOST + '&id=' + id).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getBills = (): Observable<Array<CpdBillItem>> => {
        return this.http.get(AppSettings.API_CPDDATAACCESS_ENDPOINT + '/' + AppSettings.SP_HOST + '&type=bill').map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getBill = (id: string): Observable<any> => {
        return this.http.get(AppSettings.API_CPDBILLACCESS_ENDPOINT + '/' + AppSettings.SP_HOST + '&id=' + id).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    //IWordConvertService
    generateWord = (id: number): Observable<string> => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(AppSettings.API_WORDCONVERTER_ENDPOINT + AppSettings.SP_HOST, id, options).map((res: Response) => {
            if (res.status != 201) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    getWordUrl = (id: number): Observable<string> => {
        return this.http.get(AppSettings.API_WORDCONVERTER_ENDPOINT + '/?id=' + id + '&' + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 201) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    //IPdfGenerationService
    generatePdf = (itemId: string): Observable<WasResponse> => {
        var siteUrl = '';
        var listId = '';
        var serviceUrl = '';
        AppConstants.CONFIGURATION_LIST.forEach((item: ConfigurationItem) => {
            if (item.Key == "PDF Generation Service")
                serviceUrl = item.Value;
            if (item.Key == "Conversion Site Url")
                siteUrl = item.Value;
            if (item.Key == "Conversion List Url")
                listId = item.Value;
        });

        return this.http.get(serviceUrl + "?SiteUrl=" + siteUrl + "&ListId=" + listId + "&ItemId=" + itemId).map((res: Response) => {
            if (res.status != 200) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    //email service
    send = (Id: number): Observable<any> => {
        return this.http.get(AppSettings.API_EMAIL_ENDPOINT + '/' + Id + AppSettings.SP_HOST).map((res: Response) => {
            if (res.status != 201) {
                throw new Error('No objects to retrieve! code status ' + res.status);
            } else {
                return res.json();
            }
        });
    }

    openEmailClient = (orderPaper: OrderPaper) => {
        var emailTo = '';
        var emailCc = '';
        var urlPrefix = "";
        var date = orderPaper.SittingDay;
        var status = orderPaper.Status;
        var fileName = orderPaper.PdfUrl;
        var digitDate = '';
        var fileNamePart = '';

        AppConstants.CONFIGURATION_LIST.forEach((item: ConfigurationItem) => {
            if (item.Key == "Publish Email To")
                emailTo = item.Value;
            if (item.Key == "Publish Email CC")
                emailCc = item.Value;
            if (item.Key == "PDF Static Email Url")
                urlPrefix = item.Value;
        });
        
        var sittingDate = new Date(date.replace("-", " "));
        var digitMonth = sittingDate.getMonth() + 1;
        var fullmonth = digitMonth > 9 ? digitMonth : "0" + digitMonth;
        var theDate = ("0" + sittingDate.getDate()).slice(-2);
        digitDate = sittingDate.getFullYear() + '' + fullmonth + '' + theDate;
        
        var monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

        var day = days[sittingDate.getDay()];
        var month = monthNames[sittingDate.getMonth()];
        var year = sittingDate.getFullYear();
        var displayDay = day + ", " + theDate + " " + month + " " + year;
        var subject = status + " Order Paper for " + displayDay;
        fileNamePart = digitDate + "/" + orderPaper.Status.toLowerCase() + "-order-paper-for-" + day.toLowerCase() + "-" + theDate + "-" + month.toLowerCase() + "-" + year;
        var fullPdfUrl = urlPrefix + fileNamePart;

        var link = "mailto:" + emailTo
            + "?cc=" + emailCc
            + "&subject=" + subject
            + "&body="
            + "Please access the following link to the PDF for the " + subject + "%0D%0A"
            + fullPdfUrl + "%0D%0A"
            //+ "http%3A%2F%2Fwww.example.com%2Ffoo.php%3Fthis%3Da%26join%3Dabc%26user454"
            ;

        window.location.href = link;
    }
    //publish service
    publish = (id: number): Observable<any> => {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        var serviceUrl;
        AppConstants.CONFIGURATION_LIST.forEach((item: ConfigurationItem) => {
            if (item.Key == "Publication Web Service")
                serviceUrl = item.Value;
        });

        return this.http.post(serviceUrl + '?opId=' + id, null).map((res: Response) => {
            //OK or CREATED
            if (res.status != 200 && res.status != 201) {
                throw new Error('publish failed: ' + res.status);
            } else {
                return res;
            }
        })
    }

    private extractData(res: Response) {
        let body = res.json();
        return body.data || {};
    }
    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }
}