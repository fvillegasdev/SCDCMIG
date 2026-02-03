using System;
using System.Threading.Tasks;
using m = EK.Modelo;
using p = EK.Procesos;


namespace EK.Procesos.SCV.Interfaces
{
    public interface ICalculoProcesos:p.Kontrol.Interfaces.IBaseProceso
    {
        void Register(string clave, Func<m.SCV.Interfaces.ISeguimientoProceso, Task> action);
        Func<m.SCV.Interfaces.ISeguimientoProceso, Task> GetCommand(string clave);

        void Inicializar();
    }
}