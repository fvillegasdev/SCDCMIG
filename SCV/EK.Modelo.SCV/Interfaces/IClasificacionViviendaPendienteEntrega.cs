using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IClasificacionViviendaPendienteEntrega : IBaseKontrol
    {
        [m.Kontrol.Column()]
        bool seleccionar { get; set; }
        [m.Kontrol.Column()]
        string IdCliente { get; set; }
        [m.Kontrol.Column()]
        string Nombre { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaFirma { get; set; }
        [m.Kontrol.Column()]
        string Fraccionamiento { get; set; }
        [m.Kontrol.Column()]
        string Etapa { get; set; }
        [m.Kontrol.Column()]
        string Manzana { get; set; }
        [m.Kontrol.Column()]
        string Lote { get; set; }
        [m.Kontrol.Column()]
        string NumInterior { get; set; }
        [m.Kontrol.Column()]
        string NumExterior { get; set; }
        [m.Kontrol.Column()]
        string Direccion { get; set; }
        [m.Kontrol.Column()]
        string TipoVivienda { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaLiberacion { get; set; }
        [m.Kontrol.Column()]
        string Plaza { get; set; }
        [m.Kontrol.Column()]
        int IdPlaza { get; set; }
        [m.Kontrol.Column()]
        string Financiamiento { get; set; }
        [m.Kontrol.Column()]

        string FechaProgramacion { get; set; }
        [m.Kontrol.Column()]
        DateTime FechaEntrega { get; set; }
        [m.Kontrol.Column()]
        string TipoCasa { get; set; }
        [m.Kontrol.Column()]
        int Dias { get; set; }
        [m.Kontrol.Column()]
        int IdClasificador { get; set; }
        [m.Kontrol.Column()]
        bool Cliente { get; set; }
        [m.Kontrol.Column()]
        bool Profeco { get; set; }
        [m.Kontrol.Column()]
        bool Produccion { get; set; }
        [m.Kontrol.Column()]
        bool FaltaServicio { get; set; }
        [m.Kontrol.Column()]
        bool SCyDC { get; set; }
        [m.Kontrol.Column()]
        bool Credito { get; set; }
        [m.Kontrol.Column()]
        bool Programacion { get; set; }
        [m.Kontrol.Column()]
        string Comentarios { get; set; }
        [m.Kontrol.Column()]
        int IdCatClasificador { get; set; }
        [m.Kontrol.Column()]
        string ClaveClasificador { get; set; }
        [m.Kontrol.Column()]
        string NombreClasificador { get; set; }
        string edificio { get; set; }
        string nivel { get; set; }
    }
}
