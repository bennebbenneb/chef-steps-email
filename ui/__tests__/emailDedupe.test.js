import emailDedupe from "../src/emailDedupe/emailDedupe";
import emailsTest1 from "../public/stubs/emails.test1.json";
import emailsTest2 from "../public/stubs/emails.test2.json";
import largeEmailSet from "../public/stubs/emails.json";

describe("A Dedupe email test", () => {
    it("has no duplicates", () => {
        const dedupedEmails = emailDedupe(emailsTest1);
        expect(dedupedEmails).toEqual([
            "598a29bba95d32c840be705e@fake.com"
        ]);
    });

    it("keeps the same order", () => {
        const dedupedEmails = emailDedupe(emailsTest2);
        expect(dedupedEmails).toEqual([
            "1@fake.com",
            "2@fake.com",
            "3@fake.com",
            "4@fake.com",
            "5@fake.com",
            "6@fake.com"
        ]);
    });

    it("completes in less than a second", () => {
        const startTime = new Date().getTime();
        emailDedupe(largeEmailSet);
        const endTime = new Date().getTime();
        const totalTime = endTime - startTime;
        const oneSecond = 1000;
        expect(totalTime).toBeLessThan(oneSecond);
    });
});