const whitelist = [
  "http://localhost:27016",
  "http://172.16.20.61:27016",
  "http://172.16.20.61:3000"
];

const corsOptions = {
  origin: (
    requestOrigin,
    callback
  ) => {
    if (
      (requestOrigin && whitelist.indexOf(requestOrigin) !== -1) ||
      !requestOrigin
    ) {
      callback(null, true);
    } else {
      callback(new Error("not allow by cors!"));
    }
  },
  credentials: true,
};

module.exports = { corsOptions }