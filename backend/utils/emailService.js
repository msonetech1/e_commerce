import nodemailer from "nodemailer";

const sendEmail = async (options) => {
    try {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        const mailOptions = {
            from: `"Fashionist" <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html
        };

        if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
            await transporter.sendMail(mailOptions);
        } else {
            console.log("--- SIMULATED EMAIL ---");
            console.log(`To: ${options.email}`);
            console.log(`Subject: ${options.subject}`);
            console.log(`Message: ${options.message}`);
            console.log("-----------------------");
        }
    } catch (error) {
        console.error("Email Service Error:", error);
    }
};

export const sendOrderConfirmation = async (user, order) => {
    const subject = `Order Confirmation - #${order._id.toString().slice(-6).toUpperCase()}`;
    const message = `Hi ${user.name}, your order has been received and is now Pending.`;
    const html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #db2777;">Order Confirmation</h2>
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>Thank you for your order! We've received it and it's currently <strong>Pending</strong>.</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0;">
                <p style="margin: 0;"><strong>Order ID:</strong> #${order._id.toString().slice(-6).toUpperCase()}</p>
                <p style="margin: 5px 0 0 0;"><strong>Total:</strong> Tsh ${order.totalPrice.toLocaleString()}</p>
            </div>
            <p>We'll notify you as soon as your order ships!</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">&copy; 2026 Fashionist. All rights reserved.</p>
        </div>
    `;

    await sendEmail({ email: user.email, subject, message, html });
};

export const sendOrderStatusUpdate = async (user, order) => {
    const subject = `Order Status Update - #${order._id.toString().slice(-6).toUpperCase()}`;
    const statusColor = order.status === 'Cancelled' ? '#ef4444' : '#10b981';
    const message = `Hi ${user.name}, your order status has been updated to: ${order.status}.`;
    const html = `
        <div style="font-family: sans-serif; padding: 20px; color: #333; max-width: 600px; margin: auto; border: 1px solid #eee; border-radius: 10px;">
            <h2 style="color: #db2777;">Order Status Update</h2>
            <p>Hi <strong>${user.name}</strong>,</p>
            <p>Your order <strong>#${order._id.toString().slice(-6).toUpperCase()}</strong> has been updated.</p>
            <div style="background: #f9f9f9; padding: 15px; border-radius: 5px; margin: 20px 0; text-align: center;">
                <p style="margin: 0; font-size: 14px; color: #777; text-transform: uppercase; tracking-widest;">New Status</p>
                <p style="margin: 10px 0 0 0; font-size: 24px; font-weight: bold; color: ${statusColor};">${order.status.toUpperCase()}</p>
            </div>
            <p>Thank you for shopping with us!</p>
            <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;" />
            <p style="font-size: 12px; color: #777;">&copy; 2026 Fashionist. All rights reserved.</p>
        </div>
    `;

    await sendEmail({ email: user.email, subject, message, html });
};
