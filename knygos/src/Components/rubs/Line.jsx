import { useContext } from 'react';
import Rubs from '../../Contexts/Rubs';

function Line({ rubs }) {

    const { setDeleteData, setModalData } = useContext(Rubs);

    return (
        <li className="list-group-item">
            <div className="line" style={{
                justifyContent: 'center'
            }}>
                <div className="line__content" style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                <div className="line__content__info">
                        {rubs.images ? <div className='img-bin'>
                            <img src={rubs.images} alt={rubs.type}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title">
                     Country:   {rubs.titl}
                    </div>
                    <div className="line__content__info">
                        {rubs.image ? <div className='img-bin'>
                            <img src={rubs.image} alt={rubs.type}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__info">
                     <b>Type:</b>   {rubs.type}
                    </div>
                    <div className="line__content__info">
                    <b> Size:</b>   {rubs.size}
                    </div>
                    <div className="line__content__info">
                    <b> Color:</b>   {rubs.color}
                    </div>
                    <div className="line__content__info">
                    <b> Price:</b>   {rubs.price}
                    </div>
                </div>
                <div className="line__buttons" style={{
                    margin: '0px'
                }}>
                    <button onClick={() => setModalData(rubs)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(rubs)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;