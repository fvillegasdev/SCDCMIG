using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Drivers.Log;
using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using System.IO;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace EK.Procesos.SCV
{
    public class GestionDocumentos
        : p.Kontrol.BPBase<m.SCV.Interfaces.IGestionDocumentos, d.SCV.Interfaces.IGestionDocumentos>,
        p.SCV.Interfaces.IGestionDocumentos
    {
        public GestionDocumentos(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.IGestionDocumentos dao)
            : base(factory, dao, "GestionDocumentos")
        {
        }

        public new async Task<object> GetAll(Dictionary<string, object> parametros)
        {
            var daoGestionDocumentos = Get<d.SCV.Interfaces.IGestionDocumentos>();
            return  await daoGestionDocumentos.GetGestionDocumentos(parametros);
        }


        public new async Task<m.SCV.Interfaces.IGestionDocumentos> Save(m.SCV.Interfaces.IGestionDocumentos item)
        {
            try
            {
                BeginTransaction(true);
                var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var bpTipoExpediente = Get<p.SCV.Interfaces.ITiposExpediente>();
                var DAOtipoEntidad = Get<d.Kontrol.Interfaces.ITiposEntidad>();
                var daoExpediente = Get<d.SCV.Interfaces.IExpedientes>();
                var bpExpediente = Get<p.SCV.Interfaces.IExpedientes>();
                var bpSeguimientos = Get<p.SCV.Interfaces.ISeguimientos>();


                var bpkontrolFile = Get<p.Kontrol.Interfaces.IKontrolFiles>();
                var mokontrolFile = Get<m.Kontrol.Interfaces.IKontrolFile>();

                var tipoElementoB = await bpCatalogoG.Get("ESTATUS_DOCUMENTOS", "NV");
                var estatusExpediente = await bpCatalogoG.Get("SCVESTATUSEXPEDIENTE", "A");
                var estatus = await bpCatalogoG.Get("ESTATUS", "A");
                var tipoExpediente = await bpTipoExpediente.GetByClave("D");
                var tipoEntidad = await DAOtipoEntidad.GetByClave("documentos");
                var tipoEntidadObra = await DAOtipoEntidad.GetByClave("Obra");

                var expediente = Get<m.SCV.Interfaces.IExpediente>();
                expediente.EstatusExpediente = estatusExpediente;
                expediente.IdEstatusExpediente = estatusExpediente.ID ?? 0;
                expediente.Estatus = estatus;
                expediente.IdEstatus = estatus.ID ?? 0;
                expediente.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
                expediente.ID = -1;
                expediente = await daoExpediente.Save(expediente);
                int idExpediente = (int)expediente.ID;

                /*Generar Archivo*/
                if (item.Entidad !=null && item.Entidad.ID > 0)
                {
                    mokontrolFile.EntityId = item.Entidad.ID.Value;
                }
                else
                {
                    mokontrolFile.EntityId = expediente.ID.Value;
                }

                mokontrolFile.EntityType = "Obras";
                mokontrolFile.Modulo = "Obra";
                mokontrolFile.Tipo = "Documento";
                mokontrolFile.IdEstatus = tipoElementoB.ID.Value;
                mokontrolFile.Uid = Guid.NewGuid().ToString();
                mokontrolFile.Creado = DateTime.UtcNow;
                mokontrolFile.Modificado = DateTime.UtcNow;
                mokontrolFile.IdTEOrigen = tipoEntidad.ID.Value;
                mokontrolFile.IdTipoEntidad = tipoEntidadObra.ID.Value;
                mokontrolFile.IdCategoria = item.IdCategoria;
                mokontrolFile.Nombre =string.Empty;


                var document = await bpkontrolFile.Save(mokontrolFile);
         
                expediente = await daoExpediente.GetById(idExpediente);
                expediente.IdEntidad = document.ID.Value;
                expediente.IdTipoExpediente = tipoExpediente.ID.Value;
                expediente.IdTipoEntidad = tipoEntidad.ID.Value;
                expediente = await daoExpediente.Save(expediente);

                /*consultar estatus seguimiento*/

                var bpEstatusSeguimiento = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
                var estatusSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", "A");
                var estatusEsperaSeguimiento = await bpEstatusSeguimiento.Get("SCVESTATUSSEGUIMIENTO", "E");
                int idEstatusSeguimiento = estatusSeguimiento.ID.Value;

                var daoFases = Get<d.SCV.Interfaces.IFasesExpediente>();
                var daoposicion = Get<d.Kontrol.Interfaces.IPosiciones>();
                var daoUsuario = Get<d.Kontrol.Interfaces.IUsuarios>();

                foreach (var element in item.Seguimientos)
                {
                    var fase = await daoFases.GetById(element.Fase.ID.Value);
                    /*Generar seguimientos*/
                    var seguimiento = Get<m.SCV.Interfaces.ISeguimiento>();

                    if (fase.Orden > 1)
                    {
                        seguimiento.EstatusSeguimiento = estatusEsperaSeguimiento;
                        seguimiento.IdEstatusSeguimiento = estatusEsperaSeguimiento.ID;
                    }
                    else
                    {
                        seguimiento.EstatusSeguimiento = estatusSeguimiento;
                        seguimiento.IdEstatusSeguimiento = idEstatusSeguimiento;
                    }

                    seguimiento.Esquema = element.Esquema;
                    seguimiento.IdEsquema = element.Esquema.ID.Value;


                    var usuario = await daoUsuario.GetById(element.Responsable.ID.Value);
                    var posicion = await daoposicion.GetById(usuario.Posicion.ID.Value);


                    seguimiento.IdPosicion = posicion.ID.Value;
                    seguimiento.Posicion = posicion;
                    seguimiento.Fase = fase;
                    seguimiento.IdExpediente = idExpediente;
                    seguimiento.FechaEstimada = element.FechaFinalizacion;
                    int result = await bpExpediente.SaveConfiguracion(seguimiento);

                    if (fase.Orden == 1)
                    {
                        var etapa = await bpSeguimientos.getSeguimientoEtapas(result);

                        foreach (var ite in etapa)
                        {
                            await bpSeguimientos.VerificaAvanzarEtapa(ite);
                        }
                    }
                }


                Commit();
                return await this.GetById(idExpediente);
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
                Rollback();
                throw;
            }
        }


        public async Task<object> GetSeguimientos(Dictionary<string, object> parametros)
        {
            var daoSeguimiento = Get<EK.Datos.SCV.Interfaces.IDocumentoCategoriaFase>();


            object expediente = 0;
            parametros.TryGetValue("idExpediente", out expediente);
            if(expediente!=null)
            {
                return await daoSeguimiento.GetSeguimientos(parametros);
            }

            return await daoSeguimiento.GetAll(parametros);
        }

        public async Task<object> GetVersiones(Dictionary<string, object> parametros)
       {
            var daoKontrolFileVersiones = Get<EK.Datos.Kontrol.Interfaces.IKontrolFilesVersiones>();

            return await daoKontrolFileVersiones.GetAll(parametros);
        }


        public async Task<m.SCV.Interfaces.IGestionDocumentos> SaveFile(m.Kontrol.Interfaces.IKontrolFile item, MemoryStream stream, string contentType, int idExpediente)
        {

            try
            {
                BeginTransaction(true);

                var mokontrolFileVersion = Get<m.Kontrol.Interfaces.IKontrolFilesVersiones>();
                var daokontrolFileVersion = Get<d.Kontrol.Interfaces.IKontrolFilesVersiones>();

                var daoKontrol = Get<EK.Procesos.Kontrol.Interfaces.IKontrolFiles>();
                var bpCatalogoG = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

                var estatus = await bpCatalogoG.Get("ESTATUS", "A");

                /*Obtener elemento*/
                var document = await daoKontrol.GetById(item.ID.Value);
                var kontrolFile = Get<m.Kontrol.Interfaces.IKontrolFile>();


                mokontrolFileVersion.IdEstatus = estatus.ID.Value;
                mokontrolFileVersion.Creado = DateTime.UtcNow;
                mokontrolFileVersion.Modificado = DateTime.UtcNow;
                mokontrolFileVersion.IdCreadoPor = base.getUserId();
                mokontrolFileVersion.IdModificadoPor = base.getUserId();
                mokontrolFileVersion.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;

                /*Obteniendo versiones creadas para este documento*/
                var parametros = new Dictionary<string, object> { { "idFile", document.ID.Value } };
                var cantidadVersiones = await daokontrolFileVersion.GetAll(parametros);

                if (document.FilePath == null)
                {
                    item.FileVersion = 1;

                    kontrolFile = await daoKontrol.SaveFile(item, stream, contentType);

                    //Generar Version del archivo
                    mokontrolFileVersion.FilePath = kontrolFile.FilePath;
                    mokontrolFileVersion.FileSize = kontrolFile.FileSize;
                    mokontrolFileVersion.FileType = kontrolFile.FileType;
                    mokontrolFileVersion.FileExtension = kontrolFile.FileExtension;
                    mokontrolFileVersion.IdFile = kontrolFile.ID.Value;
                    mokontrolFileVersion.Nombre = kontrolFile.Nombre;
                    mokontrolFileVersion.Uid = kontrolFile.Uid;
                    mokontrolFileVersion.FileVersion = cantidadVersiones.Count() + 1;
                    var kontrolFileVersion = await daokontrolFileVersion.Save(mokontrolFileVersion);
                }
                else
                {
                    mokontrolFileVersion.IdFile = document.ID.Value;
                    mokontrolFileVersion.FileSize = item.FileSize;
                    mokontrolFileVersion.FileType = item.FileType;
                    mokontrolFileVersion.FileExtension = item.FileExtension;
                    mokontrolFileVersion.Nombre = item.Nombre;
                    mokontrolFileVersion.FileVersion = cantidadVersiones.Count() + 1;

                    var version = await daoKontrol.SaveFileVersion(mokontrolFileVersion,stream, contentType, document);

                    if (version != null)
                    {
                        /*Actualizar elementos*/
                        document.Uid = version.Uid;
                        document.FileVersion = version.FileVersion;
                        document.FilePath = version.FilePath;
                        await daoKontrol.Save(document);
                    }
                 
                }

                Commit();
            }
            catch (Exception ex)
            {
                Rollback();
                throw ex;
            }

            return await this.GetById(idExpediente);
        }

        public async Task<m.Kontrol.Interfaces.IKontrolFilesVersiones> GetDocumentVersionById(int id)
        {
            var daoDocsVersion = Get<d.Kontrol.Interfaces.IKontrolFilesVersiones>();
             return await daoDocsVersion.GetById(id);
        }



    }
}
