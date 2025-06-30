import AddNewsForm from "@/components/dashboard/addNews/AddNewsForm"


const page = () => {
  return (
    <div className="p-5">
        <div className="border-b pb-5">
            <h2 className="text-4xl font-title font-bold">Add News</h2>
        </div>

        <div className="mt-16">
            <AddNewsForm />
        </div>
    </div>
  )
}

export default page