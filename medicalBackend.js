require("dotenv").config(); // Load env variables
const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
const port = process.env.PORT || 9000;

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
app.get("/", (req, res) => {
	res.send("Server is running 🚀");
});

// Nodemailer transporter using env variables
const transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.GMAIL_USER,
		pass: process.env.GMAIL_PASS,
	},
});

// API to handle form submission
app.post("/user", async (req, res) => {
	const { FullName, Email, PhoneNumber } = req.body;

	try {
		const info = await transporter.sendMail({
			from: "From SpectV",
			to: process.env.ADMIN_EMAIL,
			subject: "Registration Details",
			text: `Name: ${FullName}\nEmail: ${Email}\nPhone: ${PhoneNumber}`,
			html: `<p><b>Name:</b> ${FullName}</p>
             <p><b>Email:</b> ${Email}</p>
             <p><b>Phone:</b> ${PhoneNumber}</p>`,
		});

		res.json({
			success: true,
			message: `Thanks for joining us ${FullName}`,
		});
	} catch (err) {
		console.error("Error sending email:", err);
		res.status(500).json({
			success: false,
			message: "❌ Failed to send email",
			error: err.message,
		});
	}
});

// Start server
app.listen(port, () => {
	console.log(`Server running on http://localhost:${port}`);
});
