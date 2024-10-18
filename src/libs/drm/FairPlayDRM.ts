import { DRM, DRMType } from "@/libs/drm/DRM";

type FairPlayConfig = {
  drm: {
    servers: {
      "com.apple.fps": string | null;
    };
    advanced: {
      "com.apple.fps": {
        serverCertificate: Uint8Array | null;
      };
    };
  };
  streaming: {
    autoLowLatencyMode: boolean;
  };
};

type PallyconResponse = {
  errorCode?: string;
  message?: string;
};

class FairPlayDRM implements DRM {
  drmType: DRMType = "FairPlay";

  licenseUri: string;
  fairplayCertUri: string =
    "https://license-global.pallycon.com/ri/fpsKeyManager.do?siteId=DEMO";
  token =
    "eyJrZXlfcm90YXRpb24iOmZhbHNlLCJyZXNwb25zZV9mb3JtYXQiOiJvcmlnaW5hbCIsInVzZXJfaWQiOiJ0ZXN0LXVzZXIiLCJkcm1fdHlwZSI6IkZhaXJQbGF5Iiwic2l0ZV9pZCI6IkRFTU8iLCJoYXNoIjoiY21NZkZPUExrakErbTVLZ3BKS09vVnVmRTVTc3hKdVlTUm1jUWM1dmlVUT0iLCJjaWQiOiJiaWdidWNrYnVubnkiLCJwb2xpY3kiOiJuNXgyOHVZbURkUENGaW1vTTNuR053PT0iLCJ0aW1lc3RhbXAiOiIyMDIxLTAxLTA2VDA5OjI0OjI4WiJ9";

  config: FairPlayConfig = {
    drm: {
      servers: {
        "com.apple.fps": null,
      },
      advanced: {
        "com.apple.fps": {
          serverCertificate: null,
        },
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
    const fairplayCert = this.getFairplayCert();
    this.config.drm.servers["com.apple.fps"] = this.licenseUri;
    this.config.drm.advanced["com.apple.fps"].serverCertificate = fairplayCert;
  }

  getFairplayCert() {
    let xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp = new XMLHttpRequest();
    } else {
      // @ts-ignore
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", this.fairplayCertUri, false);
    xmlhttp.send();

    const fpsCert = shaka.util.Uint8ArrayUtils.fromBase64(xmlhttp.responseText);

    return fpsCert;
  }

  registerFilter(player: shaka.Player) {
    const token = this.token;
    player.getNetworkingEngine()?.registerRequestFilter((type, request) => {
      if (type === shaka.net.NetworkingEngine.RequestType.LICENSE) {
        const originalPayload = new Uint8Array(request.body as ArrayBuffer);
        const base64Payload =
          shaka.util.Uint8ArrayUtils.toBase64(originalPayload);
        const params = "spc=" + encodeURIComponent(base64Payload);

        request.body = shaka.util.StringUtils.toUTF8(params);
        request.headers["Content-Type"] = "application/x-www-form-urlencoded";

        request.headers["pallycon-customdata-v2"] = token;
      }
    });

    player
      .getNetworkingEngine()
      ?.registerResponseFilter(function (type, response) {
        // Alias some utilities provided by the library.
        if (type == shaka.net.NetworkingEngine.RequestType.LICENSE) {
          const responseText = shaka.util.StringUtils.fromUTF8(
            response.data
          ).trim();
          response.data =
            shaka.util.Uint8ArrayUtils.fromBase64(responseText).buffer;
          parsingResponse(response);
        }
      });
  }
}

function arrayBufferToString(buffer: ArrayBuffer) {
  const arr = new Uint8Array(buffer);
  const str = String.fromCharCode.apply(String, Array.from(arr));
  // if(/[\u0080-\uffff]/.test(str)){
  //     throw new Error("this string seems to contain (still encoded) multibytes");
  // }
  return str;
}

function parsingResponse(response: shaka.extern.Response) {
  let responseText = arrayBufferToString(response.data as ArrayBuffer);
  // Trim whitespace.
  responseText = responseText.trim();

  console.log("responseText :: ", responseText);

  try {
    const pallyconObj: PallyconResponse = JSON.parse(responseText);
    if (pallyconObj && pallyconObj.errorCode && pallyconObj.message) {
      if ("8002" != pallyconObj.errorCode) {
        alert(
          "PallyCon Error : " +
            pallyconObj.message +
            "(" +
            pallyconObj.errorCode +
            ")"
        );
        //window.alert('No Rights. Server Response ' + responseText);
      } else {
        var errorObj = JSON.parse(pallyconObj.message);
        alert("Error : " + errorObj.MESSAGE + "(" + errorObj.ERROR + ")");
      }
    }
  } catch (e) {}
}

export default FairPlayDRM;
