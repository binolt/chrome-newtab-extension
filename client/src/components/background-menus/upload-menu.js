import React, { useState } from 'react';
import {useDropzone} from "react-dropzone";

import {ReactComponent as ImageIcon} from "../../icons/settings/image-black-48dp.svg"
import {ReactComponent as UploadIcon} from "../../icons/file_upload-black-48dp.svg";

const UploadMenu = () => {
  return ( 
    <div className="m-upload-wrapper">
      <ImageInput/>
      <button><UploadIcon/>Upload Background</button>
    </div>
   );
}

function ImageInput(props) {
  const [tempImage, setTempImage] = useState("");
  const [tempFile, setTempFile] = useState("");
  const [imageDimensions, setImageDimensions] = useState()
  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
    accept: 'image/*',
    onDrop: acceptedFiles => {
      acceptedFiles.map((file => {
        const reader = new FileReader();
        reader.addEventListener("load", function () {
          setTempImage(this.result)
          calcDimensions(this.result);
        });
        reader.readAsDataURL(file);
        setTempFile(file);
        return file;
      }))
    }
  });

  const calcDimensions = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = function() {
      setImageDimensions({width: this.width, height: this.height})
    }
  }
  

  return (
    <div {...getRootProps({className: 'm-upload-body'})} style={{backgroundImage: tempImage && `url(${tempImage})`}}>
      <input {...getInputProps()} />
      <ImageIcon/>
      <h6>Drop your image here, or <span>browse</span></h6>
      {tempFile && <p>{tempFile.name}</p>}
      {imageDimensions && <p className="m-upload-dimensions">{imageDimensions.width} x {imageDimensions.height} px</p>}
    </div>
  );
}
 
export default UploadMenu;