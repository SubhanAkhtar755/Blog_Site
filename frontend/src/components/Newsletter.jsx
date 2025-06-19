import React, { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import axios from 'axios';
import { toast } from 'sonner';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault(); // ✅ prevent form reload

    if (!email || email.trim() === "") {
      return toast.error("Email is required");
    }

    setLoading(true);
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/newsletter/subscribe",
        { email },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      );

      toast.success(res.data.message || "Subscribed successfully!");
      setEmail("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="bg-[#262629] dark:bg-gray-800 p-8 rounded-lg">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-4 text-white">Subscribe to the Newsletter</h2>
          <p className="text-gray-300 mb-6">
            Get the latest posts and updates delivered straight to your inbox.
          </p>
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-gray-900 px-3 py-2 text-sm text-gray-300"
            />
            <Button type="submit" disabled={loading}>
              {loading ? "Subscribing..." : "Subscribe"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Newsletter;
