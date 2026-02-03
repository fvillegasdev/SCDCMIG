using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.SCV.Interfaces;

namespace EK.Procesos.SCV
{
    public class AsociacionCivil : p.Kontrol.BPBase<m.SCV.Interfaces.IAsociacionCivil, d.SCV.Interfaces.IAsociacionCivil>, p.SCV.Interfaces.IAsociacionCivil
    {
        public AsociacionCivil(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IAsociacionCivil dao)
          : base(factory, dao, "AsociacionCivil")
        {

        }
        public async Task<int> Save(List<IAsociacionCivilParams> parametros)
        {
            var user = this.getUserId();
            IAsociacionCivilParams data = parametros[0];
            int Result = 0;
            Dictionary<string, object> param = new Dictionary<string, object>();
            string operacion = "INSERT";

            param.Add("NOMBRERAZONSOCIAL", data.NombreRazonSocial);
            param.Add("FECHACONSTITUCION", data.FechaConstitucion);
            param.Add("NOTARIA", data.Notaria);
            param.Add("ADMINISTRADORA", data.Administradora);
            param.Add("NOMBREADMIN", data.NombreAdmin);
            param.Add("IDCOMITE", data.IdComite);
            param.Add("PLAZA", data.IdPlaza);
            param.Add("SEGMENTO", data.IdSegmento);
            param.Add("FRACCIONAMIENTO", data.IdFraccionamiento);
            param.Add("CUENTABANCARIA", data.CuentaBancaria);
            param.Add("CUOTAMANTENIMIENTO", data.CuotaMantenimiento);
            param.Add("PORCENTAJEENTREGADO", data.PorcentajeEntregado);
            param.Add("FONDOCONVIVE", data.FondoConvive);
            param.Add("ALTAHACIENDA", data.AltaHacienda);
            param.Add("HIPOTECASERVICIOS", data.HipotecaServicios);
            param.Add("USUARIO", user);
            if (data.ID > 0)
            {
                param.Add("ID", data.ID);
                operacion = "UPDATE";
            }
            param.Add("OPERACION", operacion);
            var id = await dao.SaveAsociacionCivil(param);
            Result = id;

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
            //            param.Add("IDASOCIACIONCIVIL", id);
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
        public async Task<object[]> GetAsociacionCivil(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "GETASOCIACIONCIVIL");
            var Result = await this.dao.GetAsociacionCivil(parametros);
            return Result;
        }
        public async Task<object[]> GetIntegrantesByAsociacionCivilId(Dictionary<string, object> parametros)
        {
            parametros.Add("USUARIO", base.getUserId());
            parametros.Add("OPERACION", "GETASOCIACIONCIVILBYID");
            var Result = await this.dao.GetIntegrantesByAsociacionCivilId(parametros);
            return Result;
        }
        public async Task<object[]> GetCliente(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "GETCLIENTE");
            var Result = await this.dao.GetCliente(parametros);
            return Result;
        }
        public async Task<object[]> DeleteInfoAsociacionCivil(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "DELETEINFOASOCIACIONCIVIL");
            var Result = await this.dao.DeleteInfoAsociacionCivil(parametros);
            return Result;
        }
        //public async Task<IInformacionComite> GetComiteByFraccionamiento(Dictionary<string, object> parametros)
        //{
        //    parametros.Add("OPERACION", "GETCOMITEBYFRACC");
        //    var Result = await this.dao.GetComiteByFraccionamiento(parametros);
        //    if(Result != null)
        //    {
        //        var IdComite = Result.ID;

        //        parametros.Clear();
        //        parametros.Add("OPERACION", "GETCOMITEINTEGRANTESBYFRACC");
        //        parametros.Add("IDCOMITE", IdComite);
        //        var Integrantes = await this.dao.GetComiteIntegrantesByFraccionamiento(parametros);
        //        Result.Integrantes = new List<IIntegrantesInformacionComite>();
        //        if (Integrantes.Any())
        //        {
        //            Result.Integrantes = Integrantes;
        //        }
        //    }
        //    return Result;
        //}
        public async Task<object[]> GetComiteByFraccionamiento(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "GETCOMITEBYFRACC");
            var Result = await this.dao.GetComiteByFraccionamiento(parametros);
            return Result;
        }
        public async Task<object[]> GetIntegrantesComite(Dictionary<string, object> parametros)
        {
            parametros.Add("OPERACION", "GETCOMITEINTEGRANTESBYFRACC");
            var Result = await this.dao.GetIntegrantesComite(parametros);
            return Result;
        }
    }
}
