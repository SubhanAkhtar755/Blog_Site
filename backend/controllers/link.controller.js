import { Link } from "../models/link.model.js";
import { v2 as cloudinary } from "cloudinary";

// Create/upload image
export const createLink = async (req, res) => {
  try {
    const userId = req.user._id;

    const existingLinks = await Link.countDocuments({ createdBy: userId });
    if (existingLinks >= 100) {
      console.warn(`❌ User ${userId} reached limit.`);
      return res.status(400).json({
        message: "❌ Upload limit reached. You can only upload up to 100 images.",
        success: false,
      });
    }

    if (!req.file) {
      console.warn("⚠️ No file received in req.file");
      return res.status(400).json({
        message: "❌ No image file provided.",
        success: false,
      });
    }

    // ✅ Compress and upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "linkImages",
          transformation: [
            { width: 800, height: 800, crop: "limit" }, // Limit dimensions
            { quality: "auto:eco" } // Auto compress for best size-quality balance
          ],
        },
        (error, result) => {
          if (error) {
            console.error("Cloudinary Upload Error:", error);
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
      stream.end(req.file.buffer);
    });

    const link = await Link.create({
      imageUrl: result.secure_url,
      publicId: result.public_id,
      createdBy: userId,
    });

    console.log(`✅ Image uploaded by user ${userId}: ${result.secure_url}`);
    res.status(201).json({
      imageUrl: link.imageUrl,
      publicId: link.publicId,
      _id: link._id,
      success: true,
    });

  } catch (error) {
    console.error("❌ Error in createLink:", error);
    res.status(500).json({
      message: "🚨 Internal server error.",
      success: false,
    });
  }
};


// Get all links for the authenticated user
export const getOwnLinks = async (req, res) => {
  try {
    const links = await Link.find({ createdBy: req.user._id }).sort({ createdAt: -1 });
    console.log(`Found ${links.length} links for user ${req.user._id}`);
    res.status(200).json(links);
  } catch (error) {
    console.error("Error in getOwnLinks:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};

// Delete a specific link
export const deleteLink = async (req, res) => {
  try {
    const linkId = req.params.id;
    const userId = req.user._id;

    const link = await Link.findOne({ _id: linkId, createdBy: userId });

    if (!link) {
      return res.status(404).json({ message: "Link not found or unauthorized" });
    }

    // Delete from Cloudinary
    if (link.publicId) {
      await cloudinary.uploader.destroy(link.publicId);
    }

    // Delete from MongoDB
    await link.deleteOne();

    console.log(`Link deleted by user ${userId}: ${linkId}`);
    res.status(200).json({ message: "Link deleted successfully" });
  } catch (error) {
    console.error("Error in deleteLink:", error);
    res.status(500).json({ message: "Internal server error." });
  }
};
