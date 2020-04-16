let mix = require('laravel-mix');

mix.sass('assets/sass/app.scss', 'css/app.css')
   .js('assets/js/app.js', 'js/app.js');

if (Mix.inProduction()) {
  mix.minify('css/app.css')
     .minify('js/app.js');
}