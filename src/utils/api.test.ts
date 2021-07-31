import { truncate } from "./helpers"

test('truncate',  () => {
   const string = "kajsdfhkljahsdfljkahsfklashdflkjashdfljkashdflkjasdh";
   const truncatedString1 = truncate(string, 10);
   const truncatedString2 = truncate(string, 15);
   const truncatedString3 = truncate(string, 20);

   expect(truncatedString1.length).toBe(9);
   expect(truncatedString1).toBe("kajsdfhkl");
   expect(truncatedString2.length).toBe(14);
   expect(truncatedString2).toBe("kajsdfhkljahsd");
   expect(truncatedString3.length).toBe(19);
   expect(truncatedString3).toBe("kajsdfhkljahsdfljka");
});