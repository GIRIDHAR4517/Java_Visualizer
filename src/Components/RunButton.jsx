function RunButton({ runCode }) {
  return (
    <button
      onClick={runCode}
      style={{
        padding: "10px 20px",
        backgroundColor: "#22c55e",
        color: "white",
        border: "none",
        cursor: "pointer",
      }}
    >
      Run Code
    </button>
  );
}

export default RunButton;