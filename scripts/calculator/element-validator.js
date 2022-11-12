function validateElements(elements) {
    var result = {
        valid: true
    }
    for (const element of elements) {
        if (element.type === 'number') {
            result = validateNumber(element)
        }
        if (element.type === 'text') {
            result = validateText(element)
        }
        if (element.type === 'operation') {
            result = validateOperation(element)
        }

        if (!result.valid) {
            return result;
        }
    }

    return result;
}

function validateNumber(element) {
    var indexes = charIndexes(element.value, Calculator.NumberSeparator)
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

function validateText(element) {
    if (Calculator.Functions.includes(element.value)) {
        element.metatype = 'fuction';
    }
    else {
        element.metatype = 'constant';
    }
    return {
        valid: true
    }
}

function validateOperation(element) {
    if (element.value === '(' || element.value === ')') {
        element.metatype = 'parentasis';
    }
    else {
        element.metatype = 'mathemahic operation';
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