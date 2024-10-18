export interface DRM {
  drmType: DRMType;
  licenseUri: string;
  config: object;

  init: () => Promise<void>;
  registerFilter: (player: shaka.Player) => void;
}

export type DRMType = "Widevine" | "PlayReady" | "FairPlay";
