import { useState } from "react";
import { useNavigate } from "react-router-dom"

function Home() {
    const [file, setFile] = useState("");
    const navigate = useNavigate()

    const getFileLocation= (e: any) => {
        e.preventDefault();
        setFile(e.target.files[0]);
    }

    const renderPDF = () => {
        navigate('/pdfViewer', {
            state: {
                pdfUrl: file
            }
        })
    }



    return(
        <div className="h-screen w-screen flex flex-col justify-center items-center">
            <input 
                type="file"
                onChange={getFileLocation}
            />
            <button onClick={renderPDF}>Render</button>
        </div>
    )
}

export default Home