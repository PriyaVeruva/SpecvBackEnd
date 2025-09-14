const express = require("express");
const app = express();
const cors = require("cors");
const nodemailer = require("nodemailer");

const port = 9000;
//post requires json formating
app.use(express.json());
//cors
app.use(cors());
//to listen to multiple requests and send back response lets use routing concept
app.get("/", (req, res) => {
	res.send("Hii Priya,");
});
//using param
app.get("/test/:id", (req, res) => {
	const id = req.params.id;
	res.send("Good to see u" + id);
});
//using query
app.get("/test", (req, res) => {
	const id = req.query.id;
	res.send("Not feeling good" + id);
});

app.listen(port, () => {
	console.log("server running");
});

// Step 1: Create transporter
const transporter = nodemailer.createTransport({
	service: "gmail", // tells transporter: use Gmail’s SMTP server
	auth: {
		user: "priyaveruva55@gmail.com", // your email account
		pass: "Momdad@1234.", // password or app password
	},
});

// //post
// app.post("/user", (req, res) => {
// 	const { FullName, Email, PhoneNumber } = req.body;
// 	res.send({
// 		message: `Thanks for joining us ${FullName},you are all set`,
// 	});
// });

// Async wrapper for sending emails
async function sendEmail({ FullName, PhoneNumber }) {
	// Create a test account (Ethereal)
	let testAccount = await nodemailer.createTestAccount();

	// Create transporter
	let transporter = nodemailer.createTransport({
		host: "smtp.ethereal.email",
		port: 587,
		auth: {
			user: testAccount.user,
			pass: testAccount.pass,
		},
	});

	// Email details
	let info = await transporter.sendMail({
		from: `"Form App" <${testAccount.user}>`,
		to: "priyaveruva55@gmail.com", // 👈 The email you want to send to
		subject: "New Form Submission",
		text: `Name: ${FullName}\nPhone: ${PhoneNumber}`,
		html: `<b>Name:</b> ${FullName}<br><b>Phone:</b> ${PhoneNumber}`,
	});

	console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
	return info;
}

// API endpoint
app.post("/user", async (req, res) => {
	const { FullName, PhoneNumber } = req.body;

	try {
		const info = await sendEmail({ FullName, PhoneNumber });
		res.json({
			success: true,
			message: "Form sent!",
			previewURL: nodemailer.getTestMessageUrl(info),
		});
	} catch (err) {
		console.error(err);
		res.status(500).json({ success: false, error: err.message });
	}
});
