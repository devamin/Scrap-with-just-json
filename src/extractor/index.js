const dataTypes = require("../types/dataTypes");
const Filters = require("../filters");
const Mutate = require("../mutate");
const DomElementNotFoundException = require("../exceptions").DomElementNotFoundException;
const DomValueNotFoundException = require("../exceptions").DomValueNotFoundException;
const DataTypeNotSupportedException = require("../exceptions").DataTypeNotSupportedException;

function Extractor(document, inc) {

    let extracted = {};

    switch (inc.type) {

        case dataTypes.FIELD:
            let domElement = getDomElt(document, inc.selector);
            extracted[inc.key] = fieldExtractor(domElement, inc);
            break;
        case dataTypes.ARRAY:
            let domElements = getDomElts(document, inc.selector);
            extracted[inc.key] = arrayExtractor(domElements, inc);
            break;
        case dataTypes.ARRAY_OF_OBJECTS:
            extracted[inc.key] = arrayOfObjectsExtractor(document, inc);
            break;

        case dataTypes.OBJECT:
            extracted[inc.key] = objectExtractor(document, inc);
            break;

        default:
            throw new DataTypeNotSupportedException(inc.type);
    }

    return extracted;
}


function getDomElt(document, selector) {
    let domElt = document.querySelector(selector);
    if (!domElt) throw new DomElementNotFoundException(selector);
    return domElt;
}

function getDomElts(document, selector) {
    let domElts = document.querySelectorAll(selector);
    if (domElts.length === 0) throw new DomElementNotFoundException(selector);
    return domElts;
}

function fieldExtractor(domElement, inc) {
    //Filter The Data
    let value = domElement[inc.att];
    if (value) {

        if ("mutate" in inc) {
            value = Mutate(value, inc.mutate);
        }

        if ("filters" in inc) {
            Filters(value, inc.filters);
        }

        return value;
    } else {
        throw DomValueNotFoundException(inc);
    }
}

function arrayExtractor(domElements, inc) {
    let values = [];
    for (let domElement of domElements)
        try {
            values.push(fieldExtractor(domElement, inc));
        } catch (error) {
            //console.log(error);
        }

    return values;
}








function arrayOfObjectsExtractor(document, inc) {
    let values = [];
    let domElements = getDomElts(document, inc.box);
    for (let domElement of domElements)
        try {
            values.push(objectExtractor(domElement, inc));
        } catch (error) {
            //console.log(error);
        }
    return values;
}

function objectExtractor(document, inc) {
    let elts = inc.elements;
    let values = {};
    for (let elt of elts) {
        let extracted = Extractor(document, elt);
        values = {
            ...values,
            ...extracted
        }

    }
    return values;
}

module.exports = Extractor;