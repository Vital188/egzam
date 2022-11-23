import { useContext } from 'react';
import Category from '../../Contexts/Category';

function Line({ category }) {

    const { setDeleteData, setModalData } = useContext(Category);

    return (
        <li className="list-group-item">
            <div className="line" style={{
                justifyContent: 'center'
            }}>
                <div className="line__content">
                    <div className="line__content__info">
                        {category.images ? <div className='img-bin'>
                            <img src={category.images} alt={category.titl}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title" style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                     Category name:   {category.titl}
                    </div>
                    </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(category)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(category)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;