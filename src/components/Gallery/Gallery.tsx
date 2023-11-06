import { useState } from "react";
import { galleryImages } from "../../data/images";
import { IImage } from "../../interfaces/interface";
import ShowImage from "../ShowImage";

const Gallery = () => {
  // get all data
  const [images, setImages] = useState(galleryImages as IImage[]);
  const [selectedItems, setSelectedItems] = useState([] as string[]);

  // store selected item
  const [dragItem, setDragItem] = useState<IImage | null>(null);
  const [dragId, setDragId] = useState<string | null>(null);

  const handleItemClick = (imageId: string) => {
    if (selectedItems.includes(imageId)) {
      const currentImage = selectedItems.filter((id) => id !== imageId);
      setSelectedItems(currentImage);
    } else {
      setSelectedItems([...selectedItems, imageId]);
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
  // selected data delete
  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const deleteItemFilter = images.filter(
      (image) => !selectedItems.includes(image?.id)
    );
    setImages(deleteItemFilter);
    setSelectedItems([]);
  };
  return (
    <div className="pb-6 font-roboto px-2 root-gallery">
      <div className="py-5">
        <p className="text-2xl font-bold  flex items-center ">Image Gallery</p>
       {
        selectedItems.length > 0 && (
          <div className="flex justify-between items-center p-5 ">
          <div className="flex justify-center items-center">
            <input
              className="w-4 h-4 cursor-pointer"
              type="checkbox"
              checked
              readOnly
            />
            <p className="pl-2 text-xl font-bold">
              {selectedItems.length} {selectedItems.length === 1 ?'File' : 'Files'} Selected
            </p>
          </div>
          <div className="">
            <button onClick={handleDelete} className="text-red-500 font-bold">
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
              {dragId === image.id && <ShowImage image={dragItem} />}
              {/* selected items */}
              {selectedItems.includes(image.id) && (
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
  );
};
export default Gallery;
