Validators = [
    {
        type: 'number',
        validate: validateNumber
    },
    {
        type: 'text',
        validate: validateText
    },
    {
        type: 'operation',
        validate: validateOperation
    },
    {
        type: 'expression',
        validate: validateExpression
    },
    {
        type: 'function',
        validate: validateExpression
    },
    {
        type: 'constant',
        validate: validateExpression
    },
]

function validateElements(elements) {
    for (const element of elements) {
        const validator = Validators.find(e => e.type === element.getType());
        if (validator == null) {
           console.log("Validator for " + element.getType() + " not found")
           continue;
        }
        const result = validator.validate(element)
        if (!result.valid) {
            return result;
        }
    }
    return {
        valid: true
    }
}

