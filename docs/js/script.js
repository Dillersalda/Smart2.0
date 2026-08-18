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

//======================================================================
// Carregar Novidades
// ===================================================================

fetch("data/novidades.json")
    .then(resposta => resposta.json())
    .then(dados => {

        console.log("JSON carregado:",dados);
        novidades = dados;

        criarIndicadores();
        atualizarNovidade();
    })
    .catch(erro => {
        console.error("Erro ao carregar novidades:", erro);
    });

    // =========================================================
    // Criar Indicadores
    // =========================================================

    function criarIndicadores() {
        console.log("criando indicadores...")

        indicadorContainer.innerHTML = "";
        novidades.forEach((novidade,indice) => {
            const indicador =
            document.createElement("button");

            indicador.classList.add("indicador");
            if (indice === 0) {
                indicador.classList.add("ativo");
            }
            indicador.addEventListener("click", () => {

                console.log("cliquei no indice:", indice);

                indiceAtual = indice;
                atualizarNovidade();
            });
            indicadorContainer.appendChild(indicador);
        });
    }

    // ===================================================
    // Atualizar Novidade
    // ===================================================

    const novidadesCard = document.querySelector(".novidades-card")

    function atualizarNovidade() {

        novidadesCard.classList.add("trocando");

            setTimeout(() =>{

        const novidade =
        novidades[indiceAtual];

        novidadeTag.textContent =
        novidade.tag;
        novidadeTitulo.textContent =
        novidade.titulo;
        novidadeDescricao.textContent =
        novidade.descricao;

        novidadeImagem.src =
        novidade.imagem;
        novidadeImagem.alt = novidade.alt;

        const indicadores =
        document.querySelectorAll(".indicador");

        indicadores.forEach((indicador,indice) => {
            indicador.classList.toggle("ativo",indice === indiceAtual);
        
        });
    novidadesCard.classList.remove("trocando");
    }, 300);
    }

    function proximaNovidade() {
        indiceAtual++;

        if (indiceAtual >= novidades.length) {
            indiceAtual = 0;
        }
        atualizarNovidade();
    }

    let autoplay = setInterval(proximaNovidade, 6000);

    function reiniciarAutoplay() {
        clearInterval(autoplay);
        autoplay =
        setInterval(proximaNovidade, 6000);
    }

    indicador.addEventListener("click", () => {
        indiceAtual = indice;

        atualizarNovidade();
        reiniciarAutoplay();
    });

// ========================================================================================
//  Produtos em Destaque
// ========================================================================================

const produtosCarrossel =
document.querySelector(".produtos-carrossel");

fetch("data/produtos.json")
    .then(resposta => resposta.json)
    .then(produtos => {

        produtos.forEach(produto => {
            
            const card = document.createElement("article");

            card.classList.add("produto-card");

            card.innerHTML = `
            ${produto.oferta
                ? `<span class="produto-oferta">Oferta</span>`
                : ""
            }
            
            <button class="produto-favorito"
                    aria-label="favoritar-produto">
                    <i class="fa-regular fa-heart"></i>
            </button>
            
            <div class="produtos-imagem">
                <img src="${produto.imagem}"
                alt="${produto.nome}">
            </div>

            <h3>${produto.nome}</h3>

             <p class="produto-especificacao">
                    ${produto.especificacao}
                </p>

                <strong class="produto-preco">
                    ${formatarPreco(produto.preco)}
                </strong>

                <p class="produto-parcelamento">
                    ou ${produto.parcelas}x de
                    ${formatarPreco(produto.preco / produto.parcelas)}
                </p>

                <a href="#" class="produto-detalhes">
                    Ver detalhes
                </a>
            `;

            produtosCarrossel.appendChild(card);
        });
    })

    .catch(erro => {
        console.error("erro ao carregar produtos:", erro);
    });

    function formatarPreco(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency" ,
            currency: "BRL"
        });
    }