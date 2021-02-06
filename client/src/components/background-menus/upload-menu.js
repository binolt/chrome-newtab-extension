import React, { useRef, useState } from 'react';
import { useGlobalAuth } from '../../context/global-context';

const UploadMenu = () => {
  const uploaderRef = useRef(null);
  const [tempFile, setTempFile] = useState("")
  const [tempImage, setTempImage] = useState("")
  const [imageDimensions, setImageDimensions] = useState(null);
  const {setBackgroundImage} = useGlobalAuth();


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
    setBackgroundImage(tempImage)
  }


  return ( 
    <div className="m-upload-wrapper">
      <h1>upload</h1>
      {tempImage && <img src={tempImage}/>}
      <input
        encType="multipart/form-data"
        accept="image/x-png,image/gif,image/jpeg"
        ref={uploaderRef}
        type="file"
        name="file"
        placeholder="Update Image"
        onChange={onChange}
      />
      {imageDimensions && <p>Width-{imageDimensions.width}: Height-{imageDimensions.height}</p>}
      <button onClick={uploadImage}>Set Background</button>
    </div>
   );
}
 
export default UploadMenu;