import * as handlebars from 'handlebars';

handlebars.registerHelper('var', (varName, varValue, options) => {
  options.data.root[varName] = varValue;
});
