import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

type CategorySpine = {
  name: string;
  image: string;
  link: string;
};

const bookCategorySpines: CategorySpine[] = [
  {
    name: "Beginner",
    image: "/home_page/green_spine.png",
    link: "/book_category/beginner",
  },
  {
    name: "Intermediate",
    image: "/home_page/orange_spine.png",
    link: "/book_category/intermediate",
  },
  {
    name: "Advanced",
    image: "/home_page/purple_spine.png",
    link: "/book_category/advanced",
  },
]

function CategoryPreview({ category }: { category: CategorySpine }) {
  return (
    <div className="h-[150px] w-[600px] relative">
      <a href={category.link}>
        <div className="h-[150px] w-[600px] hover:shadow-2xl rounded-2xl hover:-translate-y-1">
          <img src={category.image} height={150} width={600} alt={`Book Image-Background`} className="absolute" />
          <div className="relative top-4 left-16 w-9/12 h-3/4 flex-col justify-center flex items-center p-2 text-center">
            <h1 className="text-black text-4xl font-medium">{category.name}</h1>
          </div>
        </div>
      </a>
    </div>

  )
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center container mx-auto z-10">
        <div>
          <img
            src="/background.png"
            alt="KIDATA"
            width={250}
            height={150}
            className="mx-auto"
          />
          <div className="card p-2 mb-2 max-w-lg text-center">
            <h1 className="text-2xl font-bold">
              Welcome to CodeKids!
            </h1>
          </div>
        </div>
        <div className="flex flex-col justify-center">
          {bookCategorySpines.map((category, i) => (
            <div key={`category-${i}`}>
              <CategoryPreview category={category} />
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
