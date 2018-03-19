module.exports.sendJSONresponse = function(res, status, content) { // function for sending the response in a set format
  res.status(status);
  res.json(content);
};
