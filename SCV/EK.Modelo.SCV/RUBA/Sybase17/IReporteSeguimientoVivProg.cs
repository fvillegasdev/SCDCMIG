using System;
using m = EK.Modelo;


namespace EK.Modelo.SCV.Interfaces
{
    [m.Kontrol.Table("sv_programacion_entrega")]
    public interface IReporteSeguimientoVivProg : m.Kontrol.Interfaces.IBaseKontrol
    {
        string IdPlaza { get; set; }
        string Plaza { get; set; }
        int IndicePlaza { get; set; }
        int TotalVivVerifCat { get; set; }
        int NoProgramadasSC { get; set; }
        int TotalVivProgSC { get; set; }
        int TotalVivProgSCAnt { get; set; }
        int TotalVivEntregadas { get; set; }
        int ConDetalles { get; set; }
        int ConDetallesRep { get; set; }
        int VivNoEntregadas { get; set; }
        int CeroDetalles { get; set; }
        int CeroDetallesAnt { get; set; }
        int CeroDetallesRep { get; set; }
        int Inventario { get; set; }
        int VerificadoFuera { get; set; }
        DateTime FechaLiberacion { get; set; }
        DateTime FechaConstruccion { get; set; }
        DateTime FechaEntrega { get; set; }
        int IdCliente { get; set; }
        string Segmento { get; set; }
        string Frente { get; set; }
        string Etapa { get; set; }
        string Manzana { get; set; }
        string Lote { get; set; }
        string Interior { get; set; }
        string MotivoNA { get; set; }
    }
}
