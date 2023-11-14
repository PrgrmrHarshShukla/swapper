import React, { useState } from 'react';
import '@fortawesome/fontawesome-free/css/all.css'

const PDFViewer = () => {
  
  const [pdfUrl, setPdfUrl] = useState<string | undefined>("");
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const [showE, setShowE] = useState<boolean>(true);
  const [showC, setShowC] = useState<boolean>(false);
  const [showButton, setShowButton] = useState<boolean>(true);
  const [showMenu, setShowMenu] = useState<boolean>(true);
  const [pdfHeight, setPdfHeight] = useState<string>("h-[88vh] w-[98vw]");
  const [mainDivDimensions, setMainDivDimensions] = useState<string>("w-[98vw] h-auto mx-[1vw] my-[1vh]");


  const getFileLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
      const selectedFile = e.target.files && e.target.files[0];
      if(selectedFile){
        setFile(selectedFile);
        setFileName(selectedFile.name);
      }
  }

  const renderPDF = () => {
    if(file){
      setShow(true);
      setShowButton(false);

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

  const handleExpand = () => {
    if(file){
      setMainDivDimensions("w-[100vw] h-[100vh] mx-0 my-0");
      setPdfHeight("h-[100vh]  w-[100vw]")
      setShowMenu(false);
    }
    setShowE(false);
    setShowC(true);
  }

  const handleCompress = () => {
    setMainDivDimensions("w-[98vw] h-auto mx-[1vw] my-[1vh]");
    setPdfHeight("h-[88vh] w-[98vw]")
    setShowMenu(true);
    setShowC(false);
    setShowE(true);
  }

  const resetPdf = () => {
    setShowButton(true);
    location.reload();
    setFile(null);
    setPdfUrl("");
  }

  return (
    <div className={`${mainDivDimensions} flex flex-col gap-[1vh] justify-center items-center overflow-y-hidden`}>

      <div className={`${showMenu ? "block" : "hidden"} border-2 border-black rounded-[10px] w-[98vw] h-[9vh] flex flex-row justify-around items-center`}>

        <div className="flex flex-row justify-center items-center gap-[1vw]">
          <label htmlFor="file-input" className={` ${showButton ? "block" : "hidden"} border-2 border-black rounded-[9px] bg-blue-200 px-4 py-1 sm:font-semibold hover:bg-blue-300 active:bg-blue-400`}>Choose File</label>
          <input id="file-input" style={{ display: 'none' }} type="file" onChange={getFileLocation}/>
          <input type="text" placeholder="File Name" className={` ${showButton ? "hidden" : "block"} bg-blue-200 px-2 py-1 border-2 border-black rounded-[9px] max-w-[30vw] sm:max-w-[50vw] sm:w-[50vw] text-black`} value={fileName} />
        </div>

        <div className="flex flex-row justify-center items-center gap-[1vw]">
          <button onClick={renderPDF} className="border-2 border-black rounded-[9px] bg-blue-200 px-4 py-1 font-semibold hover:bg-blue-300 active:bg-blue-400">Render</button>
          <button onClick={resetPdf} className="border-2 border-black rounded-[9px] bg-red-200 px-4 py-1 font-semibold hover:bg-red-300 active:bg-red-400">Reset</button>
        </div>

      </div>


      <div className={`z-10 flex flex-col gap-[1vh] justify-center items-center ${pdfHeight} `}>
        <p className={`${show ? "hidden" : "block"} h-[88vh] text-black font-semibold`}>{'After selecting your pdf, click "Render"'}</p>
        <embed className={`${show ? "block" : "hidden"}`} id="pdf-canvas" src={pdfUrl} type="application/pdf" width="100%" height="100%" />
      </div>

      <div className={`${showE ? "block" : "hidden"}  fixed z-30 translate-y-[42vh] translate-x-[38vw] sm:translate-y-[46vh] sm:translate-x-[47vw] w-12 h-12 border-2 border-black rounded-full flex flex-col justify-center items-center hover:bg-blue-300 active:bg-blue-400 bg-blue-200`} onClick={handleExpand}>
        <i className={`fas fa-expand`}></i>
      </div>
      <div className={`${showC ? 'block' : 'hidden'} fixed z-30 translate-y-[42vh] translate-x-[38vw] sm:translate-y-[46vh] sm:translate-x-[47vw] w-12 h-12 border-2 border-black rounded-full flex flex-col justify-center items-center hover:bg-blue-300 active:bg-blue-400 bg-blue-200`} onClick={handleCompress}>
        <i className={`fas fa-compress`}></i>
      </div>


    </div>
  );
};

export default PDFViewer;
