# 📋 Lista de Compras Dinâmica

Uma aplicação web moderna para gerenciar sua lista de compras com armazenamento persistente usando localStorage do navegador.

## ✨ Funcionalidades

- ✅ **Adicionar itens** - Digite um item, defina a quantidade e clique em "Adicionar" ou pressione Enter
- ✅ **Editar itens** - Clique no botão "Editar" para alterar o texto e a quantidade
- ✅ **Marcar como comprado** - Clique no checkbox para marcar itens já comprados
- ✅ **Remover itens** - Delete itens individuais com um clique
- ✅ **Controle de quantidade** - Defina e altere a quantidade de cada item
- ✅ **Armazenamento persistente** - Os dados são salvos automaticamente no localStorage
- ✅ **Contadores** - Veja quantos itens você tem, quantos já comprou e a quantidade total
- ✅ **Exportar lista** - Baixe sua lista em formato texto com quantidades
- ✅ **Limpar tudo** - Remova todos os itens de uma vez
- ✅ **Interface responsiva** - Funciona perfeitamente em qualquer dispositivo
- ✅ **Validação de dados** - Previne duplicatas e valida entradas
- ✅ **Segurança** - Proteção contra XSS (Cross-Site Scripting)

## 🚀 Como Usar

1. Abra o arquivo `index.html` no seu navegador
2. Digite um item no campo de entrada
3. Defina a quantidade desejada (padrão: 1 unidade)
4. Clique no botão "Adicionar" ou pressione Enter
5. Para editar um item:
   - Clique no botão "Editar" do item
   - Altere o texto e/ou a quantidade na janela que aparecer
   - Clique em "Salvar" para confirmar
6. Marque os itens que já comprou usando o checkbox
7. Remova itens clicando no botão "Remover"
8. Exporte sua lista clicando em "Exportar"

## 📁 Arquivos do Projeto

- **index.html** - Estrutura HTML da aplicação
- **style.css** - Estilos e design responsivo
- **script.js** - Lógica da aplicação e gerenciamento do localStorage
- **README.md** - Este arquivo

## 💾 Armazenamento Local

A aplicação utiliza o localStorage do navegador para armazenar os dados automaticamente. Isso significa:

- ✅ Seus dados são salvos localmente no seu navegador
- ✅ A lista persiste mesmo após fechar o navegador
- ✅ Nenhum dado é enviado para servidores
- ✅ Os dados estão disponíveis offline

### Limpando o localStorage

Se você deseja limpar completamente os dados:
1. Abra as Ferramentas do Desenvolvedor (F12)
2. Vá para a aba "Application" ou "Storage"
3. Selecione "Local Storage"
4. Encontre e delete a entrada com a chave `shoppingList`

## 🎨 Características do Design

- Interface moderna com gradiente roxo
- Animações suaves e responsivas
- Feedback visual com notificações
- Suporte a mobile e desktop
- Scrollbar customizado
- Efeitos hover interativos

## 🔒 Segurança

- Validação de entrada para prevenir XSS
- Escapamento de caracteres HTML
- Limite de 100 caracteres por item
- Verificação de duplicatas

## 📊 Estatísticas

A aplicação mostra em tempo real:
- Total de itens na lista
- Quantidade de itens já comprados
- Total de unidades a comprar (soma de todas as quantidades)

## 🌐 Compatibilidade

Funciona em todos os navegadores modernos que suportam:
- HTML5
- CSS3
- JavaScript ES6+
- localStorage

Testado em:
- Chrome/Chromium
- Firefox
- Safari
- Edge

## 💡 Dicas de Uso

1. Use a tecla Enter para adicionar itens rapidamente
2. Defina a quantidade ao adicionar o item ou edite depois clicando em "Editar"
3. O campo de quantidade aceita valores de 1 a 999
4. Clique no checkbox para marcar itens comprados (a lista será atualizada automaticamente)
5. Use o botão "Editar" para alterar tanto o texto quanto a quantidade de um item
6. Aproveite a funcionalidade de exportar para ter um registro impresso com quantidades
7. A aplicação salva automaticamente cada mudança no localStorage
8. A quantidade total ajuda a você saber quantas unidades precisa comprar no total

## 📝 Exemplo de Uso

```
1. Abrir index.html no navegador
2. Adicionar: "Leite" (quantidade: 2)
3. Adicionar: "Pão" (quantidade: 1)
4. Adicionar: "Ovos" (quantidade: 1 dúzia)
5. Clicar em "Editar" do Pão e aumentar quantidade para 2
6. Marcar "Leite" como comprado
7. Remover "Pão"
8. Exportar lista para arquivo de texto
```

**Resultado esperado:**
- 2 itens na lista (Leite + Ovos)
- 1 item comprado (Leite)
- Total de 2 unidades a comprar

---

**Desenvolvido com ❤️ usando HTML, CSS e JavaScript**