module.exports = (originalEmailArray) => {

    // Make sure the data is in the correct format
    if (!Array.isArray(originalEmailArray) || typeof originalEmailArray[0] !== "string") {
        alert("The endpoint needs to return an array of strings");
        return;
    }
    const originalNumberOfEmails = originalEmailArray.length;
    const emailsObject = originalEmailArray.reduce((acc, email, index) => {

        // Make sure this email isn't a duplicate
        if (acc.map[email] !== true) {
            acc.map[email] = true;

            // this will create a sparsely populated array
            acc.array[index] = email;
        }
        return acc;
    }, {
        map: {},
        array: []
    });

    // Filter out the empty array values and save
    const emailArrayNoDuplicates = emailsObject.array.filter((email) => {
        return email;
    });

    return emailArrayNoDuplicates;
};