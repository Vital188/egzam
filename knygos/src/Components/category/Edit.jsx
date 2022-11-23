import { useContext, useEffect, useState, useRef } from 'react';
import Category from '../../Contexts/Category';
import getBase64 from '../../Functions/getBase64';

function Edit() {

    const [titl, setTitl] = useState('');
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

    const { setEditData, modalData, setModalData } = useContext(Category);

    const edit = () => {
        setEditData({
            titl,
            id: modalData.id,
            deletePhoto: deletePhoto ? 1 : 0,
            images: photoPrint
        });
        setModalData(null);
        setDeletePhoto(false);
    }

    useEffect(() => {
        if (null === modalData) {
            return;
        }
        setTitl(modalData.titl);
        setPhotoPrint(modalData.images);
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
                        <h5 className="modal-type">Edit Category</h5>
                        <button onClick={() => setModalData(null)} type="button" className="btn-close"></button>
                    </div>
                    <div className="modal-body"></div>
                    <div className="card m-4">
                    <div className="card-body">
                    <div className="mb-3">
                    <label className="form-label">Category</label>
                    <input type="text" className="form-control" value={titl} onChange={e => setTitl(e.target.value)} />
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