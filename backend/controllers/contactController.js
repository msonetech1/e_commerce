import nodemailer from "nodemailer";

export const sendMessage = async (req, res) => {
    const { name, email, message, type } = req.body;

    try {
        // Create a transporter
        // Configuration should be in .env. For now, we'll try to use environment variables.
        const transporter = nodemailer.createTransport({
            service: 'gmail', // or your preferred service
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER, // Send to yourself
            subject: `New ${type || 'Message'} from Fashionist: ${name || email}`,
            text: `
                You have a new message:
                
                From: ${name || 'N/A'}
                Email: ${email}
                Type: ${type || 'General Contact'}
                
                Content:
                ${message || 'Newsletter Subscription'}
            `,
            html: `
                <div style="font-family: sans-serif; padding: 20px; color: #333;">
                    <h2 style="color: #db2777;">New ${type || 'Notification'}</h2>
                    <p><strong>From:</strong> ${name || 'N/A'}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Type:</strong> ${type || 'General Contact'}</p>
                    <hr />
                    <p style="white-space: pre-wrap;">${message || 'Someone just subscribed to your newsletter!'}</p>
                </div>
            `
        };

        // If environment variables aren't set, we won't actually try to send to avoid crashes,
        // but we'll return a simulated success for the UI demo unless we really want it to work.
        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
            res.json({ message: "Message sent successfully!" });
        } else {
            console.log("Email credentials not set. Simulating success for development.");
            console.log("Email content:", mailOptions.text);
            res.json({ message: "Message received (Simulated - set EMAIL_USER/PASS in .env for actual delivery)" });
        }

    } catch (error) {
        console.error("Email Error:", error);
        res.status(500).json({ message: "Failed to send message. Please try again later." });
    }
};
