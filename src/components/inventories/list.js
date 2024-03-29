
import React, {useState, useEffect} from "react";
import axiosInstance from "../axiosInstance";

const TdStyle = {
  TdStyle: `text-dark border-b border-l border-[#E8E8E8] bg-[#F3F6FF] dark:bg-dark-3 dark:border-dark dark:text-dark-7 py-2 px-2 text-center text-base font-medium`,
  TdStyle2: `text-dark border-b border-[#E8E8E8] bg-white dark:border-dark dark:bg-dark-2 dark:text-dark-7 py-2 px-2 text-center text-base font-medium`,
}



const ListInventory = () => {

    const [list, setList] = useState([]);

    const getList = async () => {
        try {
            const response = await axiosInstance.get('/inventories');
            const data = response.data;
            console.log(data);
            setList(data);
        } catch (error) {
            console.error('Error fetching list:', error);
        }
    }

    const deleteInventory = async (id) => {
        try {
            await axiosInstance.delete(`/inventories/${id}`);
            getList();
        } catch (error) {
            console.error('Error deleting inventory:', error);
        }
    }

    useEffect(() => {
        getList();
    }, []);


  return (
    <section className='bg-white dark:bg-dark py-20 lg:py-[120px]'>
        <div className='container'>
            <div className='flex flex-wrap justify-between -mx-4'>
                <div className=' px-4'>
                    <div className='mb-10 md:mb-16'>     
                    <h2 className="uppercase">Inventory List</h2>
                    </div>
                </div>
                <div className='px-4 text-right'>
                    <div className='mb-10 md:mb-16'>                        
                        <a href="/inventory/create" className="inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium mx-2">
                            Add New Inventory
                        </a>            
                    </div> 
                </div>
            </div>
        </div>
        <div className='container'>
            <div className='flex flex-wrap -mx-4'>
            <div className='w-full '>
                <div className='max-w-full overflow-x-auto'>
                <table className='w-full table-auto'>
                    <thead className='text-center bg-primary'>
                    <tr>
                        <th className="w-1/12 max-w-[80px] border-l border-transparent py-1 px-3 text-lg font-medium text-white lg:py-2 lg:px-4"> Sl </th>
                        <th className="w-3/12 min-w-[160px] border-l border-transparent py-1 px-3 text-lg font-medium text-white lg:py-2 lg:px-4"> Name </th>
                        <th className="w-5/12 min-w-[160px] border-l border-transparent py-1 px-3 text-lg font-medium text-white lg:py-2 lg:px-4"> Description </th>
                        <th className="w-2/12 max-w-[160px] border-l border-transparent py-1 px-3 text-lg font-medium text-white lg:py-2 lg:px-4"> Action </th>
                    </tr>
                    </thead>

                    <tbody>
                        {list.map((item, index) => (
                            <tr key={index}>
                                <td className={TdStyle.TdStyle}>{index + 1}</td>
                                <td className={TdStyle.TdStyle2}>{item.name}</td>
                                <td className={TdStyle.TdStyle}>{item.description}</td>
                                <td className={TdStyle.TdStyle2}>
                                    <a href={`/inventory/edit/${item.id}`} className="inline-block px-2 py-2 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-small mx-1">
                                        Edit
                                    </a>
                                    <button onClick={() => deleteInventory(item.id)} className="inline-block px-2 py-2 border rounded-md border-red text-red hover:bg-red hover:text-white font-small mx-1">
                                        Delete
                                    </button>
                                    <a href={`/inventory/items/${item.id}`} className="inline-block px-2 py-2 border rounded-md border-blue text-blue hover:bg-blue hover:text-white font-small ">
                                        Items
                                    </a>
                                </td>
                            </tr>
                        ))}                    
                    </tbody>
                </table>
                </div>
            </div>
            </div>
        </div>
    </section>

  )
};

export default ListInventory;
