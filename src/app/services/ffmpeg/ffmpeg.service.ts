import {Injectable} from '@angular/core';
import {createFFmpeg, fetchFile} from "@ffmpeg/ffmpeg";

@Injectable({
  providedIn: 'root'
})
export class FfmpegService {

  isRunning: boolean = false;
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

    this.isRunning = true;

    if (!this.isReady) {
      await this.init();
    }

    const data = await fetchFile(file);
    this.ffmpeg.FS('writeFile', file.name, data);

    const seconds = [1, 2, 3, 4, 5]
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

    let screenshots: string[] = []

    seconds.forEach(second => {
      const screenshotFile = this.ffmpeg.FS('readFile', `output_0${second}.png`)
      const screenshotBlob = new Blob(
        [screenshotFile.buffer],
        {
          type: 'image/png'
        }
      )
      const screenshotUrl = URL.createObjectURL(screenshotBlob)

      screenshots.push(screenshotUrl)
    })

    this.isRunning = false;

    return screenshots;

  }

  async blobFromUrl(url: string) {
    const response = await fetch(url);
    return await response.blob();
  }
}

