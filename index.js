const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown-remarkable');
const less = require('metalsmith-less');
const inlineCss = require('metalsmith-inline-css');
const cleanCSS = require('metalsmith-clean-css');
const htmlMinifier = require('metalsmith-html-minifier');
const ignore = require('metalsmith-ignore');

Metalsmith(__dirname) // __dirname defined by node.js:
  // name of current working directory
  .metadata({
    sitename: 'Tuomas Pöyry — Web Designer & Developer',
    siteurl: 'https://tuomas.poyry.me/',
    description:
      'A passionate Web Designer & Developer working in the industry since 2014.'
  })
  .source('./src') // source directory
  .destination('./build') // destination directory
  .clean(true) // clean destination before
  .use(
    markdown('full', {
      html: true
    })
  ) // transpile all md into html
  .use(
    layouts({
      directory: './templates'
    })
  )
  .use(less())
  .use(cleanCSS())
  // .use(inlineCss())
  .use(inlineCss())
  .use(htmlMinifier())
  .use(ignore(['*.less', '*.css']))
  // .use(cssPacker({ inline: true }))
  /*
  .use(
    permalinks({
      // change URLs to permalink URLs
      relative: false // put css only in /css
    })
  )
  */
  .build(error => {
    // build process
    if (error) throw error; // error handling is required
  });
