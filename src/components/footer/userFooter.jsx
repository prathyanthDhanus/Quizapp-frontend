import React from 'react';
import { useNavigate } from 'react-router-dom';

const UserFooter = () => {
    const navigate = useNavigate();

    return (
        <footer className="bg-[#0D0D0E] text-white py-10 ">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Navigation Links */}
                    <div>
                        <h2 className="text-xl oswald-bold mb-4">Quick Links</h2>
                        <ul className="space-y-2 open-sans-regular">
                            <li>
                                <button onClick={() => navigate('/')} className="hover:underline focus:outline-none">
                                    About Us
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/')} className="hover:underline focus:outline-none">
                                    Services
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/')} className="hover:underline focus:outline-none">
                                    Classes
                                </button>
                            </li>
                            <li>
                                <button onClick={() => navigate('/')} className="hover:underline focus:outline-none">
                                    Contact
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div>
                        <h2 className="text-xl oswald-bold mb-4">Contact Us</h2>
                       <div className='open-sans-regular'>
                        <p>123 ABC Street</p>
                        <p>City, State, ZIP</p>
                        <p>Email: info@quizwebsite.com</p>
                        <p>Phone: (123) 456-7890</p>
                       </div>
                    </div>

                    {/* Newsletter Subscription */}
                    <div>
                        <h2 className="text-xl oswald-bold mb-4">Subscribe to our Newsletter</h2>
                        <p className='open-sans-regular'>Get the latest updates and offers!</p>
                        <form className="flex flex-col space-y-2 mt-2">
                            <input 
                                type="email" 
                                placeholder="Enter your email" 
                                className="p-2 rounded-md border border-gray-600 text-black open-sans-regular"
                                required
                            />
                            <button type="submit" className="bg-customRed text-white p-2 rounded-md hover:bg-red-600 oswald-bold">
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Social Media Icons */}
                <div className="flex justify-center mt-10 space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://www.freepnglogos.com/uploads/facebook-logo-icon/facebook-logo-icon-facebook-icon-png-images-icons-and-png-backgrounds-1.png" alt="Facebook" className="w-6 h-6" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://png.pngtree.com/png-clipart/20180626/ourmid/pngtree-instagram-icon-instagram-logo-png-image_3584852.png" alt="Instagram" className="w-6 h-6" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="https://img.freepik.com/free-vector/twitter-new-2023-x-logo-white-background-vector_1017-45422.jpg?semt=ais_hybrid" alt="Twitter" className="w-6 h-6" />
                    </a>
                </div>
            </div>

            <div className="text-center mt-8 border-t border-gray-700 pt-4">
                <p>&copy; 2025 Quiz Application Website. All Rights Reserved.</p>
            </div>
        </footer>
    );
};

export default UserFooter;
