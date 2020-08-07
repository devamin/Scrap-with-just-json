module.exports.UnsuccessfulFilterException = function (extracted, filter) {
    this.name = "UnsuccessffulFilterException";
    this.msg = "Filter not succeeded  " + filter.name;
    this.filter = filter;
    this.extracted = extracted;
}

module.exports.FilterUnkownException = function (type) {
    this.name = "FilterUnkownException";
    this.msg = "Filtre unknown " + type;
}


module.exports.DataTypeNotSupportedException = function (dt) {
    this.name = "DataTypeNotSupportedException";
    this.msg = "DataType " + dt + " not supported in our extractor";
}

module.exports.ExctractionFailedException = function () {
    this.name = "ExctractionFailedException";
    this.msg = "Exctraction failed";
}

module.exports.DomElementNotFoundException = function (selector) {
    this.name = "DomElementNotFoundException";
    this.msg = "Dom Element Not found with this selector " + selector;
}

module.exports.DomValueNotFoundException = function (inc) {
    this.name = "DomValueNotFoundException";
    this.msg = "We Cannot Find The Attribut Value for this  " + inc.selector + " " + inc.att;
    this.inc = inc;
}