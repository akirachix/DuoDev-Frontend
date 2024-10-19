import React, { useState } from 'react';
import { TextileBaleData } from '@/app/utils/types';
import Image from 'next/image';
import { getCookie } from 'cookies-next';
import { TbXboxXFilled } from "react-icons/tb"; // Close Icon
import { ClipLoader } from 'react-spinners'; // Loader
import { toast, ToastContainer } from 'react-toastify'; // Toasts
import 'react-toastify/dist/ReactToastify.css'; // Toast CSS

type WasteType = 'Denim' | 'Cotton' | 'Polyester' | 'Wool' | 'Mixed Fibers' | 'Leather';

// Price per kg for different materials
const priceSheet: Record<WasteType, number> = {
    'Denim': 540, // Average price per kg
    'Cotton': 450,
    'Polyester': 300,
    'Wool': 675,
    'Mixed Fibers': 370,
    'Leather': 830,
};

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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewBale((prev) => ({ ...prev, [name]: value }));
        if (name === 'weight' || name === 'waste_type') {
            calculatePrice(value);
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setNewBale((prev) => ({ ...prev, image: files[0] }));
        } else {
            setNewBale((prev) => ({ ...prev, image: null }));
        }
    };

    function calculatePrice(value: string) {
        const { waste_type, weight } = newBale;
        const selectedMaterial = waste_type || value;

        if (selectedMaterial && weight && priceSheet[selectedMaterial as WasteType]) {
            const materialPricePerKg = priceSheet[selectedMaterial as WasteType];
            const materialWeight = parseFloat(weight);
            const totalPrice = materialPricePerKg * materialWeight;
            setNewBale((prev) => ({ ...prev, price: `${totalPrice}` })); // Set single price
        }
    }

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
            toast.error('Please select an image file to upload.');
            return;
        }

        try {
            setIsSubmitting(true);
            const response = await fetch('/api/textile-bales/', {
                method: 'POST',
                body: formData,
            });

            if (response.ok) {
                toast.success('Textile bale posted successfully!');
                setFormVisible(false);
                refetch();
            } else {
                const errorData = await response.json();
                toast.error(`Failed to post textile bale: ${errorData.errors?.image?.[0] || 'An unknown error occurred.'}`);
            }
        } catch (error) {
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
                                src={`${imageurl}${bale.image}` || '/logo.png'}
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
                className="fixed top-[18%] right-10 bg-green-600 text-white py-5  px-4 rounded-full shadow-lg hover:bg-green-700 transition"
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
                            <select
                                name="waste_type"
                                className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                                value={newBale.waste_type}
                                onChange={handleInputChange}
                                required
                            >
                                <option value="">Select Material</option>
                                <option value="Denim">Denim</option>
                                <option value="Cotton">Cotton</option>
                                <option value="Polyester">Polyester</option>
                                <option value="Wool">Wool</option>
                                <option value="Mixed Fibers">Mixed Fibers</option>
                                <option value="Leather">Leather</option>
                            </select>
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
                                type="text"
                                name="price"
                                placeholder="Auto-calculated price"
                                className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                                value={newBale.price}
                                readOnly
                            />
                            <input
                                type="file"
                                name="image"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="bg-coldsteel rounded-[10px] px-3 py-5 w-full focus:outline-none focus:border-2"
                                required
                            />
                            <button
                                type="submit"
                                className={`bg-artisticblue text-white py-3 rounded-lg ${isSubmitting ? 'cursor-not-allowed' : ''}`}
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? <ClipLoader size={20} color="#ffffff" /> : 'Submit'}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default TextileBaleSeller;
