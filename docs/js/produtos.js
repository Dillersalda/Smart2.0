const btnMenu = document.querySelector(".menu-btn");
const menuMobile = document.querySelector(".menu-mobile");
const overlay = document.querySelector(".menu-overlay");
const fecharMenu = document.querySelector(".fechar-menu");
const linksMenu = document.querySelectorAll(".menu-links a");


btnMenu.addEventListener("click", () => {
    menuMobile.classList.toggle("ativo");
    overlay.classList.toggle("ativo");
});

fecharMenu.addEventListener("click", () => {
    menuMobile.classList.remove("ativo");
    overlay.classList.remove("ativo");
});

overlay.addEventListener("click", () => {
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

const categoriasFiltro =
document.querySelectorAll(".categoria-filtro");
const btnVerTodas =
document.querySelector(".categorias-limpar");

    categoriasFiltro.forEach(botao => {

        botao.addEventListener("click", () => {
            categoriasFiltro.forEach(item =>{
                item.classList.remove("ativo");
            });

                botao.classList.add("ativo");

                console.log("Categoria selecionada",botao.dataset.categoria);
        });
    });

btnVerTodas.addEventListener("click", () => {

    categoriasFiltro.forEach(item => {
        item.classList.remove("ativo");
    });
    console.log("Todas as categorias");
});