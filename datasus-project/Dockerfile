# Usa uma imagem base Python slim (mais leve e segura)
FROM python:3.11-slim

# --- CONFIGURAÇÃO DO AMBIENTE ---
# Não escreve arquivos de bytecode (.pyc) e garante que a saída do Python não seja bufferizada
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
# Define a porta de serviço
ENV PORT 8000
# Define o diretório de trabalho onde o código estará
WORKDIR /app

# --- INSTALAÇÃO DE DEPENDÊNCIAS (POETRY) ---
# Copia os arquivos de dependência do Poetry
COPY pyproject.toml poetry.lock /app/

# Instala o Poetry
RUN pip install poetry

# Instala as dependências de produção (o Poetry é usado para resolver e instalar
# Django, Pandas, Numpy, gunicorn, etc.)
# O --no-root evita instalar o próprio pacote de código-fonte neste momento
RUN poetry install --no-root --only main

# --- CONFIGURAÇÃO DO PROJETO ---
# Copia o código-fonte (a pasta 'src')
# É crucial que o código esteja na mesma pasta do manage.py
COPY src /app/src/

# Copia os arquivos de configuração e estáticos/templates que estão na raiz
COPY manage.py /app/
COPY leitor.py /app/
COPY static /app/static/
COPY templates /app/templates/

# --- COMANDO FINAL (ENTRYPOINT DE TESTE) ---
# O GITHUB_TOKEN é um segredo de build/CI, mas para garantir que o runserver
# lide com as migrações (criação do SQLite) e inicie o servidor:
# 1. python src/manage.py migrate --noinput: Cria o db.sqlite3 e aplica as migrações
# 2. python src/manage.py runserver 0.0.0.0:${PORT}: Inicia o servidor Django
CMD ["/bin/bash", "-c", "python manage.py migrate --noinput && python manage.py runserver 0.0.0.0:${PORT}"]

EXPOSE 8000