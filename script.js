

const apiKey = '923a00fc9d51443b90aa7c3570f3b07c'; 
const baseUrlEverything = `https://newsapi.org/v2/everything?apikey=${apiKey}&q=`;
const baseUrlTopHeadlines = `https://newsapi.org/v2/top-headlines?apikey=${apiKey}&country=us`;
const baseUrlSources = `https://newsapi.org/v2/sources?apikey=${apiKey}`;
const baseUrlLogs = 'https://www.piway.com.br/unoesc/api/logs/MATRICULA'; // Para exibir logs
const baseUrlInsertLog = 'https://www.piway.com.br/unoesc/api/inserir/log/MATRICULA/API/METODO/RESULTADO'; // Para inserir log
const baseUrlDeleteLog = 'https://www.piway.com.br/unoesc/api/excluir/log/IDLOG/aluno/MATRICULA'; // Para excluir log

const matricula = '417985'; 

async function fetchTopHeadlines() {
    const apiUrl = baseUrlTopHeadlines;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        if (!data.articles) {
            console.error('Nenhum artigo encontrado na resposta da API.');
            return;
        }
        displayNews(data.articles);

        // Inserir log no banco de dados
        await logApiRequest('top-headlines', data.articles.length); // Aqui chamamos a função para registrar o log
    } catch (error) {
        console.error('Erro ao buscar as principais manchetes:', error);
    }
}

// Função que insere o log no banco de dados
async function logApiRequest(api, numRecords) {
    const apiUrl = 'backend.php';  // Endpoint para o backend PHP
    const data = {
        numeroregistros: numRecords
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success) {
            console.log(`Log inserido com sucesso: ${numRecords} registros.`);
        } else {
            console.error('Erro ao registrar log.');
        }
    } catch (error) {
        console.error('Erro ao inserir log:', error);
    }
}

// Função para buscar e exibir os logs
// Função para buscar e exibir os logs
async function fetchLogs() {
    const apiUrl = 'backend.php?action=listLogs'; // Endpoint para listar os logs

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        
        const logs = await response.json();
        displayLogs(logs); // Exibe os logs
    } catch (error) {
        console.error('Erro ao buscar logs:', error);
    }
}

// Função para exibir os logs na interface
function displayLogs(logs) {
    const logsContainer = document.getElementById('logs-container');
    logsContainer.innerHTML = '';  // Limpa a área de logs

    if (Array.isArray(logs) && logs.length > 0) {
        logs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.classList.add('log-item');
            logItem.innerHTML = `
                <p><strong>Data:</strong> ${log.datahora}</p>
                <p><strong>Registros:</strong> ${log.numeroregistros}</p>
            `;
            logsContainer.appendChild(logItem);
        });
    } else {
        logsContainer.innerHTML = '<p>Nenhum log encontrado.</p>';
    }

    document.getElementById('logsModal').style.display = 'block';  // Exibe o modal de logs
}


// Função para exibir os logs na interface
function displayLogs(logs) {
    const logsContainer = document.getElementById('logs-container');
    logsContainer.innerHTML = '';  // Limpa a área de logs

    if (Array.isArray(logs) && logs.length > 0) {
        logs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.classList.add('log-item');
            logItem.innerHTML = `
                <p><strong>Data:</strong> ${log.datahora}</p>
                <p><strong>Registros:</strong> ${log.numeroregistros}</p>
            `;
            logsContainer.appendChild(logItem);
        });
    } else {
        logsContainer.innerHTML = '<p>Nenhum log encontrado.</p>';
    }

    document.getElementById('logsModal').style.display = 'block';  // Exibe o modal de logs
}



async function deleteAllNews() {
    const apiUrl = 'backend.php?action=deleteAll';  // URL modificada para chamar a exclusão de todas as notícias

    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });

        const result = await response.json();

        if (result.success) {
            alert('Todas as notícias foram excluídas com sucesso!');
            fetchSavedNews();  // Recarrega a lista de notícias salvas após a exclusão
        } else {
            alert('Erro ao excluir todas as notícias.');
        }
    } catch (error) {
        console.error('Erro ao excluir todas as notícias:', error);
    }
}

// Função que recarrega as notícias salvas
async function fetchSavedNews() {
    const apiUrl = 'backend.php?action=list';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);

        const savedNews = await response.json();
        displaySavedNews(savedNews); // Exibe as notícias salvas
    } catch (error) {
        console.error('Erro ao buscar notícias salvas:', error);
    }
}




async function saveNews(article) {
    const apiUrl = 'backend.php';
    const data = {
        titulo: article.title || 'Sem título',
        descricao: article.description || 'Sem descrição',
        imagem_url: article.urlToImage || 'https://via.placeholder.com/150',
        link: article.url || '#',
        fonte: article.source.name || 'Fonte desconhecida',
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
        });
        const result = await response.json();
        if (result.success) {
            alert('Notícia salva com sucesso!');
        } else {
            alert('Erro ao salvar notícia.');
        }
    } catch (error) {
        console.error('Erro ao salvar notícia:', error);
    }
}

async function fetchSavedNews() {
    const apiUrl = 'backend.php?action=list';

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        
        const savedNews = await response.json();
        displaySavedNews(savedNews); // Função para exibir as notícias salvas
    } catch (error) {
        console.error('Erro ao buscar notícias salvas:', error);
    }
}

function displaySavedNews(newsList) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novas notícias

    if (Array.isArray(newsList) && newsList.length > 0) {
        newsList.forEach(news => {
            const newsCard = document.createElement('div');
            newsCard.classList.add('news-card');

            const title = news.title || 'Sem título';
            const description = news.description || 'Sem descrição';
            const url = news.url || '#';

            newsCard.innerHTML = `
                <h3>${title}</h3>
                <p>${description}</p>
                <a href="${url}" target="_blank">Leia mais</a>
                <button onclick="deleteSavedNews(${news.id})">Excluir</button>
            `;
            newsContainer.appendChild(newsCard);
        });
    } else {
        newsContainer.innerHTML = '<p>Nenhuma notícia salva encontrada.</p>';
    }
}



async function deleteSavedNews(id) {
    const apiUrl = 'backend.php';
    try {
        const response = await fetch(apiUrl, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id }),
        });
        const result = await response.json();
        if (result.success) {
            alert('Notícia excluída com sucesso!');
            fetchSavedNews();
        } else {
            alert('Erro ao excluir notícia.');
        }
    } catch (error) {
        console.error('Erro ao excluir notícia:', error);
    }
}


async function fetchEverything() {
    const query = document.getElementById('search').value || 'latest';
    const apiUrl = `${baseUrlEverything}${query}`;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        if (!data.articles) {
            console.error('Nenhum artigo encontrado na resposta da API.');
            return;
        }
        displayNews(data.articles);
        await logAction('NewsAPI', 'everything', query); // Registra log com a consulta
    } catch (error) {
        console.error('Erro ao buscar notícias:', error);
    }
}

async function fetchSources() {
    const apiUrl = baseUrlSources;
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        if (!data.sources) {
            console.error('Nenhuma fonte encontrada na resposta da API.');
            return;
        }
        displaySources(data.sources);
        await logAction('NewsAPI', 'sources', JSON.stringify(data.sources.length)); // Registra log
    } catch (error) {
        console.error('Erro ao buscar fontes de notícias:', error);
    }
}

async function logAction(api, method, result) {
    const apiUrl = baseUrlInsertLog
        .replace('MATRICULA', matricula)
        .replace('API', api)
        .replace('METODO', method)
        .replace('RESULTADO', result);

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data); // Mostra a resposta da inserção do log
    } catch (error) {
        console.error('Erro ao registrar log:', error);
    }
}

async function fetchLogs() {
    const apiUrl = baseUrlLogs.replace('MATRICULA', matricula);
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error(`Erro: ${response.status} - ${response.statusText}`);
        const data = await response.json();
        displayLogs(data); // Exibe os logs
    } catch (error) {
        console.error('Erro ao buscar logs:', error);
    }
}

function displayLogs(logs) {
    const logsContainer = document.getElementById('logs-container');
    logsContainer.innerHTML = '';

    if (Array.isArray(logs) && logs.length > 0) {
        logs.forEach(log => {
            const logItem = document.createElement('div');
            logItem.classList.add('log-item');
            logItem.innerHTML = `
                <p><strong>API:</strong> ${log.api}</p>
                <p><strong>Método:</strong> ${log.metodo}</p>
                <p><strong>Resultado:</strong> ${log.resultado}</p>
                <button onclick="deleteLog(${log.id}, '${matricula}')">Excluir</button>
            `;
            logsContainer.appendChild(logItem);
        });
    } else {
        logsContainer.innerHTML = '<p>Nenhum log encontrado.</p>';
    }

    document.getElementById('logsModal').style.display = 'block'; // Abre o modal
}

async function deleteLog(id, matricula) {
    if (!id) {
        console.error('ID do log não fornecido.');
        return;
    }
    const apiUrl = baseUrlDeleteLog
        .replace('IDLOG', id)
        .replace('MATRICULA', matricula);
    
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data); // Mostra a resposta da exclusão do log
        fetchLogs(); // Atualiza a lista de logs
    } catch (error) {
        console.error('Erro ao excluir log:', error);
    }
}

function closeModal() {
    document.getElementById('logsModal').style.display = 'none'; // Fecha o modal
}

function displayNews(articles) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = ''; // Limpa o contêiner antes de adicionar novas notícias

    articles.forEach(article => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        const title = article.title || 'Sem título';
        const description = article.description || 'Sem descrição';
        const urlToImage = article.urlToImage || 'https://via.placeholder.com/150';
        const url = article.url || '#';

        // Aqui está o código com o botão de salvar
        newsCard.innerHTML = `
            <img src="${urlToImage}" alt="${title}">
            <h3>${title}</h3>
            <p>${description}</p>
            <a href="${url}" target="_blank">Leia mais</a>
            <button onclick='saveNews(${JSON.stringify(article)})'>Salvar</button>
        `;
        
        newsContainer.appendChild(newsCard);
    });
}


function displaySources(sources) {
    const newsContainer = document.getElementById('news-container');
    newsContainer.innerHTML = '';

    sources.forEach(source => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('news-card');

        newsCard.innerHTML = `
            <h3>${source.name}</h3>
            <p>${source.description}</p>
        `;
        
        newsContainer.appendChild(newsCard);
    });
}

document.getElementById('deleteAllNewsButton').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja excluir todas as notícias?')) {
        fetch('backend.php?action=deleteAll', {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Todas as notícias foram excluídas com sucesso!');
                fetchSavedNews();  // Atualizar a lista de notícias após a exclusão
            } else {
                alert('Erro ao excluir as notícias.');
            }
        })
        .catch(error => {
            alert('Erro de conexão: ' + error);
        });
    }
});


document.getElementById('deleteAllNewsButton').addEventListener('click', deleteAllNews);

