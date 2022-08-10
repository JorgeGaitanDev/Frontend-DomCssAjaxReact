var traverseDomAndCollectElements = function(matchFunc, startEl) {
  var resultSet = [];

  if (typeof startEl === "undefined") {
    startEl = document.body;
  }

  // recorre el árbol del DOM y recolecta elementos que matchien en resultSet
  // usa matchFunc para identificar elementos que matchien

  // TU CÓDIGO AQUÍ
  if (matchFunc(startEl)) {
    resultSet.push(startEl);
  }
  for (let i = 0; i < startEl.children.length; i++) {
    var elements = traverseDomAndCollectElements(matchFunc, startEl.children[i]); 
    resultSet = [...resultSet, ...elements]; //ES6
  }
  return resultSet;
};

// Detecta y devuelve el tipo de selector
// devuelve uno de estos tipos: id, class, tag.class, tag


var selectorTypeMatcher = function(selector) {
  // tu código aquí
  //'div' '#id' '.class' 'tag.class'
  if (selector[0] === "#") return "id";
  else if (selector[0] === ".") return "class";
  else if (selector.split('.').length > 1) return 'tag.class';
  else return "tag"; //se avalua todas las posibilidades con las cuales nos podiamos cruzar
};

// NOTA SOBRE LA FUNCIÓN MATCH
// recuerda, la función matchFunction devuelta toma un elemento como un
// parametro y devuelve true/false dependiendo si el elemento
// matchea el selector.

var matchFunctionMaker = function(selector) {
  var selectorType = selectorTypeMatcher(selector);
  var matchFunction;
  if (selectorType === "id") { 
    matchFunction = function (el) {
      return "#" + el.id === selector;
      //return `#${el.id}` === selector; OTRA FORMA DA LO MISMO
    }
  } else if (selectorType === "class") {
    matchFunction = function (el) {
      let classes = el.classList; //recorremos
      
        for (let i = 0; i < classes.length; i++) {
         if ("." + classes[i] === selector) return true; 
        }

        return false;
    }
  } else if (selectorType === "tag.class") {
    matchFunction = function (el) {
      let [tagBuscado, classBuscada] = selector.split(".");
      return matchFunctionMaker(tagBuscado)(el) && matchFunctionMaker("." + classBuscada)(el);
      //recursion
    }
  } else if (selectorType === "tag") {
    matchFunction = function(el) {
      // lo devuelve en mayusculas
      return el.tagName.toLowerCase() === selector;
      // toLowerCase() pone todo en minusculas
    }
  }
  return matchFunction;
};

var $ = function(selector) {
  var elements;
  var selectorMatchFunc = matchFunctionMaker(selector);
  elements = traverseDomAndCollectElements(selectorMatchFunc);
  return elements;
};
