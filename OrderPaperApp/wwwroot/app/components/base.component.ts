/// <reference path="../../typings/spin.d.ts" />
/// <reference path="../../typings/jquery.d.ts" />
import { AfterViewInit, NgZone }    from '@angular/core';
import { ITogglable }               from '../interfaces/app.interfaces';
import { AppSettings }              from '../settings/app.settings';

export abstract class BaseComponent implements AfterViewInit, ITogglable {
    SortableListId: string;
    IsNumberedList: boolean;
    isExpand: boolean;
    private zone: NgZone;
    imagesPath: string = AppSettings.IMAGE_PATH;
    spinner: Spinner = new Spinner({ radius: 10, color: '#2ebcc5' });

    constructor() {
        this.IsNumberedList = true;
    }
    public SortableConfig() {
        var eleId = '#' + this.SortableListId;

        (($: any) => {
            var panelList = $(eleId);
            panelList.sortable({
                // Only make the .panel-heading child elements support dragging.
                // Omit this to make then entire <li>...</li> draggable.
                placeholder: "sortable-hightlight",
                handle: '.panel-heading',
                
                start: (e: any, ui: any) => {
                    //Before all other events
                    //Only occurs once each time sorting begins
                    this.zone.runOutsideAngular(() => {
                        this.zone.run(() => {
                            ui.placeholder.height(ui.item.height());
                            $(this).attr('data-previndex', ui.item.index());
                        });
                    });
                },
                activate: function (e, ui) {
                    //After the start event and before all other events
                    //Occurs once for each connected list each time sorting begins
                },
                change: function (e, ui) {
                    //After start/active but before over/sort/out events
                    //Occurs every time the item position changes
                    //Does not occur when item is outside of a connected list
                },
                over: function (e, ui) {
                    //After change but before sort/out events
                    //Occurs while the item is hovering over a connected list
                },
                sort: function (e, ui) {
                    //After over but before out event
                    //Occurs during sorting
                    //Does not matter if the item is outside of a connected list or not
                },
                out: function (e, ui) {
                    //This one is unique
                    //After sort event before all drop/ending events unless **see NOTE
                    //Occurs, only once, the moment an item leaves a connected list
                    //NOTE: Occurs again when the item is dropped/sorting stops 
                    //--> EVEN IF the item never left the list
                    //--> Called just before the stop event but after all other ending events
                },
                beforeStop: function (e, ui) {
                    //Before all other ending events: update,remove,receive,deactivate,stop
                    //Occurs only once at the last possible moment before sorting stops
                },
                remove: function (e, ui) {
                    //After beforeStop and before all other ending events
                    //Occurs only once when an item is removed from a list
                },
                receive: function (e, ui) {
                    //After remove and before all other ending events
                    //Occurs only once when an item is added to a list
                },
                update: (e: any, ui: any) => {
                    //After receive and before all other ending events
                    //Occurs when the DOM changes for each connected list
                    //This can fire twice because two lists can change (remove from one
                    //list but add to another)
                    this.zone.runOutsideAngular(() => {
                        this.zone.run(() => {
                            var updatedIndex = ui.item.index();
                            var oldIndex = $(this).attr('data-previndex');
                            this.updateSequence(oldIndex, updatedIndex);
                            $(this).removeAttr('data-previndex');

                            $('.panel', panelList).each((index: any, elem: any) => {
                                var $listItem = $(elem), newIndex = $listItem.index();
                                var motionElem = elem.children[1].childNodes[1].childNodes[0];
                                // Persist the new indices.
                            });
                        });
                    });
                },
                deactivate: function (e, ui) {
                    //After all other events but before out (kinda) and stop
                    //Occurs once for each connected list each time sorting ends
                },
                stop: function (e, ui) {
                    //After all other events
                    //Occurs only once when sorting ends
                }

            });
        })(jQuery);
    }
    ngAfterViewInit() {
        this.SortableConfig();
    }

    toggle(element: any, eleId: string) {
        element.preventDefault();

        this.isExpand = !this.isExpand;
        var eleId = "#" + eleId;
        $(eleId).slideToggle();
    }

    //toggleItemOfBusiness(e: any, id: number) {
    //    e.preventDefault();

    //    this.isExpand = !this.isExpand;
    //    var eleId = "#" + this.SortableListId;
    //    $(eleId).toggle("fade", {
    //        direction: 'up'
    //    }, 500);
    //}

    abstract updateSequence(oldIndex: number, newIndex: number) : void;
}