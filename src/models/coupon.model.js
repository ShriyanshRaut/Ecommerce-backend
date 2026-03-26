import mongoose from "mongoose";

const { Schema } = mongoose;

const couponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      trim: true,
      unique: true,
      uppercase: true
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100 // percentage based
    },
    expirationDate: {
      type: Date,
      required: true
    },
    isActive: {
      type: Boolean,
      default: true
    },
    minOrderValue: {
      type: Number,
      default: 0
    },
    maxDiscount: {
      type: Number
    }
  },
  { timestamps: true }
);

const Coupon = mongoose.model("Coupon", couponSchema);

export default Coupon;