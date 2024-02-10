export default function Background() {
  return (
    <div
      className="absolute w-full h-full bg-local -z-10"
      style={{
        backgroundImage: 'url("./bg-cover-bottom.png")',
        backgroundSize: "contain",
        backgroundPosition: "center top",
        backgroundRepeat: "repeat-x",
      }}
    />
  );
}
