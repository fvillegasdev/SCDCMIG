using System;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IDiagnosticosNotaCAT
        : m.Kontrol.Interfaces.IBaseKontrol
    {
        [m.Kontrol.Column("Clave", true)]
        new string Clave { get; set; }

        [m.Kontrol.Column("Nombre", true)]
        new string Nombre { get; set; }

        [m.Kontrol.Column("IdDictamen")]
        int IdDictamen { get; set; }

        [m.Kontrol.Column("IdPartida")]
        int IdPartida { get; set; }

        [m.Kontrol.Column("Nota")]
        string Nota { get; set; }
    }
}