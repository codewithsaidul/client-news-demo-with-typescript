import Banner from '@/components/Shared/Banner';
import PageTabs from '@/components/Shared/PageTabs';
import WellnessNews from './WellnessNews';


const tabs = [
  { name: "All Life", href: "/life" },
  { name: "Wellness", href: "/life/wellness" },
  { name: "Travel", href: "/life/travel" },
  { name: "Lifestyle", href: "/life/lifestyle" },
  { name: "Property", href: "/life/property" },
  { name: "Style", href: "/life/style" },
  { name: "Motors", href: "/life/motors" },
];

const page = () => {
  return (
    <div>
        <Banner title="Wellness" color="bg-news-headline" />

        <div className='mt-20'>
          <PageTabs tabs={tabs} />
        </div>

        
        <WellnessNews />
    </div>
  )
}

export default page