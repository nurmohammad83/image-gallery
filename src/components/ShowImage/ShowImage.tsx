const ShowImage = ({image}:{image:string}) => {
  return (
    <div className='absolute z-50 left-0 w-full  h-full bg-black top-0 duration-200'>
    <img className='w-full h-full' src={image} alt="" /> 
</div>
  )
}
export default ShowImage