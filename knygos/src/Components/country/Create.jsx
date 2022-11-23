import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import Country from "../../Contexts/Country";
import getBase64 from "../../Functions/getBase64";

function Create() {
  
  const [titl, setTitl] = useState('');
  const fileInput = useRef();

  const { setCreateData } = useContext(Country);
 

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const add = () => {
    
    setCreateData({
      titl,
      images: photoPrint
    });
    setTitl('');
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Categories</h5>
      <div className="card-body">
      <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input type="text" className="form-control" value={titl} onChange={e => setTitl(e.target.value)} />
                </div>
        </div>
        <div className="mb-3">
                    <label className="form-label">Categories Image</label>
                    <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                </div>
                {photoPrint ? <div className='img-bin'><img src={photoPrint} alt="upload"></img></div> : null}
        <button onClick={add} type="button" className="btn btn-outline-success">
          Add
        </button>
      </div>
      </div>
  );
}

export default Create;
