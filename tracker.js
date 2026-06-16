let expenses = JSON.parse(localStorage.getItem('expense')) || [];
let chart = null;
let editId = null;


const expenseForm = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
const totalAmountText = document.getElementById('total-amount');
const searchInput = document.getElementById('search-input');
const filterCategory = document.getElementById('filter-category');

function switchSection(sectionName) {
    document.getElementById('main').classList.add('hidden');
    document.getElementById('history').classList.add('hidden');
    document.getElementById('about').classList.add('hidden');

    document.getElementById('nav-main').classList.remove('active');
    document.getElementById('nav-history').classList.remove('active');
    document.getElementById('nav-about').classList.remove('active');
    document.getElementById(sectionName).classList.remove('hidden');
    document.getElementById(`nav-${sectionName}`).classList.add('active');

    if(sectionName === 'history') {
        renderExpense();
    }
}

expenseForm.addEventListener('submit', function(ev) {
    ev.preventDefault();

    const name = document.getElementById('expense-name').value;
    const amount = parseInt(document.getElementById('expense-amount').value);
    const category = document.getElementById('expense-category').value;

    if (!name.trim()) {
        alert=("perlu di isi");
        return;
    }
    
    if (isNaN(amount) || amount < 1) {
        alert=("harus lebih dari 0");
        return;
    }

    if (editId != null) {
        const index =  expenses.findIndex(item => item.id === editId);
        if (index !== -1) {
            expenses[index].name = name;
            expenses[index].amount = amount;;
            expenses[index].category = category;
        }
        editId = null;
        if (submitbtn) submitbtn.innerText = "tambah pengeluaran";
        alert("pengeluaran berhasil di perbarui");
    } else {
    


    const newExpense = {
        id: +new Date(),
        name: name,
        amount: amount,
        category: category
    };
    
    expenses.push(newExpense);
    alert('data pengeluaran berhasil diperbarui');
}
    localStorage.setItem('expense', JSON.stringify(expenses));
   
    saveToStorage();
    updateChartData();
    switchSection('main');


    expenseForm.reset();
  
    
});


function editExpense(id){
    const target = expenses.find(item => item.id === id);

    if (target) {
        switchSection('main');

        document.getElementById('expense-name').value = target.name;
        document.getElementById('expense-amount').value = target.amount;
        document.getElementById('expense-category').value = target.category;

        const submitBtn = expenseForm.querySelector('.btn-submit');
        if (submitBtn) submitBtn.innerText = "perbarui pengeluaran";

        editId = id;
    }
}

function deleteExpese(id) {
    if (confirm("apakah kamu ingin mengahpus ini?")) {
        expenses = expenses.filter(item => item.id !== id);
        localStorage.setItem("expense", JSON.stringify(expenses));
        renderExpense();
        updateChartData();
    }
}


function saveToStorage() {
    localStorage.setItem('expense', JSON.stringify(expenses));
}

function deleteExpense(id) {
    expenses = expenses.filter(item => item.id !== id);
    saveToStorage();
    renderExpense();
    updateChartData();
}

function renderExpense() {
    expenseList.innerHTML = '';
    
    const keyword = searchInput.value.toLowerCase();
    const selectedCategory = filterCategory.value;

    let total = 0;

  
    const filteredExpense = expenses.filter(item => {
        const matchKeyword = item.name.toLowerCase().includes(keyword);
        const matchCategory = selectedCategory === 'semua' || item.category === selectedCategory;
        return matchKeyword && matchCategory;
    });

    filteredExpense.forEach(item => {
        total += item.amount;

        const li = document.createElement('li');
      
        li.innerHTML = `
       <div class="expense-info">
                <strong>${item.name}</strong> 
                <span class="category-badge">${item.category}</span>
                <p>Rp ${item.amount.toLocaleString('id-ID')}</p>
            </div>
            <div class="expense-actions">
                <button class="btn-edit"  onclick="editExpense(${item.id})">Edit</button>
                <button class="btn-delete" onclick="deleteExpense(${item.id})">Hapus</button>
            </div>
            `;
            expenseList.appendChild(li);
    });
    totalAmountText.innerText = total.toLocaleString('id-ID');
}

searchInput.addEventListener('input', renderExpense);
filterCategory.addEventListener('change', renderExpense);

function initChart() {
    const ctx = document.getElementById('expenseChart').getContext('2d');

    chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['makanan','transportasi', 'hiburan', 'lainnya'],
            datasets: [{
                data: [0,0,0,0],
                backgroundColor: ['#10b981', '#06b6d4', '#8b5cf6', '#64748b'],
                borderWidth: 2,
                borderColor: '#0b0f19'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            
            plugins: {
                legend: {
                    labels: {
                        color: '#f1f5f9', 
                        font: {
                            size: 14,     
                            family: 'system-ui, sans-serif' 
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        
                        label: function(context) {
                            let label = context.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.parsed !== null) {
                                
                                label += 'Rp ' + context.parsed.toLocaleString('id-ID');
                            }
                            return label;
                        }
                    }
                }
            }
        }
    });
    updateChartData();
}

function updateChartData() {
    if (!chart) return;
    
    const totals = {makanan: 0, transportasi: 0, hiburan: 0, lainnya: 0};
    

    expenses.forEach(item => {
        if (totals[item.category] !== undefined) {
            totals[item.category] += item.amount;
        }
    });

    chart.data.datasets[0].data = [
        totals.makanan,
        totals.transportasi,
        totals.hiburan,
        totals.lainnya
    ];
    chart.update();
}

window.onload = function() {
    initChart();
};

console.log("test console");