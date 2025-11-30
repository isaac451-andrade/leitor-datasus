const fileInput = document.getElementById('fileInput'); // Seu input type="file"
const fileList = document.getElementById('fileList');   // Sua div para listar os nomes
const submitBtn = document.getElementById('submitBtn');

uploadArea.addEventListener('click', () => fileInput.click());

['dragenter', 'dragover', 'dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, preventDefaults, false);
});

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

// Destacar área ao arrastar
['dragenter', 'dragover'].forEach(eventName => {
  uploadArea.addEventListener(eventName, () => {
    uploadArea.classList.add('dragover');
  });
});

['dragleave', 'drop'].forEach(eventName => {
    uploadArea.addEventListener(eventName, () => {
        uploadArea.classList.remove('dragover');
  });
});

uploadArea.addEventListener('drop', (e) => {
    const droppedFiles = e.dataTransfer.files;
    updateFileDisplay(droppedFiles);
    uploadArea.classList.remove('dragover'); // Remove a classe de highlight
});

fileInput.addEventListener('change', (e) => {
    updateFileDisplay(e.target.files);
});


function updateFileDisplay(files) {

    const data = new DataTransfer();


    Array.from(files).forEach(file => {
        data.items.add(file);
    });

  
    fileInput.files = data.files; 

    
    fileList.innerHTML = '';
    const currentFiles = Array.from(fileInput.files);

    
    submitBtn.disabled = currentFiles.length === 0;

    if (currentFiles.length > 0) {
        currentFiles.forEach((file) => {
        const fileItem = document.createElement('div');
        fileItem.className = 'file-item';
        fileItem.innerHTML = `
        <span class="file-name">${file.name}</span>
        <span class="file-size">${formatFileSize(file.size)}</span>
        <button class="remove-btn" onclick="removeFile('${file.name}')">×</button>
        `;
        fileList.appendChild(fileItem);
        });
    }
}


// Função para remover um arquivo específico (Adaptada)
function removeFile(fileName) {
    const data = new DataTransfer();
    const currentFiles = Array.from(fileInput.files);

    currentFiles.forEach(file => {
        // Adiciona todos os arquivos, exceto aquele que queremos remover
        if (file.name !== fileName) {
            data.items.add(file);
        }
    });

    // Atualiza o fileInput.files com a nova lista
    fileInput.files = data.files;

    // Redesenha a lista visual
    updateFileDisplay(fileInput.files); 
}


function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

// Filtro de busca na tabela
document.getElementById('searchInput').addEventListener('input', function(e) {
    const searchTerm = e.target.value.toLowerCase();
    const tableBody = document.getElementById('data-table-body');
    const rows = tableBody.getElementsByTagName('tr');
    let visibleCount = 0;

    for (let row of rows) {
        const cells = row.getElementsByTagName('td');
        let found = false;

        
        for (let cell of cells) {
            if (cell.textContent.toLowerCase().includes(searchTerm)) {
                found = true;
                break;
            }
        }

        // Mostra ou esconde a linha
        if (found) {
            row.style.display = '';
            visibleCount++;
        } else {
            row.style.display = 'none';

        }
    }

});