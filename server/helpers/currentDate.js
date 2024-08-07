function lastTwoDaysfromCurrentDay() {
    let today = new Date();
    today.setDate(today.getDate() - 2); 

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const lastTwoDaysDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

    return lastTwoDaysDate;
}

function nextTwoDaysfromCurrentDay() {
    let today = new Date();
    today.setDate(today.getDate() + 2); 

    const day = today.getDate();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();

    const nextTwoDaysDate = `${year}-${month < 10 ? `0${month}` : month}-${day < 10 ? `0${day}` : day}`;

    return nextTwoDaysDate;
}

module.exports = {
    lastTwoDaysfromCurrentDay,
    nextTwoDaysfromCurrentDay
}