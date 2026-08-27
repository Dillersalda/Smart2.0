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

const selectLoja =
document.querySelector("#loja-atendimento");

fetch("data/lojas.json")
    .then(resposta => resposta.json())
    .then(lojas => {
        lojas.forEach((loja, indice) => {

            const option =
            document.createElement("option");

                option.value = indice;
                option.textContent = loja.regiao;

            selectLoja.appendChild(option);
        });
    })

    .catch(erro => {
        console.error("Erro ao carregar lojas:", erro);
    });

const formulario =
document.querySelector("#orcamento-form");
const nomeCliente =
document.querySelector("#nome-cliente");
const marcaAparelho =
document.querySelector("#marca-aparelho");
const modeloAparelho =
document.querySelector("#modelo-aparelho");
const tipoDefeito =
document.querySelector("#tipo-defeito");
const descricaoDefeito =
document.querySelector("#descricao-defeito");

let lojas = [];

fetch ("data/lojas.json")
    .then(resposta => resposta.json())
    .then(dados => {
        lojas = dados;
        lojas.forEach((loja, indice) => {

            const option =
            document.createElement("option");

            option.value = indice;
            option.textContent = loja.regiao;

            selectLoja.appendChild(option);
        });
        });
        .catch(erro => {
            console.log("erro ao carregar lojas:", erro);
    });

    formulario.addEventListener("submit",(evento) => {
        evento.preventDefault();

        const lojaSelecionada = 
        lojas[selectLoja.value];

        const aparelhoLiga =
        document.querySelector
    })

