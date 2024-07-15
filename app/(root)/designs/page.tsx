"use client";

import { useState, useRef } from "react";
import ImageUpload from "@/components/custom ui/ImageUpload";
import Draggable, { DraggableEvent, DraggableData } from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";
import html2canvas from "html2canvas";
import Footer from "@/components/Footer";

type ImageData = {
  url: string;
  x: number;
  y: number;
  width: number;
  height: number;
};

type ResizeCallbackData = {
  node: HTMLElement;
  size: { width: number; height: number };
  handle: any;
};

const DesignsPage = () => {
  const [frontSide, setFrontSide] = useState(true);
  const [frontImages, setFrontImages] = useState<ImageData[]>([]);
  const [backImages, setBackImages] = useState<ImageData[]>([]);
  const [color, setColor] = useState("white");
  const [previewMode, setPreviewMode] = useState(false);
  const frontRef = useRef<HTMLDivElement>(null);
  const backRef = useRef<HTMLDivElement>(null);

  const handleImageChange = (url: string) => {
    const newImage: ImageData = { url, x: 0, y: 0, width: 100, height: 100 };
    if (frontSide) {
      setFrontImages([...frontImages, newImage]);
    } else {
      setBackImages([...backImages, newImage]);
    }
  };

  const handleImageRemove = (url: string) => {
    if (frontSide) {
      setFrontImages(frontImages.filter((image) => image.url !== url));
    } else {
      setBackImages(backImages.filter((image) => image.url !== url));
    }
  };

  const handleSaveProduct = async () => {
    try {
      if (frontRef.current) {
        const frontCanvas = await html2canvas(frontRef.current, {
          useCORS: true,
          allowTaint: true,
        });
        const frontImage = frontCanvas.toDataURL("image/png");
        downloadImage(frontImage, "front-side.png");
      }
      if (backRef.current) {
        const backCanvas = await html2canvas(backRef.current, {
          useCORS: true,
          allowTaint: true,
        });
        const backImage = backCanvas.toDataURL("image/png");
        downloadImage(backImage, "back-side.png");
      }
    } catch (error) {
      console.error("Failed to save product mockup:", error);
    }
  };

  const downloadImage = (dataUrl: string, filename: string) => {
    const link = document.createElement("a");
    link.href = dataUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const getColorClass = (color: string, side: boolean) => {
    switch (color) {
      case "glacier":
        return side ? "/Glacier.jpg" : "/WhiteBackside2.jpg";
      case "lightGreen":
        return side ? "/LightGreen.jpg" : "/WhiteBackside2.jpg";
      case "darkGreen":
        return side ? "/DarkGreen.jpg" : "/WhiteBackside2.jpg";
      case "seagullGray":
        return side ? "/SeagullGray.jpg" : "/WhiteBackside2.jpg";
      case "black":
        return side ? "/BlackFrontside.jpg" : "/WhiteBackside2.jpg";
      default:
        return side ? "/WhiteFrontside.jpg" : "/WhiteBackside2.jpg";
    }
  };

  return (
    <div>
      <div className="flex flex-col items-center p-10 gap-5">
        <h1 className="text-heading4-bold">Make Your Own Custom T-shirt!</h1>

        <div className="flex gap-5">
          <button
            onClick={() => setPreviewMode(!previewMode)}
            className="px-32 py-2 border-2 rounded-lg hover:bg-grey-2 hover:text-white"
          >
            {previewMode ? "Edit" : "Preview"}
          </button>
        </div>

        <div className="flex gap-5">
          <button
            onClick={() => setFrontSide(true)}
            className={`px-9 py-2 border-2 rounded-lg ${
              frontSide ? "bg-grey-2 text-white" : "bg-gray-200"
            }`}
          >
            Front Side
          </button>
          <button
            onClick={() => setFrontSide(false)}
            className={`px-9 py-2 border-2 rounded-lg ${
              !frontSide ? "bg-grey-2 text-white" : "bg-gray-200"
            }`}
          >
            Back Side
          </button>
        </div>

        <div className="relative w-96 h-96 border border-gray-300 rounded-lg">
          <div ref={frontSide ? frontRef : backRef}>
            <img
              src={getColorClass(color, frontSide)}
              alt={frontSide ? "Front Side" : "Back Side"}
              className="object-cover rounded-lg w-full h-full"
              crossOrigin="anonymous"
            />
            {!previewMode && (
              <div className="absolute top-28 left-32 w-32 h-40 border-dashed border-2 border-gray-400">
                {(frontSide ? frontImages : backImages).map((image, index) => (
                  <Draggable
                    key={index}
                    bounds="parent"
                    position={{ x: image.x, y: image.y }}
                    onStop={(e: DraggableEvent, data: DraggableData) => {
                      if (frontSide) {
                        const newImages = [...frontImages];
                        newImages[index] = { ...image, x: data.x, y: data.y };
                        setFrontImages(newImages);
                      } else {
                        const newImages = [...backImages];
                        newImages[index] = { ...image, x: data.x, y: data.y };
                        setBackImages(newImages);
                      }
                    }}
                  >
                    <ResizableBox
                      width={image.width}
                      height={image.height}
                      minConstraints={[50.25, 50.25]}
                      maxConstraints={[127, 127]} // Constraints to fit within the 32x32 area
                      onResizeStop={(
                        e: React.SyntheticEvent,
                        data: ResizeCallbackData
                      ) => {
                        if (frontSide) {
                          const newImages = [...frontImages];
                          newImages[index] = {
                            ...image,
                            width: data.size.width,
                            height: data.size.height,
                          };
                          setFrontImages(newImages);
                        } else {
                          const newImages = [...backImages];
                          newImages[index] = {
                            ...image,
                            width: data.size.width,
                            height: data.size.height,
                          };
                          setBackImages(newImages);
                        }
                      }}
                      lockAspectRatio={true} // Maintain the aspect ratio during resizing
                    >
                      <div className="relative w-full h-full">
                        <img
                          src={image.url}
                          alt="Uploaded Design"
                          className="object-cover rounded-lg w-full h-full"
                          crossOrigin="anonymous"
                        />
                      </div>
                    </ResizableBox>
                  </Draggable>
                ))}
              </div>
            )}
            {previewMode && (
              <div className="absolute top-28 left-32 w-32 h-40 border-dashed">
                {(frontSide ? frontImages : backImages).map((image, index) => (
                  <div
                    key={index}
                    className="absolute"
                    style={{
                      top: image.y,
                      left: image.x,
                      width: image.width,
                      height: image.height,
                    }}
                  >
                    <img
                      src={image.url}
                      alt="Uploaded Design"
                      className="object-cover rounded-lg w-full h-full"
                      crossOrigin="anonymous"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {!previewMode && (
          <ImageUpload
            value={
              frontSide
                ? frontImages.map((img) => img.url)
                : backImages.map((img) => img.url)
            }
            onChange={handleImageChange}
            onRemove={handleImageRemove}
          />
        )}

        {!previewMode && (
          <div className="flex gap-5">
            <select
              value={color}
              onChange={(e) => setColor(e.target.value)}
              className="px-5 py-2 border-2 rounded-lg"
            >
              <option value="white">White</option>
              <option value="glacier">Glacier</option>
              <option value="lightGreen">Light Green</option>
              <option value="darkGreen">Dark Green</option>
              <option value="seagullGray">Seagull Gray</option>
              <option value="black">Black</option>
            </select>
          </div>
        )}

        {previewMode && (
          <button
            onClick={handleSaveProduct}
            className="outline text-base-bold px-20 py-3 rounded-lg hover:bg-black hover:text-white"
          >
            Download mockup
          </button>
        )}
      </div>
      <Footer/>
    </div>
  );
};

export default DesignsPage;
