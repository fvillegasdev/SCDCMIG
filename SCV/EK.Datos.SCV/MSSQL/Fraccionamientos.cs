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
        private const string USP_FRACCIONAMIENTOS_PROYECTOS = "usp_spv_fraccionamiento_proyectos_select";
        private const string USP_FRACCIONAMIENTOS_BY_PROYECTOID = "usp_spv_fraccionamiento_by_proyectoId_select";

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
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IFraccionamientos>(USP_FRACCIONAMIENTOS_PROYECTOS, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public async Task<List<m.SCV.Interfaces.IFraccionamientos>> getFraccionamientosByProyectoID(Dictionary<string, object> parametros)
        {
            try
            {
                return await helper.CreateEntitiesAsync<m.SCV.Interfaces.IFraccionamientos>(USP_FRACCIONAMIENTOS_BY_PROYECTOID, CommandType.StoredProcedure, parametros);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}