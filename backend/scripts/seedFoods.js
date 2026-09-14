import "dotenv/config";
import mongoose from "mongoose";
import cloudinary from "../config/cloudinary.js";
import foodModel from "../models/foodModel.js";
import path from "path";

const foods = [
    {
        name: "Greek salad",
        price: 12,
        category: "Salad"
    },
    {
        name: "Veg salad",
        price: 18,
        category: "Salad"
    },
    {
        name: "Clover Salad",
        price: 16,
        category: "Salad"
    },
    {
        name: "Chicken Salad",
        price: 24,
        category: "Salad"
    },
    {
        name: "Lasagna Rolls",
        price: 14,
        category: "Rolls"
    },
    {
        name: "Peri Peri Rolls",
        price: 12,
        category: "Rolls"
    },
    {
        name: "Chicken Rolls",
        price: 20,
        category: "Rolls"
    },
    {
        name: "Veg Rolls",
        price: 15,
        category: "Rolls"
    },
    {
        name: "Ripple Ice Cream",
        price: 14,
        category: "Deserts"
    },
    {
        name: "Fruit Ice Cream",
        price: 22,
        category: "Deserts"
    },
    {
        name: "Jar Ice Cream",
        price: 10,
        category: "Deserts"
    },
    {
        name: "Vanilla Ice Cream",
        price: 12,
        category: "Deserts"
    },
    {
        name: "Chicken Sandwich",
        price: 12,
        category: "Sandwich"
    },
    {
        name: "Vegan Sandwich",
        price: 18,
        category: "Sandwich"
    },
    {
        name: "Grilled Sandwich",
        price: 16,
        category: "Sandwich"
    },
    {
        name: "Bread Sandwich",
        price: 24,
        category: "Sandwich"
    },
    {
        name: "Cup Cake",
        price: 14,
        category: "Cake"
    },
    {
        name: "Vegan Cake",
        price: 12,
        category: "Cake"
    },
    {
        name: "Butterscotch Cake",
        price: 20,
        category: "Cake"
    },
    {
        name: "Sliced Cake",
        price: 15,
        category: "Cake"
    },
    {
        name: "Garlic Mushroom",
        price: 14,
        category: "Pure Veg"
    },
    {
        name: "Fried Cauliflower",
        price: 22,
        category: "Pure Veg"
    },
    {
        name: "Mix Veg Pulao",
        price: 10,
        category: "Pure Veg"
    },
    {
        name: "Rice Zucchini",
        price: 12,
        category: "Pure Veg"
    },
    {
        name: "Cheese Pasta",
        price: 12,
        category: "Pasta"
    },
    {
        name: "Tomato Pasta",
        price: 18,
        category: "Pasta"
    },
    {
        name: "Creamy Pasta",
        price: 16,
        category: "Pasta"
    },
    {
        name: "Chicken Pasta",
        price: 24,
        category: "Pasta"
    },
    {
        name: "Buttter Noodles",
        price: 14,
        category: "Noodles"
    },
    {
        name: "Veg Noodles",
        price: 12,
        category: "Noodles"
    },
    {
        name: "Somen Noodles",
        price: 20,
        category: "Noodles"
    },
    {
        name: "Cooked Noodles",
        price: 15,
        category: "Noodles"
    }
];

const seedFoods = async () => {

    try {

        await mongoose.connect(process.env.MONGO_URI);

        console.log("MongoDB Connected");

        for (let i = 0; i < foods.length; i++) {

            const food = foods[i];

            const imagePath = path.resolve(
                process.cwd(),
                `../frontend/src/assets/food_${i + 1}.png`
            );

            console.log(`Uploading food_${i + 1}.png...`);

            const result = await cloudinary.uploader.upload(imagePath, {
                folder: "tomato-food"
            });

            console.log("Cloudinary uploaded:", result.secure_url);

            const description =
                "Food provides essential nutrients for overall health and well-being";

            const existingFood = await foodModel.findOne({
                name: food.name
            });

            if (existingFood) {

                existingFood.price = food.price;
                existingFood.category = food.category;
                existingFood.description = description;
                existingFood.image = result.secure_url;

                await existingFood.save();

                console.log(`Updated: ${food.name}`);

            } else {

                await foodModel.create({
                    name: food.name,
                    description: description,
                    price: food.price,
                    category: food.category,
                    image: result.secure_url
                });

                console.log(`Created: ${food.name}`);
            }
        }

        console.log("================================");
        console.log("ALL 32 FOODS UPLOADED SUCCESSFULLY");
        console.log("================================");

    } catch (error) {

        console.log("SEED ERROR:", error);

    } finally {

        await mongoose.disconnect();

        console.log("MongoDB Disconnected");
    }
};

seedFoods();