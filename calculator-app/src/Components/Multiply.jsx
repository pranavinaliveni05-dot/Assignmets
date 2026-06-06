function Multiply({ num1, num2, setResult }) {
  return (
    <button onClick={() => setResult(Number(num1) * Number(num2))}>
      Multiply
    </button>
  );
}

export default Multiply;
