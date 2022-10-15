import * as handlebars from 'handlebars';

handlebars.registerHelper('comment', function (this: any) {
  if (this.comment) {
    return `// ${this.comment.replace(/\n/g, '\n// ')}`;
  }
});
