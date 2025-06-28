import Banner from '@/components/Shared/Banner'
import PageTabs from '@/components/Shared/PageTabs'
import InvestingNews from './InvestingNews';


const tabs = [
  { name: "All News", href: "/news" },
  { name: "Innovation", href: "/category/innovation" },
  { name: "Entrepreneurs", href: "/category/entrepreneurs" },
  { name: "Leadership", href: "/category/leadership" },
  { name: "Investing", href: "/category/investing" },
  { name: "Billionaires", href: "/category/billionaires" },
];

const page = () => {
  return (
    <div>
        <Banner title="investing" color="bg-news-headline" />

        <div className='mt-20'>
          <PageTabs tabs={tabs} />
        </div>

        
        <InvestingNews />
    </div>
  )
}

export default page