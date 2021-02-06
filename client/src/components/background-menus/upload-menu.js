import React, { useEffect, useRef, useState } from 'react';
import { useGlobalAuth } from '../../context/global-context';

import {ReactComponent as ImageIcon} from "../../icons/settings/image-black-48dp.svg"

const UploadMenu = () => {
  const uploaderRef = useRef(null);
  const [tempFile, setTempFile] = useState("")
  const [tempImage, setTempImage] = useState("")
  const [imageDimensions, setImageDimensions] = useState(null);
  const {setBackgroundImage} = useGlobalAuth();
  const [isHovering, setIsHovering] = useState(false);

  const fetchLocalStorage = () => {
    const localImage = localStorage.getItem("localImage");
    if(localImage) {
      const img = localStorage.getItem("backgroundImg");
      setTempImage(img);
    }
  }

  useEffect(() => {
    fetchLocalStorage()
  }, [])

  const onChange = (e) => {
    const files = e.target.files;
    const file = files[0];
    //updates temp image to chosen file image
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        setTempImage(this.result);
        calcDimensions(this.result)
      });
      reader.readAsDataURL(file);
    }
    console.log("TEMP FILE", file)
    setTempFile(file);
  }

  const calcDimensions = (url) => {
    const img = new Image();
    img.src = url;
    img.onload = function() {
      setImageDimensions({width: this.width, height: this.height})
    }
  }


  const uploadImage = () => {
    localStorage.setItem("backgroundImg", tempImage);
    localStorage.setItem("localImage", true);
    setBackgroundImage(tempImage)

    //backend upload image to CDN

    // const data = new FormData();
    // data.append("file", tempFile);
    // data.append("upload_preset", "wincible");
  }


  return ( 
    <div className="m-upload-wrapper">
      <div style={{backgroundImage: tempImage && `url(${tempImage})`}} onClick={() => console.log(uploaderRef.current)} className="m-upload-image" onMouseLeave={() => setIsHovering(false)} onMouseOver={() => setIsHovering(true)}>
        {!tempImage && <ImageIcon/>}
        <p style={{opacity: isHovering ? 1 : 0}}>Choose Image</p>
      </div>
      {imageDimensions && <p>{imageDimensions.width}px x {imageDimensions.height}px</p>}
      <input
        encType="multipart/form-data"
        accept="image/x-png,image/gif,image/jpeg"
        ref={uploaderRef}
        type="file"
        name="file"
        placeholder="Update Image"
        onChange={onChange}
      />
      <button onClick={uploadImage}>Set Background</button>
    </div>
   );
}
 
export default UploadMenu;