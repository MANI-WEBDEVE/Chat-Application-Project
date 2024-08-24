import { animationDefaultOption } from '@/lib/utils'
import Lottie from 'react-lottie'

const EmptyChatContainer = () => {
  return (
    <div className=' flex-1 bg-[#1c1d25] flex flex-col justify-center items-center md:flex sm:hidden  duration-1000 transition-all max-sm:hidden'>
      <Lottie
        isClickToPauseDisabled={true}
        height={200}
        width={200}
        options={animationDefaultOption}
       
      />
      <div className='text-opacity-80 text-white flex flex-col gap-5 items-center mt-10 lg:text-4xl text-3xl transition-all duration-300 text-center'>
        <h3 className='poppins-medium'>
            HI<span className='text-purple-800'>! </span>Welcome to <span className='text-purple-800'>A-Syncronus </span>Chat App <span className='text-purple-800'>.</span>
        </h3>
      </div>
    </div>
  )
}

export default EmptyChatContainer
