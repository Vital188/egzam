import { useState, useContext, useRef } from "react";
import DataContext from "../../Contexts/DataContext";
import Rubs from "../../Contexts/Rubs";
import getBase64 from "../../Functions/getBase64";
import Size from "../Data/Size";
import Clothes from "../Data/Clothes";
import Color from "../Data/Color";

function Create() {
  const [titl, setTitl] = useState('0');
  const [type, setType] = useState('0');
  const [size, setSize] = useState('0');
  const [color, setColor] = useState('0');
  const [price, setPrice] = useState("");
  const fileInput = useRef();

  const { setCreateData, country } = useContext(Rubs);
  const { makeMsg } = useContext(DataContext);

  const [photoPrint, setPhotoPrint] = useState(null);

  const doPhoto = () => {
    getBase64(fileInput.current.files[0])
      .then((photo) => setPhotoPrint(photo))
      .catch((_) => {
        // tylim
      });
  };

  const add = () => {
    if (price.replace(/[^\d.]/, "") !== price) {
      makeMsg("Invalid price", "error");
      return;
    }
    if (parseFloat(price) > 399.99) {
      makeMsg("Max price is 399.99", "error");
      return;
    }
    setCreateData({
      cat_id:  titl,
      type,
      size,
      color,
      price: parseFloat(price),
      image: photoPrint
    });
    setTitl('0')
    setType('0');
    setSize('0');
    setColor('0');
    setPrice("");
    setPhotoPrint(null);
    fileInput.current.value = null;
  };

  return (
    <div className="card m-4">
      <h5 className="card-header">New Rubs</h5>
      <div className="card-body">
      <select
          className="form-select mb-4"
          value={titl}
          onChange={(e) => setTitl(e.target.value)}
          aria-label="Default select example"
        >
          <option value={0} disabled>
            Choose country from list:
          </option>
          {country?.map((cl) => (
            <option key={cl.id} value={cl.id}>
              {cl.titl}
            </option>
          ))}
        </select>
        <select
          className="form-select mb-4"
          value={type}
          onChange={(e) => setType(e.target.value)}
          aria-label="Default select example"
        >
          <option value={0} disabled>
            Choose clothes type from list:
          </option>
          {Clothes?.map((cl) => (
            <option key={cl.id} value={cl.type}>
              {cl.type}
            </option>
          ))}
        </select>
        <select
          className="form-select mb-4"
          value={size}
          onChange={(e) => setSize(e.target.value)}
          aria-label="Default select example"
        >
          <option value={0} disabled>
            Choose size from list:
          </option>
          {Size?.map((size) => (
            <option key={size.id} value={size.type}>
             {size.type}
            </option>
          ))}
        </select>
        <select
          className="form-select mb-4"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          aria-label="Default select example"
        >
          <option value={0} disabled>
            Choose color from list:
          </option>
          {Color?.map((cl) => (
            <option key={cl.id} value={cl.type}>
            {cl.type}
            </option>
          ))}
        </select>
        <div className="mb-3">
          <label className="form-label">Price</label>
          <input
            type="number"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-3">
                    <label className="form-label">Movie Image</label>
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
