using EK.Drivers.Log;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol
{
    public class Reportes
        : p.Kontrol.BPBase<m.Kontrol.Interfaces.IReporte, d.Kontrol.Interfaces.IReportes>, p.Kontrol.Interfaces.IReportes
    {
        public Reportes(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IReportes dao)
            : base(factory, dao, "reportes")
        {
        }
        private Dictionary<string, m.Kontrol.Interfaces.ITable> tables; 
        private Dictionary<string, List<m.Kontrol.Interfaces.IEntidadCampo>> campos;
        private Dictionary<string, m.Kontrol.Interfaces.IEntidad> entidades;

        protected override async Task<IReporte> afterGetItem(IReporte item)
        {
            if (item.TipoReporte.Clave == "RKV10")
            {
                var bpEntidades = Get<p.Kontrol.Interfaces.IEntidades>();
                item.Entidad = item.IdEntidad != null ? await bpEntidades.GetById(item.IdEntidad.Value) : null;
                item.Campos = await this.dao.GetReporteCampos(item.ID.Value);
                item.Filtros = await this.dao.GetReporteFiltros(item.ID.Value);
            }

            return item;
        }

        public async override Task<IReporte> Save(IReporte item)
        {
            IReporte retValue = null;

            try
            {
                BeginTransaction(true);
                //
                if (item.TipoReporte.Clave == "RKV10")
                {
                    item.ReportePBIClave = null;
                    item.ReportePBINombre = null;
                }
                else if (item.TipoReporte.Clave == "RPBI")
                {
                    item.ReportePBIClave = item.ReportePBI.Clave;
                    item.ReportePBINombre = item.ReportePBI.Nombre;
                    item.IdPlantillaEnc = null;
                    item.PlantillaEnc = null;
                    item.IdPlantillaPP = null;
                    item.PlantillaPP = null;
                }
                retValue = await base.saveModel(item);
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

        protected override async Task afterSaveItem(IReporte item, IReporte pItem)
        {
            if (pItem != null && pItem.Campos != null && pItem.Campos.Count > 0) {
                foreach (var c in pItem.Campos) {
                    if (c.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                    {
                        await this.dao.Delete(c.ID.Value, "ReportesCampos");
                    }
                    else 
                    {
                        var idUser = base.getUserId();
                        var date = DateTime.UtcNow;
                        var estatus = await base.GetCGV("ESTATUS", "A");

                        if (c.ID == null || c.ID < 0)
                        {
                            c.IdReporte = item.ID.Value;
                            c.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            c.IdCreadoPor = idUser;
                            c.Creado = date;
                            c.IdModificadoPor = idUser;
                            c.Modificado = date;
                            c.Estatus = estatus;
                            c.IdEstatus = estatus.ID;
                        }
                        else
                        {
                            c.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                            c.IdModificadoPor = idUser;
                            c.Modificado = date;
                        }

                        await this.dao.SaveEntity<m.Kontrol.Interfaces.IReporteCampo>(c, false, true);
                    }
                }
            }

            if (pItem != null && pItem.Filtros != null && pItem.Filtros.Count > 0)
            {
                foreach (var f in pItem.Filtros)
                {
                    if (f.Estado == m.Kontrol.KontrolEstadosEnum.Eliminado)
                    {
                        await this.dao.Delete(f.ID.Value, "ReportesFiltros");
                    }
                    else
                    {
                        var idUser = base.getUserId();
                        var date = DateTime.UtcNow;
                        var estatus = await base.GetCGV("ESTATUS", "A");

                        f.ValueString = Convert.ToString(f.Value);
                        if (f.ID == null || f.ID < 0 )
                        {
                            f.IdReporte = item.ID.Value;
                            f.Estado = m.Kontrol.KontrolEstadosEnum.Nuevo;
                            f.IdCreadoPor = idUser;
                            f.Creado = date;
                            f.IdModificadoPor = idUser;
                            f.Modificado = date;
                            f.Estatus = estatus;
                            f.IdEstatus = estatus.ID;
                        }
                        else
                        {
                            f.Estado = m.Kontrol.KontrolEstadosEnum.Modificado;
                            f.IdModificadoPor = idUser;
                            f.Modificado = date;
                        }

                        await this.dao.SaveEntity<m.Kontrol.Interfaces.IReporteFiltro>(f, false);
                    }
                }
            }

            item = await this.afterGetItem(item);
        }

        public override async Task<IReporte> Delete(int id)
        {
            IReporte retValue = null;

            try
            {
                BeginTransaction();
                //
                retValue = await this.dao.GetById(id);
                //
                await this.dao.DeleteCampos(id);
                await this.dao.DeleteFiltros(id);
                await this.deleteItem(id, null);
                //
                retValue.Estado = Modelo.Kontrol.KontrolEstadosEnum.Eliminado;
                //
                await Log(retValue);
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

        private m.Kontrol.Interfaces.IEntidadCampo getCampoObject(List<m.Kontrol.Interfaces.IEntidadCampo> campos, string nombreCampo) {
            m.Kontrol.Interfaces.IEntidadCampo retValue = null;
            string fieldName = null;

            foreach (var c in campos)
            {
                fieldName = c.Nombre;

                if (c.Nombre.StartsWith("Id"))
                {
                    var cIndex = c.Nombre.IndexOf("$");

                    if (cIndex >= 0)
                    {
                        fieldName = c.Nombre.Substring(2, cIndex - 2);
                    }
                    else
                    {
                        fieldName = c.Nombre.Substring(2);
                    }
                }
                if (fieldName == nombreCampo)
                {
                    retValue = c;

                    break;
                }
            }

            return retValue;
        }

        private async Task<m.Kontrol.Interfaces.ITable> getTableObject(string entityBase, string tableName) {
            var bpEntidades = Get<p.Kontrol.Interfaces.IEntidades>();
            m.Kontrol.Interfaces.ITable retValue = null;
            //
            if (this.entidades == null)
            {
                this.entidades = new Dictionary<string, m.Kontrol.Interfaces.IEntidad>();
            }
            //
            if (this.campos == null)
            {
                this.campos = new Dictionary<string, List<m.Kontrol.Interfaces.IEntidadCampo>>
                    {
                        {
                            entityBase,
                            await bpEntidades.GetEntidadCampos(new Dictionary<string, object>() { { "Clave", entityBase } })
                        }
                    };
            }
            //
            if (!this.tables.ContainsKey(tableName))
            {
                var tablaParts = tableName.Split(".".ToCharArray());
                var tableKey = entityBase;
                var lastTableKey = string.Empty;
                var campoFieldName = string.Empty;

                for (var i = 0; i < tablaParts.Length; i++)
                {
                    var tp = tablaParts[i];
                    if (!this.campos.ContainsKey(tableKey))
                    {
                        this.campos.Add(tableKey, await bpEntidades.GetEntidadCampos(new Dictionary<string, object>() { { "Clave", entityBase } }));
                    }

                    var campo = this.getCampoObject(this.campos[tableKey], tp);
                    if (campo != null)
                    {                        
                        if (i == 0)
                        {
                            campoFieldName = tableKey;
                        }
                        else
                        {
                            campoFieldName = i > 0 ? $"{campoFieldName}.{campo.Nombre}" : campo.Nombre;
                        }
                        if (campo.SourceDataType.StartsWith("$"))
                        {
                            tableKey = campo.SourceDataType.Substring(1);
                        }

                        lastTableKey = tableKey;

                        // preservamos la entidad para utilizarla posteriormente
                        if (!this.entidades.ContainsKey(tableKey))
                        {
                            this.entidades.Add(tableKey, await bpEntidades.GetByClave(tableKey));
                        }

                        var field = Get<m.Kontrol.Interfaces.ITableField>();
                        field.Clave = $"{campo.SourceName}{campo.SourceDataType}";
                        field.Nombre = campo.Nombre;

                        // creamos la nueva tabla y su referencia
                        if (!this.tables.ContainsKey(tp))
                        { 
                            var ent = this.entidades[tableKey];
                            //
                            retValue = Get<m.Kontrol.Interfaces.ITable>();
                            retValue.Clave = $"a{this.tables.Count}";
                            retValue.Nombre = ent.Clave;
                            retValue.LeftTable = Get<m.Kontrol.Interfaces.ITableJoin>();
                            retValue.LeftTable.Table = this.tables[campoFieldName];
                            retValue.LeftTable.Field = field;
                            retValue.LeftTable.JoinType = TableJoinTypeEnum.InnerJoin;
                            retValue.Fields = new List<m.Kontrol.Interfaces.ITableField>();

                            this.tables.Add(tableName, retValue);
                        }
                    }
                }
            }
            else {
                retValue = this.tables[tableName];
            }

            return retValue;
        }

        public async Task<object> GetReportData(m.Kontrol.Interfaces.IReporte reporte)
        {
            dynamic retValue = new ExpandoObject();
            m.Kontrol.Interfaces.ITable tabla = null;
            m.Kontrol.Interfaces.ITableField campo = null;
            m.Kontrol.Interfaces.ITableCondition filter = null;
            m.Kontrol.Interfaces.IEntidad entidad = null;
            List<m.Kontrol.Interfaces.ITableCondition> filtros = new List<ITableCondition>();

            var campos = new List<string>();
            var bpEntidades = Get<p.Kontrol.Interfaces.IEntidades>();

            if (reporte != null) {
                this.tables = new Dictionary<string, m.Kontrol.Interfaces.ITable>();

                tabla = Get<m.Kontrol.Interfaces.ITable>();
                tabla.Clave = $"a0";
                tabla.Nombre = reporte.Entidad.Clave;
                //tabla.LeftTable = string.Empty;
                tabla.Fields = new List<m.Kontrol.Interfaces.ITableField>();
                this.tables.Add(reporte.Entidad.Clave, tabla);

                entidad = await bpEntidades.GetByClave(tabla.Nombre);
                foreach (var c in reporte.Campos) {
                    campo = Get<m.Kontrol.Interfaces.ITableField>();
                    campo.Clave = c.Clave;
                    campo.Nombre = c.Nombre;

                    if (!c.Clave.Contains("."))
                    {
                        this.tables[reporte.Entidad.Clave].Fields.Add(campo);
                    }
                    else {
                        var dotIndex = c.Clave.LastIndexOf(".");
                        var tableKey = c.Clave.Substring(0, dotIndex);

                        tabla = await this.getTableObject(reporte.Entidad.Clave, tableKey);

                        if (tabla != null) {
                            if (!this.tables.ContainsKey(tableKey)) {
                                this.tables.Add(tableKey, tabla);
                            }

                            this.tables[tableKey].Fields.Add(campo);
                        }
                    }
                }

                //
                if (reporte.Filtros != null)
                {
                    foreach (var f in reporte.Filtros)
                    {
                        filter = Get<m.Kontrol.Interfaces.ITableCondition>();
                        filter.Clave = f.Clave;
                        filter.Nombre = f.Nombre;
                        filter.Operador = f.Operador.Clave;
                        filter.OperadorLogico = f.OperadorLogico.Clave;
                        filter.Value = f.Value;

                        if (!f.Clave.Contains("."))
                        {
                            filter.Table = this.tables[reporte.Entidad.Clave];
                        }
                        else
                        {
                            var dotIndex = f.Clave.LastIndexOf(".");
                            var tableKey = f.Clave.Substring(0, dotIndex);

                            tabla = await this.getTableObject(reporte.Entidad.Clave, tableKey);

                            if (tabla != null)
                            {
                                filter.Table = tabla;
                            }
                        }

                        filtros.Add(filter);
                    }
                }
                // GET: data
                var query = Get<m.Kontrol.Interfaces.IQuery>();
                query.Select = this.tables.Values.ToList();
                query.Where = filtros;

                retValue.Data = await this.dao.Select(query);

                // GET: Plantillas
                var bpPlantillas = Get<p.Kontrol.Interfaces.IPlantillasMails>();
                var pEnc = await bpPlantillas.GetById(reporte.PlantillaEnc.ID.Value);
                var pPP = await bpPlantillas.GetById(reporte.PlantillaPP.ID.Value);

                retValue.PlantillaEnc = pEnc.Plantilla;
                retValue.PlantillaPP = pPP.Plantilla;
            }

            return retValue;
        }
    }
}