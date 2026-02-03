using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV.Interfaces
{
    [m.Kontrol.KontrolName("Sindicatos")]

    public interface ISindicatos
        : p.Kontrol.Interfaces.IBaseProceso
    {
    }
}


//using System.Collections.Generic;
//using System.Threading.Tasks;
//using miSCV = EK.Modelo.SCV.Interfaces;
//using mKontrol = EK.Modelo.Kontrol;

//namespace EK.Procesos.SCV.Interfaces
//{
//    [mKontrol.KontrolName("Sindicatos")]
//    public interface ISindicatos : Kontrol.Interfaces.IBaseProceso
//    {
//        //Task<object[]> GetAll(int activos);
//        //Task<miSCV.ISindicato> GetById(int id);
//        //Task<miSCV.ISindicato> Save(miSCV.ISindicato sindicato);
//        //Task Log(miSCV.ISindicato obj);
//    }
//}

