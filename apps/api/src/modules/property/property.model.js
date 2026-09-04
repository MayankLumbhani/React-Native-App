import mongoose from "mongoose";

const propertySchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      required: true,
      enum: ["Apartment", "House", "Villa", "Office", "Shop", "Other"],
    },

    description: {
      type: String,
      trim: true,
      default: "",
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    bedrooms: {
      type: Number,
      min: 0,
      default: 0,
    },

    bathrooms: {
      type: Number,
      min: 0,
      default: 0,
    },

    rent: {
      type: Number,
      min: 0,
      default: 0,
    },

    contacts: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Contact",
      },
    ],

    images: [
      {
        type: String,
      },
    ],

    location: {
      latitude: {
        type: Number,
      },
      longitude: {
        type: Number,
      },
    },

    rooms: [
      {
        name: {
          type: String,
          required: true,
          trim: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Property", propertySchema);