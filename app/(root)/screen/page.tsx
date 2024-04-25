import { Upload } from "lucide-react";
import Image from "next/image";

const screen = () => {
  return (
    <div className="flex justify-center items-start gap-16 py-10 px-5 max-md:flex-col max-md:items-center">
      <div className="flex flex-col gap-8">
        <Image
          src="/banner.png"
          width={500}
          height={500}
          alt="screen"
          className="w-96 h-96 rounded-lg shadow-xl object-cover"
        />
        <div className="flex justify-center gap-8">
          <button className="outline text-base-bold px-3 py-3 rounded-lg hover:bg-black hover:text-white">
            Front side
          </button>
          <button className="outline text-base-bold px-4 py-3 rounded-lg hover:bg-black hover:text-white">
            Back side
          </button>
        </div>
        <div className="flex flex-col gap-8">
          <button className="relative flex gap-4 justify-center outline text-base-bold px-2 py-2 rounded-lg hover:bg-black hover:text-white">
            <Upload />
            <p className="py-1">Upload</p>
          </button>
          <button className="outline text-base-bold px-3 py-3 rounded-lg hover:bg-black hover:text-white">
            Save Product
          </button>
        </div>
      </div>
    </div>
  );
};

export default screen;
