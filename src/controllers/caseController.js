const asyncHandler = require("../middlewares/asyncHandler");
const Customer = require("../models/customerModel");
const Case = require("../models/caseModel");
exports.createCase = asyncHandler(async (req, res) => {
  const {
    case_name,
    case_description,
    customer_id,
    assigned_to,
    priority,
    status,
  } = req.body;
  const task = await Case.create({
    case_name,
    case_description,
    customer_id,
    assigned_to,
    priority,
    status,
  });
  if (!task) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
  res.status(201).json({
    status: true,
    message: "Case created successfully",
    Case: task,
  });
});
exports.updateCase = asyncHandler(async (req, res) => {
  const {
    case_name,
    case_description,
    customer_id,
    assigned_to,
    priority,
    status,
  } = req.body;
  const { id } = req.params;
  const existingCase = await Case.findOne({ _id: id });
  if (!existingCase) {
    return res.status(400).json({ status: false, message: "Case Not  Exist" });
  }
  let updateData = {};
  if (case_name) updateData.case_name = case_name;
  if (case_description) updateData.case_description = case_description;
  if (customer_id) updateData.customer_id = customer_id;
  if (assigned_to) updateData.assigned_to = assigned_to;
  if (priority) updateData.priority = priority;
  if (status) updateData.status = status;

  const updatedCase = await Case.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!updatedCase) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
  res.status(201).json({
    status: true,
    message: "Case Details Updated Successfully",
    Customer: updatedCase,
  });
});
exports.getCases = asyncHandler(async (req, res) => {
  const tasks = await Case.find()
    .populate("customer_id", "name")
    .populate("assigned_to", "username")
    .lean();
  if (tasks.length === 0) {
    return res.status(404).json({
      status: false,
      message: "Case List is Empty",
    });
  }
  res.status(200).json({
    status: true,
    message: "Case Retrieved Successfully",
    Cases: tasks,
  });
});
exports.getCaseById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const task = await Case.findById(id)
    .populate("customer_id", "name")
    .populate("assigned_to", "username")
    .lean();
  if (!task) {
    return res.status(404).json({
      status: false,
      message: "Case Not Found",
    });
  }
  res.status(200).json({
    status: true,
    message: "Case Retrieved Successfully",
    Customer: task,
  });
});
