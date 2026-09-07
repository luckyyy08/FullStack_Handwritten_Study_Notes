function FunctionDemo() {
    function hello() {
        return "HELLO";
    }

    function average() {
        let a = 10;
        let b = 20;
        let c = 30;
        let avg = (a + b + c) / 3;
        return "average is " + avg;
    }

    return (
        <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
            <h1>Function Demo</h1>
            <h2>{hello()}</h2>
            <h2>{hello()}</h2>
            <h3>{average()}</h3>
        </div>
    );
}

export default FunctionDemo;

