const btnMenu = document.querySelector(".menu-btn");
const menuMobile = document.querySelector(".menu-mobile");
const overlay = document.querySelector(".menu-overlay");
const fecharMenu = document.querySelector(".fechar-menu");
const linksMenu = document.querySelectorAll(".menu-links a");

const categoriasFiltro =
document.querySelectorAll(".categoria-filtro[data-categoria]");

const btnVerTodas =
document.querySelector(".categorias-limpar");

const catalogoGrade =
document.querySelector("#catalogo-grade");

const quantidadeProdutos =
document.querySelector("#quantidade-produtos");

const filtroCategoria =
document.querySelector("#filtro-categoria");

const buscarProduto =
document.querySelector("#buscar-produto");

const filtroPreco =
document.querySelector("#filtro-preco");

const filtroOferta =
document.querySelector("#filtro-oferta");

const ordenarProdutos =
document.querySelector("#ordenar-produtos");

const limparFiltros =
document.querySelector(".filtros-limpar");

const carregarMais =
document.querySelector(".carregar-mais");

const produtosPorPagina = 4;

const favoritos = new Set();

try {
    const favoritosSalvos = JSON.parse(
        localStorage.getItem("smartblin-favoritos") || "[]"
    );

    if
    (Array.isArray(favoritosSalvos)) {
        favoritosSalvos.forEach(id => {
            if (Number.isInteger(id)) {
                favoritos.add(id);
            }
        });
    }
} catch (erro) {
    console.warn("Não foi possível recuperar os favoritos:", erro);
}

const filtroFavoritos =
document.querySelector("#filtro-favoritos");

let limiteProdutos = produtosPorPagina;
let todosProdutos = [];
let produtosFiltrados = [];
let catalogoCarregado = false;


// ====================================================================================
// MENU MOBILE
// ====================================================================================

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


// ====================================================================================
// CARREGAR PRODUTOS
// ====================================================================================

fetch("data/produtos.json")
    .then(resposta => {
        if (!resposta.ok) {
            throw new Error("Não foi possível carregar o catálogo.");
        }
        return resposta.json();
    } 
        
    )
    .then(produtos => {

        todosProdutos = produtos;
        catalogoCarregado = true;
       
        aplicarFiltros();
    })

    .catch(erro => {
        console.error("Erro ao carregar produtos:", erro);
        quantidadeProdutos.textContent =
        "Catalogo Indisponível";

        catalogoGrade.innerHTML = `<p class="catalogo-mensagem" role="alert">
        Não foi possível carregar os Produtos no momento.
        Recarregue a Página, e tente novamente </p>`;

        carregarMais.hidden = true;
    });


// ====================================================================================
// RENDERIZAR PRODUTOS
// ====================================================================================

function renderizarProdutos(produtos) {

    catalogoGrade.innerHTML = "";

    quantidadeProdutos.textContent =
        `${produtosFiltrados.length} produtos encontrados`;

        if (produtos.length === 0) {
            catalogoGrade.innerHTML = `
            <p class="catalogo-mensagem" role="status">
            Nenhum Produto Encontrado.
                Tente outra busca ou limpe os filtros.
                </p>`;

                return;
        }

    produtos.forEach(produto => {

        const card =
        document.createElement("article");

        card.classList.add("catalogo-produto-card");

        card.innerHTML = `
            ${produto.oferta
                ? `<span class="catalogo-oferta">Oferta</span>`
                : ""
            }

            <button
            type="button"
            class="catalogo-favorito ${favoritos.has(produto.id) ?
            "ativo" : ""}"
            data-id="${produto.id}"
            aria-label="Favoritar ${produto.nome}"
            aria-pressed="${favoritos.has(produto.id)}"
            >
                <i class="${favoritos.has(produto.id) ? "fa-solid" : "fa-regular"} fa-heart"></i>
            </button>

            <div class="catalogo-produto-imagem">
                <img
                    src="${produto.imagem}"
                    alt="${produto.nome}"
                    loading="lazy"
                    decoding="async"
                >
            </div>

            <h3>${produto.nome}</h3>

            <p class="catalogo-especificacao">
                ${produto.especificacao}
            </p>

            <strong class="catalogo-preco">
                ${formatarPreco(produto.preco)}
            </strong>

            <p class="catalogo-parcelamento">
                ou até ${produto.parcelas}x de
                ${formatarPreco(produto.valorParcela)}
            </p>

            <button
                class="catalogo-interesse"
                data-id="${produto.id}"
            >
                Tenho interesse
            </button>
        `;

        catalogoGrade.appendChild(card);
    });
}


// ====================================================================================
// FORMATAR PREÇO
// ====================================================================================

function formatarPreco(valor) {

    return valor.toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL"
    });

}


// ====================================================================================
// FILTRAR POR BUSCA OU CATEGORIA
// ====================================================================================

function normalizarTexto(texto) {
    return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g,"")
    .toLowerCase()
    .trim();
}

function aplicarFiltros(reiniciarLista = true) 
{
    if (!catalogoCarregado) {
        return;
    }

    if (reiniciarLista) {
        limiteProdutos =
        produtosPorPagina;
    }
    const textoBusca =
normalizarTexto(buscarProduto.value);

    const categoriaSelecionada =
    filtroCategoria.value;

    const faixaPreco =
    filtroPreco.value;
    

    produtosFiltrados =
todosProdutos.filter(produto => {
    const textoProduto = normalizarTexto(
        `${produto.nome} ${produto.marca} ${produto.especificacao}`
    );
    const correspondeBusca =
    textoProduto.includes(textoBusca);

    const correspondeCategoria =
    categoriaSelecionada === "" ||

    produto.categoria ===
    categoriaSelecionada;

    const correspondeFavorito =
    !filtroFavoritos.checked || favoritos.has(produto.id);

    const preco = Number(produto.preco);

    let correspondePreco = true;

    if (faixaPreco === "0-500") {
        correspondePreco = preco >= 0 && preco <= 500;
    } else if (faixaPreco === "500-1500")
    {
        correspondePreco = preco > 500 && preco <= 1500;
    } else if (faixaPreco ===
        "1500-3000")
        {
            correspondePreco = preco > 1500 && preco <= 3000;
        } else if (faixaPreco === "3000+") {
            correspondePreco = preco > 3000;
        }

    const correspondeOferta = 
    !filtroOferta.checked || produto.oferta;
    
    return correspondeBusca &&
           correspondeCategoria &&
           correspondePreco &&
           correspondeOferta &&
           correspondeFavorito;
});

const ordenacao =
ordenarProdutos.value;

if (ordenacao === "menor-preco") {
    produtosFiltrados.sort((a, b) => a.preco - b.preco);
}else if (ordenacao === "maior-preco") {
        produtosFiltrados.sort((a, b) => b.preco - a.preco);
} else if (ordenacao === "nome") {
    produtosFiltrados.sort((a, b) => a.nome.localeCompare(b.nome, "pt-br")
);
}

categoriasFiltro.forEach(botao => {

        botao.classList.toggle(
            "ativo",
            botao.dataset.categoria === categoriaSelecionada
        );
});

const produtosVisiveis =
    produtosFiltrados.slice(0,limiteProdutos);

    carregarMais.hidden =
    limiteProdutos >=
    produtosFiltrados.length;

renderizarProdutos(produtosVisiveis);
}

// =========================================================
//      CATEGORIAS RÁPIDAS 
// =========================================================

categoriasFiltro.forEach(botao => {
    botao.addEventListener("click", () => {
        filtroCategoria.value =
        botao.dataset.categoria;

        aplicarFiltros();
    });
});

// =========================================================
//      VER TODAS
// =========================================================

btnVerTodas.addEventListener("click", () =>{
    filtroCategoria.value = "";

    aplicarFiltros();
});

//  ========================================================
//  SELECT DE CATEGORIA
//  ========================================================

filtroCategoria.addEventListener("change", () => {
    aplicarFiltros();
});

buscarProduto.addEventListener("input", () => {aplicarFiltros()});

filtroPreco.addEventListener("change", () => {
    aplicarFiltros();
});

filtroOferta.addEventListener("change", () => {
    aplicarFiltros();
});

ordenarProdutos.addEventListener("change", () => {
    aplicarFiltros();
});


limparFiltros.addEventListener("click", () => {
    buscarProduto.value = "";
   filtroCategoria.value = "";
   filtroPreco.value = "";
   filtroOferta.checked = false;
   ordenarProdutos.value = "";

   aplicarFiltros();
});

carregarMais.addEventListener("click", () => {
    limiteProdutos += produtosPorPagina;
    aplicarFiltros(false);
});

catalogoGrade.addEventListener("click", evento => {
    const botao =

    evento.target.closest(".catalogo-favorito");

    if (!botao) {
        return;
    }

    const id =
    Number(botao.dataset.id);

    if (favoritos.has(id)) {
        favoritos.delete(id);
    } else {
        favoritos.add(id);
    }

    try{
        localStorage.setItem(
            "smartblin-favoritos",
            JSON.stringify([...favoritos])
        );
    } catch (erro) {
        console.warn("Não foi possivel salvar os favoritos:", erro);
 
   }

    const estaFavoritado =
    favoritos.has(id);

    botao.classList.toggle("ativo",estaFavoritado);

    botao.setAttribute("aria-pressed", estaFavoritado);

    const icone =
    botao.querySelector("i");

    icone.classList.toggle("fa-solid", estaFavoritado);

    icone.classList.toggle("fa-regular",!estaFavoritado);
});