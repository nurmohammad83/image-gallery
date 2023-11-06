import { useState } from "react";
import { galleryImages } from "../../data/images";
import { IImage } from "../../interfaces/interface";

const Gallery = () => {
    const [images, setImages] = useState(galleryImages as IImage[]);
  return (
    <div className="root-gallery  pb-5 px-2">
       <div className="items">
        {images?.map((image) => (
          <div
            className="item"
            key={image.id}
          >
            <div
              className="w-full h-full"
              draggable="true"
            >
              <img
                src={image.img}
                className={` hover:opacity-[0.5] w-full h-full rounded duration-300 bg-white`}
                alt={`Image ${image.id}`}
              />

            </div>
          </div>
        ))}
        </div>
    </div>
  )
}
export default Gallery