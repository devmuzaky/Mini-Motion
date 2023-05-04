import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {BehaviorSubject} from "rxjs";
import IClip from "../../models/iclip";
import {ClipService} from "../../services/clip/clip.service";
import {ModalService} from "../../services/modal/modal.service";

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  videoOrder = '1';

  sort$: BehaviorSubject<string>;

  clips: IClip[] = []; // this is an array of clips that we will display in the template

  activeClip: IClip | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private clipService: ClipService,
    private modal: ModalService
  ) {
    this.sort$ = new BehaviorSubject<string>(this.videoOrder);
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: Params) => {
      this.videoOrder = params['sort'] === '2' ? params['sort'] : '1';
      this.sort$.next(this.videoOrder);
    })

    this.clipService.getUserClips(this.sort$).subscribe(docs => {
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

  openModal($event: MouseEvent, clip: IClip) {
    $event.preventDefault();

    this.activeClip = clip;

    this.modal.toggleModal('editClip');
  }

  update($event: IClip) {
    this.clips.forEach(
      (clip, index) => {
        if (clip.docID === $event.docID) {
          this.clips[index].title = $event.title;
        }
      }
    )
  }


  deleteClip($event: Event, clip: IClip) {
    $event.preventDefault();

    this.clipService.deleteClip(clip);

    this.clips.forEach(
      (ele, index) => {
        if (ele.docID === clip.docID) {
          this.clips.splice(index, 1);
        }
      }
    )

  }


  async copyToClipboard($event: MouseEvent, docID: string | undefined) {
    $event.preventDefault();

    if (!docID) {
      return;
    }

    const url = `${location.origin}/clip/${docID}`;

    await navigator.clipboard.writeText(url);

    alert('Copied to clipboard');

  }
}
