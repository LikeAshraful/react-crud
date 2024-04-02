import React, { useEffect, useState } from 'react';
import axiosInstance from '../axiosInstance';
import { toast } from 'react-toastify';
import { useParams, useNavigate } from 'react-router-dom';


const EditItem = () => {

  const { inventory_id, item_id } = useParams();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    qty:''
  });
  const [file, setFile] = useState(null); 
  const [imageUrl, setImageUrl] = useState();
  
  useEffect(() => {
      const fetchItem = async () => {
          try {
              const response = await axiosInstance.get(`/inventories/${inventory_id}/item/${item_id}`);
              const itemData = response.data;
              setFormData({
                  name: itemData.name,
                  description: itemData.description,
                  qty: itemData.quantity
              });
              setImageUrl(itemData.image_url);
          } catch (error) {
              console.error('Error fetching item:', error);
          }
      };

      fetchItem();
  }, [inventory_id,item_id ]);

  const handleChange = (e) => {
      if (e.target.name === 'file') {
          setFile(e.target.files[0]);
      } else {
          setFormData({ ...formData, [e.target.name]: e.target.value });
      }
  };
  
  const handleSubmit = async (e) => {
      e.preventDefault();
      try {
          const formDataWithFile = new FormData();
          formDataWithFile.append('name', formData.name);
          formDataWithFile.append('description', formData.description);
          formDataWithFile.append('qty', formData.qty);
          formDataWithFile.append('file', file);

          await axiosInstance.put(`/inventories/${inventory_id}/item/${item_id}`, formDataWithFile, {
              headers: {
                  'Content-Type': 'multipart/form-data', 
              },
          });

          console.log('Item updated successfully!'); 
          toast("Item updated successfully!");
          navigate(`/inventories/items/${inventory_id}`);


      } catch (error) {
          const errors = error.response.data;
          let errorMessages = [];
          for (const key in errors) {
              errorMessages = errorMessages.concat(errors[key]);
          }
          errorMessages.forEach(errorMessage => {
              toast.error(errorMessage);
          });
      }
  };

  return (
    <section className="bg-gray-1 py-20 dark:bg-dark lg:py-[120px]">
      <div className="container mx-auto">
        <div className="-mx-4 flex flex-wrap">
          <div className="w-full px-4">
            <div className="relative mx-auto max-w-[800px] overflow-hidden rounded-lg bg-white px-10 py-16 text-center dark:bg-dark-2 sm:px-12 md:px-[60px]">
              <div className='flex flex-wrap justify-between'>
                    <div className="mb-10 md:mb-16">
                        <h2>Edit Item</h2>
                    </div>
                    <div className="mb-10 md:mb-16">
                        <a className='inline-block px-6 py-2.5 border rounded-md border-primary text-primary hover:bg-primary hover:text-white font-medium mx-2' href='/inventories'> Inventory List</a>
                    </div>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                        />
                </div>
                <div className="mb-6">
                    <textarea
                        rows='5'
                        name='description'
                        placeholder='Description'
                        value={formData.description}
                        onChange={handleChange}
                        className='w-full bg-transparent rounded-md border border-stroke dark:border-dark-3 p-5 text-dark-6 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
                    />
                </div>

                <div className="mb-6">
                    <div>
                        <img src={imageUrl} alt={formData.name} className="h-20 w-auto object-contain" />
                    </div>
                    <input
                      type="file"
                      name="file"
                      onChange={handleChange}
                      className='w-full cursor-pointer rounded-md border border-stroke dark:border-dark-3 text-dark-6 outline-none transition file:mr-5 file:border-collapse file:cursor-pointer file:border-0 file:border-r file:border-solid file:border-stroke dark:file:border-dark-3 file:bg-gray-2 dark:file:bg-dark-2 file:py-3 file:px-5 file:text-body-color dark:file:text-dark-6 file:hover:bg-primary file:hover:bg-opacity-10 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2'
                    />
                </div>
                <div className="mb-6">
                    <input
                        type="number"
                        name="qty"
                        placeholder="Quantity"
                        value={formData.qty}
                        onChange={handleChange}
                        className="w-full rounded-md border border-stroke bg-transparent px-5 py-3 text-base text-body-color outline-none focus:border-primary focus-visible:shadow-none dark:border-dark-3 dark:text-white"
                        />
                </div>
        
                <div className="mb-10">
                  <input
                    type="submit"
                    value="Update"
                    className="w-full cursor-pointer rounded-md border border-primary bg-primary  px-5 py-3 text-base font-medium text-white transition hover:bg-opacity-90"
                  />
                </div>          
              </form>           
      
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditItem;

