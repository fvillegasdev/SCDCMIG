using System;
using System.Threading.Tasks;

using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("RangosIngresos")]
    public interface IRangosIngresos : 
        p.Kontrol.Interfaces.IBaseProceso, m.Kontrol.Interfaces.IBPBase<m.SCV.Interfaces.IRangoIngresos>
    {
        //Task<object[]> GetAll(bool activos, int kv);

        //Task<miSCV.IRangoIngresos> GetById(int id);

        //Task<miSCV.IRangoIngresos> Save(string item);
    }
}