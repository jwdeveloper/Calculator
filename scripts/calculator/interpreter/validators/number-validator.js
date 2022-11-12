function validateNumber(element) {
    var indexes = charIndexes(element.getValue(), Calculator.NumberSeparator)
    if (indexes.length == 0) {
        element.metatype = 'int'
        return {
            valid: true
        }
    }
    element.metatype = 'float'
    if (indexes.length > 1) {
        return {
            element: element,
            message: 'too much ' + NumberSeparator + ' in number',
            valid: false
        }
    }

    var separatorIndex = indexes[0];
    if (separatorIndex == 0) {
        return {
            element: element,
            message: 'Number can not starts with: ' + NumberSeparator,
            valid: false
        }
    }
    var lenght = element.value.length - 1;
    if (separatorIndex == lenght) {
        return {
            element: element,
            message: 'Number can not ends with: ' + NumberSeparator,
            valid: false
        }
    }
    return {
        valid: true
    }
}


function charIndexes(str, char) {
    return str
        .split("")
        .map(function (c, i) { if (c == char) return i; })
        .filter(function (v) { return v >= 0; });
}