const DomElementNotFoundException = require("../exceptions").DomElementNotFoundException;
const DomValueNotFoundException = require("../exceptions").DomValueNotFoundException;
const DataTypeNotSupportedException = require("../exceptions").DataTypeNotSupportedException;
const UnsuccessfulFilterException = require("../exceptions").UnsuccessfulFilterException;



module.exports = function (err) {
    //    console.log("from the catcher", err);
    switch (err.constructor) {
        case DataTypeNotSupportedException:
            //reportAndContinue
            return true;
        case DomElementNotFoundException:
            //report 
            return true;
        case DomValueNotFoundException:
            if (err.inc.constraint.REQUIRED) return false;
            return true;
        case UnsuccessfulFilterException:
            return false;
        default:
            console.log(err);

    }
}