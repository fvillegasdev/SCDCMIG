using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using m = EK.Modelo;
using d = EK.Datos;
using p = EK.Procesos;

using EK.Drivers.Log;
using Newtonsoft.Json;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Procesos.Kontrol
{
    public class Entidades
        : p.Kontrol.BPBase<m.Kontrol.Interfaces.IEntidad, d.Kontrol.Interfaces.IEntidades>, p.Kontrol.Interfaces.IEntidades
    {
        public Entidades(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IEntidades dao)
            : base(factory, dao, "entidades")
        {
        }

        public override async Task<IEntidad> GetByClave(string clave)
        {
            if (!clave.StartsWith("evw_"))
            {
                clave = "evw_" + clave;
            }

            return await base.GetByClave(clave);
        }

        public async Task<List<IEntidadCampo>> GetEntidadCampos(Dictionary<string, object> parametros)
        {
            var clave = Convert.ToString(parametros["Clave"]);
            if (!clave.StartsWith("evw_"))
            {
                clave = "evw_" + clave;
            }
            var campos = await this.dao.GetCamposEntidad(clave);

            if (campos != null) {
                foreach (var c in campos)
                {
                    var nombre = c.Nombre;
                    var dt = c.SourceDataType;

                    if (nombre.StartsWith("Id"))
                    {
                        var entDT = Get<m.Kontrol.Interfaces.IItemGeneral>();
                        entDT.Clave = "ENT";
                        entDT.Nombre = "Entidad";
                        c.DataType = entDT;
                        //
                        var index = nombre.IndexOf("$");
                        if (index >= 0)
                        {
                            c.Nombre = nombre.Substring(2, index - 2);
                            c.SourceDataType = nombre.Substring(index);
                            c.SourceName = nombre.Substring(0, index);
                        }
                        else
                        {
                            c.Nombre = nombre.Substring(2);
                            c.SourceDataType = "$" + c.Nombre;
                            c.SourceName = nombre;
                        }
                    }
                    else {
                        c.SourceName = c.Nombre;
                        c.DataType = await this.getDataType(dt);
                    }
                }
            }

            return campos;
        }

        private async Task<m.Kontrol.Interfaces.IItemGeneral> getDataType(string dt) {
            m.Kontrol.Interfaces.IItemGeneral retValue = null;
            string dataType = dt.ToLower();

            if ("int".Contains(dataType))
            {
                retValue = await base.GetCGV("TIPODATO", "INT");
            }
            else if ("nvarchar|varchar|nchar|char".Contains(dataType))
            {
                retValue = await base.GetCGV("TIPODATO", "STR");
            }
            else if ("datetime".Contains(dataType))
            {
                retValue = await base.GetCGV("TIPODATO", "DATE");
            }

            return retValue;
        }
    }
}
