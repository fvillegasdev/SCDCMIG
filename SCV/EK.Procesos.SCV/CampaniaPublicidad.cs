using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Text.RegularExpressions;
using EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.Collections;

namespace EK.Procesos.SCV
{
    public class CampaniaPublicidad
        : p.Kontrol.BPBase<m.SCV.Interfaces.ICampaniaPublicidad, d.SCV.Interfaces.ICampaniaPublicidad>,
        p.SCV.Interfaces.ICampaniaPublicidad
    {
        public CampaniaPublicidad(m.Kontrol.Interfaces.IContainerFactory factory,
            d.SCV.Interfaces.ICampaniaPublicidad dao)
            : base(factory, dao, "campaniasPublicidad")
        {
        }

        public async Task<List<m.SCV.Interfaces.ICampaniaPublicidadListaMkt>> GetListasMarketing(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.ICampaniaPublicidadListaMkt>();

            return await daoRL.GetAll(parametros);
        }

        public async Task<m.SCV.Interfaces.ICampaniaPublicidadListaMkt> UpdateListasMarketingComplete(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.ICampaniaPublicidadListaMkt>();

            return await daoRL.UpdateListasMarketingComplete(parametros);
        }

        public async Task<m.SCV.Interfaces.ICampaniaPublicidadListaMkt> UpdateStatusMktListlog(Dictionary<string, object> parametros)
        {
            var daoRL = Get<d.SCV.Interfaces.ICampaniaPublicidadListaMkt>();

            return await daoRL.UpdateStatusMktListlog(parametros);
        }


        public override async Task<m.SCV.Interfaces.ICampaniaPublicidad> Save(m.SCV.Interfaces.ICampaniaPublicidad item)
        {
            //Obteniendo Idcampaniapublicidad

            int Idcampaniapublicidad = item.ID >=1 ? Convert.ToInt32(item.ID) : 0;


            var elementoRecibido = item;

            //Guardardo elemento actual
            item = await base.saveModel(item);
            if (Idcampaniapublicidad <= 0) {
                Idcampaniapublicidad = Convert.ToInt32(item.ID);
            }
            //Objetos genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");

            //EntidadesAdicionales
            try
            {
                //////Elimina Registros anteriores para ID CampaniasPublicidad en "scv_campaniapublicidad_ListasMarketing"
                var daoCampaniasListasMkt = Get<d.SCV.Interfaces.ICampaniaPublicidadListaMkt>();
                //await daoCampaniasListasMkt.Delete(Idcampaniapublicidad, "Idcampaniapublicidad", "scv_campaniapublicidad_ListasMarketing");

                var ConfiguracionCampaniasListasMkt = Get<m.SCV.Interfaces.ICampaniaPublicidadListaMkt>();

                if (ConfiguracionCampaniasListasMkt != null)
                {
                    //Informacion adicional Listas Marketing para Campaña
                    ConfiguracionCampaniasListasMkt.Estado = Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                    ConfiguracionCampaniasListasMkt.Idcampaniapublicidad = Idcampaniapublicidad;
                    ConfiguracionCampaniasListasMkt.Estatus = estatus;
                    ConfiguracionCampaniasListasMkt.IdEstatus = estatus.ID;
                    ConfiguracionCampaniasListasMkt.Creado = DateTime.UtcNow;
                    ConfiguracionCampaniasListasMkt.IdCreadoPor = base.getUserId();

                    if (elementoRecibido.ListaMarketing != null)
                    {
                        for (var i = 0; i < elementoRecibido.ListaMarketing.Count; i++)
                        {
                            var daoSeleccionarEstadoListaMkt = Get<d.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                            var nombreEstadoListaMkt = await daoSeleccionarEstadoListaMkt.GetByClave("EstadoListaMkt", "A");
                            int ID;
                            ID = elementoRecibido.ListaMarketing[i].ID.Value;
                            if (elementoRecibido.EstadoCampania.Clave.Equals("COM") || elementoRecibido.EstadoCampania.Clave.Equals("CAN"))
                            {
                                nombreEstadoListaMkt = await daoSeleccionarEstadoListaMkt.GetByClave("EstadoListaMkt", "C");
                                Dictionary<string, object> valuePairs = new Dictionary<string, object>
                                {
                                    { "ID", elementoRecibido.ListaMarketing[i].ID.Value },
                                    { "Estado", nombreEstadoListaMkt.Nombre }
                                };
                                await UpdateListasMarketingComplete(valuePairs);

                                Dictionary<string, object> statusMktListLog = new Dictionary<string, object>
                                {
                                    { "Activo", "0" },
                                    { "IdCampaniaPublicidad", Idcampaniapublicidad }
                                };
                                await UpdateStatusMktListlog(statusMktListLog);
                                break;
                            }

                            if (elementoRecibido.ListaMarketing[i].Estado == m.Kontrol.KontrolEstadosEnum.SinCambios){
                                continue;
                            }
                            if (elementoRecibido.ListaMarketing[i].Estado != m.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                await daoCampaniasListasMkt.Delete(ID, "ID", "scv_campaniapublicidad_ListasMarketing");
                                ConfiguracionCampaniasListasMkt.IdEstadoListaMkt = nombreEstadoListaMkt.ID;
                                ConfiguracionCampaniasListasMkt.IdListasMkt = elementoRecibido.ListaMarketing[i].IdListasMkt;
                                ConfiguracionCampaniasListasMkt.FechaProgramacion = elementoRecibido.ListaMarketing[i].FechaProgramacion;
                                ConfiguracionCampaniasListasMkt.IdFrecuenciaCampania = elementoRecibido.ListaMarketing[i].FrecuenciaCampania.ID;
                                ConfiguracionCampaniasListasMkt.IdPlantilla = elementoRecibido.ListaMarketing[i].Plantilla.ID;
                                await daoCampaniasListasMkt.SaveEntity(ConfiguracionCampaniasListasMkt, false, true);
                            }
                            else {
                                await daoCampaniasListasMkt.Delete(ID, "ID", "scv_campaniapublicidad_ListasMarketing");
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

        public async Task<List<m.SCV.Interfaces.ICampaniaPublicidad>> SelectCampaniaPublicidadUser(Dictionary<string, object> parametros)
        {
            var daoCP = Get<d.SCV.Interfaces.ICampaniaPublicidad>();
            var IdUser = base.getUserId();
            var parameters = new Dictionary<string, object> {
                    { "IdUser", IdUser
                }
                };
            if (parametros.Count > 0) {
                parameters.Clear();
                parameters.Add("IdUser", IdUser);
                parameters.Add("ID", parametros["ID"]);
            }
            return await daoCP.SelectCampaniaPublicidadUser(parameters);
        }


        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.FechaInicial = obj.FechaInicial;
            entity.FechaFinal = obj.FechaFinal;
            entity.IdMedio = obj.MedioPublicidad.ID;
            entity.IdMedioClave = obj.MedioPublicidad.Clave;
            entity.IdMedioNombre = obj.MedioPublicidad.Nombre;
        }
    }
}