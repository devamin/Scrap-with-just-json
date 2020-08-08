module.exports = function (value, mutate) {
    switch (mutate.type) {
        case "FLOAT":
            return floatMutate(value) || value;
        case "INTEGER":
            return integerMutate(value) || value;
        case "EMAIL":
            return emailMutate(value) || value;
        case "PATTERN":
            return patternMutate(value, mutate.pattern) || value;
        default:
            return value;

    }
}


function floatMutate(value) {
    let regExp = /[+-]?\d+(\.\d+)?/g;
    let mutated = value.match(regExp);
    return mutated[mutated.length - 1];
}

function patternMutate(value, pattern) {
    let regExp = new RegExp(pattern);
    let mutated = value.match(regExp);
    return mutated[mutated.length - 1];
}

function integerMutate(value) {

}

function emailMutate(value) {

}