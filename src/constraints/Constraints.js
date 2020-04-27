export default {
  text: {
    presence: true,
    length: {
      minimum: 1,
      message: "^Field can not be blank!",
    },
  },
  number: {
    format: {
      pattern: "[+-]?([0-9]*[.,])?[0-9]*",
      message: "^Field can only contain numbers!",
    },
  },
  date: {
    format: {
      pattern: /^((0?[1-9]|1[012])[- /.](0?[1-9]|[12][0-9]|3[01])[- /.](19|20)?[0-9]{2})*$/,
      message: "^Incorrect date format. (MM/DD/YYYY)",
    },
  },
};
