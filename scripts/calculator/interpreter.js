





function getSyntaxTree(input) {
    input = formatInput(input)
    const chars = toCharArray(input)
    const elements = getElements(chars)
    const validationResult = validateElements(elements)
    if(!validationResult.valid)
    {
        console.log(validationResult)
        throw new Error('invalid input: '+validationResult);
    }
    console.log('Elements',elements)
    var tree = elementsToTree(elements)
    return tree;
}




function formatInput(input) {
    input = input.replaceAll(' ', '')
    return input;
}

function toCharArray(input) {
    var chars = []
    for (const char of input) {
        chars.push(char)
    }
    return chars;
}

function getElements(chars) {
    var syntax = []
    var currentElement = { null: true };
    for (var i = 0; i < chars.length; i++) {
        var char = chars[i];
        var element = getElementsType(char)
        if (currentElement.type == element.type && element.type !='operation')
        {
            currentElement.value += element.value;
            continue;
        }
        currentElement = element;
        if (!currentElement.null) {
            syntax.push(currentElement)
        }
    }
    return syntax;
}

function getElementsType(symbol) {
    if (Calculator.Symbols.includes(symbol)) {
        return {
            type: 'operation',
            value: symbol,
            inputs: []
        }
    }
    if (Calculator.Numbers.includes(symbol)) {
        return {
            type: 'number',
            value: symbol
        }
    }
    return {
        type: 'text',
        value: symbol
    }
}





