import axios from "axios";

export const fetchIMDbData = async (title: string) => {
    const options: any = {
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/title/auto-complete",
        params: { q: title },
        headers: {
            "x-rapidapi-key": "4842e2378bmsh83cda0f16148544p1fb134jsn5e514e7959e2",
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
        },
    };
    return await axios.request(options);
}

export const getStreamsForTitle = async (id: string) => {
    const options: any = {
        method: "GET",
        url:
            "https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup",
        params: { source_id: id, source: "imdb", country: "us" },
        headers: {
            "x-rapidapi-key": "4842e2378bmsh83cda0f16148544p1fb134jsn5e514e7959e2",
            "x-rapidapi-host":
                "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com",
        },
    };

    return await axios.request(options);
};
