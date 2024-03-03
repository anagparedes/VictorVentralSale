const mongoose = require("mongoose");
const Sale = require("../Models/sale.model.js");

exports.getAllSales = async (request, response) => {
  try {
    const sales = await Sale.find({});

    return response.status(200).json(sales);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

exports.getSaleById = async (request, response) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response
        .status(422)
        .json({ error: "Parameter is not a valid id" });
    }

    const sale = await Sale.findById(request.params.id);

    if (!sale) {
      return response.status(404).json({ error: "Sale not found" });
    }

    return response.status(200).json(sale);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

exports.createSale = async (request, response) => {
  try {
    if (!request.body.clientId) {
      return response
        .status(422)
        .json({ error: "Id of the client field is required" });
    }
    if (!request.body.productId) {
      return response
        .status(422)
        .json({ error: "Id of the client field is required" });
    }
    if (!request.body.quantity) {
      return response.status(422).json({ error: "Quantity field is required" });
    }
    if (!request.body.unitPrice) {
      return response
        .status(422)
        .json({ error: "Unit Price field is required" });
    }
    if (!request.body.paymentMethod) {
      return response
        .status(422)
        .json({ error: "Payment Method field is required" });
    }

    request.body.total = request.body.unitPrice * request.body.quantity;

    const newSale = await Sale.create(request.body);
    return response.status(201).json(newSale);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

exports.updateSaleById = async (request, response) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response
        .status(422)
        .json({ error: "Parameter is not a valid id" });
    }

    console.log(await Sale.exists({ _id: request.params.id }));

    if (!(await Sale.exists({ _id: request.params.id }))) {
      return response.status(404).json({ error: "Sale not found" });
    }
    request.body.total = request.body.unitPrice * request.body.quantity;
    const saleUpdated = await Sale.findByIdAndUpdate(
      request.params.id,
      request.body,
      { new: true }
    );

    return response.status(200).json(saleUpdated);
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};

exports.deleteSaleById = async (request, response) => {
  try {
    if (!mongoose.isValidObjectId(request.params.id)) {
      return response
        .status(422)
        .json({ error: "Parameter is not a valid id" });
    }

    const sale = await Sale.findById(request.params.id);

    if (!sale) {
      return response.status(404).json({ error: "Sale not found" });
    } else {
      await sale.deleteOne();
    }

    return response.status(200).json({ message: "Sale deleted successfully" });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
};
