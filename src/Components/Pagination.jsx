import { useEffect, useState } from "react";
import ContestComponent from "./ContestComponents";



const Pagination = ({data}) => {
    const [page, setPage] = useState(1);
    const [number, setNumber] = useState([]);
    useEffect(() => {
        fetchData();
    }, []);


    const fetchData = async () => {
        const response = await fetch("https://dummyjson.com/products?limit=100");
        const data = await response.json();
        setProducts(data?.products);
        setNumber(Array.from({ length: 9 }, (_, index) => index + 1));
    }

    return (
        <div> 
            <h1 className=" p-2 text-4xl font-mono font-bold flex justify-center mb-4">Pagination</h1>
            {
                
            }
            {
                number?.length > 0 && <div className=" flex justify-center items-center">
                    <p
                        className={" cursor-pointer text-2xl " + (page == 1 && " hidden")}
                        onClick={() => { setPage(page - 1) }}
                    > &#x2B05;</p>
                    {

                        number.map((num, index) => {
                            return (
                                <span onClick={() => { setPage(num) }} className={" px-2 border-2 border-gray-600 m-2 cursor-pointer bg-slate-200 rounded-lg text-lg " + (page == num && " bg-slate-600 text-white")} key={index}>{num}</span>
                            )
                        })

                    }
                    <p
                        className={" cursor-pointer text-2xl " + (page == 9 && " hidden")}
                        onClick={() => { setPage(page + 1) }}
                    >&#x27A1;</p>
                </div>

            }

        </div>
    )
}

export default Pagination