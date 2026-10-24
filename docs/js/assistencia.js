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

        const listaModalLojas =
            document.querySelector(".modal-lojas-lista");

        lojas.forEach(loja => {
            const botao =
            document.createElement("button");
            const mensagem =
            "Olá! Vim pelo site da Smartblin e gostaria de atendimento Técnico.";

            listaModalLojas.appendChild(botao);
            botao.innerHTML = `
            <i class="fa-solid fa-location-dot"></i>
            
            <div>
                <strong>${loja.nome}</strong>
                <span>Atendimento via Whatsapp</span>
                </div>
                <i class="fa-solid fa-chevron-right"></i>`;
            botao.classList.add("modal-loja-item");

            botao.addEventListener("click", () => {
                const urlWhatsapp = `https://wa.me/${loja.whatsapp}?text=${encodeURIComponent(mensagem)}`;

                modalLojas.classList.remove("ativo");

                window.open(urlWhatsapp, "_blank");
            });

            


        });
        lojas.forEach((loja, indice) => {

            const option =
            document.createElement("option");

            option.value = indice;
            option.textContent = loja.regiao;

            selectLoja.appendChild(option);
        });
        })
         .catch(erro => {
            console.error("erro ao carregar lojas:", erro);
    });

    formulario.addEventListener("submit",(evento) => {
        evento.preventDefault();

        const lojaSelecionada = 
        lojas[selectLoja.value];

        const aparelhoLiga =
        document.querySelector(
            `input[name="aparelho-liga"]:checked`
        );

        const mensagem = 
       
        `===================== *ORÇAMENTO SMARTBLIN* ====================
         *SOLICITAÇÃO DE ORÇAMENTO*

         Nome: ${nomeCliente.value}
         Aparelho: ${marcaAparelho.value} - ${modeloAparelho.value}
         Defeito: ${tipoDefeito.value}
         O aparelho liga: ${aparelhoLiga.value}
         Unidade: ${lojaSelecionada.regiao}

         Descrição:
        ${descricaoDefeito.value}

         Fotos:
        Enviarei as imagens do aparelho nesta conversa.
        ===================== *ORÇAMENTO SMARTBLIN* ====================`;

            const urlWhatsapp = 
            `https://wa.me/${lojaSelecionada.whatsapp}?text=${encodeURIComponent(mensagem)}`;

            window.open(urlWhatsapp, "_blank");
    });

    const btnAbrirWhatsapp =
    document.querySelector("#abrir-whatsapp");
    const modalLojas =
    document.querySelector("#modal-lojas");
    const fecharModalLojas =
    document.querySelector(".modal-lojas-fechar");
    const overlayModalLojas =
    document.querySelector(".modal-lojas-overlay");

    btnAbrirWhatsapp.addEventListener("click", (evento) => {
        evento.preventDefault();
        modalLojas.classList.add("ativo");
    });
    
    fecharModalLojas.addEventListener("click", () => {
        modalLojas.classList.remove("ativo");
    });

    overlayModalLojas.addEventListener("click", () => {
        modalLojas.classList.remove("ativo");
    });

