import { createPropertyService } from "./property.service.js";

export const createProperty = async (req, res, next) => {
  try {

    const property = await createPropertyService(
      req.user.userId,
      req.body
    );

    return res.status(201).json({
      success: true,
      data: {
        property,
      },
    });
  } catch (error) {
    next(error);
  }
};