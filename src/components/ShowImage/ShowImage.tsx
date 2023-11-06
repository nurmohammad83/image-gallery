/* eslint-disable @typescript-eslint/no-explicit-any */

const PreviewImage = ({draggedImage}:any) => {
    return (
        <div className='absolute w-full z-50 h-full top-0 duration-300 left-0'>
        <img className='w-full h-full' src={draggedImage?.image} alt="" /> 
   </div>
    );
};

export default PreviewImage;