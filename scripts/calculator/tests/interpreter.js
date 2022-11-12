


function should_remove_whitespaces()
{
    const input = "x * y * z";
    var result = formatInput(input)
    if(result !== "x*y*z")
    {
        throw new Error("Test should_remove_whitespaces() "+result)
    }
}
should_remove_whitespaces()