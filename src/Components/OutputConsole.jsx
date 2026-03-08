function OutputConsole({ output, isError }) {
  return (
    <div
      style={{
        background: "#111",
        color: isError ? "#FF0000" : "#0f0",
        padding: "10px",
        marginTop: "10px",
        height: "150px",
      }}
    >
      <pre>{output}</pre>
    </div>
  );
}

export default OutputConsole;
