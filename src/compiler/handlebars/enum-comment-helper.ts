import { registerHelper } from 'handlebars';

registerHelper('enumComment', (conditional, options) => {
  if (options.data.root.comments && options.data.root.comments[conditional]) {
    return `// ${options.data.root.comments[conditional].replace(
      '\n',
      '\n// '
    )}`;
  }
});
