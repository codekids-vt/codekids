function Card({
  title,
  blurb,
  href,
}: {
  title: string;
  blurb: string;
  href: string;
}) {
  return (
    <a href={href} className="mx-auto">
      <div className="max-w-sm m-2 drop-shadow-md transition-transform hover:-translate-y-1">
        <img
          src="/GameImage_1.png"
          alt="Game card image"
          width={300}
          height={300}
          className="w-full object-cover rounded-lg"
        />
        <div className="px-4 py-2.5 mx-2 bg-cardGreen rounded-b-md">
          <h1 className="font-medium text-lg">{title}</h1>
          <p className="text-neutral-800 text-sm">{blurb}</p>
        </div>
      </div>
    </a>
  );
}

export default Card;
