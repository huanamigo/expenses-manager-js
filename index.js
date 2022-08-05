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

  newTrans.innerHTML = `
    <p class="transaction-name">
      ${categoryIcon}
      ${nameInput}
      </p>
    <p class="transaction-amount">
    ${amountInput.value}zł
     <button class="delete" onclick="deleteTrans(${ID})"><i class="fas fa-times"></i></button></p>
  `;
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
    console.log('first');
  } else {
    alert('Fill in all fields');
  }
});
