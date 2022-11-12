class Element {
    constructor(token, elements = []) {
        this.token = token
        this.elements = elements
        this.metatype = token.type;
    }

    hasElements() {
        return this.elements.length > 0;
    }

    getType()
    {
        return this.token.type;
    }

    getValue()
    {
        return this.token.value;
    }
}