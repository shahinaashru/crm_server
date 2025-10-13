const mongoose = require("mongoose");
const caseSchema = new mongoose.Schema(
  {
    case_name: {
      type: String,
      trim: true,
      required: [true, "Please enter Case name"],
    },
    case_description: {
      type: String,
      trim: true,
      default: "",
    },
    customer_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      index: true,
    },
    assigned_to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
      index: true,
    },
    priority: {
      type: String,
      enum: ["low", "medium", "high", "urgent"],
      default: "medium",
      index: true,
    },
    status: {
      type: String,
      enum: ["open", "in_progress", "on_hold", "resolved", "closed"],
      default: "open",
      index: true,
    },
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model("Case", caseSchema);
