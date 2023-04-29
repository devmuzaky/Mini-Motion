import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import firebase from "firebase/compat";
import IClip from "../../models/iclip";
import {ClipService} from "../../services/clip/clip.service";
import QueryDocumentSnapshot = firebase.firestore.QueryDocumentSnapshot;

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  videoOrder = '1';

  clips: IClip[] = []; // this is an array of clips that we will display in the template

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService
  ) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      // this.videoOrder = params['sort'] === '2' ? '1' : '0';
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1';
    })

    this.clipService.getUserClips().subscribe(docs => {
      this.clips = [];
      docs.forEach(doc => {
        this.clips.push({
          docID: doc.id,
          ...doc.data()
        } as IClip);
      });
    });

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
