import React, { ChangeEvent, SyntheticEvent, useEffect, useState } from 'react'
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import axiosClient from '@/axios-client'
import { useStateContext } from '@/context/ContextProvider'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Loader } from 'lucide-react'

type ImageEditProps = {
    propertyId: string | string[] | undefined | Blob,
    imageId: string | number | undefined | Blob,
    imageIndex: string
}

const EditImage = ({propertyId, imageId, imageIndex}: ImageEditProps) => {

     const [errors, setErrors] = useState<string>();
     const [open, setOpen] = useState<boolean>(true);
     const [imageUrl, setImageUrl] = useState()
     const [imageFile, setImageFile] = useState<File | undefined>();
     const [loading, setLoading] = useState<boolean>(false);
     const {errorNotify, setErrorNotify, notification, setNotification} = useStateContext()
    const router = useRouter()
    

     const fetchPropertyImage = () => {
        axiosClient.get(`/property/${propertyId}`)
        .then((data) => {
          setImageUrl(data?.data?.property_image[imageIndex].url)
        })
        .catch(err => console.error(err))
      }
  
      useEffect(() => {
        fetchPropertyImage()
      }, []);

    function handleImageUpload(event: ChangeEvent<HTMLInputElement>): void {
        const target = event.target as HTMLInputElement & {
            files : FileList
          }
        setImageFile(target.files[0])
    }

    const onImageUpdate = (e: SyntheticEvent<HTMLFormElement>) => {
        e.preventDefault();
        // update
        if (typeof imageFile === 'undefined') return alert("Image field is required");

        const formData = new FormData()
        formData.append('propertyId', propertyId)
        formData.append('imageId', imageId)
        formData.append('image', imageFile)

        //Post to Server
        setLoading(true)
        axiosClient.post(`/property/image`, formData)
        .then((data) => {
            setLoading(false)
          if (data.status === 201) {
            setNotification('Image uploaded successfully')

            setTimeout(() => {
                return router.replace('/in/properties');
                // window.location.reload();
            }, 2000)
          }
        })
        .catch(err => {
          const response = err.response;
          setLoading(false)
          if (response && response.status === 422) {
                  setLoading(false)
                  setErrorNotify("An error occurred, kindly fix it before you can proceed.")
                  // console.log(data);
              if (response.data.errors) {
                  setErrors(response.data.errors)
                  console.log(response.data.errors);
              }else{
                  setErrors("Unknown error: " + response.data.msg)
              }
          }else{
              setLoading(false)
              setErrorNotify("Oops!! Some errors occurred.")
          }
        });
    }

  return (
    <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500/75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                <DialogPanel
                    transition
                    className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95 min-h-[500px]"
                >
                    <form onSubmit={onImageUpdate} encType='multipart/form-data'>
                        <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                            <div className="sm:flex sm:items-start">
                            {/* <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:size-10">
                                <ExclamationTriangleIcon aria-hidden="true" className="size-6 text-red-600" />
                            </div> */}
                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                <DialogTitle as="h3" className="text-base font-semibold text-gray-900">
                                    Update Property Image
                                </DialogTitle>
                                <div className="mt-2">

                                <div className='img-thumbnail w-full max-h-[400px] justify-center'>
                                    {
                                        imageUrl
                                        &&
                                        <Image 
                                            src={`${imageUrl}`}
                                            width={400}
                                            height={200}
                                            alt=''
                                            className='w-full max-h-[350px]'
                                        />
                                    }
                                </div>
                                
                                <input 
                                    type="file"
                                    title="Property Image"
                                    disabled={false}
                                    onChange={handleImageUpload}
                                    accept='image/png, image/jpg, image/jpeg, image/webp'
                                    className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl mt-4'
                                /> 

                                {
                                    notification
                                    &&
                                    <div className="my-2 bg-blue-400 text-white p-2">{notification}</div>
                                }

                                {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                                    {Object.keys(errors).map((key: any) => (
                                        <p key={key}>{errors[key][0]}</p>
                                    ))}
                                    </div>
                                }
                            </div>
                          </div>
                         </div>
                        </div>
                        <div className="flex flex-row justify-between items-center bg-gray-50 px-4 py-3 w-full">
                        
                            <button
                                type="submit"
                                data-autofocus
                                className="inline-flex min-w-[100px] justify-center rounded-md bg-main-100 px-3 py-2 text-sm font-semibold text-gray-100 shadow-sm hover:shadow-gray-600 max-sm:mt-0 max-sm:w-auto"
                                >
                                {
                                    loading
                                    ?
                                    <Loader/>
                                    :
                                    "Update"
                                }
                            </button>
                            <button
                                type='button'
                                onClick={() => router.replace('/in/properties')}
                                className='inline-flex w-full justify-center rounded-md bg-red-500 px-3 py-2 text-sm font-semibold text-white shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto'
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </DialogPanel>
            </div>
        </div>
    </Dialog>
  )
}

export default EditImage
