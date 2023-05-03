import {Injectable} from '@angular/core';
import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {

  isReady: boolean = false;
  private ffmpeg;

  constructor() {
    // create a new ffmpeg instance (this is a function from the ffmpeg library) and store it in the ffmpeg variable
    this.ffmpeg = createFFmpeg({
      log: true   // enable logging (this is optional) for debugging purposes (this will log to the console)
    })
  }

  async init() {
    if (this.isReady) {
      return;
    }
    await this.ffmpeg.load();
    this.isReady = true;
  }

  async getScreenShots(file: File) {
    if (!this.isReady) {
      await this.init(); // if ffmpeg is not ready, wait for it to be ready before we use it (this is an async function so we need to await it)
    }

    const data = await fetchFile(file); // create a file-like object from the file that we can use with ffmpeg
    // FS is a virtual file system that ffmpeg uses, we need to write the file to the virtual file system before we can use it with ffmpeg
    this.ffmpeg.FS('writeFile', file.name, data);

    /*
    *  ffmpeg command to get screenshots from a video
    * -i tell FFmpeg grab a specific file from file system
    *
    * */

    await this.ffmpeg.run(
      // Input
      '-i', file.name, // must correspond to the file name we used when we wrote the file to the virtual file system
      // Output options
      '-ss', '00:00:01', // start time
      '-frames:v', '1', // number of frames to output (1 in this case) (v stands for video) (this is optional, if you don't specify this, ffmpeg will output 25 frames by default)
      '-filter:v', 'scale=510:-1', // scale the image to 320px wide (the height will be calculated automatically to preserve the aspect ratio)
      // Output
      'output_01.png' // output file name (this will be written to the virtual file system)


    )

  }
}

