class Token {
    constructor(type, value) {
        this.type = type,
        this.value = value
    }

    static Operation(value) {
        return new Token('operation',value);
    }

    static Expression(value) {
        return new Token('expression',value);
    }


    static Text(value) {
        return new Token('text',value);
    }

    static Number(value) {
        return new Token('number',value);
    }
    static ArgumentSeparator(value) {
        return new Token('argumentSeparator',value);
    }
}