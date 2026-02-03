using EK.Modelo.Kontrol.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.SBO.Interfaces;

namespace EK.Modelo.SCV.Interfaces
{
    public interface IDesarrolloCuenta : IBaseKontrol, ICuentaBancaria
    {
        int Id { get; set; }

    }
}
