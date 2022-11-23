import Orders from "../../Contexts/Orders";
import { useState, useEffect } from 'react';
import axios from 'axios';
import { authConfig } from '../../Functions/auth';
import Listas from '../Orderis/Listas'

function Main() {

    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [book, setBook] = useState (null)

console.log(book)

    // READ for list
    useEffect(() => {
           axios.get('http://localhost:3003/book/wc', authConfig())
            .then(res => {
                setBook(((res.data)));
            })
    }, [lastUpdate]);

   
    return (
        <Orders.Provider value={{
            book
        }}>
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <Listas />
                    </div>
                </div>
            </div>
        </Orders.Provider>
    );
}

export default Main;