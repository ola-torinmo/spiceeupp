export default () => {
  let code = "";
  for (let index = 0; index < 4; index++) {
    code += Math.floor(Math.random() * 10);
  }
  return code;
};
