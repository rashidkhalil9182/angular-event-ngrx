import { Component } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-and-ngrx-demo-app';
  private routeData;
  // title= '';
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }
  ngOnInit() {
    this.router.events.subscribe((data) => {
      if (data instanceof RoutesRecognized) {
        this.routeData = data.state.root.firstChild.data;
        console.log("AppComponent -> ngOnInit -> this.routeData", this.routeData);
        this.title = this.routeData.title;
      }
    });

  }
}
