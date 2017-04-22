import { Component, Input, Output, EventEmitter, ElementRef, OnInit, AfterViewInit } from '@angular/core';

@Component({
    selector: 'vertical-menu',
    template: `
                <!-- Icon Library -->
                <!-- <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"> -->
                <div id="top-menu">
                  <ul>
                     <li class="active"><a href="#" target="_blank" style="text-shadow: rgba(0, 0, 0, 0.34902) 0px 1px 1px;"><span style="border-color: rgba(0, 0, 0, 0.34902);"><i class="fa fa-fw fa-home"></i> Home</span></a></li>
                     <li class="has-sub"><a style="text-shadow: rgba(0, 0, 0, 0.34902) 0px 1px 1px;"><span style="border-color: rgba(0, 0, 0, 0.34902);"><i class="fa fa-fw fa-bars"></i> Menus</span><span class="holder" style="border-color: rgba(0, 0, 0, 0.34902);"></span></a>
                        <ul style="display: none;">
                           <li class="has-sub"><a><span>Menu 1</span></a>
                              <ul style="display: none;">
                                 <li><a href="#"><span>Menu 1.1</span></a></li>
                                 <li><a href="#"><span>Menu 1.2</span></a></li>
                              </ul>
                           </li>
                           <li><a href="#"><span>Menu 2</span></a></li>
                        </ul>
                     </li>
                     <li><a href="#" style="text-shadow: rgba(0, 0, 0, 0.34902) 0px 1px 1px;"><span style="border-color: rgba(0, 0, 0, 0.34902);"><i class="fa fa-fw fa-cog"></i> Settings</span></a></li>
                     <li><a href="#" style="text-shadow: rgba(0, 0, 0, 0.34902) 0px 1px 1px;"><span style="border-color: rgba(0, 0, 0, 0.34902);"><i class="fa fa-fw fa-phone"></i> Contact</span></a></li>
                  </ul>
                </div>`,
    styles: [`
            #top-menu, #top-menu ul, #top-menu ul li, #top-menu ul li a {
                margin: 0;
                padding: 0;
                border: 0;
                list-style: none;
                line-height: 1;
                display: block;
                position: relative;
                -webkit-box-sizing: border-box;
                -moz-box-sizing: border-box;
                box-sizing: border-box;
            }
            #top-menu > ul > li > a {
                padding: 15px 20px;
                border-left: 1px solid #1b390e;
                border-right: 1px solid #1b390e;
                border-top: 1px solid #1b390e;
                cursor: pointer;
                z-index: 2;
                font-size: 14px;
                font-weight: bold;
                text-decoration: none;
                color: #ffffff;
                text-shadow: 0 1px 1px rgba(0, 0, 0, 0.35);
                background: #38761d;
                background: -webkit-linear-gradient(#38761d, #2e6218);
                background: -moz-linear-gradient(#38761d, #2e6218);
                background: -o-linear-gradient(#38761d, #2e6218);
                background: -ms-linear-gradient(#38761d, #2e6218);
                background: linear-gradient(#38761d, #2e6218);
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
            }
            #top-menu ul ul ul li:first-child > a {
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            #top-menu ul ul li:first-child > a {
                box-shadow: none;
            }
            #top-menu ul ul ul li a {
                padding-left: 30px;
            }
            #top-menu > ul > li.open > a {
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 1px rgba(0, 0, 0, 0.15);
                border-bottom: 1px solid #1b390e;
            }
            #top-menu > ul > li > a:hover, #cssmenu > ul > li.active > a, #cssmenu > ul > li.open > a {
                color: #eeeeee;
                background: #2e6218;
                background: -webkit-linear-gradient(#2e6218, #254d13);
                background: -moz-linear-gradient(#2e6218, #254d13);
                background: -o-linear-gradient(#2e6218, #254d13);
                background: -ms-linear-gradient(#2e6218, #254d13);
                background: linear-gradient(#2e6218, #254d13);
            }
            
            #top-menu ul ul li a {
                cursor: pointer;
                border-bottom: 1px solid #4d4d4d;
                border-left: 1px solid #4d4d4d;
                border-right: 1px solid #4d4d4d;
                padding: 10px 20px;
                z-index: 1;
                text-decoration: none;
                font-size: 13px;
                color: #eeeeee;
                background: #666666;
                box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.1);
            }
            #top-menu {
                width: 200px;
                font-family: Helvetica, Arial, sans-serif;
                color: #ffffff;
            }
            .holder::after {
                top: 17px;
                border-top: 2px solid #ffffff;
                border-left: 2px solid #ffffff;
            }
            .holder::before {
                top: 18px;
                border-top: 2px solid;
                border-left: 2px solid;
                border-top-color: inherit;
                border-left-color: inherit;
            }
            .holder::after, .holder::before {
                display: block;
                position: absolute;
                content: "";
                width: 6px;
                height: 6px;
                right: 20px;
                z-index: 10;
                -webkit-transform: rotate(-135deg);
                -moz-transform: rotate(-135deg);
                -ms-transform: rotate(-135deg);
                -o-transform: rotate(-135deg);
                transform: rotate(-135deg);
            }
            #top-menu ul ul li.has-sub > a::after {
                display: block;
                position: absolute;
                content: "";
                width: 5px;
                height: 5px;
                right: 20px;
                z-index: 10;
                top: 11.5px;
                border-top: 2px solid #eeeeee;
                border-left: 2px solid #eeeeee;
                -webkit-transform: rotate(-135deg);
                -moz-transform: rotate(-135deg);
                -ms-transform: rotate(-135deg);
                -o-transform: rotate(-135deg);
                transform: rotate(-135deg);
            }
            `],
    providers: []
})
export class VerticalMenuComponent implements OnInit {
    @Input()
    id: string;
    @Output()
    onValueChange = new EventEmitter<string>();

    selectedDate: string;

    ngAfterViewInit() {
        $('#top-menu li.active').addClass('open').children('ul').show();
        $('#top-menu li.has-sub>a').on('click', function () {
            $(this).removeAttr('href');
            var element = $(this).parent('li');
            if (element.hasClass('open')) {
                element.removeClass('open');
                element.find('li').removeClass('open');
                element.find('ul').slideUp();
            }
            else {
                element.addClass('open');
                element.children('ul').slideDown();
                element.siblings('li').children('ul').slideUp();
                element.siblings('li').removeClass('open');
                element.siblings('li').find('li').removeClass('open');
                element.siblings('li').find('ul').slideUp();
            }
        });

        $('#top-menu>ul>li.has-sub>a').append('<span class="holder"></span>');

        (function getColor() {
            var r, g, b;
            var textColor = $('#top-menu').css('color');
            textColor = textColor.slice(4);
            r = textColor.slice(0, textColor.indexOf(','));
            textColor = textColor.slice(textColor.indexOf(' ') + 1);
            g = textColor.slice(0, textColor.indexOf(','));
            textColor = textColor.slice(textColor.indexOf(' ') + 1);
            b = textColor.slice(0, textColor.indexOf(')'));
            var l = rgbToHsl(r, g, b);
            if (l > 0.7) {
                $('#top-menu>ul>li>a').css('text-shadow', '0 1px 1px rgba(0, 0, 0, .35)');
                $('#top-menu>ul>li>a>span').css('border-color', 'rgba(0, 0, 0, .35)');
            }
            else {
                $('#top-menu>ul>li>a').css('text-shadow', '0 1px 0 rgba(255, 255, 255, .35)');
                $('#top-menu>ul>li>a>span').css('border-color', 'rgba(255, 255, 255, .35)');
            }
        })();

        function rgbToHsl(r, g, b) {
            r /= 255, g /= 255, b /= 255;
            var max = Math.max(r, g, b), min = Math.min(r, g, b);
            var h, s, l = (max + min) / 2;

            if (max == min) {
                h = s = 0;
            }
            else {
                var d = max - min;
                s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
                switch (max) {
                    case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                    case g: h = (b - r) / d + 2; break;
                    case b: h = (r - g) / d + 4; break;
                }
                h /= 6;
            }
            return l;
        }
    }

    ngOnInit() {

    }
    constructor() {

    }
}