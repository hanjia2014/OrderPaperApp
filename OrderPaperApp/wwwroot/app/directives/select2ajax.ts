/// <reference path="../../typings/select2.d.ts" />
import { Component, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit, SimpleChanges } from '@angular/core';
import { AppSettings }                                                                              from '../settings/app.settings';
@Component({
    selector: 'select2-ajax',
    template: `{{label}} <input id="{{id}}" [style.width]= "width" class="{{cssClass=='' ? '' : cssClass}}" />`,
    styles: [],
    providers: []
})
export class Select2AjaxComponent implements AfterViewInit {
    @Input()
    multiple: boolean;
    @Input()
    data: any;
    @Input()
    id: string;
    @Input()
    enableSearch: boolean;
    @Input()
    placeholder: string;
    @Input()
    allowFreeText: boolean;
    @Input()
    disableMultipleSelection: boolean;
    @Input()
    initialValue: string;
    @Input()
    cssClass: string;
    @Input()
    width: string;
    @Input()
    label: string;
    @Input()
    checkNumber: number;
    @Input()
    checkOperation: string;
    @Input()
    checkEmpty: boolean;
    @Input()
    checkEmptyEleId: string;
    @Input()
    apiUrl: string;

    operation_greater: string = "Greater";
    operation_less: string = "Less";

    @Output() selected = new EventEmitter();

    ngAfterViewInit() {
        var options = {
            placeholder: this.initialValue != null && this.initialValue != "" ? "" : this.placeholder ? this.placeholder : "Select",
            allowClear: true,
            ajax: {
                //url: this.apiUrl,
                url: this.apiUrl + '/' + AppSettings.SP_HOST,
                dataType: 'json',
                delay: 250,
                data: function (params) {
                    return {
                        title: params, // search term
                        page: params.page
                    };
                },
                results: function (data) {
                    var myResults = [];
                    $.each(data, function (index, item) {
                        myResults.push({
                            'id': item.business_item_id,
                            'text': item.title
                        });
                    });
                    return {
                        results: myResults
                    };
                },
                processResults: function (data, params) {
                    // parse the results into the format expected by Select2
                    // since we are using custom formatting functions we do not need to
                    // alter the remote JSON data, except to indicate that infinite
                    // scrolling can be used
                    params.page = params.page || 1;

                    return {
                        results: data.items,
                        pagination: {
                            more: (params.page * 30) < data.total_count
                        }
                    };
                },
                cache: true
            },
            escapeMarkup: function (markup) { return markup; }, // let our custom formatter work
            minimumInputLength: 5,
        };

        if (this.enableSearch == false) {
            options['minimumResultsForSearch'] = -1;
        }

        $("#" + this.id).select2(options).on("change", (e: any) => {
            if (e.val == null && this.initialValue != null && this.initialValue != "")
                this.selected.next(this.initialValue);
            else if (this.checkNumber != null) {
                var num_value = Number(e.val);
                if (this.checkOperation == this.operation_greater) {
                    if (num_value >= this.checkNumber) {
                        this.selected.next(e.val);
                    } else {
                        $("#" + this.id).select2('val', '');
                        this.selected.next('invalid');
                    }
                }
                else if (this.checkOperation == this.operation_less) {
                    if (num_value <= this.checkNumber) {
                        this.selected.next(e.val);
                    } else {
                        $("#" + this.id).select2('val', '');
                        this.selected.next('invalid');
                    }
                }
            }
            else {
                this.selected.next(e.val);
            }

            if (this.checkEmpty) {
                var ulElement = $(this.checkEmptyEleId).find('.select2-choices');
                if (ulElement != null) {
                    if (e.val == null || e.val == '') {
                        ulElement.addClass('has-error');
                    } else {
                        ulElement.removeClass('has-error');
                    }
                }
            }

        });

        if (this.disableMultipleSelection) {
            $("#" + this.id).select2(options).on("select2-opening", (e: any) => {
                if ($("#" + this.id).select2('val').length > 0) {
                    e.preventDefault();
                }
            });
        }

        if (this.initialValue != null && this.initialValue != "") {
            if (this.multiple) {
                var elem = $("#" + this.id);
                elem.data().select2.updateSelection([{ id: this.initialValue, text: this.initialValue}]);
            } else {
                $("#" + this.id).val(this.initialValue).trigger("change");
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['initialValue'] != null && changes['initialValue'].currentValue == undefined) {
            $("#" + this.id).select2('val', '');
        }
        else if (changes['initialValue'] != null && changes['initialValue'].currentValue != undefined) {
            if (this.multiple) {
                if (this.disableMultipleSelection) {

                }
            }
            else {
                $("#" + this.id).select2('val', changes['initialValue'].currentValue);
            }
        }
    }

    constructor() {
        
    }
}