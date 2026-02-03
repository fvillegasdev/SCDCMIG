using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol
{
    public enum KontrolEstadosEnum 
    {
        SinEstablecer = 0,
        Nuevo = 1,
        SinCambios = 2,
        Modificado = 3,
        Eliminado = 4,
        Exitoso = 5,
        Fallido = 6
    }

    public enum KontrolAccionesEnum
    {
        Asignar = 1,
        Remover = 2
    }
}
