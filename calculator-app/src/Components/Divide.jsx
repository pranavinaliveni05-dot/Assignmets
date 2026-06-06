function Divide({ num1, num2, setResult }) {
  const handleDivide = () => {
    if (Number(num2) === 0) {
      setResult("Cannot divide by zero");
    } else {
      setResult(Number(num1) / Number(num2));
    }
  };

  return <button onClick={handleDivide}>Divide</button>;
}

export default Divide;
