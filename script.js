// Elementos do DOM
const itemInput = document.getElementById('itemInput');
const quantityInput = document.getElementById('quantityInput');
const addBtn = document.getElementById('addBtn');
const shoppingList = document.getElementById('shoppingList');
const clearBtn = document.getElementById('clearBtn');
const exportBtn = document.getElementById('exportBtn');
const totalItems = document.getElementById('totalItems');
const checkedItems = document.getElementById('checkedItems');
const totalQuantity = document.getElementById('totalQuantity');

// Modal
const editModal = document.getElementById('editModal');
const editItemText = document.getElementById('editItemText');
const editItemQuantity = document.getElementById('editItemQuantity');
const cancelEditBtn = document.getElementById('cancelEditBtn');
const saveEditBtn = document.getElementById('saveEditBtn');

// Chave para localStorage
const STORAGE_KEY = 'shoppingList';

// Array para armazenar os itens
let items = [];

// ID do item sendo editado
let editingItemId = null;

// Inicializar a aplicação
document.addEventListener('DOMContentLoaded', () => {
    loadFromLocalStorage();
    renderList();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    addBtn.addEventListener('click', addItem);
    clearBtn.addEventListener('click', clearAllItems);
    exportBtn.addEventListener('click', exportList);
    
    // Permitir adicionar item com Enter
    itemInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            addItem();
        }
    });

    // Modal listeners
    cancelEditBtn.addEventListener('click', closeEditModal);
    saveEditBtn.addEventListener('click', saveEdit);
    editModal.addEventListener('click', (e) => {
        if (e.target === editModal) {
            closeEditModal();
        }
    });

    // Permitir salvar com Enter no modal
    editItemText.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
    editItemQuantity.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            saveEdit();
        }
    });
}

// Adicionar novo item
function addItem() {
    const text = itemInput.value.trim();
    const quantity = parseInt(quantityInput.value) || 1;
    
    // Validações
    if (text === '') {
        itemInput.focus();
        showNotification('Por favor, digite um item!', 'warning');
        return;
    }

    if (text.length > 100) {
        showNotification('Item muito longo! Máximo 100 caracteres.', 'warning');
        return;
    }

    // Verificar duplicatas
    if (items.some(item => item.text.toLowerCase() === text.toLowerCase())) {
        showNotification('Este item já está na lista!', 'warning');
        itemInput.focus();
        return;
    }

    // Criar objeto do item
    const newItem = {
        id: Date.now(),
        text: text,
        quantity: quantity,
        completed: false,
        dateAdded: new Date().toLocaleDateString('pt-br')
    };

    items.push(newItem);
    saveToLocalStorage();
    renderList();
    itemInput.value = '';
    quantityInput.value = '1';
    itemInput.focus();
    showNotification('✓ Item adicionado!', 'success');
}

// Remover item
function removeItem(id) {
    items = items.filter(item => item.id !== id);
    saveToLocalStorage();
    renderList();
    showNotification('✓ Item removido!', 'success');
}

// Toggle item concluído
function toggleItem(id) {
    const item = items.find(item => item.id === id);
    if (item) {
        item.completed = !item.completed;
        saveToLocalStorage();
        renderList();
    }
}

// Renderizar lista
function renderList() {
    shoppingList.innerHTML = '';

    if (items.length === 0) {
        shoppingList.innerHTML = '<li class="empty-state">Sua lista está vazia. Comece adicionando itens!</li>';
        updateStats();
        clearBtn.disabled = true;
        exportBtn.disabled = true;
        return;
    }

    clearBtn.disabled = false;
    exportBtn.disabled = false;

    items.forEach(item => {
        const li = document.createElement('li');
        li.className = item.completed ? 'completed' : '';
        li.innerHTML = `
            <input 
                type="checkbox" 
                class="item-checkbox" 
                ${item.completed ? 'checked' : ''}
                onchange="toggleItem(${item.id})"
            >
            <span class="item-text">${escapeHtml(item.text)}</span>
            <span class="item-quantity">${item.quantity} un</span>
            <button class="edit-btn" onclick="openEditModal(${item.id})">Editar</button>
            <button class="delete-btn" onclick="removeItem(${item.id})">Remover</button>
        `;
        shoppingList.appendChild(li);
    });

    updateStats();
}

// Atualizar estatísticas
function updateStats() {
    const total = items.length;
    const completed = items.filter(item => item.completed).length;
    const totalQty = items.reduce((sum, item) => sum + (item.quantity || 1), 0);

    totalItems.textContent = `${total} ${total === 1 ? 'item' : 'itens'}`;
    checkedItems.textContent = `${completed} comprado${completed !== 1 ? 's' : ''}`;
    totalQuantity.textContent = `Total: ${totalQty}`;
}

// Limpar todos os itens
function clearAllItems() {
    if (items.length === 0) return;

    const confirmed = confirm('Tem certeza que deseja limpar TODA a lista? Esta ação não pode ser desfeita.');
    
    if (confirmed) {
        items = [];
        saveToLocalStorage();
        renderList();
        showNotification('✓ Lista limpa!', 'success');
    }
}

// Exportar lista
function exportList() {
    if (items.length === 0) {
        showNotification('A lista está vazia!', 'warning');
        return;
    }

    let exportText = 'LISTA DE COMPRAS\n';
    exportText += `Data: ${new Date().toLocaleDateString('pt-br')}\n`;
    exportText += '='.repeat(50) + '\n\n';

    items.forEach((item, index) => {
        const status = item.completed ? '[✓]' : '[ ]';
        exportText += `${status} ${index + 1}. ${item.text} (${item.quantity} un)\n`;
    });

    exportText += '\n' + '='.repeat(50) + '\n';
    exportText += `Total de itens: ${items.length}\n`;
    exportText += `Itens comprados: ${items.filter(i => i.completed).length}\n`;
    exportText += `Quantidade total: ${items.reduce((sum, item) => sum + (item.quantity || 1), 0)} unidades\n`;

    // Criar arquivo e fazer download
    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(exportText));
    element.setAttribute('download', `lista-compras-${new Date().toISOString().split('T')[0]}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);

    showNotification('✓ Lista exportada!', 'success');
}

// Salvar no localStorage
function saveToLocalStorage() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch (error) {
        console.error('Erro ao salvar no localStorage:', error);
        showNotification('Erro ao salvar dados!', 'danger');
    }
}

// Carregar do localStorage
function loadFromLocalStorage() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        items = data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Erro ao carregar do localStorage:', error);
        items = [];
    }
}

// Função para escapar HTML (segurança contra XSS)
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Abrir modal de edição
function openEditModal(id) {
    const item = items.find(item => item.id === id);
    if (!item) return;

    editingItemId = id;
    editItemText.value = item.text;
    editItemQuantity.value = item.quantity || 1;
    editModal.classList.add('active');
    editItemText.focus();
}

// Fechar modal de edição
function closeEditModal() {
    editModal.classList.remove('active');
    editingItemId = null;
    editItemText.value = '';
    editItemQuantity.value = '1';
}

// Salvar edições
function saveEdit() {
    if (editingItemId === null) return;

    const text = editItemText.value.trim();
    const quantity = parseInt(editItemQuantity.value) || 1;

    // Validações
    if (text === '') {
        showNotification('Por favor, digite um texto!', 'warning');
        editItemText.focus();
        return;
    }

    if (text.length > 100) {
        showNotification('Item muito longo! Máximo 100 caracteres.', 'warning');
        return;
    }

    // Verificar se há outro item com o mesmo texto
    const isDuplicate = items.some(item => 
        item.id !== editingItemId && 
        item.text.toLowerCase() === text.toLowerCase()
    );

    if (isDuplicate) {
        showNotification('Este item já existe na lista!', 'warning');
        editItemText.focus();
        return;
    }

    // Atualizar item
    const item = items.find(item => item.id === editingItemId);
    if (item) {
        item.text = text;
        item.quantity = quantity;
        saveToLocalStorage();
        renderList();
        closeEditModal();
        showNotification('✓ Item atualizado!', 'success');
    }
}

// Notificação simples (visual feedback)
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;

    const colors = {
        'success': { bg: '#d4edda', color: '#155724', border: '#c3e6cb' },
        'warning': { bg: '#fff3cd', color: '#856404', border: '#ffeaa7' },
        'danger': { bg: '#f8d7da', color: '#721c24', border: '#f5c6cb' },
        'info': { bg: '#d1ecf1', color: '#0c5460', border: '#bee5eb' }
    };

    const style = colors[type] || colors['info'];
    notification.style.backgroundColor = style.bg;
    notification.style.color = style.color;
    notification.style.border = `1px solid ${style.border}`;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Adicionar animações ao CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(100px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(100px);
        }
    }
`;
document.head.appendChild(style);
