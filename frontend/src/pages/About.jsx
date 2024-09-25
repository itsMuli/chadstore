import Title from '../components/Title';
import { assets } from '../assets/assets';
import NewsletterBox from '../components/NewsletterBox';

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t">
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className='my-10 flex flex-col md:flex-row gap-16'>
        <img className='w-full md:max-w-[450px]' src={assets.about_img} alt="" />
        <div className='flex flex-col justify-center gap-6 md:w-2/4'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam quam molestias debitis illo illum labore, quisquam voluptas nemo laudantium ipsa quas, minima qui maxime, libero iste officia unde delectus. Provident.</p>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eos, aliquid vero ipsam, nisi, dolores atque repellat blanditiis a facere ducimus eligendi dolorem accusamus. Assumenda error impedit cumque voluptates consectetur explicabo.</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Obcaecati maiores possimus error ipsa quidem voluptas maxime ad voluptatum totam natus quia quasi facilis, expedita accusantium dolorum numquam, doloribus atque earum!</p>
        </div>
      </div>
      <div className='text-xl py-4'>
        <Title text1={'WHY'} text2={'CHOOSE US'}/>
      </div>

      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, aliquam repellat quas earum beatae, unde aspernatur deserunt neque dolorum mollitia voluptate in omnis odit distinctio quae. Nam quasi recusandae exercitationem.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Convinience:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, aliquam repellat quas earum beatae, unde aspernatur deserunt neque dolorum mollitia voluptate in omnis odit distinctio quae. Nam quasi recusandae exercitationem.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5'>
          <b>Exceptional customer Service:</b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi, aliquam repellat quas earum beatae, unde aspernatur deserunt neque dolorum mollitia voluptate in omnis odit distinctio quae. Nam quasi recusandae exercitationem.</p>
        </div>
      </div>
      <NewsletterBox />
    </div>
  )
}

export default About