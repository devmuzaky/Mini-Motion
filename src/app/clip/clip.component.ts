import {Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import videojs from "video.js";
import IClip from "../models/iclip";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.scss'],
  providers: [
    DatePipe
  ],
  encapsulation: ViewEncapsulation.None
})
export class ClipComponent implements OnInit {

  id: string = '';

  @ViewChild('videoPlayer', {static: true}) target?: ElementRef
  player!: videojs.Player;
  clip?: IClip

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    this.player = videojs(this.target?.nativeElement)

    this.route.data.subscribe(data => {
      this.clip = data['clip'] as IClip

      this.player?.src({
        src: this.clip.url,
        type: 'video/mp4'
      })
    })
  }

}
