import { registerHelper } from 'handlebars';

registerHelper('var', (varName, varValue, options) => {
  options.data.root[varName] = varValue;
});
