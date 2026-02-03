using System.Threading.Tasks;
using m = EK.Modelo;
namespace EK.Datos.Kontrol.Interfaces
{
    public interface IDominios
        : IDAOBaseGeneric<m.Kontrol.Interfaces.IDominios>
    {
    }
}

//using System;
//using System.Threading.Tasks;

//using im = EK.Modelo.Kontrol.Interfaces;

//namespace EK.Datos.Kontrol.Interfaces
//{
//    public interface ICliente
//    {
//        Task<object[]> GetAll();
//        Task<im.IDominios[]> Get();
//        Task<object[]> GetKV();
//        Task<im.IDominios> Get(int ID);
//        Task<im.IDominios> Get(string clave);
//        //Task<int> Save(im.ICliente model);
//        Task<object[]> GetModulos();
//    }
//}