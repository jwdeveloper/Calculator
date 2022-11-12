
function getElements(tokens) {
    tokens = resolveNegativeNumbers(tokens);
    console.log('negativ numbers', tokens)
    var result = resolveExpressions(tokens, 0);
    var elements = resolveFunctions(result.elements);
    return elements;
}


function resolveExpressions(tokens, index = 0) {
    const elements = [];
    var movedBy = 0;
    console.log('found new expression', index)
    while (index < tokens.length) {
        const token = tokens[index];
        console.log('found token at', token, index)
        if (token.type != "expression") {
            elements.push(new Element(token))
            index++;
            movedBy++;
            continue;
        }
        if (token.value == '(') {
            const result = resolveExpressions(tokens, index + 1)
            index += result.endIndex;
            movedBy += result.endIndex;
            elements.push(new Element(token, result.elements))
        }
        if (token.value == ')') {
            console.log('expression closed', index)
            break;
        }
    }
    return {
        elements: elements,
        endIndex: movedBy + 2
    }
}

function resolveFunctions(elements) {
    const result = [];
    for (var i = 0; i < elements.length; i++) {
        const element = elements[i];
        if (element.getType() != 'text') {
            result.push(element)
            continue;
        }

        const nextElement = elements[i + 1];
        if (nextElement != null &&
            nextElement.getType() == "expression" &&
            nextElement.getValue() == '(') {

            const arguments  = resolveFunctions(nextElement.elements)  
            element.metatype = 'function';
            for(const arg of arguments)
            {
                if(arg.metatype == "argumentSeparator")
                {
                    continue;
                }
                element.elements.push(arg)
            }
            i += 1;
        }
        else {
            element.metatype = 'constant';
        }
        result.push(element)
    }
    return result;
}

function resolveNegativeNumbers(tokens) {
    const result = [];
    for (var i = 0; i < tokens.length - 1; i++) {
        const token = tokens[i];

        const backToken = tokens[i - 1];
        const nextToken = tokens[i + 1];
        if (token != null &&
            token.value == '-' &&
            backToken != null &&
            backToken.type == 'operation' &&
            nextToken != null&&
            nextToken.type != 'operation' )
            {

            result.push(new Token('number', '-1'))
            result.push(new Token('operation', '*'))
        }
        else
        {
            result.push(token)
        }
    }
    return result;
}