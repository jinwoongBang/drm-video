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
