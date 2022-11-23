import { useContext, useEffect, useState, useRef } from 'react';
import Rubs from '../../Contexts/Rubs'
import getBase64 from '../../Functions/getBase64';
import Size from "../Data/Size";
import Clothes from "../Data/Clothes";
import Color from "../Data/Color";

function Edit() {

    const [type, setType] = useState('');
    const [size, setSize] = useState('');
    const [color, setColor] = useState('')
    const [price, setPrice] = useState('');
    const fileInput = useRef();
    const [photoPrint, setPhotoPrint] = useState(null);
    const [deletePhoto, setDeletePhoto] = useState(false);

    const doPhoto = () => {
        getBase64(fileInput.current.files[0])
            .then(photo => setPhotoPrint(photo))
            .catch(_ => {
                // tylim
            })
    }

    const { setEditData, modalData, setModalData } = useContext(Rubs);

    const edit = () => {
        setEditData({
            type,
            size,
            color,
            price: parseFloat(price),
            id: modalData.id,
            deletePhoto: deletePhoto ? 1 : 0,
            image: photoPrint
        });
        setModalData(null);
        setDeletePhoto(false);
    }

    useEffect(() => {
        if (null === modalData) {
            return;
        }
        setType(modalData.type);
        setSize(modalData.size);
        setColor(modalData.color);
        setPrice(modalData.price);
        setPhotoPrint(modalData.image);
        setDeletePhoto(false);
    }, [modalData])

    if (null === modalData) {
        return null;
    }

    return (

        <div className="modal">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-type">Edit Rubs</h5>
                        <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="card m-4">
                    <div className="card-body">
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
            type="text"
            className="form-control"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
                            <div className="mb-3">
                                <label className="form-label">Image</label>
                                <input ref={fileInput} type="file" className="form-control" onChange={doPhoto} />
                            </div>
                            {photoPrint ? <div className='img-bin'>
                                <label htmlFor="image-delete">X</label>
                                <input id="image-delete" type="checkbox" checked={deletePhoto} onChange={() => setDeletePhoto(d => !d)}></input>
                                <img src={photoPrint} alt="upload"></img>
                            </div> : null}
                            <button onClick={edit} type="button" className="btn btn-outline-success">Save</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Edit;