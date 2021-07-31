import { fetchIMDbData, getStreamsForTitle } from "./api"

let data: any[] = []

test('fetchIMDbData', async () => {
    const result: any = await fetchIMDbData("breaking bad");
    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");

    data = result.data.d;
});

test('getStreamsForTitle', async () => {
    const targetId: string = data[0].id;
    const result: any = await getStreamsForTitle(targetId);

    expect(result.status).toBe(200);
    expect(result.statusText).toBe("OK");
});