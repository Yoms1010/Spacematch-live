'use client'

import axiosClient from '@/axios-client'
import HeaderBox from '@/components/HeaderBox'
import { useStateContext } from '@/context/ContextProvider'
import { useParams } from 'next/navigation'
import React, { Key, useEffect, useState } from 'react'
import { FaEdit } from 'react-icons/fa'
import { FaTrash } from 'react-icons/fa6'
import DataTable from 'datatables.net-react';
import 'datatables.net-select-dt';
import 'datatables.net-responsive-dt';
import DT from 'datatables.net-dt';
import EditImage from '@/components/EditImage'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { Loader } from 'lucide-react'

DataTable.use(DT);

type IdProps = {
    id : any;
}

function PropertyImagesIn({id}: IdProps) {
    const params = useParams()
    const [editMode, setEditMode] = useState(false)
    const [images, setImages] = useState<any>()
    const [property, setProperty] = useState<any>()
    const [imageIndex, setImageIndex] = useState<any>()
    const [imageId, setImageId] = useState<number | undefined | string>('')
    const [imgErrors, setImgErrors] = useState<string>()
    const [loading, setLoading] = useState<boolean>(false)
    const [imagesSelected, setImagesSelected] = useState<File[] | undefined | FileList>()
    const [propertyImagesUploaded, setPropertyImagesUploaded] = useState<boolean>(false)
    const [iNotification, setINotification] = useState<string>("")
    const {errorNotify, setErrorNotify, notification, setNotification} = useStateContext()
    const [openModal, setOpenModal] = useState(false)
    

    const fetchPropertyImages = async () => {
      await axiosClient.get(`/property/${id}`)
      .then((data) => {
        setProperty(data?.data)
        setImages(data?.data?.property_image)
      })
      .catch(err => console.error(err))
    }

    useEffect(() => {
      fetchPropertyImages()
    }, [propertyImagesUploaded]);
    
    
    
    function onEdit(id: string | number | undefined, index: number | undefined | null | Key){
      setImageId(id)
      setImageIndex(index)
      setEditMode(!editMode)
      console.log(id);
      
    }
    
    function onDelete(id: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | React.ReactPortal | Iterable<React.ReactNode> | Promise<string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | React.ReactPortal | Iterable<React.ReactNode> | null | undefined> | null | undefined): void {
      axiosClient.delete(`/property/${1}`)
      .then((data) => {
      //   setImages(data.data)          
        setNotification("Property deleted successfully")
      })
      .catch(err => console.error(err))
    }
  
      const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const target = e.target as HTMLInputElement & {
          files : FileList
        }
        setImagesSelected(target.files)
      }

      console.log(imagesSelected);
      

      const uploadPropertyImages = async (e: React.SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
    
          if(imagesSelected && imagesSelected.length != 5) return alert(`Images has to be five. You have only selected ${imagesSelected.length}`);
    
          if (typeof imagesSelected === 'undefined') return;
    
          for (let i = 0; i < imagesSelected.length; i++) {
            const file = imagesSelected[i];
            const formData = new FormData();
            formData.append('image', file);
            formData.append('property_id', property.id);
    
              //Post to Server
              setLoading(true)
              await axiosClient.post("/property/images/upload", formData)
              .then((data) => {
                if (data.status === 201) {
                  setLoading(false)
                  setPropertyImagesUploaded(true)
                  setINotification('Photos uploaded successfully')

                  setTimeout(() => typeof window && window.location.reload(), 2000)
                }
              })
              .catch(err => {
                const response = err.response;
                if (response && response.status === 422) {
                        setLoading(false)
                        setErrorNotify("An error occurred, kindly fix it before you can proceed.")
                        // console.log(data);
                    if (response.data.errors) {
                        setImgErrors(response.data.errors)
                        console.log(response.data.errors);
                    }else{
                        setImgErrors("Unknown error: " + response.data.msg)
                    }
                }else{
                    setLoading(false)
                    setErrorNotify("Oops!! Some errors occurred.")
                }
              });
          }
      }

    return (
      <div className='container m-5 p-5'>
        <HeaderBox
          title={`${property && property.title} Property Images`}
          subtext='Property image details and management'
        />
            <div className='bg-white p-3'>
            <div className='flex justify-between items-center'>
             <h1 className='mb-4 font-semibold text-3xl'>Images Table</h1>
             {images && <button onClick={() => setOpenModal(true)} className='bg-main-100 p-2 rounded text-white'>Upload Images</button>}
            </div>
            {
                images
                &&
                <>
                  <DataTable className="display ">
                      <thead>
                          <tr className='text-left'>
                              <th scope='row'>#</th>
                              <th>Title</th>
                              <th className='text-left'>Size</th>
                              <th>Format</th>
                              <th className='text-left'>Uploaded Date</th>
                              <th>Thumbnail</th>
                              <th>Action</th>
                          </tr>
                      </thead>
                      <tbody className='justify-start'>
                          {
                          images.map((item: {
                            path: any; id: string | number | undefined; image: string; size: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; format: string | number | bigint | boolean | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | React.ReactPortal | Promise<string | number | bigint | boolean | React.ReactPortal | React.ReactElement<unknown, string | React.JSXElementConstructor<any>> | Iterable<React.ReactNode> | null | undefined> | null | undefined; created_at: string; url: any 
      }, i: React.Key | null | undefined) => (
                              <tr key={i} className='font-normal text-14 text-gray-500 text-left'>
                                  <th className='text-center'>{item.id}</th>
                                  <th>{item.image.split(".")[0]}</th>
                                  <th className='text-left'>{item.size}</th>
                                  <th>{item.format}</th>
                                  <th className='text-left'>{item.created_at && item.created_at.split("T")[0]}</th>
                                  <th className='mx-auto'>
                                      <img 
                                          src={`${process.env.NEXT_PUBLIC_BACKEND_DEVELOPMENT_API}/storage/${item.path}`}
                                          width={70}
                                          height={50}
                                          alt={item.image.split(".")[0]}
                                          className='img-thumbnail bg-main-100 max-h-[50px]'
                                      />
                                  </th>
                                  <th>
                                      <div className='flex items-center space-x-3'>
                                          <FaEdit
                                              size={22}
                                              onClick={() => onEdit(item.id, i)}
                                              className='cursor-pointer'
                                          />
                                          <FaTrash
                                              size={22}
                                              onClick={() => onDelete(item.id)}
                                              className='text-red-500 cursor-pointer'
                                          />
                                      </div>
                                  </th>
                              </tr>
                              ))
                          }
                      
                      </tbody>
                  </DataTable>
                  </>
                  }
              </div> 
            {
              editMode
              &&
              <EditImage propertyId={id} imageId={imageId} imageIndex={imageIndex}/>
            }

            <div className='modal'>
              <Dialog open={openModal} onClose={setOpenModal} className="relative z-10">
                <DialogBackdrop
                  transition
                  className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
                />
    
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                  <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <DialogPanel
                      transition
                      className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95"
                    >
                      <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 min-h-[500px]">
                        <div className="sm:flex sm:items-start mb-5">
                          <div className="flex flex-row justify-between items-center mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
                            <div className="text-xl font-bold text-gray-900">
                              Images upload for {property && property.title}
                            </div>
                            <button
                              type="button"
                              data-autofocus
                              onClick={() => setOpenModal(false)}
                              className="inline-flex w-full justify-center rounded-md border-2 border-red-500 bg-white px-4 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                            >
                              X
                            </button>
                          </div>
                        </div>
    
                        <form  onSubmit={uploadPropertyImages} encType='multipart/form-data'>
                          <div className='img-thumbnail w-full min-h-[250px] p-2 mt-4'>
                            <div className='flex flex-col justify-center items-center space-y-2 px-3'>
                                <div className='flex flex-col justify-center items-center gap-2 min-h-[150px]'>
                                    {
                                      imagesSelected
                                      ?
                                      imagesSelected && [...imagesSelected].map((image) => <div className='flex flex-col items-start justify-center gap-2 text-md font-semibold'>
                                      {image.name}
                                      </div>)
                                      :
                                      <div className='flex flex-col items-center justify-center gap-2 text-md font-semibold italic text-green-600'>Kindly Upload photos for your properties</div>
                                    }
                                </div>
                                <input 
                                  type="file"
                                  title="Property Images"
                                  multiple
                                  name='images'
                                  onChange={handleImageUpload}
                                  accept='image/png, image/jpg, image/jpeg, image/wepg'
                                  className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl mt-4'
                                /> 
                                {iNotification && <div className='bg-blue-500 p-2 mt-3 rounded-md text-white shadow-lg'>
                                        <p>{iNotification}</p>
                                  </div>
                                }
                                {imgErrors && <div className='bg-red-800 p-2 my-3 rounded-md text-white shadow-lg'>
                                    {Object.keys(imgErrors).map((key: any) => (
                                        <p key={key}>{imgErrors[key][0]}</p>
                                    ))}
                                  </div>
                                }
                              </div>
                            </div>
                            <button 
                              type='submit'
                              className='btn bg-main-100 hover:bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold my-3 p-2 rounded'
                            >
                              {
                                loading ? <Loader/> : "Upload Photos"
                              }
                            </button>
                        </form>


                      </div>
                    </DialogPanel>
                  </div>
                </div>
              </Dialog>
            </div>
      </div>
    )
}

export default PropertyImagesIn