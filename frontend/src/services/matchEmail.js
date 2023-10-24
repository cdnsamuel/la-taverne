const matchEmail = (str) =>
  str.match(/^((?!\.)[\w\-_.]*[^.])(@\w+)(\.\w+(\.\w+)?[^.\W])$/gm)
    ? true
    : false;

export default matchEmail;
