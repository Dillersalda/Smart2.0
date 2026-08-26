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

// ====================================================================================
//              CATÁLOGO DE PRODUTOS
// ====================================================================================

    const catalogoGrade =
    document.querySelector("#catalogo-grade");
    const quantidadeProdutos =
    document.querySelector("#quantidade-produtos");

    let todosProdutos = [];

    fetch("data/produtos.json")
        .then(resposta => resposta.json())
        .then(produtos => {
            todosProdutos = produtos;

        rendenizarProdutos(todosProdutos);
        })

        .catch(erro => {
            console.error("erro ao carregar produtos:", erro);
        });

    function rendenizarProdutos(produtos) {
        catalogoGrade.innerHTML = "";

        quantidadeProdutos.textContent = 
        `${produtos.length} produtos encontrados`;
        produtos.forEach(produto => {
            const card =
            document.createElement("article");

            card.classList.add("catalogo-produto-card");
            card.innerHTML = `
                    ${produto.oferta ? `<span class="catalogo-oferta">Oferta</span>`: ""}
                    <button class="catalogo-favorito" aria-label="favoritar ${produto.nome}">
                    <i class="fa-regular fa-heart"></i> </button>
                    
                    <div class="catalogo-produto-imagem">
                        <img src="${produto.imagem}" alt="${produto.nome}" loading="lazy" decoding="async">
                    </div>
                    <h3>${produto.nome}</h3>
                    <p class="catalogo-especificacao">${produto.especificacao}</p>
                    <strong class="catalogo-preco">${formatarPreco(produto.preco)}</strong>
                    <p class="catalogo-parcelamento"> ou até ${produto.parcelas}x de ${formatarPreco(produto.valorParcela)}</p>
                    <button class="catalogo-interesse" data-id="${produto.id}"> Tenho interesse </button>`;
                    
            catalogoGrade.appendChild(card);
        });
    }
    function formatarPreco(valor) {
        return valor.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        });
    }