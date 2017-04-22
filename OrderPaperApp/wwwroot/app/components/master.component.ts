import { Component, OnInit }    from '@angular/core';
import { Router }               from '@angular/router';

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>
                `,
    styles: [],
    providers: []
})
export class MasterComponent implements OnInit {
    constructor(private router: Router) {

    }
    ngOnInit() {
        this.router.navigate(['/home']);
    }
}