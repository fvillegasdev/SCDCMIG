using EK.Drivers.Log;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class Parametros
        : BPBase<m.Kontrol.Interfaces.IParametro, d.Kontrol.Interfaces.IParametros>, p.Kontrol.Interfaces.IParametros
    {
        public Parametros(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IParametros dao)
               : base(factory, dao, "parametros")
        {
        }

        public async Task<m.Kontrol.Interfaces.IParametros> Get(string section) {
            var retValue = Get<m.Kontrol.Interfaces.IParametros>();

            var parametros = await this.dao.GetParametrosGlobal(section);

            if (parametros != null && parametros.Count > 0) {
                foreach (var p in parametros) {
                    retValue.Add(p.Nombre, p);
                }
            }
            return retValue;
        }

        public async Task<List<m.Kontrol.Interfaces.IParametro>> GetAllParametros(Dictionary<string, object> parametros)
        {
            var retValue = Get<m.Kontrol.Interfaces.IParametro>();
           return await this.dao.GetAllParametros(parametros);
        }

        public async Task<m.Kontrol.Interfaces.IParametro> GetByIDParametros(Dictionary<string, object> parametros)
        {
            var retValue = Get<m.Kontrol.Interfaces.IParametro>();
            return await this.dao.GetByIDParametros(parametros);
        }

        public override async Task<m.Kontrol.Interfaces.IParametro> Save(m.Kontrol.Interfaces.IParametro item)
        {
            //Rescatando Valores
            var configuracionParametro = item.Configuracion;
            var elementoRecibido = item;
            //Guardardo elemento actual
            item = await base.saveModel(item);

            //item = await daoParametros.SaveEntity(item, false);

            //Obteniendo Id
            int idParametro = item.ID ?? 0;
            //Objetos Genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            //EntidadesAdicionales
            try
            {
                var daoConfiguracionP = Get<d.Kontrol.Interfaces.IConfigurarParametros>();

                //Guardar Informacion Adicional
                if ((configuracionParametro != null && configuracionParametro.Count > 0))
                {
                    foreach (var c in configuracionParametro)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;
                            c.IdParametro = idParametro;
                            c.Modificado = DateTime.UtcNow;
                            c.IdModificadoPor = base.getUserId();

                            if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo || c.ID < 1)
                            {
                                c.Creado = DateTime.UtcNow;
                                c.IdCreadoPor = base.getUserId();
                                c.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            }
                            if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoConfiguracionP.Delete(c.ID.Value, "ConfigurarParametros");
                            }
                            else
                            {
                                await daoConfiguracionP.SaveEntity(c, false, true);
                            }
                        }
                    }
                }
                else if(elementoRecibido.Valor!=null && elementoRecibido.Ambito.Clave=="DO")
                {
                    var congiguracionParametro = Get<EK.Modelo.Kontrol.Interfaces.IConfigurarParametros>();

                    congiguracionParametro.Valor = elementoRecibido.Valor;
                    congiguracionParametro.Estado = elementoRecibido.Estado;
                    congiguracionParametro.IdEstatus = elementoRecibido.IdEstatus;
                    if (elementoRecibido.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            congiguracionParametro.Estatus = estatus;
                            congiguracionParametro.IdEstatus = estatus.ID;
                            congiguracionParametro.IdParametro = idParametro;
                            congiguracionParametro.Modificado = DateTime.UtcNow;
                            congiguracionParametro.IdModificadoPor = base.getUserId();

                            if (congiguracionParametro.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo || congiguracionParametro.ID < 1)
                            {
                            congiguracionParametro.Creado = DateTime.UtcNow;
                            congiguracionParametro.IdCreadoPor = base.getUserId();
                            congiguracionParametro.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            }
                            if (congiguracionParametro.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoConfiguracionP.Delete(congiguracionParametro.ID.Value, "ConfigurarParametros");
                            }
                            else
                            {
                                await daoConfiguracionP.SaveEntity(congiguracionParametro, false, true);
                            }
                        }

                }
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
            }
            return item;
        }



    }
}