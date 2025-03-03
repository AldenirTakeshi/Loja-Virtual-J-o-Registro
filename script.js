class Loja {
  constructor() {
    this.estoque = [];
    this.registros = [];
  }

  adicionarProduto(nome, preco, quantidade) {
    this.estoque.push({ nome, preco, quantidade });
    this.atualizarEstoque();
    this.atualizarProdutosCompra();
  }

  listarProdutos() {
    const lista = document.getElementById('estoque');
    lista.innerHTML = '';
    this.estoque.forEach((produto) => {
      const item = document.createElement('li');
      item.textContent = `${produto.nome} - R$${produto.preco} - Estoque: ${produto.quantidade}`;
      lista.appendChild(item);
    });
  }

  atualizarProdutosCompra() {
    const select = document.getElementById('produtoCompra');
    select.innerHTML = '';
    this.estoque.forEach((produto) => {
      if (produto.quantidade > 0) {
        const option = document.createElement('option');
        option.value = produto.nome;
        option.textContent = `${produto.nome} (R$${produto.preco})`;
        select.appendChild(option);
      }
    });
  }

  registrarCompra(cliente, nomeProduto, quantidade) {
    const produto = this.estoque.find(
      (p) => p.nome.toLowerCase() === nomeProduto.toLowerCase(),
    );
    if (!produto) {
      alert('Produto não encontrado.');
      return;
    }
    if (produto.quantidade >= quantidade) {
      produto.quantidade -= quantidade;
      const valorTotal = (produto.preco * quantidade).toFixed(2);
      this.registros.push({ cliente, nomeProduto, quantidade, valorTotal });
      alert(
        `Compra registrada: ${quantidade}x ${nomeProduto} para ${cliente} - Total: R$${valorTotal}`,
      );
      this.atualizarEstoque();
      this.atualizarProdutosCompra();
      this.listarRegistros();
    } else {
      alert('Quantidade insuficiente em estoque.');
    }
  }

  listarRegistros() {
    const lista = document.getElementById('registros');
    lista.innerHTML = '';
    this.registros.forEach((registro) => {
      const item = document.createElement('li');
      item.textContent = `${registro.cliente} comprou ${registro.quantidade}x ${registro.nomeProduto} - Total: R$${registro.valorTotal}`;
      lista.appendChild(item);
    });
  }

  atualizarEstoque() {
    this.listarProdutos();
    this.atualizarProdutosCompra();
  }
}

const minhaLoja = new Loja();

window.adicionarProduto = function () {
  const nome = document.getElementById('nome').value;
  const preco = parseFloat(document.getElementById('preco').value);
  const quantidade = parseInt(document.getElementById('quantidade').value);
  if (nome && !isNaN(preco) && !isNaN(quantidade)) {
    minhaLoja.adicionarProduto(nome, preco, quantidade);
  }
};

window.registrarCompra = function () {
  const cliente = document.getElementById('cliente').value;
  const nomeProduto = document.getElementById('produtoCompra').value;
  const quantidade = parseInt(
    document.getElementById('quantidadeCompra').value,
  );
  if (cliente && nomeProduto && !isNaN(quantidade)) {
    minhaLoja.registrarCompra(cliente, nomeProduto, quantidade);
  }
};
