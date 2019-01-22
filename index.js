const Metalsmith = require('metalsmith');
const layouts = require('metalsmith-layouts');
const markdown = require('metalsmith-markdown-remarkable');
const less = require('metalsmith-less');
const inlineCss = require('metalsmith-inline-css');
const cleanCSS = require('metalsmith-clean-css');
const htmlMinifier = require('metalsmith-html-minifier');
const ignore = require('metalsmith-ignore');

Metalsmith(__dirname)
  .metadata({
    title: 'Tuomas Pöyry — Web Designer & Developer',
    description:
      'A passionate Web Designer & Developer working in the industry since 2014.'
  })
  .source('./src')
  .destination('./build')
  .clean(true)
  .use(
    markdown('full', {
      html: true
    })
  )
  .use(
    layouts({
      directory: './templates'
    })
  )
  .use(less())
  .use(cleanCSS())
  .use(inlineCss())
  .use(htmlMinifier())
  .use(ignore(['*.less', '*.css']))
  .build(error => {
    if (error) throw error;
  });
