import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../assets/logo.png';
import { FaFacebook, FaInstagram, FaPinterest, FaTwitterSquare } from 'react-icons/fa';
import axios from 'axios';
import { toast } from 'sonner';

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
            <h1 className='text-3xl font-bold'>Logo</h1>
          </Link>
          <p className='mt-2'>Sharing insights, tutorials, and ideas on web development and tech.</p>
          <p className='mt-2 text-sm'>123 Blog St, Style City, NY 10001</p>
          <p className='text-sm'>Email: support@blog.com</p>
          <p className='text-sm'>Phone: (123) 456-7890</p>
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
            <FaFacebook />
            <FaInstagram />
            <FaTwitterSquare />
         
          </div>
        </div>

        {/* newsletter */}
        <div>
          <h3 className='text-xl font-semibold'>Stay in the Loop</h3>
          <p className='mt-2 text-sm'>Subscribe to get special offers, free giveaways, and more</p>
          <form onSubmit={handleSubscribe} className='mt-4 flex'>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Your email address'
              className='w-full p-2 rounded-l-md text-black bg-white focus:outline-none dark:bg-gray focus:ring-2 focus:ring-gray-500'
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
