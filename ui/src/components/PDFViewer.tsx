import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import 'viewerjs/dist/viewer.css';
import Viewer from 'viewerjs';

interface PDFViewerProps {
    pdfUrl?: string; 
}

const PDFViewer: React.FC<PDFViewerProps> = (props) => {
  const location = useLocation();
  const myProp = location.state && location.state.pdfUrl;
  props.pdfUrl = myProp;
  useEffect(() => {
    const canvas = document.getElementById('pdf-canvas') as HTMLCanvasElement;
    const viewer = new Viewer(canvas, {
        inline: true,
        viewed() {
          viewer.zoomTo(1);
        },
      });
  
      return () => {
        viewer.destroy();
      };
  }, [props.pdfUrl]);

  return (
    <div>
      <canvas id="pdf-canvas" />
    </div>
  );
};

export default PDFViewer;
