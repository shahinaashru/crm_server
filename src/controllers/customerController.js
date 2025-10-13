const asyncHandler = require("../middlewares/asyncHandler");
const Customer = require("../models/customerModel");
exports.createCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone_number, address } = req.body;
  const existingCustomer = await Customer.findOne({ phone_number });
  if (existingCustomer) {
    return res.status(400).json({ status: false, message: "Customer  Exist" });
  }
  const customer = await Customer.create({
    name,
    email,
    phone_number,
    address,
  });
  if (!customer) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
  res.status(201).json({
    status: true,
    message: "Customer created successfully",
    Customer: customer,
  });
});
exports.updateCustomer = asyncHandler(async (req, res) => {
  const { name, email, phone_number, address } = req.body;
  const { id } = req.params;
  const existingCustomer = await Customer.findOne({ _id: id, status: true });
  if (!existingCustomer) {
    return res
      .status(400)
      .json({ status: false, message: "Customer Not  Exist" });
  }
  let updateData = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;
  if (phone_number) updateData.phone_number = phone_number;
  if (address) updateData.address = address;

  const updatedUser = await Customer.findByIdAndUpdate(
    id,
    { $set: updateData },
    { new: true, runValidators: true }
  );
  if (!updatedUser) {
    return res
      .status(500)
      .json({ status: false, message: "Something went wrong" });
  }
  res.status(201).json({
    status: true,
    message: "Customer Details Updated Successfully",
    Customer: updatedUser,
  });
});
exports.getCustomers = asyncHandler(async (req, res) => {
  const customer = await Customer.find({ status: true }).lean();
  if (customer.length === 0) {
    return res.status(404).json({
      status: false,
      message: "Customers List is Empty",
    });
  }
  res.status(200).json({
    status: true,
    message: "Customer Retrieved Successfully",
    Customers: customer,
  });
});
exports.getCustomerById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);
  if (!customer || customer.status == false) {
    return res.status(404).json({
      status: false,
      message: "Customers Not Found",
    });
  }
  res.status(200).json({
    status: true,
    message: "Customer Retrieved Successfully",
    Customer: customer,
  });
});
exports.deleteCustomer = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const customer = await Customer.findById(id);

  if (!customer) {
    return res.status(404).json({
      success: false,
      message: "Customer not found",
    });
  }
  customer.status = false;
  await customer.save();
  res.status(200).json({
    success: true,
    message: "Customer deleted successfully (soft delete)",
    customer: customer,
  });
});
