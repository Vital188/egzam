import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import Book from "../../Contexts/Book";
import getBase64 from "../../Functions/getBase64";
import Year from "../Data/Year"

function Create() {
  const [titl, setTitl] = useState('0');
  const [type, setType] = useState('');
  const [years, setYears] = useState('0');
  // const [color, setColor] = useState('0');
  // const [price, setPrice] = useState("");
  const fileInput = useRef();

  const { setCreateData, category } = useContext(Book);
  const { makeMsg } = useContext(DataContext);

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
     
      });
  };

  const add = () => {
    setCreateData({
      cat_id:  parseInt(titl),
      type,
      years,
      image: photoPrint
    });
    setTitl('0')
    setType('');
    setYears('0');
    
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Book</h5>
      <div className="card-body">
      <select
          className="form-select mb-4"
          value={titl}
          onChange={(e) => setTitl(e.target.value)}
          aria-label="Default select example"
        >
          <option value={0} disabled>
            Choose category from list:
          </option>
          {category?.map((cl) => (
            <option key={cl.id} value={cl.id}>
              {cl.titl}
            </option>
          ))}
        </select>
        <div className="card-body">
                <div className="mb-3">
                    <label className="form-label">Book name</label>
                    <input type="text" className="form-control" value={type} onChange={e => setType(e.target.value)} />
                </div>
        </div>
        <select
          className="form-select mb-4"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          aria-label="Default select example"
        >
          <option value={0} disabled>
            Choose years from list:
          </option>
          {Year?.map((size) => (
            <option key={size.id} value={size.type}>
             {size.type}
            </option>
          ))}
        </select>
        
        <div className="mb-3">
                    <label className="form-label">Book Image</label>
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
