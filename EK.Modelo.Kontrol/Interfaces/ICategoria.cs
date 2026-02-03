using System;
using m = EK.Modelo;
namespace EK.Modelo.Kontrol.Interfaces
{
    [Table("Categorias")]

    public interface ICategoria : IBaseKontrol
    {
        [m.Kontrol.Column()]
        int? IdPuesto { get; set; }
        IPuesto Puesto { get; set; }
    }
}