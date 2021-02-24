import React, { useState } from 'react';
import {useDropzone} from "react-dropzone";

import {ReactComponent as ImageIcon} from "../../icons/settings/image-black-48dp.svg"
// import {ReactComponent as UploadIcon} from "../../icons/file_upload-black-48dp.svg";
import { useGlobalAuth } from '../../context/global-context';


const UploadMenu = () => {
  const [tempImage, setTempImage] = useState("");
  const [tempFile, setTempFile] = useState("");
  // const [imageDimensions, setImageDimensions] = useState()

  const {setBackgroundImage} = useGlobalAuth();


  const handleChange = (file) => {
    const reader = new FileReader();
    reader.addEventListener("load", function () {
      setTempImage(this.result)
      // calcDimensions(this.result);
    });
    reader.readAsDataURL(file);
    setTempFile(file);
  }
  
  // const calcDimensions = (url) => {
  //   const img = new Image();
  //   img.src = url;
  //   img.onload = function() {
  //     setImageDimensions({width: this.width, height: this.height})
  //   }
  // }

  const handleCancel = () => {
    setTempFile("");
    setTempImage("")
  }

  const handleUpload = () => {
    setBackgroundImage(tempImage);
    localStorage.setItem("backgroundImg", tempImage)
  }


  return ( 
    <div className="m-upload-wrapper">
      <ImageInput handleChange={handleChange}/>
      {tempFile && tempImage && 
      <div className="m-upload-data">
        <div className="m-upload-data-left">
          <div className="m-upload-data-img" style={{backgroundImage: tempImage && `url(${tempImage})`}}/>
          <span>
          <h6>{tempFile && tempFile.name}</h6>
          <p>{tempFile && `${tempFile.size}KB`}</p>
          </span>
        </div>
        <div className="m-upload-data-right">
          <button onClick={handleUpload}>Upload</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </div> 
      }
    </div>
   );
}

function ImageInput({handleChange}) {
  const {getRootProps, getInputProps} = useDropzone({
    maxFiles: 1,
    accept: 'image/*',
    onDrop: acceptedFiles => {
      acceptedFiles.map((file => {
        handleChange(file)
        return file;
      }))
    }
  });

  return (
    <div {...getRootProps({className: 'm-upload-body'})}>
      <input {...getInputProps()} />
      <ImageIcon/>
      <h6>Drop your image here, or <span>browse</span></h6>
    </div>
  );
}
 
export default UploadMenu;