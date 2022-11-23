import { useState, useEffect, useContext } from 'react';
import Orders from "../../Contexts/Orders";
import Lines from './Lines'


function Listas() {

    const { book } = useContext(Orders);
    // const [stats, setStats] = useState({ bookCount: null });
    // const [total, setTotal] = useState({ totalPrice: null});

    // useEffect(() => {
    //     if (null === book) {
    //         return;
    //     }
    //     setStats(s => ({ ...s, bookCount: book.length }));
    // }, [book]);

    // useEffect(() => {
    //     if (null === book) {
    //         return;
    //     }
    //     setTotal(o => ({ ...o, totalPrice: book.reduce((a, b) => (a + b.price), 0) }));
    // }, [book]);


    return (
        <div className="card m-4">
            <h5 className="card-header">
                Your orders list:
                {/* cloths number: {stats.bookCount}  */}
                {/* total price: {total.totalPrice} */}
                </h5>
            <div className="card-body">

                <ul className="list-group">
                    {
                        book?.map(r => <Lines key={r.id} book={r}   />)
                    }
                </ul>  
            </div>
        </div>
        
    );
}

export default Listas;