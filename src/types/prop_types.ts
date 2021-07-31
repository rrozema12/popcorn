import { IWatchList } from "./streams";

/**
 * IMDbId={stream.id}
 title={stream.l}
 picture={(stream.i && stream.i.imageUrl) || null}
 toggleWatchListForTitle={toggleWatchListForTitle}
 watchList={watchList}
 */

export interface IMediaCard {
    IMDbId: string;
    title: string;
    picture: string | null;
    watchList?: IWatchList[];
}