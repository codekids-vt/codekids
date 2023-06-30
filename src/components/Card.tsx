function Card() {
    return (
      <div className="max-w-sm bg-cardGreen rounded overflow-hidden shadow-lg">
        <img
          className="w-full"
          src="/images/card.png"
          alt="Sunset in the mountains"
        ></img>
        <div className="px-6 py-4">
          <p className="text-gray-700 text-base">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
            quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
            nihil.
          </p>
        </div>
      </div>
    );
  }
  
  export default Card;
  