export function renderIconMark(size: number) {
  const ring = (inner: number, borderWidth: number, children?: React.ReactNode) => (
    <div
      style={{
        width: inner,
        height: inner,
        borderRadius: "50%",
        border: `${borderWidth}px solid rgba(248,241,230,0.85)`,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </div>
  );

  const dotSize = Math.round(size * 0.16);
  const borderWidth = Math.max(1, Math.round(size * 0.018));

  return (
    <div
      style={{
        width: size,
        height: size,
        background: "#3A1B3D",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {ring(
        Math.round(size * 0.72),
        borderWidth,
        ring(
          Math.round(size * 0.48),
          borderWidth,
          <div
            style={{
              width: dotSize,
              height: dotSize,
              borderRadius: "50%",
              background: "#F8F1E6",
            }}
          />,
        ),
      )}
    </div>
  );
}
