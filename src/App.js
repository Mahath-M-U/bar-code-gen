import React,{useState} from 'react';
import './App.css';
import Barcode from 'react-barcode';
import html2canvas from 'html2canvas';
import { useReactToPrint } from 'react-to-print';


function App() {

  const [empId, setEmpId] = useState(null)
  const [floor, setFloor] = useState(null)
  const [row, setRow] = useState(null)
  const [barcodes, setBarcode] = useState(0);

  const printRef = React.useRef();

  const handleDownloadImage = async () => {
    
    const element = printRef.current;
    const canvas = await html2canvas(element);

    const data = canvas.toDataURL('image/jpg');
    const link = document.createElement('a');

    if (typeof link.download === 'string') {
      link.href = data;
      link.download = 'image.jpg';

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else {
      window.open(data);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  const genBarCode = ()=>{
    (empId && floor && row)?setBarcode(empId+floor+row):alert("Plese Enter proper vlaue")
  }

  return (
    <div className="App">
      <div className='Head'>
        <h1>Barcode Genarator</h1>
      </div>
      <div className='Inputs'>
        <input type="text" placeholder='Employee Code' value={empId} onChange={(e) => setEmpId(e.target.value)}/>
        <input type="text" placeholder='Floor No.' value={floor} onChange={(e) => setFloor(e.target.value)}/>
        <input type="text" placeholder='Row No.' value={row} onChange={(e) => setRow(e.target.value)}/>
        <button type="button" onClick={genBarCode}>Genarate Barcode</button>
        
      </div>
      <div className='bar-code' ref={printRef} >
        {barcodes?<Barcode value={barcodes}  lineColor ='#FF0000' background='#FFFFFF'  />:<h1>Good mornig</h1>}
      </div>
      <button  type="button" onClick={handlePrint}>print</button>
    </div>
  );
}

export default App;