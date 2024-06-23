// import Navbar from "./Navbar";
// import "../stylings/Home.css";
// import React, { useState } from "react";
// import FileBase64 from "react-file-base64";

import React, { useState } from "react";
import FileBase64 from "react-file-base64";
import "../stylings/ImageUpload.css"; // Import your CSS file
import Navbar from "./Navbar";

export default function UploadImage() {
  const [images, setImages] = useState([]);

  const handleFileUpload = (files) => {
    const newImages = files.map((file) => file.base64);
    setImages([...images, ...newImages]);
  };

  return (
    <div>
      <Navbar />
      <div className="upload-image-container">
        <h2 className="upload-image-title">Upload Images of Ingredients</h2>
        <FileBase64 multiple={true} onDone={handleFileUpload} />
        <div className="uploaded-images-container">
          {images.map((image, index) => (
            <div key={index} className="uploaded-image">
              <img
                src={image}
                alt={`Uploaded ingredient ${index}`}
                className="uploaded-image-content"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// export default function UploadImage() {
//   const [images, setImages] = useState([]);

//   const handleFileUpload = (files) => {
//     const newImages = files.map((file) => file.base64);
//     setImages([...images, ...newImages]);
//   };

//   return (
//     <div>
//       <h2>Upload Images of Ingredients</h2>
//       <FileBase64 multiple={true} onDone={handleFileUpload} />
//       <div style={{ display: "flex", flexWrap: "wrap", marginTop: "20px" }}>
//         {images.map((image, index) => (
//           <div key={index} style={{ margin: "10px" }}>
//             <img
//               src={image}
//               alt={`Uploaded ingredient ${index}`}
//               style={{ width: "150px" }}
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
