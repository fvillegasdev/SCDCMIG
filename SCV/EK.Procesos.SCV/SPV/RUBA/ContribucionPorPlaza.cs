using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class ContribucionPorPlaza : p.Kontrol.BPBase<m.SCV.Interfaces.IContribucionPorPlaza, d.SCV.Interfaces.IContribucionPorPlaza>,
        p.SCV.Interfaces.IContribucionPorPlaza
    {
        public ContribucionPorPlaza(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IContribucionPorPlaza dao)
            : base(factory, dao, "contribucionPorPlaza")
        {
        }

        public async Task<object[]> GetConsulta(m.SCV.Interfaces.IContribucionPorPlaza filters)
        {
            string desarrollosValue = string.Empty;

            if (filters.Fraccionamientos != null)
            {
                var fraccBuilder = new StringBuilder();

                foreach (var ff in filters.Fraccionamientos)
                {
                    fraccBuilder.Append(ff.Clave);
                    fraccBuilder.Append(",");
                }

                desarrollosValue = fraccBuilder.ToString();
                desarrollosValue = desarrollosValue.TrimEnd(new char[] { ',' });
            }

            var parametros = new Dictionary<string, object>();
            parametros.Add("IdPlaza", filters.IdPlazaInicial);
            parametros.Add("Fraccionamientos", desarrollosValue);
            parametros.Add("Vocaciones", filters.IdVocacion);
            parametros.Add("FechaInicial", filters.FechaInicial);
            parametros.Add("FechaFinal", filters.FechaFinal);
            parametros.Add("Proceden", filters.IdProceden);
            parametros.Add("TipoOrientacion", filters.IdTipoOrientacion);
            parametros.Add("AgrupadoPor", filters.IdAgrupadoPor);
            parametros.Add("IdUsuario", base.getUserId());
            parametros.Add("Segmento", filters.Segmento);

            return await this.dao.GetConsulta(parametros);
        }

        public async Task<object[]> GetConsultaFallasTopResultado(m.SCV.Interfaces.IConsultaFallasTopIncidencia filters)
        {
            string desarrollosValue = string.Empty;

            if (filters.Fraccionamientos != null)
            {
                var fraccBuilder = new StringBuilder();

                foreach (var ff in filters.Fraccionamientos)
                {
                    fraccBuilder.Append(ff.Clave);
                    fraccBuilder.Append(",");
                }

                desarrollosValue = fraccBuilder.ToString();
                desarrollosValue = desarrollosValue.TrimEnd(new char[] { ',' });
            }

            var parametros = new Dictionary<string, object>();
            parametros.Add("IdPlaza", filters.IdPlazaInicial);
            parametros.Add("Fraccionamientos", desarrollosValue);
            parametros.Add("Vocaciones", filters.IdVocacion);
            parametros.Add("FechaInicial", filters.FechaInicial);
            parametros.Add("FechaFinal", filters.FechaFinal);
            parametros.Add("Proceden", filters.IdProceden);
            parametros.Add("TipoVisualizacion", filters.IdTipoVisualizacion);
            parametros.Add("FiltrarPor", filters.IdFiltrarPor);
            parametros.Add("IdUsuario", base.getUserId());
            parametros.Add("OperacionEspecificaSP", "ResultadoTopConsulta");
            parametros.Add("Segmento", filters.Segmento);
            return await this.dao.GetConsultaTopIncidencias(parametros);
        }
    }
}