using System;
using System.Threading.Tasks;
using mk = EK.Modelo.Kontrol;

namespace EK.Datos.Kontrol.Interfaces
{
    public interface IDateDifference : IDAOBase
    {
        Task<mk.Interfaces.IDateDifference> GetDateDifference(string DatePart, DateTime FromDate, DateTime ToDate);
    }
}