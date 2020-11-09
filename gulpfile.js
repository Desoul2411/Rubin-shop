let project_folder = "dist"; // конечная папка
let source_folder = "#src"; // папка с исходниками

let fs = require('fs'); //file system

let path = {  
    build: { //куда выгружать обработанные файлы
        html: project_folder + "/",
        css: project_folder + "/css/",
        js: project_folder + "/js/",
        img: project_folder + "/img/",
        fonts: project_folder + "/fonts/",
    },
    src: { //исходники
        html: [source_folder + "/*.html","!" + source_folder + "/_*.html"], // исключаем из исходников файлы кот-е нач-ся с _ (_header.html)
        css: source_folder + "/scss/main.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",  // **/ - слушаем все подпапки
        fonts: source_folder + "/fonts/*.ttf",
    },
    watch: { //то что слушаем постоянно
        html: source_folder + "/**/*.html",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",  // **/ - слушаем все подпапки
        
    },
    clean:"./" + project_folder + "/"  // удаляем папку проекта каждый раз при запуске gulp
}

let {src, dest } = require('gulp'),
gulp = require('gulp'),
browsersync = require("browser-sync").create(),
fileinclude = require("gulp-file-include"),
del = require("del"),
scss = require("gulp-sass"),
autoprefixer = require("gulp-autoprefixer"),  // ставит автоматом префтксы вендоров
group_media = require("gulp-group-css-media-queries"),// собирает меди стили и переносит их в конец файла 
clean_css = require("gulp-clean-css"),  // чистит и сжимает css на выходе
rename = require("gulp-rename"),
uglify = require("gulp-uglify-es").default, // сжимает js
imagemin = require("gulp-imagemin"),  // сжимает фото без потери качества
webp = require('gulp-webp'),// для перевода картинок в формат webp
webphtml = require("gulp-webp-html"),  // автоматическое подключение webp в html.
webpcss = require("gulp-webpcss"), // стили для webp
svgSprite = require('gulp-svg-sprite'),//объединение иконок в один файл
tt2fwoff = require('gulp-ttf2woff'),  // конвертация шрифтов
tt2fwoff2 = require('gulp-ttf2woff2'), // конвертация шрифтов из ttf в woff и woff2
fonter = require('gulp-fonter'); //  // конвертация шрифтов из otf в ttf





function browserSync(params) {  // обновление страницы
    browsersync.init({
        server: {
            baseDir: "./" + project_folder + "/" 
        },
        port: 3000,  //порт браузера
        notify: false  // отключение уведомлений о сотоянии браузера

    })
}

function html() {
    return src(path.src.html) 
        .pipe(fileinclude())  // собирает несколько файлов (тут html) в один
        .pipe(webphtml())
        .pipe(dest(path.build.html)) // путь к конечной папке (где будет готовый ре-т)
        .pipe(browsersync.stream()) // обновлять страницу
}

function css() {
    return src(path.src.css) 
    .pipe(
        scss({
            outputStyle: "expanded"  // чтобы scss формировался не сжатым а развёрнутым для лёгкости чтения
        })
    )
    .pipe(
        group_media()
    )
    .pipe(
        autoprefixer({
            cascade: false
           /*  overrideBrowserlist: ["last 5 versions"],
            cascade: true */
        })
    )
    .pipe(webpcss())
    .pipe(dest(path.build.css))  // выгружаем файл до того как его переименовать и сжать для того, чтобы сохранился второй несжатый файл стилей (для лучшего чтения)
    .pipe(clean_css())  
    .pipe(
        rename({
            extname: ".min.css"
        })
    )
    .pipe(dest(path.build.css)) // путь к конечной папке (где будет готовый ре-т)
    .pipe(browsersync.stream()) // обновлять страницу
}

function js() {
    return src(path.src.js) 
        .pipe(fileinclude())
        .pipe(dest(path.build.js)) // путь к конечной папке (где будет готовый ре-т)
        .pipe(  // после выгрузки несжатого js файла сжимаем его
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream()) // обновлять страницу
}

function images() {
    return src(path.src.img) 
    .pipe(   // настрйки для преобразования в webp
        webp({
            quality:90
        })
    )
    .pipe(dest(path.build.img)) // сохраняем в формате webp
    .pipe(src(path.src.img))  // также делаем обработку (сжатие в обычном формате).По итогк в html будет генерироваться и обычный тэг img (для IE) и picture для webp (для остальных браузеров)
    .pipe(
        imagemin({      //настройки сжатия картинок
            progressive: true,
            svgoPlugins: [{ removeViewBox: false}],
            interlaced: true,
            optomizationLevel: 3  // 0 to 7
        })
    )
        .pipe(dest(path.build.img)) // путь к конечной папке (где будет готовый ре-т)
        .pipe(browsersync.stream()) // обновлять страницу
}


function fonts() {    //конвертация шрифтов из ttf в woff и woff2
    src(path.src.fonts)
        .pipe(tt2fwoff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(tt2fwoff2())
        .pipe(dest(path.build.fonts)); 
};


gulp.task('otf2ttf' , function () { ////конвертация шрифтов из otf в d ttf // запуск -  gulp otf2ttf  
    return src([source_folder + '/fonts/*.otf'])
    .pipe(fonter({
        formats:['ttf']
    }))
    .pipe(dest(source_folder + '/fonts/'));// выгрузить результат в папку шрифтов ИСХОДНИКОВ (src)
})


gulp.task('svgSprite' , function () {  //сборка иконок в один файл. Запускать в консоли отдельно
    return gulp.src([source_folder + '/iconsprite/*.svg'])
    .pipe(svgSprite({
        mode: {
            stack: {
                sprite: ".../icons/icons.svg",  // sprite filename  // куда выводить готовый файл
                example: true
            }
        },
    }))
    .pipe(dest(path.build.img));
})

function fontsStyle(params) { //ФУНКЦИЯ ЗАПИСИ ИНФОРМАЦИИ В FONTS.SCSS - автоподключение шрифтов

    let file_content = fs.readFileSync(source_folder + '/scss/base/_fonts.scss');
    if (file_content == '') {
    fs.writeFile(source_folder + '/scss/base/_fonts.scss', '', cb);
    return fs.readdir(path.build.fonts, function (err, items) {
    if (items) {
    let c_fontname;
    for (var i = 0; i < items.length; i++) {
    let fontname = items[i].split('.');
    fontname = fontname[0];
    if (c_fontname != fontname) {
    fs.appendFile(source_folder + '/scss/base/_fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
    }
    c_fontname = fontname;
    }
    }
    })
    }
}

function watchFiles(params) {
    gulp.watch([path.watch.html],html)  // следить за html фпйлами и обновлять их  // watch (путь, функция)
    gulp.watch([path.watch.css],css) // следить за scss файлами и обновлять их
    gulp.watch([path.watch.js],js) // следить за js файлами и обновлять их
    gulp.watch([path.watch.img],images) // следить за img файлами и обновлять их
}

function clean(params) {  // удалить папку dist при запуске и создавать заново
    return del(path.clean);
}


let build = gulp.series(clean,gulp.parallel(js,css,html,images,fonts),fontsStyle); //ulp.parallel - для одновременного вып-я ф-ций
let watch = gulp.parallel(build,watchFiles,browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts; 
exports.images = images;
exports.js = js;
exports.css = css; 
exports.html = html;
exports.build = build;
exports.watch = watch; // при запуске gulp будет выполнятся watch который потянет за собой цепочку вышеописанных действий
exports.default = watch;
