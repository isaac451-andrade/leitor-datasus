from django.db import models


class Notificacao_datasus(models.Model):
    municipio = models.CharField(max_length=250)
    doenca = models.CharField(max_length=200)
    periodo = models.CharField(max_length=100)
    num_casos = models.IntegerField()

    class Meta:
        unique_together = ("municipio", "doenca", "periodo")
        verbose_name = "Notificação"
        verbose_name_plural = "Notificações"
    
    def __str__(self):
        return f"{self.municipio} - {self.doenca} - {self.periodo} - {self.num_casos}"
    