export const getFirstLetter = (name: string) => {
  if (name != undefined && name != "") {
    let separatedName = name.split(" ");
    let firstLetter = separatedName[0].charAt(0);
    let secondeLetter =
      separatedName[1] != undefined ? separatedName[1].charAt(0) : "";
    let abb = firstLetter + secondeLetter;
    return abb.toUpperCase();
  }
};

export const filterArray = (expression: string, data: any) => {
  var regex = convertWildcardStringToRegExp(expression);

  return data.filter(function (item: any) {
    return regex.test(item.email) || regex.test(item.phone);
  });
};

function escapeRegExp(str: any) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function convertWildcardStringToRegExp(expression: any) {
  var terms = expression.split("*");

  var trailingWildcard = false;

  var expr = "";
  for (var i = 0; i < terms.length; i++) {
    if (terms[i]) {
      if (i > 0 && terms[i - 1]) {
        expr += ".*";
      }
      trailingWildcard = false;
      expr += escapeRegExp(terms[i]);
    } else {
      trailingWildcard = true;
      expr += ".*";
    }
  }

  if (!trailingWildcard) {
    expr += ".*";
  }

  return new RegExp("^" + expr + "$", "i");
}
