
function getTokens(chars) {
    var elements = []
    var currentElement = { null: true };
    for (var i = 0; i < chars.length; i++) {
        const char = chars[i];
        var element = getToken(char)
        if (currentElement.type == element.type &&
            (element.type != 'operation' && element.type != 'expression')) {
            currentElement.value += element.value;
            continue;
        }
        currentElement = element;
        if (!currentElement.null) {
            elements.push(currentElement)
        }
    }
    return elements;
}


function getToken(value) {
    if (Calculator.Symbols.includes(value)) {
        if (value == '(' || value == ')') {
            return Token.Expression(value);
        }
        return Token.Operation(value);
    }
    if (Calculator.Numbers.includes(value)) {
        return Token.Number(value);
    }
    if(Calculator.ArgumentSeparator == value)
    {
        return Token.ArgumentSeparator(value);
    }
    return Token.Text(value);
}