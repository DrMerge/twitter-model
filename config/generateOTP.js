const genOTP = () => {
  return Math.floor(Math.random * 10000);
};

module.exports = genOTP;
