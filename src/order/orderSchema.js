import mongoose from "mongoose";
const orderSchema = new mongoose.Schema(
  {
    formDt: {
      fname: {
        type: String,
        required: true,
      },

      lname: {
        type: String,
        required: true,
      },

      phone: {
        type: String,
        required: false,
      },

      email: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
        default: "",
      },
    },

    carts: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          unique: true,
        },
        name: {
          type: String,
          required: true,
        },
        slug: {
          type: String,
        },
        price: {
          type: Number,
          required: true,
        },
        orderQty: {
          type: Number,
        },
        orderSize: {
          type: String,
          default: false,
        },

        salesPrice: {
          type: Number,
        },

        description: {
          type: String,
        },
        thumbnail: {
          type: String,
          required: true,
        },
      },
    ],
    // payment: {
    //   totalAmount: {
    //     type: Number,
    //     required: true,
    //   },
    //   method: {
    //     type: String,
    //     required: true,
    //   },
    //   isPaid: {
    //     type: Boolean,
    //     required: true,
    //   },
    // },

    orderNumber: {
      type: Number,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);
export default mongoose.model("orders", orderSchema);
