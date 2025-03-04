export interface Program {
  id: number;
  title: string;
  viewCount: number;
  likeCount: number;
  seasons: {
    id: number;
    seasonNumber: number;
    episodeCount: number;
    webFreeEpCount: number;
    hasTrailer: boolean;
  }[];
}
export interface VideoList {
  programId: number;
  videos: {
    seasonId: number;
    episodeNumber: number;
    format: "HLS" | "DASH";
  }[];
}
export interface VideoPlayInfo {
  hls: {
    seasonId: number;
    episodeNumber: number;
    url: string;
  };
  dash: {
    seasonId: number;
    episodeNumber: number;
    url: string;
  };
}
