import landPageImage from '../assets/landingPage.png';
import downloadAppImage from '../assets/download.png';
import SearchBar, { SearchForm } from '@/components/SearchBar';
import { useNavigate } from 'react-router-dom';


export default function HomePage() {

  const navigate = useNavigate();

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`
    })
  }

  return (
    <div className="flex flex-col gap-12">
        <div className="md:px-32 bg-red-50 rounded-lg shadow-lg py-8 flex flex-col gap-5 text-center -mt-16">
            <h1 className="text-5xl font-bold tracking-tight text-red-600">
                Eat! Sleep! Repeat!
            </h1>
            <span>Food is just a click away!!</span>
            <SearchBar placeHolder='Search by City' onSubmit={handleSearchSubmit} />
        </div>
        <div className="grid md:grid-cols-2 gap-5">
            <img className='rounded-lg' src={landPageImage} alt="landingImage" />
            <div className='flex flex-col text-center items-center justify-center'>
              <span className=' text-3xl font-bold tracking-tighter'>
                Order takeaway even faster!!
                </span>
              <span>
                Download our official Mobile app for faster ordering and personalised recommendation 
              </span>
              <img src={downloadAppImage} alt="download app" />
            </div>
        </div>
    </div>
  )
}
