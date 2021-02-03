const modal = {
  open() {
    // Abrir o modal
    // Ativar a classe active no modal
    document.querySelector(".modal-overlay").classList.add("active");
  },
  close() {
    // Fechar o modal
    // Remover a class active do modal
    document.querySelector(".modal-overlay").classList.remove("active");
  },
};

const transactions = [
  {
    id: 1,
    description: "Luz",
    amount: 50001,
    date: "07/01/2021",
  },
  {
    id: 2,
    description: "Água",
    amount: -2000,
    date: "07/01/2021",
  },
  {
    id: 3,
    description: "Gás",
    amount: 8080,
    date: "07/01/2021",
  },
  {
    id: 4,
    description: "Internet",
    amount: -9012,
    date: "07/01/2021",
  }
];

// É preciso somar as entradas
// Depois é preciso somar as saídas
// remover das entradas o valor das saídas
// Assim eu terei o total

const Transaction = {
  incomes() {
      let income = 0;
      transactions.forEach(transaction => {
          if(transaction.amount > 0) {
              income += transaction.amount;
          }
      })
      return income;
  },
  expenses() {  
    let expense = 0;
    transactions.forEach(transaction => {
        if(transaction.amount > 0) {
            expense += transaction.amount;
        }
    }) 
    return expense;
  },
  total() {
    return Transaction.incomes() + Transaction.expenses();
  },
};

// Substituir os dados do HTML com os dados do JS
// Objet aqui no JS
// e devolver para o HTML

const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index) {
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)

    },
    innerHTMLTransaction(transaction) {
    const CSSclass = transaction.amount > 0 ? "income" : "expense"

    const amount = Utils.formatCurrency(transaction.amount)

    const html = `
    <td class="descriptcion">${transaction.description}</td>
    <td class="expense">${amount}</td>
    <td class="date">${transaction.date}</td>
    <td>
        img src="./assets/minus.svg" alt="Removertransação"/>
    </td>
    `
    return html;
  },

  updateBalance() {
      documento
        .getElementById('incomeDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.income())
      documento
        .getElementById('expenseDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.expense())
      documento
        .getElementById('totalDisplay')
        .innerHTML = Utils.formatCurrency(Transaction.total())
  }
};


const Utils = {
    formatCurrency(value) {
        const signal = Number(value) < 0 ? "-" : ""

        value = String(value).replace(/\D/g, "")

        value = Number(value) / 100

        value = value.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })

        return signal + value
    }
}

transactions.forEach(function(transaction){
    DOM.addTransaction(transaction)
})

DOM.updateBalance()
