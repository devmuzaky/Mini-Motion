import {Component} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent {

  videoOrder = '1';
  constructor(
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.route.queryParams.subscribe((params: Params) => {
      // this.videoOrder = params['sort'] === '2' ? '1' : '0';
      this.videoOrder =  params['sort'] === '2' ? params['sort'] : '1';
    })
  }

  sortVideos($event: Event) {
    $event.preventDefault();
    const {value} = $event.target as HTMLSelectElement;

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        sort: value
      }
    })


  }
}
