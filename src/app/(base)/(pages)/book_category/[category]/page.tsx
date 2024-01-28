import React from 'react'
import Image from 'next/image'
import ActivityBookList from '../../books/[page]/page'
import { BookCategory } from '@/util/BookData'
import { redirect } from 'next/navigation'

export default async function BookCategoryPage({ params }: { params: { category: string } }) {
  // try to get the category from the params
  const category = params.category as BookCategory
  // if the category is not valid, redirect to the home page
  if (!Object.values(BookCategory).includes(category)) {
    redirect('/')
  }

  return (
    <>
      <div className="flex flex-col items-center container mx-auto z-10">
        <div>
          <Image
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