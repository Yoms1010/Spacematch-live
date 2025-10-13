'use client'


import HeaderBox from '@/components/HeaderBox'
import PropertyInputField from '@/components/PropertyInputField'
import { countryCode, nigeria } from '@/constants'
import { User } from '@/types'
import { PlusCircleIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import { Loader, Loader2, Trash2 } from 'lucide-react'
import React, { useState, useCallback,useMemo, SyntheticEvent, ChangeEvent, Suspense, useRef, useEffect } from 'react'
import { toast } from 'react-toastify'
import { UploadCloud, X } from 'lucide-react';

// Define the type for a single file entry in our state
interface FileEntry {
  file: File;
  previewUrl: string;
}

// Custom hook to manage the state of files and ensure cleanup of Object URLs
// We use a custom hook to correctly isolate the effect logic for cleanup.
  const useFilePreviews = (rawFiles: File[] = []) => {
  const [selectedFiles, setSelectedFiles] = useState<FileEntry[]>([]);

  // Effect runs whenever the rawFiles array changes.
  useEffect(() => {
    // 1. Create a new set of FileEntry objects with fresh preview URLs
    const newFileEntries: FileEntry[] = rawFiles.map(file => ({
      file,
      previewUrl: URL.createObjectURL(file),
    }));

    setSelectedFiles(newFileEntries);

    // 2. CRITICAL Cleanup function: Revoke all object URLs when the component unmounts
    // or before the effect runs again (when rawFiles changes).
    return () => {
      newFileEntries.forEach(entry => URL.revokeObjectURL(entry.previewUrl));
    };
  }, [rawFiles]); // Dependency is the array of raw File objects

  return selectedFiles;
};



const PropertyUpload = ({ user }: {user: User}) => {
  
  const [agent, setAgent] = useState<any>()
  const [loading, setLoading] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [isAgentsLoading, setIsAgentsLoading] = useState(false);
  const [propertyId, setPropertyId] = useState<any>(typeof window !== "undefined" && window.localStorage.getItem("image_property_id"))
  const [isAmenityLoading, setIsAmentyLoading] = useState(false)
  const [document, setDocument] = useState<File | undefined | FileList | any>()
  const [imagesUploaded, setImagesUploaded] = useState<any>()
  const [inputFields, setInputFields] = useState([{ value: '' }]);
  
  const [form, setForm] = useState<any>({
    developerId : "",
    title: "",
    squareMeters: "",
    city: "",
    lga: "",
    state: "",
    country: "",
    total_cost: "",
    cost_per_sqm: "",
    description: "",
  })

  const agentIdRef = useRef<any>(0)

  // rawFiles stores the actual File objects, used as the source of truth for the custom hook
  const [rawFiles, setRawFiles] = useState<File[] | any>([]);
  
  // selectedFiles is derived from rawFiles and includes the preview URLs with automatic cleanup
  const selectedFiles = useFilePreviews(rawFiles);
  const [isDragOver, setIsDragOver] = useState(false);

  // --- Handlers ---

  const handleFiles = useCallback((files: FileList) => {
    // Convert FileList to Array and filter for only images
    const newFilesArray = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    // Add new, valid files to the existing state
    setRawFiles((prevRaw: any) => [...prevRaw, ...newFilesArray]);
  }, []);

  useEffect(() => {
    if (rawFiles.length > 5) toast.error("You cannot upload more than 5 images")
  }, [rawFiles])


  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      handleFiles(event.target.files);
      event.target.value = ''; 
    }
  }, [handleFiles]);


  const handleDocumentUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement & {
      files : FileList
    }
    setDocument(target.files[0])
  }

  
  const onSubmitProperty = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const formData = new FormData()

      formData.append("developer_id", user?.whoId?.split(";")[1])
      formData.append("agent_id", agentIdRef.current.value)
      formData.append("title", form.title)
      formData.append("squareMeters", form.squareMeters)
      formData.append("city", form.city)
      formData.append("lga", form.lga)
      formData.append("state", form.state)
      formData.append("country", form.country)
      formData.append("total_cost", form.total_cost)
      formData.append("cost_per_sqm", form.cost_per_sqm)
      formData.append("description", form.description)
      formData.append("document", document)

      const payLoad = {
        method: 'POST',
        body: formData,
      }

      if (!agentIdRef.current.value) {
        return toast.error("Select agent from searched result...")
      }
      if (user.isSubscribed === "No") return toast.error(`You are yet to subscribe.. Kindly subscribe to get instant access to your property upload.`)

      //Send to Backend
      setLoading(true)
      const res = await fetch(`/api/property/details`, payLoad)

      const response  = await res.json()
      setLoading(false)
      console.log(response);
      const resp = JSON.parse(response.data)

      if (resp.msg === "success") {
        setPropertyId(resp.property_id)
        console.log(resp.property_id)
        
        typeof window !== "undefined" && window.localStorage.setItem("image_property_id", resp.property_id)
        toast.success("Property details was successfully uploaded. Kindly proceed to upload the images.")
      }
      
    } catch (error) {
      console.log(error);
      toast.error(`${error}`)
    }

  }

  const uploadPropertyImages = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
      try {
        if(rawFiles && rawFiles.length !== 5) return toast.error("Images has to be Five. Not less or more than five.");
        if (typeof rawFiles === 'undefined') return toast.error("You are yet to select any image.");
        for (let i = 0; i < rawFiles.length; i++) {
          const file = rawFiles[i];
          console.log(file);
          
          const formData = new FormData();
          formData.append('property_id', propertyId);
          formData.append('image', file);

          const payLoad = {
              method: 'POST',
              body: formData,
          }
          //Post to Server
          setIsLoading(true)
          const res = await fetch("/api/property/images", payLoad)
          
          setIsLoading(false)
          const resp = await res.json()
          console.log(resp);
          // const response = JSON.parse(resp)
          
          if (resp.message === "successful") {
            setImagesUploaded(true)
            typeof window !== "undefined" && window.localStorage.removeItem("image_property_id")
            toast.success(`${file.name} uploaded successfully`)
          }
        }
      } catch (error) {
        console.log(error);
        toast.error(`${error}`)
      }
  }

  const uploadPropertyAmenities = async () => {
    try {
      if (!propertyId) return toast.error("Please upload property details first")
      for (let i = 0; i < inputFields.length; i++) {
        const payLoad = {
          property_id: propertyId,
          title: inputFields[i].value,
          active: "Yes"
        }
        setIsAmentyLoading(true)
        await axios.post("/api/property/amenities", payLoad)
        .then((data) => {
          setIsAmentyLoading(false)
          console.log(data);
          toast.success(`${i+1}st property amenity Successfully Uploaded`)
        })
        .catch(err => {
          setIsAmentyLoading(false)
          console.log(err);
        })
      }
    } catch (error) {
      console.log(error);
    }
  }

  //Get all agents in the inputed property location
  const getLocationAgent = async () => {
    const payLoad= {
      city: form.city,
      lga: form.lga,
      state: form.state,
      country: form.country,
    }
    setIsAgentsLoading(true)
    await axios.post("/api/property/agents", payLoad)
      .then((data) => {
        setIsAgentsLoading(false)
        // console.log(data.data);
        setAgent(data.data)
      })
      .catch(err => {
        setIsAgentsLoading(false)
        console.log(err);
      })
  }

    const handleAddInput = () => {
      setInputFields([...inputFields, { value: '' }]);
    };

    const handleChangeInput = (index: any, event: any) => {
        const newInputs = [...inputFields];
        newInputs[index].value = event.target.value;
        setInputFields(newInputs);
    };

    const handleDeleteInput = (index: any) => {
      const newInputs = [...inputFields];
      newInputs.splice(index, 1);
      setInputFields(newInputs);
    };

  // --- Drag and Drop Handlers ---
  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, [handleFiles]);

  const handleRemoveFile = useCallback((fileToRemove: File) => {
    // Filter out the file from the rawFiles state.
    // The useFilePreviews hook will automatically handle revoking the old URL and creating new state.
    setRawFiles((prevRaw: any[]) => prevRaw.filter(file => file !== fileToRemove));
  }, []);
  
  // Memoized total size calculation
  const totalSize = useMemo(() => {
    return selectedFiles.reduce((sum, entry) => sum + entry.file.size, 0);
  }, [selectedFiles]);
  
  const formatBytes = (bytes: number, decimals = 2) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
  };
  
  // console.log(rawFiles);
  
  // --- Render Functions ---

  const renderDragDropArea = () => (
    <div 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        aria-disabled={!propertyId}
        className={`border-2 border-dashed ${isDragOver ? 'border-purple-500 bg-purple-50' : 'border-gray-300 bg-white'} rounded-xl p-8 text-center transition-colors duration-200 cursor-pointer`}
        onClick={() => typeof window !== "undefined" && window.document.getElementById('file-upload-input')?.click()}
    >
      <input 
        type="file" 
        id="file-upload-input" 
        multiple 
        accept="image/jpg, image/jpeg, image/png" 
        onChange={handleFileChange} 
        disabled={!propertyId}
        className="hidden" 
      />
      <UploadCloud className={`w-12 h-12 mx-auto ${isDragOver ? 'text-purple-600' : 'text-gray-400'}`} />
      <p className="mt-2 text-sm text-gray-600">
        <span className="font-semibold text-purple-600">Click to upload</span> or drag and drop images here.
      </p>
      <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF up to 5MB each</p>
    </div>
  );


  const renderFilePreviews = () => (
    <div className="mt-6 space-y-4">
      <div className="flex justify-between items-center pb-2 border-b border-gray-200">
          <h3 className="text-lg font-bold text-gray-800">
              {selectedFiles.length} File{selectedFiles.length !== 1 ? 's' : ''} Selected
          </h3>
          <span className="text-sm font-medium text-gray-600">Total Size: {formatBytes(totalSize)}</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {selectedFiles.map((entry, index) => (
          <div key={entry.previewUrl} className="relative w-full aspect-square rounded-xl overflow-hidden shadow-md group">
            {/* Image Preview */}
            <img 
              src={entry.previewUrl} 
              alt={`Preview ${index + 1}`} 
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
            
            {/* Remove Button Overlay */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent the main div click event
                handleRemoveFile(entry.file);
              }}
              type='button'
              className="absolute top-2 right-2 p-1 bg-red-600 text-white rounded-full opacity-80 hover:opacity-100 transition-opacity duration-200 shadow-lg"
              aria-label={`Remove ${entry.file.name}`}
            >
              <X className="w-4 h-4" />
            </button>
            
            {/* File Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1">
                <p className="text-white text-xs truncate">{entry.file.name}</p>
                <p className="text-gray-300 text-xs">{formatBytes(entry.file.size)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );


    // console.log(propertyId);
    

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className='container mb-5 px-5'>
        <HeaderBox
            title='Property Upload'
            subtext='Property Upload sections'
          />
          <div className='col-md-12 mt-[50px] bg-white p-5'>
              <div className='row'>
                <form onSubmit={onSubmitProperty} className='col-md-7 flex flex-col gap-5'>

                  <div className='row'>
                    <PropertyInputField
                      title="Title"
                      type='text'
                      name='title'
                      value={form.title}
                      handleChangeText={(e: any) => setForm({...form, title: e.target.value})}
                      placeholder='Enter the property title'
                      disabled={false}
                      required={true}
                      otherStyles='col-md-6'
                    /> 
                    <PropertyInputField
                      title="Square Meters"
                      type='text'
                      name='squareMeters'
                      value={form.squareMeters}
                      handleChangeText={(e: any) => setForm({...form, squareMeters: e.target.value})}
                      placeholder='Enter property square meters'
                      disabled={false}
                      required={true}
                      otherStyles='col-md-6'
                    /> 
                  </div>

                  <div className='row'>
                    <PropertyInputField
                      title="City"
                      type='text'
                      value={form.city}
                      handleChangeText={(e: any) => setForm({...form, city: e.target.value})}
                      placeholder='Your office city'
                      disabled={false}
                      required={true}
                      otherStyles='col-md-6'
                    /> 

                    <div className={`space-y-2 col-md-6`}>
                      <div className="text-14 text-gray-600 font-semibold">State</div>
                      <select 
                        value={form.state}
                        onChange={(e: any) => setForm({...form, state: e.target.value})}
                        className='p-2 w-full outline-none border  rounded-xl'>
                        {
                          nigeria.map((item, i) => (
                            <option value={item.state} key={i}>{item.state}</option>
                          ))
                        }  
                      </select>
                    </div>
                  </div>

                  <div className='row'>
                    <div className={`space-y-2 col-md-6`}>
                      <div className="text-14 text-gray-600 font-semibold">Local Government Area</div>
                      <select
                       value={form.lga}
                       onChange={(e: any) => setForm({...form, lga: e.target.value})}
                       className='p-2 w-full outline-none border  rounded-xl'>
                        {
                          form.state
                          ?
                            nigeria.map((item, i) => (
                              item.state == form.state
                              &&
                                item.lga.map((lga, i) => (
                                  <option value={lga} key={i}>{lga}</option>
                                  ))
                            ))
                          :
                          <option value="" disabled>Select a State First</option>
                        }
                      </select>
                    </div>

                    <div className={`space-y-2 col-md-6`}>
                      <div className="text-14 text-gray-600 font-semibold">Country</div>
                      <select 
                        value={form.country}
                        onChange={(e: any) => setForm({...form, country: e.target.value})}
                        className='p-2 w-full outline-none border  rounded-xl'>
                        {
                          countryCode.map((item, i) => (
                            <option value={item.name} key={i}>{item.name}</option>
                          ))
                        }  
                      </select>
                    </div>
                  </div>

                  <div className={`space-y-3 col-12 my-5`}>
                    <div className="text-16 text-gray-600 font-semibold mb-1">Available Agent(s) Based on location (Nearest to Location)</div>
                      <div className="flex flex-col justify-start py-2 gap-4 items-start w-full border border-gray-500 h-[200px] overflow-y-scroll rounded-xl">
                          {
                            isAgentsLoading
                            ?
                            <div className='flex justify-center items-center w-full h-full'>
                              <Loader className='animate-spin'/>
                            </div>
                            :
                            <>
                              {
                                agent ? agent.map((item: any, i: any) => (
                                  item.state == form.state
                                  ?
                                  <div key={i} className='px-4 pb-4 h-[100px]'>
                                      <div className='flex items-center'>
                                        <input
                                        type="radio" 
                                        value={item.id}
                                        ref={agentIdRef}
                                        />
                                        {/* <div> */}
                                          <div className='ml-5'>
                                            <h3 className='text-sm font-semibold text-gray-900 my-1'>{item.name}</h3>
                                            {/* <p className='text-xs text-gray-500'>${item.city}</p> */}
                                            <div className='flex flex-col justify-center items-start gap-1 my-1'>
                                              <div className='text-xs text-gray-500 flex justify-center space-x-2'>
                                                <div>City:</div> <div>{item.city}</div>
                                              </div>
                                              <div className='text-xs text-gray-500 flex justify-center space-x-2'>
                                                <div>Local Government:</div> <div>{item.lga}</div>
                                              </div>
                                              <div className='text-xs text-gray-500 flex justify-center space-x-2'>
                                                <div>State:</div> <div>{item.state}</div>
                                              </div>
                                              <div className='text-xs text-gray-500 flex justify-center space-x-2'>
                                                <div>Country:</div> <div>{item.country}</div>
                                              </div>
                                            </div>
                                          </div>
                                      </div>
                                    </div>
                                  :
                                  ""
                                ))
                                :
                                <div className='px-4'>No options yet (Fill all location fields)</div>
                              }
                            </>
                          } 
                    </div>
                    <button onClick={getLocationAgent} className='p-2 w-full bg-main-100 rounded-md text-white font-semibold' disabled={!form.lga &&!form.country}>Search Agents</button>
                  </div>

                  <div className='row my-3'>
                    <PropertyInputField
                      title="Total Property Cost"
                      type='text'
                      name='total_cost'
                      value={form.total_cost}
                      handleChangeText={(e: any) => setForm({...form, total_cost: e.target.value})}
                      placeholder='Enter property total cost'
                      disabled={false}
                      required={true}
                      otherStyles='col-md-6'
                    /> 
                    <PropertyInputField
                      title="Cost per Square Meter"
                      type='text'
                      name='cost_per_sqm'
                      value={form.cost_per_sqm}
                      handleChangeText={(e: any) => setForm({...form, cost_per_sqm: e.target.value})}
                      placeholder="Enter property's cost per squaremeter"
                      disabled={false}
                      required={true}
                      otherStyles='col-md-6'
                    /> 

                    <div className='px-3 pt-5'>
                      <label className='mb-1 font-semibold text-16'>Property Document</label>
                      <input 
                        type="file"
                        title="Property Document"
                        multiple
                        name='document'
                        disabled={false}
                        onChange={(e) => handleDocumentUpload(e)}
                        accept='application/pdf'
                        className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl'
                      /> 
                    </div>

                    <div className='pt-5'>
                      <div className='mb-1 font-semibold text-16'>Property Description</div>
                      <textarea 
                        value={form.description}
                        name='description'
                        onChange={(e) => setForm({...form, description: e.target.value})}
                        placeholder='Enter description for the property'
                        className='border text-gray-500 font-psemibold text-base outline-none p-2 w-full rounded-xl h-[130px]'
                      >
                      </textarea> 
                    </div>
                  </div> 

                <div className='mt-3'>
                  {/* {errors && <div className='bg-red-800 p-2 mt-3 rounded-md text-white shadow-lg'>
                      {Object.keys(errors).map((key: any) => (
                          <p key={key}>{errors[key][0]}</p>
                      ))}
                    </div>
                  } */}
                  <button 
                      type='submit'
                      disabled={propertyId}
                      className='bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold p-2 rounded'
                    >
                      {
                        loading 
                        ?
                        <div className='flex justify-center items-center w-full'><Loader className='animate-spin'/></div>
                        :
                        "Submit Property"
                      }
                  </button>
              </div>
                </form>
                <div className='col-md-5'>
                  <div className='border p-3'>
                    <form onSubmit={uploadPropertyImages} encType='multipart/form-data' className='mb-10'>
                        <div className='mb-1 font-semibold text-16'>Upload Property Images & Document</div>
                        <div className='flex flex-col justify-center items-center space-y-2 px-3'>
                          <div className='flex flex-col justify-center items-center gap-2 min-h-[150px]'>
                              {/* {
                                propertyId
                                ?
                                <> */}
                                  {renderDragDropArea()}
                                  {selectedFiles.length > 0 && renderFilePreviews()}
                                {/* </>
                                :
                                <div className='flex flex-col items-center justify-center gap-2 text-md font-semibold italic text-gray-500'>Property Images to be uploaded here</div>
                              } */}
                          </div>
                        
                          {/* {imgErrors && <div className='bg-red-800 p-2 my-3 rounded-md text-white shadow-lg'>
                              {Object.keys(imgErrors).map((key: any) => (
                                  <p key={key}>{imgErrors[key][0]}</p>
                              ))}
                            </div>
                          } */}
                            <button 
                              type='submit'
                              disabled={!propertyId || imagesUploaded}
                              className='btn bg-main-100 hover:bg-main-100 hover:shadow-lg shadow-gray-400 w-full mx-auto text-white font-semibold mb-3 mt-5 p-2 '
                            >
                              {
                                isLoading 
                                ? 
                                <div className='flex justify-center items-center w-full'><Loader className='animate-spin'/></div>
                                : 
                                "Upload Photos"
                              }
                            </button>
                        </div>
                    </form>
                    <div className='flex flex-col justify-center gap-3 w-full'>
                      <label htmlFor="">Upload Property Amenities (e.g. Swimming pool)</label>
                      <div className='pt-3 w-full'>
                        <div className='flex justify-between '>
                          <div className='mb-1 font-semibold text-16'>Property Amenities</div>
                          <PlusCircleIcon onClick={handleAddInput} className='size-8'/>
                        </div>
                        
                      </div>
                      {inputFields.map((inputField, index) => (
                        <div key={index}>
                          <input 
                            type="text" 
                            value={inputField.value}
                            onChange={(event) => handleChangeInput(index, event)}
                            className='border w-full p-2' 
                            placeholder='Enter land property amenities if existing'
                          />
                          {inputFields.length > 1 && ( // Optional: Only show delete if more than one input
                            <button onClick={() => handleDeleteInput(index)} className='text-red-500 flex justify-start items-center space-x-2'> <Trash2/> <p>Delete</p></button>
                          )}
                        </div>
                      ))}
                      <button 
                      onClick={uploadPropertyAmenities} 
                      className='flex justify-center items-center text-center w-full p-2 bg-main-100 text-white my-3' 
                      disabled={!propertyId}
                      >
                        {
                          isAmenityLoading
                          ?
                          <Loader2 className='animate-spin'/>
                          :
                          "Upload Amenities"
                        }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </div>
      </div>
    </Suspense>
  )
}

export default PropertyUpload;