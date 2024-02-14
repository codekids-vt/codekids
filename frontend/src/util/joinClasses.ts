export default function joinClasses(
  ...classes: (string | undefined)[]
): string {
  return classes.filter(Boolean).join(" ");
}
