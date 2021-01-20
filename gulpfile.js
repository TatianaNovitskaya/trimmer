// подключаем плагины
var gulp = require ('gulp'),
    stylus = require ('gulp-stylus'),
    postcss = require ('gulp-postcss'),
    spritesmith = require ('gulp.spritesmith'),
    autoprefixer = require ('autoprefixer-core'),
    imagemin = require ('gulp-imagemin'),
    newer = require ('gulp-newer'),
    sourcemaps = require ('gulp-sourcemaps'),
    uglify = require ('gulp-uglify'),
    concat = require ('gulp-concat');
var svgstore = require ('gulp-svgstore');
var svgmin = require ('gulp-svgmin');
var path = require ('path');
var browserSync = require ('browser-sync');
var htmlmin = require ('gulp-htmlmin');

// переменные с путями
// пути к исходным файлам из который будет собираться
// стилус
var srcStyl = 'src/stylus/';
// картинки
var srcImgs = 'src/images/';
// спрайты
var srcSprts = 'src/sprites/';
// javascript
var srcJavascriptLIB = 'src/javascript/lib/';
var srcJavascriptMain = 'src/javascript/main/';
var srcHtml = 'src/html/';

// пути к финальным файлам
// цсс
var publCss = 'public/css/';
// картинки
var publImgs = 'public/images/';
var fileincluder = require ('gulp-file-includer');
var publicJS = 'public/js/';
var publicHtml = 'public/';


// регистрируем задачи
gulp.task ('default', [
    'watch',
    'sprites',
    'stylus',
    'fileincluder',
    'svgstore',
    // 'scriptsConcat',
    'compressJSLIB',
    'compressJSMain',
    'browser-sync'
    //'minifyHTML'
]);

// настраиваем слежение за изменениями
gulp.task ('watch', function () {
    // следим за папкой sprites. если есть изменения - запускаем задачу 'sprites'
    gulp.watch (srcSprts + '*', ['sprites']);
    // следим за папкой images. если есть изменения - запускаем задачу 'images'
    // следим за папкой stylus. если есть изменения - запускаем задачу 'stylus'
    gulp.watch (srcStyl + '**/*.styl', ['stylus']);
    gulp.watch ('src/svg/*.svg', ['svgstore']);
    gulp.watch (srcHtml + '*.html', ['fileincluder']);
    //gulp.watch('src/buildHTML/*.html',    ['minifyHTML']);

    // следим за папкой js. если есть изменения - запускаем задачу 'compressJS'
    // gulp.watch ('src/scriptConcat/*.js', ['scriptsConcat']);
    gulp.watch (srcJavascriptLIB + '*.js', ['compressJSLIB']);
    gulp.watch (srcJavascriptMain + '*.js', ['compressJSMain']);
    gulp.watch ("public/*.html", ['bs-reload']);
    gulp.watch ("public/css/*.css", ['bs-reload']);
    gulp.watch ("public/js/lib/*.js", ['bs-reload']);
    gulp.watch ("public/js/main/*.js", ['bs-reload']);
    gulp.watch ("public/images/**", ['bs-reload']);

});

gulp.task ('fileincluder', function () {
    gulp.src ([srcHtml + '*.html', '!' + srcHtml + '_*.html'])
        .pipe (fileincluder ())
        .pipe (gulp.dest (publicHtml))
});


/*gulp.task('minifyHTML', function() {
    return gulp.src('src/buildHTML/!*.html')
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest(publicHtml))
});*/

// запуск сервера
gulp.task ('browser-sync', function () {
    browserSync ({
        server: {
            baseDir: "public/"
        }
    });
});

// Перезапуск всех серверов
gulp.task ('bs-reload', function () {
    browserSync.reload ();
});

// оптимизация картинок
gulp.task ('svgstore', function () {
    return gulp
        .src ('src/svg/*.svg')
        .pipe (svgmin (function (file) {
            var prefix = path.basename (file.relative, path.extname (file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe (svgstore ())
        .pipe (gulp.dest ('public/images/svg-sprite'));
});


gulp.task ('compressJSLIB', function () {
    gulp.src (srcJavascriptLIB + '*.js')
        .pipe (concat ('lib.js'))
        .pipe (uglify ())
        .pipe (gulp.dest ('public/js/lib/'))
});
gulp.task ('compressJSMain', function () {
    gulp.src (srcJavascriptMain + '*.js')
        .pipe (concat ('main.js'))
        // .pipe (uglify ())
        .pipe (gulp.dest ('public/js/main/'))
});

//Сжатие JS
// gulp.task ('compressJSLIB', function () {
//     return gulp.src (srcJavascriptLIB + '*.js')
//         // .pipe (uglify ())
//         .pipe (gulp.dest ('public/js/lib/'));
// });
// gulp.task ('compressJSMain', function () {
//     return gulp.src (srcJavascriptMain + '*.js')
//         // .pipe (uglify ())
//         .pipe (gulp.dest ('public/js/main/'));
// });

// генерим стилус
gulp.task ('stylus', function () {
    // путь к главному файлу стилус в который будет все собираться
    gulp.src (srcStyl + 'main.styl')
    // генерим
        .pipe (stylus ({
            // минимизируем
            compress: false,
            // инициализируем карту
            sourcemap: {
                inline: true,
                sourceRoot: '.',
                basePath: publCss
            }
        })).on ('error', function (error) {
        console.log (error, '---------------------> ERROR');
    })
    // строим карту
        .pipe (sourcemaps.init ({
            loadMaps: true
        }))
        .pipe (postcss ([
            // подставляем прозрачность для ие
            opacity,
            // добавляем вендорные префиксы
            autoprefixer ({
                browsers: ['> 1%', 'last 9 versions', 'ie > 7','Firefox >= 20','Opera 12.1', 'iOS >=7']
            })
        ]))
        // записываем карту
        /*  .pipe (sourcemaps.write ('.', {
              includeConent: false,
              sourceRoot: '.'
          }))*/
        // сохраняем готовый цсс
        .pipe (gulp.dest (publCss));
});


// генерим спрайты
gulp.task ('sprites', function () {
    // путь к папке где лежат иходные файлы из которых будет собираться спрайт
    var spriteData = gulp.src (srcSprts + '*').pipe (spritesmith ({
        // имя итогового файла спрайта
        imgName: 'sprite.png',
        // формат файла в который будут генерироваться переменные с информацмей о спрайтах
        cssFormat: 'stylus',
        // файл стилуса в который будут генерироваться переменные с информацмей о спрайтах
        cssName: '_sprite.styl',
        // алгоритм сборки - максимально компактно
        algorithm: 'binary-tree',
        // отступы между изображениями в спрайте
        padding: 10,
        // шаблон описывающий как будут генерироваться переменные с информацмей о спрайтах
        cssTemplate: 'stylus.template.mustache',
        // вид имени переменных с информацмей о спрайтах
        cssVarMap: function (sprite) {
            sprite.name = 's-' + sprite.name
        }
    }));
    // сохраняем спрайт
    spriteData.img.pipe (gulp.dest (srcImgs));
    // сохраняем файл стилуса в который будут генерироваться переменные с информацмей о спрайтах
    spriteData.css.pipe (gulp.dest (srcStyl));
});


// прозрачность для ие
function rgba2hex (rgba) {
    rgba = rgba.match (/^rgba\((\d+),\s*(\d+),\s*(\d+),\s*(\d*\.\d+)\)$/);

    function hex (x) {
        return ("0" + parseInt (x).toString (16)).slice (-2);
    }

    return "#" + (rgba[4] * 100) + hex (rgba[1]) + hex (rgba[2]) + hex (rgba[3]);
}

var opacity = function (css) {
    css.eachDecl (function (decl, i) {
        if (decl.prop === 'opacity') {
            decl.parent.insertAfter (i, {
                prop: '-ms-filter',
                value: '"progid:DXImageTransform.Microsoft.Alpha(Opacity=' + (parseFloat (decl.value) * 100) + ')"'
            });
        }
        if (decl.prop === 'background-color') {
            var str = decl.value;
            if (str.indexOf ('rgba(') + 1) {
                var colorHex = rgba2hex (str);
                decl.parent.insertAfter (i, {
                    prop: '-ms-filter',
                    value: '"progid:DXImageTransform.Microsoft.Gradient(GradientType=0, StartColorStr=\'' + colorHex + '\', EndColorStr=\'' + colorHex + '\')"'
                });
            }
        }
    });
};

