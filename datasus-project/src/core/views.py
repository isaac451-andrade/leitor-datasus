from django.shortcuts import render, redirect
from django.http import HttpResponse
from leitor import *
from .models import Notificacao_datasus

def home(request):

    if request.method == "POST":
        arquivos = request.FILES.getlist("meus_arquivos")
        
        for arquivo in arquivos:
            leitor_casos_por_municipio_brasil(arquivo)

        return redirect(request.path)   #testes 
    
    notificacoes = Notificacao_datasus.objects.all().order_by("municipio")

    return render(request, 'index.html', {"notes": notificacoes})


