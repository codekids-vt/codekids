import Image from "next/image";

function Card() {
    return (
      <div className="max-w-sm m-2 drop-shadow-md">
        <Image
          src="/GameImage_1.png"
          alt="Game card image"
          width={300}
          height={300}
          className="w-full object-cover rounded-t-lg"
        >
        </Image>
        <div className="px-6 py-4 mx-2 bg-cardGreen rounded-b">
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
  