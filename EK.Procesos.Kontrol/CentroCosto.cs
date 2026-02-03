using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class CentroCosto
        : BPBase<m.Kontrol.Interfaces.ICentrosCosto, d.Kontrol.Interfaces.ICentroCosto>, p.Kontrol.Interfaces.ICentroCosto
    {
        public CentroCosto(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.ICentroCosto dao)
               : base(factory, dao, "CentroCosto")
        {
        }

        public override async Task<ICentrosCosto> GetById(int id)
        {
            var parametros = new Dictionary<string, object> {
                { "id", id},
                { "idUser", this.getUserId() }
            };
            var ccs = await base.GetAll(parametros);

            if (ccs != null && ccs.Count > 0)
            {
                return ccs[0];
            }
            else {
                return null;
            }
        }

        public override async Task<List<ICentrosCosto>> GetAll(Dictionary<string, object> parametros)
        {
            parametros.Add("idUser", this.getUserId());
            return await base.GetAll(parametros);
        }

        public override async Task<ICentrosCosto> Save(ICentrosCosto item)
        {
            ICentrosCosto retValue = null;
            var bpClasificadores = Get<p.Kontrol.Interfaces.IClasificadores>();

            try
            {
                BeginTransaction(true);
                //
                var clasificadores = item.Clasificadores;
                var claveTipoClasificador = "CC";
                //
                item.Estado = item.ID == null || item.ID <= 0 ? Modelo.Kontrol.KontrolEstadosEnum.Nuevo : Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                if (item != null)
                {
                    item.Modificado = DateTime.UtcNow;
                    item.IdModificadoPor = base.getUserId();
                }

                if (item.Estado == Modelo.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    item.Creado = DateTime.UtcNow;
                    item.IdCreadoPor = base.getUserId();
                }
                //

                item.TotalClasificadores = 0;
                if (clasificadores != null) {
                    item.TotalClasificadores = clasificadores.Count(c => c.Estado != m.Kontrol.KontrolEstadosEnum.Eliminado);
                }
                //
                item.Changed("IdValidacionPresupuesto", true);
                item.Changed("MontoGlobal", true);
                item.Changed("Clave", true);
                item.Changed("Nombre", true);
                //
                item.TipoClasificador = claveTipoClasificador;
                //
                retValue = await this.dao.SaveEntity(item, false);
                //
                int idCC = retValue.ID.Value;                    
                //
                retValue.Clasificadores = await bpClasificadores.SaveClasificadores(claveTipoClasificador, idCC, clasificadores);
                retValue = await this.GetById(idCC);
                //
                item.ID = idCC;
                await Log(item);
                //
                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return retValue;
        }
    }
}

