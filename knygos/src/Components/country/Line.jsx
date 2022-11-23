import { useContext } from 'react';
import Country from '../../Contexts/Country';

function Line({ country }) {

    const { setDeleteData, setModalData } = useContext(Country);

    return (
        <li className="list-group-item">
            <div className="line" style={{
                justifyContent: 'center'
            }}>
                <div className="line__content">
                    <div className="line__content__info">
                        {country.images ? <div className='img-bin'>
                            <img src={country.images} alt={country.titl}>
                            </img>
                        </div> : <span className="red-image">No image</span>}
                    </div>
                    <div className="line__content__title" style={{
                        display: 'flex',
                        alignItems: 'center'
                    }}>
                     Country name:   {country.titl}
                    </div>
                    </div>
                <div className="line__buttons">
                    <button onClick={() => setModalData(country)} type="button" className="btn btn-outline-success">Edit</button>
                    <button onClick={() => setDeleteData(country)} type="button" className="btn btn-outline-danger">Delete</button>
                </div>
            </div>
        </li>
    )
}

export default Line;