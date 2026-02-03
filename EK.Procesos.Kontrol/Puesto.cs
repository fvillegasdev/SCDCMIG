using EK.Drivers.Log;
using Newtonsoft.Json;
using System;
using System.Threading.Tasks;
using modelo = EK.Modelo;
using m = EK.Modelo.Kontrol.Interfaces;
using d = EK.Datos.Kontrol.Interfaces;
using p = EK.Procesos.Kontrol.Interfaces;

using mk = EK.Modelo.Kontrol.Interfaces;
using pk = EK.Procesos.Kontrol;
using System.Collections.Generic;

namespace EK.Procesos.Kontrol
{
    public class Puestos
        : pk.BPBase<m.IPuesto, d.IPuestos>, p.IPuesto

    {
        public Puestos(mk.IContainerFactory factory, d.IPuestos dao)
            : base(factory, dao, "puesto")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Nombre = obj.Nombre;
            entity.Clave = obj.Clave;
            entity.Clave = obj.Rango;

        }


        public override async Task<m.IPuesto> Save(m.IPuesto item)
        {
            //Rescatando Valores
            var Categorias = item.Categorias;
            //Guardardo elemento actual
            item = await base.saveModel(item);
            //Obteniendo Id
            int IdPuesto = item.ID ?? 0;
            //Objetos Genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            //EnridadesAdicionales
            try
            {
                var daoCategorias = Get<d.ICategorias>();
                //Guardar Informacion Adicional
                if (Categorias != null && Categorias.Count > 0)
                {
                    foreach (var Categoras_Puesto in Categorias)
                    {
                        if (Categoras_Puesto.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            Categoras_Puesto.IdPuesto = IdPuesto;
                            Categoras_Puesto.Modificado = DateTime.UtcNow;
                            Categoras_Puesto.IdModificadoPor = base.getUserId();
                            if (Categoras_Puesto.Estado == modelo.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                Categoras_Puesto.Creado = DateTime.UtcNow;
                                Categoras_Puesto.IdCreadoPor = base.getUserId();
                            }
                            if (Categoras_Puesto.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoCategorias.Delete(Categoras_Puesto.ID.Value);
                            }
                            else
                            {
                                await daoCategorias.SaveEntity(Categoras_Puesto, false, true);
                            }
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

        public override async Task<m.IPuesto>Delete (int id)
        {
            BeginTransaction(true);
            m.IPuesto retValue = null;

            try
            {
                var daoCategorias = Get<EK.Datos.Kontrol.Interfaces.ICategorias>();
                var parametros = new Dictionary<string, object> { { "IdPuesto", id } };
                retValue = await this.dao.GetById(id);
                var categoriasPorPuesto = await daoCategorias.GetAll(parametros);

                foreach (var item in categoriasPorPuesto)
                {
                    await daoCategorias.Delete(item.ID.Value);
                }

                await this.deleteItem(id, null);
                var deletedItem = await this.dao.GetById(id);
                if (deletedItem == null)
                {
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                }
                else
                {
                    retValue = deletedItem;
                    retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Modificado;
                }
                await Log(retValue);
             Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw new ApplicationException(ex.Message, ex);
            }
            return retValue;
        }
        public async new Task<object[]> GetAll(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.IPuestos>();
            return await daoRL.GetAllPuestos(parametros);
        }

    }
}

