using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IPatrocinadores : IBaseKontrol
    {
       // string Nombre { get; set; }
        string RazonSocial { get; set; }
        string Calle { get; set; }
        string Numero { get; set; }
        string Telefono { get; set; }
        string Celular { get; set; }
        string Email { get; set; }
    }
}
