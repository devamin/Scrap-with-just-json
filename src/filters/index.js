const filters = require("../types/filters");
const FilterUnkownException = require("../exceptions").FilterUnkownException;
const UnsuccessfulFilterException = require("../exceptions").UnsuccessfulFilterException;

function Filters(extracted, filters) {
    for (let filter of filters) {
        //console.log(filter);
        Filter(extracted, filter);

    }
}

function Filter(extracted, filter) {
    switch (filter.type) {
        case filters.EQUAL:
            equal(extracted, filter);
            break;
        case filters.GT:
            greaterThan(extracted, filter);
            break;
        case filters.GTE:
            greaterThanOrEqual(extracted, filter);
            break;
        case filters.LT:
            lesserThan(extracted, filter);
            break;
        case filters.LTE:
            lesserThanOrEqual(extracted, filter);
            break;
        case filters.STR_EQUAL:
            strEqual(extracted, filter);
            break;
        case filters.STR_CONTAIN:
            break;
        default:
            return;
    }
}

function equal(extracted, filter) {
    console.log(extracted, "==", filter.comparedTo);
    if (!(filter.comparedTo == extracted))
        throw new UnsuccessfulFilterException(extracted, filter);
}

function greaterThan(extracted, filter) {
    if (!(filter.comparedTo < extracted))
        throw new UnsuccessfulFilterException(extracted, filter);
}

function greaterThanOrEqual(extracted, filter) {
    if (!(filter.comparedTo <= extracted))
        throw new UnsuccessfulFilterException(extracted, filter);
}

function lesserThan(extracted, filter) {
    if (!(filter.comparedTo > extracted))
        throw new UnsuccessfulFilterException(extracted, filter);
}

function lesserThanOrEqual(extracted, filter) {
    if (!(filter.comparedTo >= extracted))
        throw new UnsuccessfulFilterException(extracted, filter);
}

function strEqual(extracted, filter) {
    if (!(extracted === filter.comparedTo))
        throw new UnsuccessfulFilterException(extracted, filter);
}

module.exports = Filters;