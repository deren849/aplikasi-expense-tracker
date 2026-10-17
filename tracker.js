let expenses = JSON.parse(localStorage.getItem('expense')) || [];
let chart = null;
let editId = null;

const translations = {
    id: {
        nav_main: "main",
        nav_history: "history pengeluaran",
        nav_about: "tentang",
        btn_lang: "English",
        title_add: "tambah pengeluaran",
        label_name: "tambahkan pengeluaran",
        place_name: "masukan pengeluaran anda. contoh:nasi goreng...",
        label_amount: "jumlah (RP)",
        place_amount: "masukan nominalnya kayak gini: 12000",
        label_category: "kategori",
        opt_food: "makanan",
        opt_entertain: "hiburan",
        opt_transport: "transportasi",
        opt_other: "lainnya",
        btn_submit: "simpan transaksi",
        title_chart: "persentase kategori",
        title_history: "history pengeluaran",
        place_search: "cari pengeluaran",
        opt_all: "semua kategori",
        title_total: "total : Rp ",
        title_about: "tentang aplikasi",
        desc_about: "aplikasi <bold>expense tracker</bold> ini di bangun untuk membantu melacak pengeluaran kamu sendiri supaya gak boros gak beli hal yg gak berguna",
        feat_title: "fitur fitur aplikasi ini",
        feat_1: "Manipulasi DOM Dinamis",
        feat_2: "Web Storage API (localStorage) data persisten",
        feat_3: "Fitur Interaktif (Pencarian & Filter Kategori)",
        feat_4: "Integrasi Grafik Interaktif via Chart.js",
        dev_note: "dikembangkan secara otodidak",
        footer_text: "All Rights Reserved.",
        desc_about: "aplikasi <strong>expense tracker</strong> ini di bangun untuk membantu melacak pengeluaran kamu sendiri supaya gak boros gak beli hal yg gak berguna",
    },
    en: {
        nav_main: "Main",
        nav_history: "Expense History",
        nav_about: "About",
        btn_lang: "Indonesia",
        title_add: "Add Expense",
        label_name: "Expense Name",
        place_name: "Enter your expense. e.g: fried rice...",
        label_amount: "Amount (IDR)",
        place_amount: "Enter amount like this: 12000",
        label_category: "Category",
        opt_food: "Food",
        opt_entertain: "Entertainment",
        opt_transport: "Transport",
        opt_other: "Other",
        btn_submit: "Save Transaction",
        title_chart: "Category Percentage",
        title_history: "Expense History",
        place_search: "Search expenses",
        opt_all: "All Categories",
        title_total: "Total : IDR ",
        title_about: "About Application",
        desc_about: "This <bold>expense tracker</bold> app is built to help track your expenses so you don't overspend on useless things.",
        feat_title: "Features of this app",
        feat_1: "Dynamic DOM Manipulation",
        feat_2: "Web Storage API (localStorage) for persistent data",
        feat_3: "Interactive Features (Search & Category Filter)",
        feat_4: "Interactive Chart Integration via Chart.js",
        dev_note: "Developed autodidactically",
        footer_text: "All Rights Reserved.",
        desc_about: "This <strong>expense tracker</strong> app is built to help track your expenses so you don't overspend on useless things.",
    }

};

let currentLanguage = localStorage.getItem('language') || 'id';

function toggleLanguage() {
    currentLanguage = currentLanguage === 'id' ? 'en' : 'id';
    localStorage.setItem('language', currentLanguage);
    applyTranslations();
}

function applyTranslations() {
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');

       if (translations[currentLanguage][key]) { 
        if (element.tagName === 'INPUT') {
            element.placeholder = translations[currentLanguage][key];
        } else {
            element.innerHTML = translations[currentLanguage][key];
        }
       }
    });

    if (chart) {
        chart.data.labels = [
            translations[currentLanguage].opt_food,
            translations[currentLanguage].opt_transport,
            translations[currentLanguage].opt_entertain,
            translations[currentLanguage].opt_other
        ];
        chart.update();
    }

    if (currentLanguage === 'en') {
        document.title = "Expense Tracker";
    } else {
        document.title = "Aplikasi Pencatat Pengeluaran";
    }

    renderExpense();
}

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
        return;
    }
    
    if (isNaN(amount) || amount < 1) {
        return;
    }

    const submitBtn = expenseForm.querySelector('.btn');

    if (editId != null) {
        const index =  expenses.findIndex(item => item.id === editId);
        if (index !== -1) {
            expenses[index].name = name;
            expenses[index].amount = amount;
            expenses[index].category = category;
        }
        editId = null;
        if (submitBtn) submitBtn.innerText = translations[currentLanguage].btn_submit;


    } else {

    const newExpense = {
        id: +new Date(),
        name: name,
        amount: amount,
        category: category
    };
    
    
    expenses.push(newExpense);
    }
    
    saveToStorage();
    expenseForm.reset();
    switchSection('main');
    updateChartData();
    
});


function editExpense(id){
    const target = expenses.find(item => item.id === id);

    if (target) {
        switchSection('main');

        document.getElementById('expense-name').value = target.name;
        document.getElementById('expense-amount').value = target.amount;
        document.getElementById('expense-category').value = target.category;

        const submitBtn = expenseForm.querySelector('.btn');
        if (submitBtn) {
            submitBtn.innerText = currentLanguage === 'en' ? 'Update Expense' : 'perbarui pengeluaran';
        }

        editId = id;
    }

    saveToStorage();
    updateChartData();
    
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

        let categoryKey = '';
        if(item.category === 'makanan') categoryKey = 'opt_food';
        else if(item.category === 'transportasi') categoryKey = 'opt_transport';
        else if(item.category === 'hiburan') categoryKey = 'opt_entertain';
        else if(item.category === 'lainnya') categoryKey = 'opt_other';

        let translatedCategory = translations[currentLanguage][categoryKey] || item.category;
        
        let deleteBtnText = currentLanguage === 'en' ? 'Delete' : 'Hapus';
        let currencySymbol = currentLanguage === 'en' ? 'IDR ' : 'Rp ';

        const li = document.createElement('li');
      
        li.innerHTML = `
            <div class="expense-info">
                <strong>${item.name}</strong> 
                <span class="category-badge">${translatedCategory}</span>
                <p>${currencySymbol}${item.amount.toLocaleString('id-ID')}</p>
            </div>
            <div class="expense-actions">
                <button class="btn-edit" onclick="editExpense(${item.id})">Edit</button>
                <button class="btn-delete" onclick="deleteExpense(${item.id})">${deleteBtnText}</button>
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
                                
                                let itemText = currentLanguage === 'en' ? 'item ' : 'barang ';
                                label += itemText + context.parsed.toLocaleString('id-ID');
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
            totals[item.category] += 1;
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
    applyTranslations();
};

console.log("test console");