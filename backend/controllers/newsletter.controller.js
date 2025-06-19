import Newsletter from "../models/newsletter.model.js";

export const subscribeNewsletter = async (req, res) => {
  const { email } = req.body;

  console.log("Newsletter controller hit, email:", email); // ✅ Debug line

  // ✅ Step 1: Check if email is missing
  if (!email || email.trim() === "") {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    // ✅ Step 2: Check if already subscribed
    const existing = await Newsletter.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // ✅ Step 3: Save new subscriber
    const newSubscriber = new Newsletter({ email: email.toLowerCase() });
    await newSubscriber.save();

    return res.status(201).json({ message: "Subscribed successfully!" });
  } catch (error) {
    console.error("Newsletter error:", error.message);
    return res.status(500).json({
      message: "Subscription failed",
      error: error.message,
    });
  }
};
