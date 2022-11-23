import { useContext, useEffect, useState, useRef } from 'react';
import Book from '../../Contexts/Book'
import getBase64 from '../../Functions/getBase64';
import Year from "../Data/Year";
function Edit() {

    const [type, setType] = useState('');
    const [years, setYears] = useState('');
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

    const { setEditData, modalData, setModalData } = useContext(Book);

    const edit = () => {
        setEditData({
            type,
            years,
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
        setYears(modalData.years);
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
                        <h5 className="modal-type">Edit Book</h5>
                        <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="card m-4">
                    <div className="card-body">
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
          {Year?.map((years) => (
            <option key={years.id} value={years.type}>
             {years.type}
            </option>
          ))}
        </select>
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