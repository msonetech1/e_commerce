import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import Product from './models/Product.js';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const products = [
    {
        name: 'Kennson X1 Pro',
        price: 2750000,
        image: '/images/img1.jpeg',
        category: 'Flagship',
        isNew: true,
        description: 'The Kennson X1 Pro defines the future of smartphones with its revolutionary AI processor and 200MP camera system.'
    },
    {
        name: 'MatePhone Ultra',
        price: 2450000,
        image: '/images/img2.jpeg',
        category: 'Flagship',
        description: 'MatePhone Ultra delivers peak performance with a stunning 4K OLED display and all-day battery life.'
    },
    {
        name: 'Kennson Lite 5G',
        price: 1350000,
        image: '/images/img3.jpeg',
        category: 'Budget',
        isNew: true,
        description: 'Experience 5G speed at an affordable price. The Kennson Lite doesn\'t compromise on features.'
    },
    {
        name: 'MatePhone Fold Z',
        price: 3550000,
        image: '/images/img4.jpeg',
        category: 'Foldable',
        description: 'Unfold infinite possibilities. The MatePhone Fold Z fits in your pocket and expands to a tablet-sized experience.'
    },
    {
        name: 'Kennson Nova',
        price: 1900000,
        image: '/images/img5.jpeg',
        category: 'Mid-range',
        description: 'Beautiful design meets powerful performance. The Nova is the perfect balance for everyday users.'
    },
    {
        name: 'MatePhone S23',
        price: 2200000,
        image: '/images/img6.jpeg',
        category: 'Flagship',
        description: 'A classic refined. The S23 features our best minimal design and most durable build yet.'
    },
    {
        name: 'Kennson Max Power',
        price: 1500000,
        image: '/images/img7.jpeg',
        category: 'Battery King',
        description: 'Never run out of juice. The Max Power features a massive 6000mAh battery that lasts up to 3 days.'
    },
    {
        name: 'MatePhone Compact',
        price: 1800000,
        image: '/images/img8.webp',
        category: 'Compact',
        description: 'Small size, huge power. The Compact is designed for one-handed use without sacrificing specs.'
    },
];

const seedData = async () => {
    try {
        await Product.deleteMany();
        await User.deleteMany();

        await Product.insertMany(products);

        const hashedPassword = await bcrypt.hash('password123', 10);
        await User.create({
            name: 'Admin User',
            email: 'admin@kennson.com',
            password: hashedPassword,
            isAdmin: true
        });

        console.log('Data Imported!');
        process.exit();
    } catch (error) {
        console.error(`${error}`);
        process.exit(1);
    }
};

seedData();
