function FunctionDemo()
{

    function hello()
    {
       // alert("Function called")
       return "Hello"
    }
    function add()
    {
        let a,b,c 
        a=10
        b=20
        c=a+b
    //alert(c)
     return(<h1>addition is{c}</h1>)
    }
    
    //add()
    return (
        <div>
            {add()}
            <p>{hello()}</p>
        </div>
    )
}
export default FunctionDemo