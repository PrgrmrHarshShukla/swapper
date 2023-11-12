import React, { useEffect, useState } from 'react';
import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';

const PDFViewer = () => {
  
  const [pdfUrl, setPdfUrl] = useState<string | undefined>("");
  const [file, setFile] = useState<File | null>(null);
  const [show, setShow] = useState<boolean>(false);


  // useEffect(() => {
  //   const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
  //   const viewer = new Viewer(canvas, {
  //       inline: true,
  //       viewed() {
  //         viewer.zoomTo(1);
  //       },
  //     });
  
  //     return () => {
  //       viewer.destroy();
  //     };
  // }, [pdfUrl]);




  const getFileLocation= (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files && e.target.files[0];
      setFile(selectedFile);
  }

  const renderPDF = () => {
    if(file){
      setShow(true);

      // converting the File to a data url
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        const dataUrl = fileReader.result as string;
        // console.log("Data URL:", dataUrl);  
        setPdfUrl(dataUrl);
      };

      fileReader.readAsDataURL(file);

    }
    else{
      alert("Please select a pdf file.");
      return;
    }
  }

  return (
    <div className="w-[98vw] h-auto mx-[1vw] my-[1vh] flex flex-col gap-[1vh] justify-center items-center">

      <div className="border-2 border-gray-400 rounded-[10px] w-[98vw] h-[9vh] flex flex-row justify-around items-center">
        <input type="file" onChange={getFileLocation}/>
        <button onClick={renderPDF} className="border-2 border-gray-500 rounded-[9px] bg-blue-200 px-4 py-1 font-semibold hover:bg-blue-300 active:bg-blue-400">Render</button>
      </div>


      <div className="flex flex-col gap-[1vh] justify-center items-center  w-[98vw] h-[88vh]">
        <p className={`${show ? "hidden" : "block"}`}>Nothing to show</p>
        {/* <div 
          id="colorSwapper"
        ></div> */}
        <embed id="pdf-canvas" src={pdfUrl} type="application/pdf" width="100%" height="100%" />
      </div>
    </div>
  );
};

export default PDFViewer;
