import pandas as pd
import django
from pathlib import Path
import os
import sys
from xlrd.book import XLRDError
from io import StringIO
# rode com python -m leitor
# setup do ambiente django
BASE_DIR = Path(__file__).parent.parent #base do projeto
sys.path.append(str(BASE_DIR))

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "leitor_project.settings")

django.setup() # carrega settings e apps

from src.core.models import Notificacao_datasus

def skip_lines_from(buffer, lines=1):
    for i in range(lines):
        buffer.readline()


def leitor_casos_por_municipio_brasil(caminho):
    caminho_convertido_em_texto = caminho.read().decode("cp1252")

    buffer = StringIO(caminho_convertido_em_texto)

    doenca = buffer.readline().strip().split(" - ")[0] 
    skip_lines_from(buffer)

    periodo = buffer.readline().strip().split(":")[1]

    df = pd.read_csv(buffer, delimiter=";", engine='python', skipfooter=23)
    df_headers = df.columns.tolist()
    print(df_headers)
    for row in df.itertuples(index=False):
        
        if "total" in str(row[0]).lower():
            break 

        municipio = str(row[0]).strip().split(" ")[1]
        casos = int(row[1])

        print(municipio)
        print(casos)

        notificacao, created = Notificacao_datasus.objects.update_or_create(
            municipio=municipio,
            periodo=periodo,
            doenca=doenca,
            defaults={
            'num_casos': casos  # <-- A chave deve ser o nome do campo
    }
        )

        if created:
            print("Notificação criada", notificacao)