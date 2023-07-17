import contactService from "../service/contact-service.js";

const create = async (req, res, next) => {
  try {
    const user = req.user;
    const request = req.body;
    const result = await contactService.create(request);
    res.status(201).json({
      data: result,
    });
  } catch (e) {
    next(e);
  }
};

export default {
  create,
};
