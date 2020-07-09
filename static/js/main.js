let html = document.documentElement
function bodyClick(e) {
    if (!(e.target.classList.contains('sidenav-toggler') || e.target.parentElement.classList.contains('sidenav-toggler'))) {
        let sides = document.getElementsByClassName('sidenav');
        for (var i = 0; i < sides.length; i++) {
            if (!(sides[i].classList.contains('sidenav-hided')) && !(sides[i].contains(e.target))) {
                sides[i].classList.add('sidenav-hided');
                sides[i].getElementsByTagName('div')[0].classList.add("d-none")
            }
        }
    }
}
html.addEventListener('click', bodyClick, false);
function toggleNav(id) {
    let el = document.getElementById(id);
    let sides = document.getElementsByClassName('sidenav');
    for (var i = 0; i < sides.length; i++) {
        if (!(el == sides[i])) {
            sides[i].classList.add('sidenav-hided');
            sides[i].getElementsByTagName('div')[0].classList.add("d-none")
        }
    }
    el.classList.toggle("sidenav-hided");
    el.getElementsByTagName('div')[0].classList.toggle("d-none")
}
