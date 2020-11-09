export interface IWatchList {
  id: string;
  title: string;
}

export interface IStream {
  i: IStreamImage;
  title: string;
  id: string;
  q: string;
  rank: number;
  s: string;
  l: string;
}

interface IStreamImage {
  height: number;
  imageUrl: string;
  width: number;
}
