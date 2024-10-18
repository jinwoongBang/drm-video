import { DRM, DRMType } from "@/libs/drm/DRM";

type WidevineConfig = {
  drm: {
    servers: {
      "com.widevine.alpha": string | null;
    };
    advanced: {
      "com.widevine.alpha": {
        persistentStateRequired: boolean;
      };
    };
  };
  streaming: {
    autoLowLatencyMode: boolean;
  };
};

class WidevineDRM implements DRM {
  drmType: DRMType = "Widevine";

  licenseUri: string;
  token =
    "eyJrZXlfcm90YXRpb24iOmZhbHNlLCJyZXNwb25zZV9mb3JtYXQiOiJvcmlnaW5hbCIsInVzZXJfaWQiOiJ0ZXN0LXVzZXIiLCJkcm1fdHlwZSI6IldpZGV2aW5lIiwic2l0ZV9pZCI6IkRFTU8iLCJoYXNoIjoiRFNEQ0JwWmhJYVR5VG1MMzlCXC9Yb2IyNzRobWpWXC9oWEp4T1V0K29hZ1pjPSIsImNpZCI6ImJpZ2J1Y2tidW5ueSIsInBvbGljeSI6Im41eDI4dVltRGRQQ0ZpbW9NM25HTnc9PSIsInRpbWVzdGFtcCI6IjIwMjEtMDEtMDZUMDk6MjI6MzZaIn0=";

  config: WidevineConfig = {
    drm: {
      servers: {
        "com.widevine.alpha": null,
      },
      advanced: {
        "com.widevine.alpha": {
          persistentStateRequired: true,
        },
      },
    },
    streaming: {
      autoLowLatencyMode: true,
    },
  };

  constructor({ licenseUri }: { licenseUri: string }) {
    console.log("WidevineDRM :: constructor()", { licenseUri });
    this.licenseUri = licenseUri;
  }

  async init() {
    this.config.drm.servers["com.widevine.alpha"] = this.licenseUri;
  }

  registerFilter(player: shaka.Player) {
    const token = this.token;
    player
      .getNetworkingEngine()
      ?.registerRequestFilter(function (type, request) {
        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
          request.headers["pallycon-customdata-v2"] = token;
        }
      });
  }
}

export default WidevineDRM;
