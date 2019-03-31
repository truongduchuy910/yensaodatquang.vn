function modify_intro() {
    var page = document.getElementById('page');
    var intro = document.getElementById('intro');
    var banner_slide = document.getElementById('banner-slide');
    if (banner_slide.clientHeight > Number(intro.clientHeight) / 2) {
        page.style.top = "-" + String(Number(intro.clientHeight) / 2) + "px";
    } else {
        page.style.top = "-" + String(Number(banner_slide.clientHeight) / 2) + "px";
    }
}
modify_intro();
document.addEventListener("DOMContentLoaded", function () {
    window.addEventListener("scroll", function () {
        if (pageYOffset > 100) {
            //document.documentElement.scrollTop = 0;
        }
        
    })
})