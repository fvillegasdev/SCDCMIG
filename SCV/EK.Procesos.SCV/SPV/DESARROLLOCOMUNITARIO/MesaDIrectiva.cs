using System;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;
using System.Threading.Tasks;
using System.Collections.Generic;
using System.Linq;

namespace EK.Procesos.SCV
{
    public class MesaDIrectiva : p.Kontrol.BPBase<m.SCV.Interfaces.IMesaDirectiva, d.SCV.Interfaces.IMesaDirectiva>, p.SCV.Interfaces.IMesaDirectiva
    {
        public MesaDIrectiva(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IMesaDirectiva dao)
          : base(factory, dao, "MesaDIrectiva")
        {

        }
        public async Task<int> Save(List<IMesaDirectivaParams> parametros)
        {
            var user = this.getUserId();
            IMesaDirectivaParams data = parametros[0];
            int Result = 0;
            Dictionary<string, object> param = new Dictionary<string, object>();
            string operacion = "INSERT";

            param.Add("NOMBRECOMITEVECINAL", data.NombreComiteVecinal);
            param.Add("FECHACONSTITUCION", data.FechaConstitucion);
            param.Add("ADMINISTRADORA", data.Administradora);
            param.Add("NOMBREADMIN", data.NombreAdmin);
            param.Add("PLAZA", data.IdPlaza);
            param.Add("SEGMENTO", data.IdSegmento);
            param.Add("IDCOMITE", data.IdComite);
            param.Add("FRACCIONAMIENTO", data.IdFraccionamiento);
            param.Add("CUOTAMANTENIMIENTO", data.CuotaMantenimiento);
            param.Add("FONDOCONVIVE", data.FondoConvive);
            param.Add("FONDOECONOMICO", data.FondoEconomicoInicial);
            param.Add("PORCENTAJEENTREGADO", data.PorcentajeEntregado);
            param.Add("HIPOTECASERVICIOS", data.HipotecaServicios);
            param.Add("USUARIO", user);
            if (data.ID > 0)
            {
                param.Add("ID", data.ID);
                operacion = "UPDATE";
            }
            param.Add("OPERACION", operacion);
            var id = await dao.SaveMesaDirectiva(param);
            if (id > 0)
                Result = id;
            else
                Result = -1;
            //if (id > 0)
            //{
            //    if (data.ID > 0 && data.Integrantes.Any())
            //    {
            //        param.Clear();
            //        param.Add("OPERACION", "DELETEINTEGRANTES");
            //        param.Add("ID", data.ID);
            //        await dao.SaveIntegrantes(param);
            //    }
            //    if (data.Integrantes.Any())
            //    {
            //        foreach (var x in data.Integrantes)
            //        {
            //            param.Clear();
            //            param.Add("IDMESADIRECTIVA", id);
            //            param.Add("NO", x.No);
            //            param.Add("NUMCTE", x.NoCliente);
            //            param.Add("NOMBREINTEGRANTE", x.Nombre);
            //            param.Add("APEPATERNO", x.ApePaterno);
            //            param.Add("APEMATERNO", x.ApeMaterno);
            //            param.Add("PUESTO", x.IdPuesto);
            //            param.Add("CALLE", x.Calle);
            //            param.Add("NUMERO", x.Numero);
            //            param.Add("TELEFONO", x.Telefono);
            //            param.Add("USUARIO", user);
            //            param.Add("OPERACION", "SAVEINTEGRAMTES");
            //            var integrantes = await dao.SaveIntegrantes(param);
            //        }
            //    }
            //    Result = id;
            //}
            //else
            //{
            //    Result = -1;
            //}

            return Result;
        }
        public async Task<object[]> GetMesaDirectiva(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "GETMESADIRECTIVA");
            var Result = await this.dao.GetMesaDirectiva(parametros);
            return Result;
        }
        public async Task<object[]> GetIntegrantesByMesaDirectivaId(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "GETMESADIRECTIVABYID");
            var Result = await this.dao.GetIntegrantesByMesaDirectivaId(parametros);
            return Result;
        }

        public async Task<object[]> DeleteInfoMesaDirectiva(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "DELETEINFOMESADIRECTIVA");
            var Result = await this.dao.DeleteInfoMesaDirectiva(parametros);
            return Result;
        }
    }
}
