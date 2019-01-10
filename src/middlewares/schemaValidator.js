module.exports = (Schema, method) => (req, res, next) => {
  const data = {
    params: req.params,
    body: req.body,
    query: req.query,
  };

  const validation = Schema[method](data);

  if (!validation.error) {
    req.joi = {
      body: validation.value.body || {},
      params: validation.value.params || {},
      query: validation.value.query || {},
    };
    next();
  } else {
    res.status(400).send({ success: false, messages: validation.error.details });
  }
};
