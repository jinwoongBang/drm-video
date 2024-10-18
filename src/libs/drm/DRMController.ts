import { DRM, DRMType } from "@/libs/drm/DRM";
import WidevineDRM from "@/libs/drm/WidevineDRM";
import PlayReadyDRM from "@/libs/drm/PlayReadyDRM";
import FairPlayDRM from "@/libs/drm/FairPlayDRM";

export const SupportedDRMConfig = [
  {
    initDataTypes: ["cenc"],
    audioCapabilities: [
      {
        contentType: 'audio/mp4;codecs="mp4a.40.2"',
      },
    ],
    videoCapabilities: [
      {
        contentType: 'video/mp4;codecs="avc1.42E01E"',
      },
    ],
  },
];

const DRMInfo: Record<DRMType, { name: DRMType; mediaKey: string }> = {
  Widevine: {
    name: "Widevine",
    mediaKey: "com.widevine.alpha",
  },
  PlayReady: {
    name: "PlayReady",
    mediaKey: "com.microsoft.playready",
  },
  FairPlay: {
    name: "FairPlay",
    mediaKey: "com.apple.fps.1_0",
  },
};

interface DRMControllerInterface {
  drmType: DRMType | "Not Supported";
  drm: DRM | null;

  licenseUri: string;

  supportSl3000: boolean;

  getSupportedDRM: () => Promise<string>;
}
class DRMController implements DRMControllerInterface {
  drmType: DRMType | "Not Supported" = "Not Supported";
  drm: DRM | null = null;
  streamingType: "dash" | "hls" = "dash";

  licenseUri: string;
  supportSl3000: boolean = false;

  constructor({ licenseUri }: { licenseUri: string }) {
    console.log("DRMController :: constructor()", { licenseUri });
    this.licenseUri = licenseUri;
  }

  async init() {
    this.drmType = await this.getSupportedDRM();

    if (this.drmType === "Not Supported") {
      throw new Error("DRM is not supported");
    }

    switch (this.drmType) {
      case "Widevine":
        this.drm = new WidevineDRM({ licenseUri: this.licenseUri });
        this.streamingType = "dash";
        break;
      case "PlayReady":
        this.drm = new PlayReadyDRM({ licenseUri: this.licenseUri });
        this.streamingType = "dash";
        break;
      case "FairPlay":
        this.drm = new FairPlayDRM({ licenseUri: this.licenseUri });
        this.streamingType = "hls";
        break;
    }

    await this.drm?.init();
  }

  async getSupportedDRM() {
    let supportedDRMType: DRMType | "Not Supported" = "Not Supported";

    for (const key in DRMInfo) {
      try {
        const drm = DRMInfo[key as DRMType];
        const mediaKeySystemAccess =
          await navigator.requestMediaKeySystemAccess(
            drm.mediaKey,
            SupportedDRMConfig
          );

        supportedDRMType = drm.name;
        console.debug(key + " :: support ok");
      } catch (e) {
        console.error(key + " :: " + e);
      }
    }

    return supportedDRMType;
  }
}

export default DRMController;
