// @ts-ignore
// import shaka from "shaka-player";
// https://cdn.jsdelivr.net/npm/shaka-player@4.6.2/dist/shaka-player.compiled.min.js

import DRMController from "@/libs/drm/DRMController";

export class ShakaPlayerController {
  private player: shaka.Player | null = null;
  private video: HTMLVideoElement | null = null;

  private licenseUri: string =
    "https://license-global.pallycon.com/ri/licenseManager.do";

  private drmController: DRMController | null = null;

  constructor() {
    this.drmController = new DRMController({ licenseUri: this.licenseUri });
  }

  public async initApp(videoElement: HTMLVideoElement): Promise<void> {
    await this.loadShakaPlayerScript();
    shaka.polyfill.installAll();

    if (shaka.Player.isBrowserSupported()) {
      await this.drmController?.init();
      this.video = videoElement;
      await this.initPlayer();
    } else {
      console.error("Browser not supported!");
    }
  }

  private async initPlayer(): Promise<void> {
    this.player = new shaka.Player(this.video as HTMLMediaElement);

    if (this.player) {
      this.player.addEventListener("error", this.onErrorEvent);
      this.drmController?.drm?.registerFilter(this.player);
      this.player.configure(this.drmController?.drm?.config as object);
    }
  }

  public async loadVideo(manifestUri: {
    hls: string;
    dash: string;
  }): Promise<void> {
    console.log("ShakaPlayerController :: loadVideo()");
    if (!this.player) {
      console.error("Player not initialized");
      return;
    }

    try {
      const streamingType = this.drmController?.streamingType || "dash";
      const uri = manifestUri[streamingType];
      await this.player.load(uri);
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

  private async loadShakaPlayerScript(): Promise<void> {
    if (typeof shaka === "undefined") {
      return new Promise((resolve, reject) => {
        const script = document.createElement("script");
        script.src =
          "https://cdn.jsdelivr.net/npm/shaka-player@4.6.2/dist/shaka-player.compiled.min.js";
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Shaka Player"));
        document.head.appendChild(script);
      });
    }
  }
}
