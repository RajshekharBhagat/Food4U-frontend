import hero from '../assets/hero.png';

export default function Hero() {
  return (
    <div className=' bg-red-50'>
      <img className='w-full max-h-[500px] object-cover' src={hero} />
    </div>
  )
}