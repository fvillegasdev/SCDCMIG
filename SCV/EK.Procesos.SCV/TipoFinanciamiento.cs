using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

namespace EK.Procesos.SCV
{
    public class TipoFinanciamiento
        : p.Kontrol.BPBase<m.SCV.Interfaces.ITipoFinanciamiento, d.SCV.Interfaces.ITipoFinanciamiento>, p.SCV.Interfaces.ITipoFinanciamiento
    {
        private const string ID_PAGE_TIPOFINANCIAMIENTO = "boletasProspeccion$";

        public TipoFinanciamiento(m.Kontrol.Interfaces.IContainerFactory factory, d.SCV.Interfaces.ITipoFinanciamiento dao)
            : base(factory, dao, "scv_tipoFinanciamiento")
        {
        }

        public async Task<List<m.SCV.Interfaces.ITipoFinanciamientoInstitucion>> GetAllTFInstituciones(Dictionary<string, object> parametros)
        {
            var daoI = Get<d.SCV.Interfaces.IInstituciones>();
            var daoID = Get<d.SCV.Interfaces.ITF_Institucion_Detalle>();

            var instituciones = await daoI.GetAllTFInstituciones(parametros);
            foreach (var c in instituciones)
            {
                var parameters = new Dictionary<string, object>() { { "idTFInstitucion", c.ID } };
                c.Conceptos = await daoID.GetInstitucionDetalle(parameters);
            }

            return instituciones;
        }

        public override async Task<m.SCV.Interfaces.ITipoFinanciamiento> Save(m.SCV.Interfaces.ITipoFinanciamiento item)
        {
            //Rescatando Valores
            var Instituciones = item.Instituciones;
            var elementoRecibido = item;
            var elementoOriginal = await base.GetById((int)elementoRecibido.ID);

            //Guardardo elemento actual
            item = await base.saveModel(item);
            //Obteniendo Id
            int idTipoFinanciamiento = item.ID ?? 0;
            //Objetos Genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            int idUsuario = base.getUserId();

            //EnridadesAdicionales
            try
            {
                var daoTFInstituciones = Get<d.SCV.Interfaces.ITipoFinanciamientoInstitucion>();
                var daoTFInstitucionesDetalle = Get<d.SCV.Interfaces.ITF_Institucion_Detalle>();
                //Guardar Informacion Adicional
                if (Instituciones != null && Instituciones.Count > 0)
                {
                    m.SCV.Interfaces.ITipoFinanciamientoInstitucion TipoFinanciamientoInstitucion;
                    int IdTFInstitucion = 0;
                    bool refrescar = false;
                    foreach (var institucionTF in Instituciones)
                    {
                        //Operaciones por prototipo
                        if (institucionTF.Estado != Modelo.Kontrol.KontrolEstadosEnum.SinCambios)
                        {
                            institucionTF.IdTipoFinanciamiento = idTipoFinanciamiento;
                            institucionTF.Estatus = estatus;
                            institucionTF.IdEstatus = estatus.ID;
                            institucionTF.Modificado = DateTime.UtcNow;
                            institucionTF.IdModificadoPor = idUsuario;
                            if (institucionTF.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                institucionTF.Creado = DateTime.UtcNow;
                                institucionTF.IdCreadoPor = idUsuario;
                            }
                            if (institucionTF.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                            {
                                //Eliminina Detalle primero.
                                foreach (var c in institucionTF.Conceptos)
                                {
                                    await daoTFInstitucionesDetalle.Delete(c.ID.Value);
                                }
                                IdTFInstitucion = await daoTFInstituciones.Delete(institucionTF.ID.Value);
                            }
                            else
                            {
                                refrescar = institucionTF.ID == -1 ? true : false;
                                TipoFinanciamientoInstitucion = await daoTFInstituciones.SaveEntity(institucionTF, true, true);
                                IdTFInstitucion = TipoFinanciamientoInstitucion == null ? Convert.ToInt32(institucionTF.ID) : Convert.ToInt32(TipoFinanciamientoInstitucion.ID);
                            }
                        }
                        //Guardar Caracteristicas Adicionales Prototipos
                        var ConceptosInstitucion = institucionTF.Conceptos;
                        if (ConceptosInstitucion != null && ConceptosInstitucion.Count > 0)
                        {
                            foreach (var c in ConceptosInstitucion)
                            {
                                if (c.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                                {
                                    c.IdTFInstitucion = IdTFInstitucion;
                                    c.Estatus = estatus;
                                    c.IdEstatus = estatus.ID;
                                    c.Modificado = DateTime.UtcNow;
                                    c.IdModificadoPor = idUsuario;

                                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                                    {
                                        c.Creado = DateTime.UtcNow;
                                        c.IdCreadoPor = idUsuario;
                                    }

                                    if (c.Estado == Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                                    {
                                        await daoTFInstitucionesDetalle.Delete(c.ID.Value);
                                    }
                                    else
                                    {
                                        await daoTFInstitucionesDetalle.SaveEntity(c, true, true);
                                    }
                                }
                            }
                        }
                    }
                }


                //Guardar ENTIDAD PARA CAMPOS ADICIONALES, NUEVO O MODIFICACIÓN 
                var daoTipoEntidad = Get<d.Kontrol.Interfaces.IConfiguracionFormularioEntidad>();
                var tipoEntidad = Get<m.Kontrol.Interfaces.IIConfiguracionFormularioEntidad>();
                if (elementoRecibido.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                {
                    string claveEntidad = ID_PAGE_TIPOFINANCIAMIENTO + elementoRecibido.Clave;
                    var entidad = await daoTipoEntidad.GetByClave(claveEntidad);
                    if (entidad == null)
                    {
                        tipoEntidad.Clave = claveEntidad;
                        tipoEntidad.Nombre = elementoRecibido.Nombre;
                        tipoEntidad.Estatus = estatus;
                        tipoEntidad.IdEstatus = estatus.ID;
                        tipoEntidad.Modificado = DateTime.UtcNow;
                        tipoEntidad.IdModificadoPor = idUsuario;
                        tipoEntidad.Creado = DateTime.UtcNow;
                        tipoEntidad.IdCreadoPor = idUsuario;
                        tipoEntidad.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;

                        tipoEntidad = await daoTipoEntidad.SaveEntity(tipoEntidad, false);
                    }
                }
                else if (elementoRecibido.Estado == m.Kontrol.KontrolEstadosEnum.Modificado)
                {
                    string claveEntidad = ID_PAGE_TIPOFINANCIAMIENTO + elementoOriginal.Clave;
                    var entidadOriginal = await daoTipoEntidad.GetByClave(claveEntidad);

                    tipoEntidad.Clave = claveEntidad;
                    tipoEntidad.Nombre = elementoRecibido.Nombre;
                    tipoEntidad.Modificado = DateTime.UtcNow;
                    tipoEntidad.IdModificadoPor = idUsuario;
                    tipoEntidad.Estatus = estatus;
                    tipoEntidad.IdEstatus = estatus.ID;


                    if (entidadOriginal != null)
                    {
                        tipoEntidad.ID = entidadOriginal.ID;
                        tipoEntidad.Version = entidadOriginal.Version;
                        tipoEntidad.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                        await daoTipoEntidad.SaveEntity(tipoEntidad, false);
                    }
                    else {
                        tipoEntidad.IdCreadoPor = idUsuario;
                        tipoEntidad.Creado = DateTime.UtcNow;
                        tipoEntidad.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                        await daoTipoEntidad.SaveEntity(tipoEntidad, false);
                    }
                }
            }
            catch (Exception ex)
            {
                string Error = ex.ToString();
            }

            return item;
        }

        //public async Task<List<m.SCV.Interfaces.ITipoFinanciamiento>> GetDesarrolloFinanciamientos(Dictionary<string, object> parametros)
        //{
        //    var daoDF = Get<d.SCV.Interfaces.IDesarrollosFinanciamiento>();
        //    return await daoDF.GetAllDesarrollosFinanciamientos(parametros);
        //}
    }
}