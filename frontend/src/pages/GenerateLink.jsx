
import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { CopyOutlined, DeleteOutlined } from '@ant-design/icons';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { Typography, Tooltip } from 'antd';
import axios from 'axios';
import { toast } from 'sonner';

const { Title, Text } = Typography;

const GenerateLink = () => {
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [publicId, setPublicId] = useState('');
  const [loading, setLoading] = useState(false);
  const [myLinks, setMyLinks] = useState([]);

  const fetchLinks = async () => {
    try {
      const res = await axios.get("https://blog-site-6od5.onrender.com/api/v1/links/my-links", {
        withCredentials: true,
      });
      setMyLinks(res.data);
    } catch (error) {
      toast.error("Failed to load your links.");
    }
  };

  useEffect(() => {
    fetchLinks();
  }, []);

  const onUpload = async () => {
    if (!file) return toast.error("Please select an image first.");
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);
      const res = await axios.post("https://blog-site-6od5.onrender.com/api/v1/links/generate", formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      });

      setImageUrl(res.data.imageUrl);
      setPublicId(res.data.publicId);
      toast.success("✅ Image uploaded successfully!");
      setFile(null);
      fetchLinks();
    } catch (error) {
      if (error.response?.data?.message?.includes("Upload limit")) {
        toast.error("❌ Upload limit reached. Delete an image to upload a new one.");
      } else {
        toast.error("❌ Failed to upload image.");
      }
    } finally {
      setLoading(false);
    }
  };

  const deleteLink = async (linkId) => {
    try {
      await axios.delete(`https://blog-site-6od5.onrender.com/api/v1/links/delete/${linkId}`, {
        withCredentials: true,
      });
      toast.success("🗑️ Link deleted successfully!");
      fetchLinks();
    } catch (error) {
      toast.error("❌ Failed to delete link.");
    }
  };

  return (
    <div className="pt-20  h-screen md:ml-[320px] px-4 pb-16">
      <div className="max-w-6xl mx-auto mt-6 space-y-10">

        {/* Upload Section */}
        <Card className="p-6 md:p-10 dark:bg-gray-800 mx-4 md:mx-0">
          <Title level={3} className="text-center text-gray-800 dark:text-white mb-6">
            Generate Cloud Image Link
          </Title>

          <div className="space-y-4 mb-6">
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setFile(e.target.files[0])}
              className="text-black dark:text-white dark:bg-gray-700"
            />
          
            {myLinks.length >= 100 && (
              <Text type="danger" className="block">
                ❗ Upload limit (100) reached. Delete an image to upload more.
              </Text>
            )}
            <Button
              onClick={onUpload}
              disabled={!file || myLinks.length >= 100}
              className="w-full"
            >
              {loading ? "Uploading..." : "Upload & Generate"}
            </Button>
          </div>

          {imageUrl && (
            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg border dark:border-gray-600 mb-6">
              <img
                src={imageUrl}
                alt="Preview"
                className="max-h-60 mx-auto rounded-lg object-contain"
              />
              <div className="flex items-center gap-2 mt-3">
                <Input value={imageUrl} readOnly className="text-xs" />
                <CopyToClipboard text={imageUrl} onCopy={() => toast.success("✅ Link copied!")}> 
                  <Button size="sm" variant="outline">
                    <CopyOutlined />
                  </Button>
                </CopyToClipboard>
              </div>
              {publicId && (
                <Text type="secondary" className="block text-sm mt-1 break-all">
                  Public ID: {publicId}
                </Text>
              )}
            </div>
          )}
        </Card>

        {/* My Links Section */}
        <Card className="p-6 md:p-10  dark:bg-gray-800 mx-4 md:mx-0">
          <Title level={4} className="text-gray-700  dark:text-white mb-4">
            My Uploaded Links
          </Title>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {myLinks.length === 0 && (
              <Text type="secondary" className="text-center dark:text-white  col-span-2">
                No links uploaded yet.
              </Text>
            )}
            {myLinks.map((link) => (
              <div
                key={link._id}
                className="border rounded-lg p-2 bg-white dark:bg-gray-700 hover:shadow transition"
              >
                <img
                  src={link.imageUrl}
                  alt="thumb"
                  className="h-32 w-full object-cover rounded"
                />
                <div className="mt-2 flex items-center gap-2">
                  <Input value={link.imageUrl} readOnly size="small" className="text-xs" />
                  <CopyToClipboard
                    text={link.imageUrl}
                    onCopy={() => toast.success("✅ Link copied!")}
                  >
                    <Tooltip title="Copy">
                      <Button size="icon" variant="outline">
                        <CopyOutlined />
                      </Button>
                    </Tooltip>
                  </CopyToClipboard>
                  <Tooltip title="Delete">
                    <Button
                      size="icon"
                      variant="destructive"
                      onClick={() => deleteLink(link._id)}
                    >
                      <DeleteOutlined />
                    </Button>
                  </Tooltip>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default GenerateLink;
