





function parseToElements(input) {
    input = formatInput(input)
    const chars = toCharArray(input)
    const tokens = getTokens(chars)
    console.log('tokens', tokens)
    const elements = getElements(tokens)
    console.log('elements', elements)
    const validationResult = validateElements(elements)
    console.log('elements-validation', validationResult)
    if(!validationResult.valid)
    {
        console.log(validationResult)
        throw new Error('invalid input: '+validationResult);
    }
  
    return elements;
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







