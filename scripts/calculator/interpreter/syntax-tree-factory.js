



function createSyntaxTree(input)
{
    var elements = parseToElements(input);
    var tree = create(elements)
    return tree;
}



function create(elements, index =0 , name = 'root')
{
    console.log('hallo?')
    var note= new Node(name);
    for (var i = index; i < elements.length; i++)
    {
        console.log('c')
        var element = elements[i];
        if(element.getType() != 'operation' && note.left == null)
        {
            if(element.hasElements())
            {
                note.left = create(element.elements,i,'left-el'+1)
            }
            else
            {
                note.left = element;
            }
        
            continue;
        }
        if(element.getType() == 'operation' && note.operation == null)
        {
            note.operation = element;
            continue;
        }
       
       
        if(element.hasElements())
        {
            console.log(element.elements)
            note.right = create(element.elements,i,element.metatype)
        }
        else
        {
            note.right = create(elements,i,'right'+1)
        }
    }
    return note;
}





function elementsToTree(elements) {

    var resolved = elementsResolver(elements);
    console.log('resolved', resolved)
    var note= new Node('Root');
    var lastNote = null;
    for (var i = 0; i < resolved.length; i++)
    {
        var element = resolved[i];
        
        if(element.type != 'operation')
        {
          continue;
        }

     
        if(lastNote == null)
        {
            note.left = resolved[i-1];
        }
        else
        {
            note = new Note(element.type+" "+element.value,element.value);
            note.left = lastNote;
        }

        var right = resolved[i+1];
        if(right != null && right.hasElements)
        {
            note.right = elementsToTree(right.elements);
            if(right.type == 'function')
            {
                note.type = 'function';
                note.value = right.value;
            }
        }
        else
        {
            note.right = right;
        }
        note.operation = element.value;
        lastNote = note;
    }
    return note;
}




function elementsResolver(elements) {
    var result = [];
    var index = 0;
    while (index < elements.length) {
        var element = elements[index];
        element.isElement = true;
        if (element.type == 'number') {
            element.hasElements = false;
            result.push(element)
        }
        if (element.type == 'text') {
            if (element.metatype == "fuction") {
                var insideElements = resolveParentasis(elements, index+1)
                result.push(
                    {
                        type: 'function',
                        value: element.value,
                        elements: insideElements.elements,
                        hasElements:true,
                    }
                )
                index+=insideElements.offset+1;
                continue;
            }
            else {
                element.hasElements = false;
                result.push(element)
            }
        }
        if (element.type == 'operation') {
            if (element.value === '(') {
                var insideElements = resolveParentasis(elements, index)
                result.push(
                    {
                        type: 'parentasis',
                        elements: insideElements.elements,
                        hasElements:true,
                    }
                )
                index+=insideElements.offset;
                continue;
            }
            else {
                element.hasElements = false;
                result.push(element)
            }
        }
        index++;
    }
    return result;
}

function resolveParentasis(elements, index) {
    var result = [];
    var offset = 0;
    for (var i = index+1; i < elements.length; i++)
     {
        offset++;
        var element = elements[i];
        if(element.value === '(')
        {
            var subParentasis = resolveParentasis(elements,i);
            var o = {
                type: 'parentasis',
                elements: subParentasis.elements,
                hasElements:true,
            }
            result.push(o);
            i+=o.offset;
            offset+=o.offset;
            continue;
        }
        
        if(element.value === ')')
        {
            offset++;
            break;
        }
        result.push(element)
    }
    return {
        elements: result,
        offset:offset
    };
}
