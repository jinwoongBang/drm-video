import { DRM, DRMType } from "@/libs/drm/DRM";
import { SupportedDRMConfig } from "@/libs/drm/DRMController";

type PlayReadyConfig = {
  drm: {
    servers: {
      "com.microsoft.playready": string | null;
    };
    preferredKeySystems?: string[];
    keySystemsMapping?: Record<string, string>;
  };
  streaming: {
    autoLowLatencyMode: boolean;
  };
};

class PlayReadyDRM implements DRM {
  drmType: DRMType = "PlayReady";

  licenseUri: string;
  token =
    "eyJrZXlfcm90YXRpb24iOmZhbHNlLCJyZXNwb25zZV9mb3JtYXQiOiJvcmlnaW5hbCIsInVzZXJfaWQiOiJ0ZXN0LXVzZXIiLCJkcm1fdHlwZSI6IlBsYXlSZWFkeSIsInNpdGVfaWQiOiJERU1PIiwiaGFzaCI6IllDRjViUE9UVHFjZWZDUnlBQks3Rnl0V21mNUJ0T3RhcGo4dVI0QXc2S1E9IiwiY2lkIjoiYmlnYnVja2J1bm55IiwicG9saWN5IjoibjV4Mjh1WW1EZFBDRmltb00zbkdOdz09IiwidGltZXN0YW1wIjoiMjAyMS0wMS0wNlQwOToyNDowN1oifQ==";
  supportSl3000 = false;

  config: PlayReadyConfig = {
    drm: {
      servers: {
        "com.microsoft.playready": null,
      },
    },
    streaming: {
      autoLowLatencyMode: true,
    },
  };

  constructor({ licenseUri }: { licenseUri: string }) {
    this.licenseUri = licenseUri;
  }

  async init() {
    this.config.drm.servers["com.microsoft.playready"] = this.licenseUri;
    try {
      await navigator
        // @ts-ignore
        .requestMediaKeySystemAccess(
          "com.microsoft.playready.recommendation.3000",
          SupportedDRMConfig
        );

      this.supportSl3000 = true;

      this.config.drm = {
        ...this.config.drm,
        preferredKeySystems: [
          "com.microsoft.playready.recommendation.3000",
          "com.microsoft.playready.recommendation",
          "com.microsoft.playready",
        ],
        keySystemsMapping: {
          "com.microsoft.playready":
            "com.microsoft.playready.recommendation.3000",
        },
      };
    } catch (error) {
      console.error(error);
    }
  }

  registerFilter(player: shaka.Player) {
    const token = this.token;
    player
      .getNetworkingEngine()
      ?.registerRequestFilter(function (type, request) {
        // Only add headers to license requests:
        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
          console.log("request :" + request.body);
          request.headers["pallycon-customdata-v2"] = token;
        }
      });
  }
}

export default PlayReadyDRM;
