class HistoryEntity {
    constructor(array, offset, limit, allCount) {
        this.history = array;
        this.count = array.length;
        this.usedOffset = offset;
        this.usedLimit = limit;
        this.countAfterLimit = allCount - (offset-1) - limit;
        if (this.countAfterLimit < 0) {
            this.countAfterLimit = 0;
        }
    }

    history;
    count;
    usedOffset;
    usedLimit;
    countAfterLimit;
}

module.exports = {
    HistoryEntity
}