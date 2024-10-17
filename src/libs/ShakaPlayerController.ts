// @ts-ignore
import shaka from "shaka-player";

export class ShakaPlayerController {
  private player: spoonShaka.Player | null = null;
  private video: HTMLVideoElement | null = null;

  constructor() {
    console.log("ShakaPlayerController :: constructor()");
  }

  public async initApp(videoElement: HTMLVideoElement): Promise<void> {
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
      this.video = videoElement;
      await this.initPlayer();
    } else {
      console.error("Browser not supported!");
    }
  }

  private async initPlayer(): Promise<void> {
    this.player = new shaka.Player(this.video as HTMLMediaElement);
    if (this.player) {
      await this.player.attach(this.video as HTMLMediaElement);

      // Listen for error events.
      this.player.addEventListener("error", this.onErrorEvent);
    }
  }

  public async loadVideo(manifestUri: string): Promise<void> {
    if (!this.player) {
      console.error("Player not initialized");
      return;
    }

    try {
      await this.player.load(manifestUri);
      console.log("The video has now been loaded!");
    } catch (e) {
      this.onError(e);
    }
  }

  public async detach(): Promise<void> {
    if (this.player) {
      await this.player.detach();
      this.player = null;
    }
  }

  private onErrorEvent(event: any): void {
    this.onError(event.detail);
  }

  private onError(error: any): void {
    console.error("Error code", error.code, "object", error);
  }
}
