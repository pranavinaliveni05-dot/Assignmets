function Clear({ setNum1, setNum2, setResult }) {
  const clearAll = () => {
    setNum1("");
    setNum2("");
    setResult("");
  };

  return <button onClick={clearAll}>Clear</button>;
}

export default Clear;
