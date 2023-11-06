import { useState } from "react";
import { galleryImages } from "../../data/images";
import { IImage } from "../../interfaces/interface";
import ShowImage from "../ShowImage";
import AddImage from "../AddImage";

const Gallery = () => {
  // get all data
  const [images, setImages] = useState(galleryImages as IImage[]);
  const [selectedImages, setSelectedImages] = useState([] as string[]);

  // store selected item
  const [dragItem, setDragItem] = useState<IImage | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  const handleImageClick = (imageId: string) => {
    if (selectedImages.includes(imageId)) {
      const currentImage = selectedImages.filter((id) => id !== imageId);
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
        setDragId(firstChild?.id);
      }
    }
  };
  const handleItemDrop = (e: React.DragEvent, targetImage: IImage) => {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("itemId");
    const updatedItem = images.slice();
    const sourceIndex = images.findIndex((image) => image.id === sourceId);
    const targetIndex = images.findIndex(
      (image) => image.id === targetImage.id
    );

    updatedItem.splice(sourceIndex, 1);
    updatedItem.splice(targetIndex, 0, dragItem!);

    setImages(updatedItem);
    setDragItem(null);
    setDragId(null);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const deleteItemFilter = images.filter(
      (image) => !selectedImages.includes(image?.id)
    );
    setImages(deleteItemFilter);
    setSelectedImages([]);
  };

  return (
    <div className="pb-6 px-2 root-gallery">
      <div className="py-4">
      <p className="text-2xl font-bold p-5 flex items-center ">
          Image Gallery
        </p>
       {
        selectedImages.length > 0 && (
          <div className="flex justify-between items-center p-5 ">
          <div className="flex justify-center items-center">
            <input
              className="w-4 h-4 cursor-pointer"
              type="checkbox"
              checked
              readOnly
            />
            <p className="pl-2 text-xl font-bold">
              {selectedImages.length} {selectedImages.length === 1 ? "File" : "Files"} Selected
            </p>
          </div>
          <div>
            <button onClick={handleDelete} className="text-red-500 sm:font-semibold ">
              Delete File
            </button>
          </div>
        </div>
        )
       }
      </div>
      <div onDragOver={handleItemDragOver} className="items">
        {images?.map((image) => (
          <div
            className="relative cursor-pointer"
            key={image.id}
            onDrop={(e) => handleItemDrop(e, image)}
          >
            <div
              className="w-full h-full"
              draggable="true"
              onDragStart={(e) => handleItemDragStart(e, image)}
            >
              <img
                src={image.img}
                className={`hover:opacity-[0.5] w-full h-full rounded duration-200 bg-white`}
                alt={`Image ${image.id}`}
              />

              <div className="absolute w-full  h-full bg-black top-0 left-0 opacity-0  hover:opacity-50 duration-200 cursor-move">
                <input
                  checked={false}
                  readOnly
                  onClick={() => handleImageClick(image.id)}
                  className="h-5 w-5 ml-5 mt-5 cursor-pointer"
                  type="checkbox"
                  name="checkbox"
                  id={image.id}
                />
              </div>
              {/* when drag start a image then user can see preview  */}
              {dragId == image.id && <ShowImage draggedImage={dragItem} />}
            </div>
            {selectedImages.includes(image.id) && (
              <div
                className={` absolute w-full h-full bg-black top-0 left-0 opacity-30 cursor-auto`}
              >
                <input
                  id={image.id}
                  defaultChecked
                  onClick={() => handleImageClick(image.id)}
                  className="h-5 w-5 ml-5 mt-5 cursor-pointer"
                  type="checkbox"
                  name="checkbox2"
                />
              </div>
            )}
          </div>
        ))}
        <AddImage setImages={setImages} images={images} />
      </div>
    </div>
  );
};
export default Gallery;
