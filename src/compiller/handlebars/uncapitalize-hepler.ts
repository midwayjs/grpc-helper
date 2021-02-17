import { registerHelper } from 'handlebars';

registerHelper('uncapitalize', conditional => {
  return conditional[0].toLowerCase() + conditional.slice(1);
});
