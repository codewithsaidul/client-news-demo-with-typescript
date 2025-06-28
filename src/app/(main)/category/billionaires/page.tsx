
import Banner from '@/components/Shared/Banner';
import BillionairesNews from './BillionairesNews';
import PageTabs from '@/components/Shared/PageTabs';


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
        <Banner title="Billionaires" color="bg-news-headline" />

        <div className='mt-20'>
          <PageTabs tabs={tabs} />
        </div>

        
        <BillionairesNews />
    </div>
  )
}

export default page