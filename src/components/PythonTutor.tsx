export interface IPythonTutorProps {
  code: string
  cumulative?: boolean,
  width?: number,
  height?: number,
}

export function PythonTutor({ props }: { props: any | IPythonTutorProps }) {

  const width = props.width ?? 650;
  const height = props.height ?? 500;
  const cumulative = props.cumulative ?? false;

  const code = encodeURIComponent(props.code);

  return (
    <iframe width={width} height={height}
      src={`http://pythontutor.com/iframe-embed.html#code=${code}&cumulative=${cumulative}&py=2`}>
    </iframe>
  );
}
