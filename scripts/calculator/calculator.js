Calculator =
{
    calculate: function (input, options) {
        var syntaxTree = createSyntaxTree(input);
        console.log(syntaxTree)
        console.log('=============================================')
        return calculateTreeValue(syntaxTree, options);
    },
    calculateChart: function (input, options) {
        var syntaxTree = createSyntaxTree(input);
        var result = []
        for (var i = options.from; i <= options.to; i += options.step) {
            var varable = {
                name: options.name,
                value: i
            }
            var constants = [...options.constants];
            constants.push(varable)
            var value = calculateTreeValue(syntaxTree, {
                constants: constants
            });
            result.push(value)
        }
        return result;
    },
    Symbols: ['+', '-', '*', '/', '^', '(', ')'],
    Functions: ['sin', 'cos', 'min', 'max'],
    ArgumentSeparator: ',',
    NumberSeparator: '.',
    Numbers: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.']
}


function calculateTreeValue(node, options) {
    if (node == null) {
        return 0;
    }


    var leftValue = 0;
    if (node.left.isElement) {
        leftValue = getValue(node.left, options);

    }
    else {
        leftValue = calculateTreeValue(node.left, options)
    }

    var rightValue = 0;
    if (node.right.isElement) {
        rightValue = getValue(node.right, options);

    }
    else {
        rightValue = calculateTreeValue(node.right, options)
    }
    if (node.type == 'function') {
        rightValue = getFuntionValue(node.value, rightValue)
    }
    var result = calculate(leftValue, rightValue, node.operation);
    return result;
}

function getFuntionValue(name, input) {
    console.log('function triggered', name, input)
    if (name === 'sin') {
        return Math.sin(input)
    }
    if (name === 'cos') {
        return Math.cos(input)
    }
}


function calculate(a, b, operation) {
    console.log('operatio triggered', a, operation, b)
    if (operation === '+') {
        return a + b;
    }
    if (operation === '-') {
        return a - b;
    }
    if (operation === '*') {
        return a * b;
    }
    if (operation === '/') {
        return a / b;
    }
    if (operation === '^') {
        return Math.pow(a, b);
    }
}


function getValue(note, options) {

    if (note.type == 'number') {
        return Number(note.value)
    }
    if (note.metatype == 'constant') {
        var constants = options.constants;
        var item = constants.find(c => c.name == note.value);
        console.log('value', item)
        if (item == null) {
            Alert.error("Constant not found " + note.value)
            throw new Error('constant not found')
        }
        return item.value;
    }
    return 0;
}

