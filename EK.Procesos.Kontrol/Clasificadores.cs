using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Clasificadores
        : BPBase<m.Kontrol.Interfaces.IClasificador, d.Kontrol.Interfaces.IClasificadores>, p.Kontrol.Interfaces.IClasificadores
    {
        public Clasificadores(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IClasificadores dao)
            : base(factory, dao, "clasificadores")
        {
        }
        public async Task<List<m.Kontrol.Interfaces.ICatalogoClasificador>> SaveClasificadores(string claveEntidad, int idEntidad, List<m.Kontrol.Interfaces.ICatalogoClasificador> clasificadores)
        {
            List<m.Kontrol.Interfaces.ICatalogoClasificador> retValue = null;
            var daoClas = Get<d.Kontrol.Interfaces.ICatalogosClasificadores>();

            try
            {
                BeginTransaction(true);

                if (clasificadores != null)
                {
                    var estatus = await base.GetCGV("ESTATUS", "A");
                    var fecha = DateTime.UtcNow;

                    foreach (var n in clasificadores)
                    {
                        if (n.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            await daoClas.Delete(n.ID.Value);
                        }
                        else
                        {
                            if (n.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                n.IdEntidad = idEntidad;
                                n.ClaveEntidad = claveEntidad.ToUpper();
                                n.IdEstatus = estatus.ID;
                                n.Creado = fecha;
                                n.IdCreadoPor = base.getUserId();
                                n.Modificado = fecha;
                                n.IdModificadoPor = base.getUserId();

                                await this.dao.SaveEntity(n, false, true);
                            }
                        }
                    }
                }
                //
                var parametros = new Dictionary<string, object> { { "claveEntidad", claveEntidad }, { "id", idEntidad } };
                retValue = await daoClas.GetAll(parametros);
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