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


// ========================================================================================
//  Produtos em Destaque
// ========================================================================================

const produtosCarrossel =
document.querySelector(".produtos-carrossel");

console.log(produtosCarrossel);

fetch("data/produtos.json")
    .then(resposta => resposta.json())
    .then(produtos => {


        console.log("produtos Carregador:", produtos);

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
            
            <div class="produto-imagem">
                <img src="${produto.imagem}"
                alt="${produto.nome}">
            </div>

            <h3>${produto.nome}</h3>

             <p class="produto-especificacao">
                    ${produto.especificacao}
                </p>

                <div class="produto-preco-container">
                <strong class="produto-preco">
                    ${formatarPreco(produto.preco)}
                </strong>

                <span class="produto-avista">
                à vista
                </span>

                <p class="produto-parcelamento">
                    ou em até ${produto.parcelas}x de
                    ${formatarPreco(produto.valorParcela)}
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

// ==========================================================
//         NOSSAS LOJAS
// ==========================================================

    const lojasCarrossel =
    document.querySelector(".lojas-carrossel");

    fetch("data/lojas.json")
        .then(resposta => resposta.json())
        .then(lojas => {

            lojas.forEach(loja => {
                const card =
                document.createElement("article");

            const lojaAberta =
            verificarStatusLoja(
                    loja.abertura,
                    loja.fechamento
            );

            card.classList.add("loja-card");

                card.innerHTML = `
                <div class="loja-imagem">
                <img src="${loja.imagem}" alt="${loja.nome}"></div>

                <div class="loja-conteudo">

                <h3>${loja.nome}</h3>

                <p class="loja-endereco"> ${loja.endereco} </p>

                <span class="loja-status ${lojaAberta ? "aberto" : "fechado"}">${lojaAberta ? "Aberto agora" : "Fechado agora"}</span>

                <p class="loja-horario">
                ${loja.abertura} - ${loja.fechamento}</p>
                </div>
                
                <i class="fa-solid fa-location-dot loja-pin"></i>
                `;
            

            lojasCarrossel.appendChild(card);
        });
    })
    .catch(erro => {
        console.erro("Erro ao carregar lojas:", erro);
    });

    function verificarStatusLoja(abertura , fechamento) {

        const agora = new Date();

        const horaAtual =
            agora.getHours() * 60 +
            agora.getMinutes();

        const [horaAbertura, minutoAbertura] =
        abertura.split(":").map(Number);

        const [horaFechamento, minutoFechamento] =
        fechamento.split(":").map(Number);

        const aberturaMinutos =
        horaAbertura * 60 + minutoAbertura;

        const fechamentoMinutos =
        horaFechamento * 60 + minutoFechamento;

        return horaAtual >= aberturaMinutos &&
                horaAtual < fechamentoMinutos;
    }    


// ====================================================================================
// Barra Inferior
// ====================================================================================

const navItens = document.querySelectorAll(".nav-item");

function atualizarMenuAtivo() {

    const produtos = document.querySelector("#produtos");
    const lojas = document.querySelector("#lojas");

    const alturaTela = window.innerHeight;

    const produtosTopo =
        produtos.getBoundingClientRect().top;

    const lojasTopo =
        lojas.getBoundingClientRect().top;

    let secaoAtual = "inicio";


    // Produtos
    if (produtosTopo <= alturaTela * 0.65) {
        secaoAtual = "produtos";
    }


    // Lojas
    if (lojasTopo <= alturaTela * 0.80) {
        secaoAtual = "lojas";
    }


    navItens.forEach(item => {
        item.classList.remove("ativo");
    });


    const itemAtivo = document.querySelector(
        `.nav-item[href="#${secaoAtual}"]`
    );


    if (itemAtivo) {
        itemAtivo.classList.add("ativo");
    }
}


window.addEventListener("scroll", atualizarMenuAtivo);

atualizarMenuAtivo();

const listaModalLojas =
document.querySelector(".modal-lojas-lista");

    fetch("data/lojas.json")
    .then(resposta => resposta.json())
    .then(lojas => {

        lojas.forEach(loja => {

            const botao = document.createElement("button");

            botao.classList.add("modal-loja-item");

            botao.innerHTML = `
            <i class="fa-solid fa-location-dot"></i>
            
            <div>
                <strong>${loja.nome}</strong>
                <span>Atendimento via Whatsapp</span>
            </div>
            
            <i class="fa-solid fa-chevron-right"></i>
            `;

            botao.addEventListener("click", () => {

                const mensagem =
                "Olá! Vim pelo site da Smartblin e gostaria de atendimento.";

                const urlWhatsapp =
                `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`;

                modalLojas.classList.remove("ativo");

                window.open(urlWhatsapp, "_blank");
            });

            listaModalLojas.appendChild(botao);
        });
    });

    const btnAbrirWhatsapp =
    document.querySelector("#abrir-whatsapp");
    const modalLojas =
    document.querySelector("#modal-lojas");
    const fecharModalLojas =
    document.querySelector(".modal-lojas-fechar");
    const overlayModalLojas =
    document.querySelector(".modal-lojas-overlay");

    btnAbrirWhatsapp.addEventListener("click", () => {
        modalLojas.classList.add("ativo");
    });

    fecharModalLojas.addEventListener("click", () => {
        modalLojas.classList.remove("ativo");
    });

    overlayModalLojas.addEventListener("click", () => {
        modalLojas.classList.remove("ativo");
    });