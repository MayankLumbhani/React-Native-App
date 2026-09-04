import { createPropertyService, getUserPropertiesService, getPropertyByIdService, updatePropertyService, deletePropertyService } from "./property.service.js";

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

export const getUserProperties = async (req, res, next) => {
  try {
    const properties = await getUserPropertiesService(req.user.userId);

    return res.status(200).json({
      success: true,
      data: {
        properties,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getPropertyById = async (req, res, next) => {
  try {
    const property = await getPropertyByIdService(
      req.params.propertyId,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      data: {
        property,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const updateProperty = async (req, res, next) => {
  try {
    const property = await updatePropertyService(
      req.params.propertyId,
      req.user.userId,
      req.body
    );

    return res.status(200).json({
      success: true,
      data: {
        property,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const deleteProperty = async (req, res, next) => {
  try {
    const property = await deletePropertyService(
      req.params.propertyId,
      req.user.userId
    );

    return res.status(200).json({
      success: true,
      data: {
        property,
      },
    });
  } catch (error) {
    next(error);
  }
};