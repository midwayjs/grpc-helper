import { registerHelper } from 'handlebars';

registerHelper('comment', function (this: any) {
  if (this.comment) {
    return `// ${this.comment.replace(/\n/g, '\n// ')}`;
  }
});
