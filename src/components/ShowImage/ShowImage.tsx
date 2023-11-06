import { IImage } from "../../interfaces/interface"

const ShowImage = ({image}:{ image: IImage | null; }) => {
  return (
    <div className='absolute z-50 left-0 w-full  h-full bg-black top-0 duration-200'>
    <img className='w-full h-full' src={image?.img} alt="" /> 
</div>
  )
}
export default ShowImage