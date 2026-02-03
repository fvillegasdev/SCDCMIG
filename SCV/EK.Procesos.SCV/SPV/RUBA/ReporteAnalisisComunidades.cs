using System;
using System.Configuration;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;
using System.Dynamic;
using System.IO;
using System.Net.Http;


using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using NT = EK.Drivers.Notifications;
using System.Security.Cryptography;
using System.Text;
using System.Net;
using System.Drawing;
using Newtonsoft.Json;
using System.Text.RegularExpressions;

namespace EK.Procesos.SCV
{
    public class ReporteAnalisisComunidades : p.Kontrol.BPBase<m.SCV.Interfaces.IReporteAnalisisComunidades, d.SCV.Interfaces.IReporteAnalisisComunidades>,
        p.SCV.Interfaces.IReporteAnalisisComunidades
    {
        public ReporteAnalisisComunidades(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IReporteAnalisisComunidades dao)
           : base(factory, dao, "ReporteAnalisisComunidades")
        {
        }

        public async Task<int> GuardarReporteAnalisisComunidad(Dictionary<string, object> parametros)
        {
            try
            {
                var bpRAC = Get<d.SCV.Interfaces.IReporteAnalisisComunidades>();

                    BeginTransaction();
                    int usuario = base.getUserId();
                    parametros.Add("IdUsuario", usuario);
                    int resultado = await bpRAC.SaveReporte(parametros);
                    Commit();
                return resultado;
            }
            catch (Exception ex)
            {
                Rollback();
                return -1;
            }
        }

        public async Task<List<m.SCV.Interfaces.IReporteAnalisisComunidades>> GetConsultaAnalisisComunidades(Dictionary<string, object> parametros)
        {
            try
            {
                var bpRAC = Get<d.SCV.Interfaces.IReporteAnalisisComunidades>();
                BeginTransaction();
                var totales = await bpRAC.getConsultaReporteAnalisis(parametros);
                Commit();

                return totales;
            }
            catch (Exception ex)
            {
                Rollback();
                return null;
            }
        }

        public async Task<m.SCV.Interfaces.IReporteAnalisisComunidades> GetTotalesParaAnalisisComunidad(Dictionary<string, object> parametros)
        {
            try
            {
                var bpRAC = Get<d.SCV.Interfaces.IReporteAnalisisComunidades>();
                BeginTransaction();
                var totales = await bpRAC.getCuentasForAnalisis(parametros);
                Commit();
                return totales;
            }
            catch (Exception ex)
            {
                Rollback();
                return null;
            }
        }
    }
}
