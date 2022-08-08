const incomeArea = document.querySelector('.income-area');
const expensesArea = document.querySelector('.expenses-area');
const addPanel = document.querySelector('.add-transaction-panel');

const nameInput = document.querySelector('#name');
const amountInput = document.querySelector('#amount');
const categorySelect = document.querySelector('#category');

const availableMoney = document.querySelector('.available-money');

const addBtn = document.querySelector('.add-transaction');
const saveBtn = document.querySelector('.save');
const cancelBtn = document.querySelector('.cancel');
const deleteBtn = document.querySelector('.delete');
const deleteAllBtn = document.querySelector('.delete-all');

const light = document.querySelector('.light');
const dark = document.querySelector('.dark');

let root = document.documentElement;
let ID = 0;
let categoryIcon;
let selectedCategory;
let moneyArr = [0];

const closeAndClearPanel = () => {
  addPanel.style.display = 'none';
  nameInput.value = '';
  amountInput.value = '';
  categorySelect.value = 'none';
};

const createNew = () => {
  const newTrans = document.createElement('div');

  newTrans.classList.add('transaction');
  newTrans.setAttribute('id', ID);
  selectCategory();
  checkCategory(selectedCategory);

  newTrans.innerHTML = `
    <p class="transaction-name">
      ${categoryIcon}
      ${nameInput.value}
      </p>
    <p class="transaction-amount">
    ${amountInput.value} USD
     <button class="delete" onclick="deleteTrans(${ID})"><i class="fas fa-times"></i></button></p>
  `;

  if (amountInput.value > 0) {
    incomeArea.appendChild(newTrans) && newTrans.classList.add('income');
  } else {
    expensesArea.appendChild(newTrans) && newTrans.classList.add('outcome');
  }

  moneyArr.push(parseFloat(amountInput.value));
  ID++;
  count(moneyArr);
  closeAndClearPanel(selectedCategory);
};

const checkCategory = (transaction) => {
  switch (transaction) {
    case '[ + ] Income':
      categoryIcon = '<i class="fas fa-money-bill-wave"></i>';
      break;
    case '[ - ] Shopping':
      categoryIcon = '<i class="fas fa-cart-arrow-down"></i>';
      break;
    case '[ - ] Food':
      categoryIcon = '<i class="fas fa-hamburger"></i>';
      break;
    case '[ - ] Food':
      categoryIcon = '<i class="fas fa-film"></i>';
      break;
  }
};

const selectCategory = () => {
  selectedCategory = categorySelect.options[categorySelect.selectedIndex].text;
};

const count = (money) => {
  const newMoney = money.reduce((a, b) => a + b);
  availableMoney.textContent = `${newMoney} USD`;
};

const deleteTrans = (id) => {
  const transToDel = document.getElementById(id);
  const transAmountToDel = parseFloat(transToDel.childNodes[3].innerText);

  const indexOfTrans = moneyArr.indexOf(transAmountToDel);

  moneyArr.splice(indexOfTrans, 1);

  transToDel.classList.contains('income')
    ? incomeArea.removeChild(transToDel)
    : expensesArea.removeChild(transToDel);

  count(moneyArr);
};

const deleteAllTrans = () => {
  incomeArea.innerHTML = '<h3>Income:</h3>';
  expensesArea.innerHTML = '<h3>Expense:</h3>';
  availableMoney.textContent = '0 USD';
  moneyArr = [0];
};

const changeStyleToLight = () => {
  root.style.setProperty('--first-color', '#f9f9f9');
  root.style.setProperty('--second-color', '#14161f');
  root.style.setProperty('--border-color', 'rgba(0, 0, 0, 0.2)');
};

const changeStyleToDark = () => {
  root.style.setProperty('--first-color', '#14161f');
  root.style.setProperty('--second-color', '#f9f9f9');
  root.style.setProperty('--border-color', 'rgba(255, 255, 255, 0.4)');
};

addBtn.addEventListener('click', () => {
  addPanel.style.display = 'flex';
});

cancelBtn.addEventListener('click', closeAndClearPanel);

saveBtn.addEventListener('click', () => {
  if (
    nameInput.value !== '' &&
    amountInput.value !== '' &&
    categorySelect.value !== 'none'
  ) {
    createNew();
  } else {
    alert('Fill in all fields');
  }
});

deleteAllBtn.addEventListener('click', deleteAllTrans);
light.addEventListener('click', changeStyleToLight);
dark.addEventListener('click', changeStyleToDark);
