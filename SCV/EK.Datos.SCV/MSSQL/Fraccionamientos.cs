using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using d = EK.Datos;
using m = EK.Modelo;

namespace EK.Datos.SCV.MSSQL
{
    public class Fraccionamientos
        : d.Kontrol.DAOBaseGeneric<m.SCV.Interfaces.IFraccionamientos>, d.SCV.Interfaces.IFraccionamientos
    {
        private const string USP_FRACCIONAMIENTOS_SELECT = "usp_spv_fraccionamiento_select";

        public Fraccionamientos(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IDBHelper helper)
            : base(
                  factory,
                  helper,
                  USP_FRACCIONAMIENTOS_SELECT,
                  string.Empty,
                  "fraccionamientos")
        { }

        public async Task<List<m.SCV.Interfaces.IFraccionamientos>> getFraccionamientosProyecto(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }

        public async Task<List<m.SCV.Interfaces.IFraccionamientos>> getFraccionamientosByProyectoID(Dictionary<string, object> parametros)
        {
            throw new NotImplementedException();
        }
    }
}