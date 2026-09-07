function FunctionDemo() {

    // 1. Simple Hello Function
    function hello() {
        return "HELLO";
    }

    // 2. Addition Function
    function add(a, b) {
        let sum = a + b;
        return "Addition of " + a + " + " + b + " = " + sum;
    }

    // 3. Average Function
    function average() {
        let a = 10;
        let b = 20;
        let c = 30;
        let avg = (a + b + c) / 3;
        return "Average is: " + avg;
    }

    // 4. Positive / Negative Number Check Function
    function checkNumber(n) {
        if (n > 0) {
            return "Number " + n + " is Positive";
        } else if (n < 0) {
            return "Number " + n + " is Negative";
        } else {
            return "Number is Zero";
        }
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>React Function Demo</h1>
            
            <h2>1. Hello Function:</h2>
            <p>{hello()}</p>
            <p>{hello()}</p>

            <h2>2. Addition Function:</h2>
            <p>{add(15, 25)}</p>

            <h2>3. Average Function:</h2>
            <p>{average()}</p>

            <h2>4. Number Check Function (Positive / Negative):</h2>
            <p>{checkNumber(5)}</p>
            <p>{checkNumber(-10)}</p>
        </div>
    );
}

export default FunctionDemo;


