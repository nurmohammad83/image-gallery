import { useState } from "react";
import { galleryImages } from "../../data/images";
import { IImage } from "../../interfaces/interface";
import ShowImage from "../ShowImage";

const Gallery = () => {
  // get all data
    const [images, setImages] = useState(galleryImages as IImage[]);
 const [selectedImages, setSelectedImages] = useState([] as string[]);

    // store selected item
    const [dragItem, setDragItem] = useState<IImage | null>(null);
    const [dragId, setDragId] = useState<string | null>(null);

    const handleItemClick = (imageId:string) => {
      if (selectedImages.includes(imageId)) {
        const currentImage=selectedImages.filter((id) => id !== imageId)
        setSelectedImages(currentImage);
      } else {
        setSelectedImages([...selectedImages, imageId]);
      }
    };

    const handleItemDragStart = (e: React.DragEvent, image: IImage) => {
      e.dataTransfer.setData("itemId", image.id);
      setDragItem(image);
    };
  
    const handleItemDragOver = (e: React.DragEvent): void => {
      e.preventDefault();
      if (e.target instanceof HTMLElement) {
        const firstChild = e.target.children[0] as HTMLElement | undefined;
        if (firstChild?.id) {
          setDragId(firstChild?.id)
        }
      }
    };
    const handleItemDrop = (e:React.DragEvent, targetImage:IImage) => {
      e.preventDefault();
      const sourceId = e.dataTransfer.getData("itemId");
      const updatedItem = images.slice();
      const sourceIndex = images.findIndex(
        (image) => image.id === sourceId
      );
      const targetIndex = images.findIndex(
        (image) => image.id === targetImage.id
      );

      updatedItem.splice(sourceIndex, 1);
      updatedItem.splice(targetIndex, 0, dragItem!);
  
      setImages(updatedItem);
      setDragItem(null);
      setDragId(null);
    };
  
  return (
    <div className="pb-6 px-2 root-gallery">
       <div onDragOver={handleItemDragOver} className="items">
        {images?.map((image) => (
          <div
            className="relative cursor-pointer"
            key={image.id}
            onDrop={(e) => handleItemDrop(e, image)}
          >
            <div
              className="w-full h-full"
              onDragStart={(e) => handleItemDragStart(e, image)}
              draggable="true"
            >
              <img
                src={image.img}
                className="w-full bg-white h-full hover:opacity-[0.6]  rounded duration-200"
                alt={`Image ${image.id}`}
              />
               <div className="absolute w-full  h-full bg-black top-0 left-0 opacity-0  hover:opacity-50 duration-300 cursor-move">
                <input
                  checked={false}
                  readOnly
                  onClick={() => handleItemClick(image.id)}
                  className="h-5 w-5 ml-5 mt-5 cursor-pointer"
                  type="checkbox"
                  name="checkbox"
                  id={image.id}
                />
              </div>
              {/* drag show image  */}
              {dragId === image.id && (
                <ShowImage image={dragItem} />
              )}
              {/* selected items */}
              {selectedImages.includes(image.id) && (
              <div
                className={` absolute w-full h-full bg-black top-0 left-0 opacity-30 cursor-auto`}
              >
                <input
                  id={image.id}
                  defaultChecked
                  onClick={() => handleItemClick(image.id)}
                  className="h-5 w-5 ml-5 mt-5 cursor-pointer"
                  type="checkbox"
                  name="checkbox2"
                />
              </div>
            )}
            </div>
          </div>
        ))}
        </div>
    </div>
  )
}
export default Gallery