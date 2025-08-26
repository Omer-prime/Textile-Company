import "dotenv/config";
import bcrypt from "bcrypt";
import mongoose from "mongoose";
import User from "@/models/User"; // tsconfig must have baseUrl/src paths
import { dbConnect } from "@/lib/mongoose";

async function run() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env");
    process.exit(1);
  }

  await dbConnect();

  const existing = await User.findOne({ email }).lean();
  if (existing) {
    console.log("Admin already exists:", email);
    await mongoose.disconnect();
    return;
  }

  const hash = await bcrypt.hash(password, 10);
  await User.create({ email, password: hash, role: "ADMIN", name: "Admin" });

  console.log("Admin user created:", email);
  await mongoose.disconnect();
}

run().catch(async (e) => {
  console.error(e);
  await mongoose.disconnect();
  process.exit(1);
});
