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
      await this.init();
    }

    const data = await fetchFile(file);
    this.ffmpeg.FS('writeFile', file.name, data);

    const seconds = [1, 2, 3]
    const commands: string [] = []

    seconds.forEach(second => {
      commands.push(
        '-ss', `00:00:0${second}`,
        '-frames:v', '1',
        '-filter:v', 'scale=510:-1',
        `output_0${second}.png`
      )
    })

    await this.ffmpeg.run(
      '-i', file.name,
      ...commands
    )

  }
}

