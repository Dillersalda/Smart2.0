const btnMenu = document.querySelector(".menu-btn");
const menuMobile = document.querySelector(".menu-mobile");
const overlay = document.querySelector(".menu-overlay");
const fecharMenu = document.querySelector(".fechar-menu");
const linksMenu = document.querySelectorAll(".menu-links a");

console.log(btnMenu);
console.log(menuMobile);
console.log(overlay);


btnMenu.addEventListener("click", () => {
    menuMobile.classList.toggle("ativo");
    overlay.classList.toggle("ativo");
});

overlay.addEventListener("click", () => {
    menuMobile.classList.remove("ativo");
    overlay.classList.remove("ativo");
});

fecharMenu.addEventListener("click", () => {
    menuMobile.classList.remove("ativo");
    overlay.classList.remove("ativo");
});

linksMenu.forEach(link => {
    link.addEventListener("click", () => {

        linksMenu.forEach(item => {
            item.classList.remove("ativo");
        });

        link.classList.add("ativo");

        menuMobile.classList.remove("ativo");
        overlay.classList.remove("ativo");
    });
});

const novidadeTag =
document.querySelector("#novidade-tag");
const novidadeTitulo =
document.querySelector("#novidade-titulo");
const novidadeDescricao =
document.querySelector("#novidade-descricao");
const novidadeImagem =
document.querySelector("#novidade-imagem");
const indicadorContainer =
document.querySelector(".novidades-indicadores");

let novidades = [];
let indiceAtual = 0;


