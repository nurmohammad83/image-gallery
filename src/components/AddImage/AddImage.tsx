/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";

const AddImage = ({ setImages, images }: any) => {
  const [selectedImage, setSelectedImage] = useState(null);
  console.log(selectedImage);
  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Find the max number from the array object
    const maxIdObject = images.reduce((max: any, obj: any) =>
      parseInt(obj.id) > parseInt(max.id) ? obj : max
    );

    const selectedFile = e.target.files && e.target.files[0];
    if (selectedFile) {
      setSelectedImage(URL.createObjectURL(selectedFile));
      const addNewImage = {
        id: String(parseInt(maxIdObject.id) + 1),
        img: URL.createObjectURL(selectedFile),
      };
      setImages([...images, addNewImage]);
    }
  };
  return (
    <label
      htmlFor="file-input"
      className="min-w-[150px] min-h-[150px] flex flex-col border-2 border-dashed hover:cursor-pointer rounded-[15px] justify-center items-center "
    >
      <p className="font-bold">Add Image</p>
      <input
        className="hidden"
        type="file"
        onChange={handleImageSelect}
        id="file-input"
        accept="image/*"
      />
    </label>
  );
};

export default AddImage;
