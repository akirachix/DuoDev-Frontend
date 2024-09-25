import React, { useState } from 'react';
import { TextileBaleData } from '@/app/utils/types';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { TbXboxXFilled } from "react-icons/tb"; // Close Icon
import { ClipLoader } from 'react-spinners'; // Loader
import { toast, ToastContainer } from 'react-toastify'; // Toasts
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS

function TextileBaleSeller({ textileBales, refetch }: { textileBales: TextileBaleData[], refetch: () => void }) {
    const [formVisible, setFormVisible] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); // Loading state
    const userid = getCookie(`userData.user_id`) || ''; 
    const [newBale, setNewBale] = useState({
        waste_type: '',
        weight: '',
        posted_by: userid,
        location: '',
        phone_number: '',
        price: '',
        image: null as File | null,
    });

    const imageurl = process.env.NEXT_PUBLIC_IMAGE_URL;

    const toggleForm = () => {
        setFormVisible(!formVisible);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewBale((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            console.log('Selected file:', files[0]); // Log the selected file for debugging
            setNewBale((prev) => ({ ...prev, image: files[0] }));
        } else {
            console.warn('No file selected.');
            setNewBale((prev) => ({ ...prev, image: null }));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('waste_type', newBale.waste_type);
        formData.append('weight', newBale.weight);
        formData.append('location', newBale.location);
        formData.append('phone_number', newBale.phone_number);
        formData.append('price', newBale.price);
        formData.append('posted_by', newBale.posted_by);
    
        if (newBale.image) {
            formData.append('image', newBale.image);
        } else {
            console.error('No image file selected.');
            toast.error('Please select an image file to upload.');
            return;
        }
    
        console.log('Submitting FormData:', Array.from(formData.entries())); // Log FormData contents
    
        try {
            setIsSubmitting(true);
            const response = await fetch('/api/textile-bales/', {
                method: 'POST',
                body: formData,
            });
    
            if (response.ok) {
                toast.success('Textile bale posted successfully!');
                setFormVisible(false);
                refetch()
            } else {
                const errorData = await response.json();
                console.error('Error response:', errorData);
                toast.error(`Failed to post textile bale: ${errorData.errors?.image?.[0] || 'An unknown error occurred.'}`);
            }
        } catch (error) {
            console.error('Error posting the bale:', error);
            toast.error('Server error');
        } finally {
            setIsSubmitting(false);
        }
    };
    
    return (
        <div>
            <ToastContainer /> {/* Toast container for notifications */}

            <h1 className="text-3xl font-bold text-center py-3 text-artisticblue">Textile Bales Posted</h1>
            <div id='recyclers' className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-2 p-2 text-lg">
                {textileBales.map((bale) => (
                    <div key={bale.bale_id} className="flex flex-col border-2 border-black-300 shadow-lg p-4 bg-white rounded-lg justify-around">
                        <div className='border-2 border-gray-300'>
                            <Image
                                src={`${imageurl}${bale.image}` || '/mixed.jpg'}
                                alt={`Textile bale of type ${bale.waste_type}`}
                                width={150}
                                height={150}
                                className="rounded-lg w-full max-h-[300px] object-cover"
                            />
                        </div>
                        <div className="gap-2 text-artisticblue text-md">
                            <p>Type: {bale.waste_type}</p>
                            <p>Contacts: {bale.phone_number || 'N/A'}</p>
                            <p>Location: {bale.location}</p>
                            <p>Price: Ksh {bale.price}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Floating Button */}
            <button
                type="button"
                onClick={toggleForm}
                className="fixed bottom-10 right-10 bg-green-600 text-white py-2 px-4 rounded-full shadow-lg hover:bg-green-700 transition"
            >
                Post a new bale
            </button>

            {/* Popover Form for Posting New Bale */}
            {formVisible && (
                <div className="fixed inset-0 flex gap-5 justify-center items-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white shadow-lg rounded-lg p-4 w-11/12 sm:w-1/2 md:w-1/3 relative">
                        <h2 className="text-xl font-bold mb-4">Post a New Bale</h2>
                        {/* Close Icon for the Form */}
                        <button
                            onClick={toggleForm}
                            className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
                        >
                            <TbXboxXFilled size={24} />
                        </button>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <input
                                type="text"
                                name="waste_type"
                                placeholder='Type of material'
                                className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                                value={newBale.waste_type}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                name="weight"
                                placeholder="Weight (in kg)"
                                className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                                value={newBale.weight}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="location"
                                placeholder="Location"
                                className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                                value={newBale.location}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="text"
                                name="phone_number"
                                placeholder="Phone number"
                                className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                                value={newBale.phone_number}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="number"
                                name="price"
                                placeholder="Price"
                                className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                                value={newBale.price}
                                onChange={handleInputChange}
                                required
                            />
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                                onChange={handleFileChange}
                                required
                            />
                            <button
                                type="submit"
                                className="bg-forestgreen text-white py-2 w-full rounded hover:bg-green-600 transition"
                                disabled={isSubmitting} // Disable button while submitting
                            >
                                {isSubmitting ? (
                                    <div className="flex justify-center items-center">
                                        <ClipLoader size={20} color="#fff" />
                                        <span className="ml-2">Posting...</span>
                                    </div>
                                ) : (
                                    'Post'
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TextileBaleSeller;
