import { BookCategory } from '../util/BookData'
import { useParams, useNavigate } from 'react-router-dom'
import ActivityBookList from '../components/ActivityBookList'

export default function BookCategoryPage() {
  // try to get the category from the params
  const { categoryString } = useParams()
  const navigate = useNavigate()
  // if the category is not valid, redirect to the home page
  if (!Object.values(BookCategory).includes(categoryString as BookCategory)) {
    navigate('/')
  }
  let category = categoryString as BookCategory;

  return (
    <>
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
              Pick a book!
            </h1>
          </div>
        </div>
        <ActivityBookList category={category} />
      </div>
    </>
  )
}