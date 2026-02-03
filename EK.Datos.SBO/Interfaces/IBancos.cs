using System.Collections.Generic;
using System.Threading.Tasks;
using im = EK.Modelo.SBO.Interfaces;

namespace EK.Datos.SBO.Interfaces
{
    public interface IBancos
    {

        //Task<int> Insert(im.IBancos model);

        //Task<int> Update(im.IBancos model);

        Task<object[]> GetAll();

        Task<object[]> compania(int idCompania);

        Task<im.IBancos> GetById(int id);
    }
}
