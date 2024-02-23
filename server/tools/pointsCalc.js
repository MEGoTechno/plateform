const getLargest = (users) => {
    var array = users.map((ele) => ele.totalPoints);

    var largest = array[0];

    for (let i = 0; i <= largest; i++) {
        if (array[i] > largest) {
            largest = array[i];
        }
    }
    return largest
}

const getSmallest = (users) => {
    var array = users.map((ele) => ele.totalPoints);
    return Math.min(...array)

}

const getAverage = (users) => {
    const average = (users.reduce((acc, user) => {
        return acc += user.totalPoints
    }, 0) / users.length)
    return average
}


module.exports = { getLargest, getSmallest, getAverage }