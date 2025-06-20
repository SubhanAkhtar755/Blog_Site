import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';
import { FaWhatsapp } from 'react-icons/fa6';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || email.trim() === "") return toast.error("Email is required");

    setLoading(true);
    try {
      const res = await axios.post("https://blog-site-6od5.onrender.com/api/v1/newsletter/subscribe", { email });
      toast.success(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className='bg-gray-800 text-gray-200 py-10'>
      <div className='max-w-7xl mx-auto px-4 md:flex md:justify-between'>
        {/* info */}
        <div className='mb-6 md:mb-0'>
          <Link to='/' className='flex gap-3 items-center'>
            <img src={Logo} alt="" className='invert w-12 h-12' />
            <h1 className='text-3xl font-bold' title='Represents a complete space for all kinds of blogs.'>BlogSphere</h1>
          </Link>
          <p className='mt-2'>Sharing insights, tutorials, and ideas on web development and tech.</p>
          <p className='mt-2 text-sm'>Steet No. 5, City Chowk, Hasilpur 63000, Punjab, Pakistan</p>
          <p className='text-sm'>Email:muhammadsubhan192128@gmail.com</p>
          <p className='text-sm'>Phone: +92(311)698-6045</p>
        </div>

        {/* quick links */}
        <div className='mb-6 md:mb-0'>
          <h3 className='text-xl font-semibold'>Quick Links</h3>
          <ul className='mt-2 text-sm space-y-2'>
            <li>Home</li>
            <li>Blogs</li>
            <li>About Us</li>
            <li>FAQs</li>
          </ul>
        </div>

        {/* social media */}
        <div className='mb-6 md:mb-0'>
          <h3 className='text-xl font-semibold'>Follow Us</h3>
          <div className='flex space-x-4 mt-2'>
           <a href="https://www.facebook.com/ch.subhan.92775838/"  target="_blank"> <FaFacebook /></a>
      <a href="https://www.instagram.com/frontend__developer_7?igsh=MTl1cThpZWt6cTZlMA=="  target="_blank">      <FaInstagram /></a>
           <a href="https://wa.me/+923116986045" target="_blank"> <FaWhatsapp /></a>

          </div>
        </div>

        {/* newsletter */}
        <div>
          <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
          <p className='mt-2 text-sm'>Subscribe to get special offers, free giveaways, and more</p>
          <form onSubmit={handleSubscribe} className='mt-4 flex border border-white rounded-md overflow-hidden'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Your email address'
               className="flex h-10 w-full border-white rounded-md border dark:text-white bg-gray-200 -mr-1 dark:bg-gray-800 px-3 py-2 text-sm text-black"
            />
            <button
              type='submit'
              className='bg-red-600 text-white px-4 rounded-r-md hover:bg-red-700 disabled:opacity-50'
              disabled={loading}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      {/* bottom section */}
      <div className='mt-8 border-t border-gray-700 pt-6 text-center text-sm'>
        <p>&copy; {new Date().getFullYear()} <span className='text-red-500'>Blog</span>. All rights reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
