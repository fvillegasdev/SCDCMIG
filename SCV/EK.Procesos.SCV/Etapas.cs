using System;
using m = EK.Modelo.SCV.Interfaces;
using d = EK.Datos.SCV.Interfaces;
using p = EK.Procesos.SCV.Interfaces;

using mk = EK.Modelo.Kontrol.Interfaces;
using pk = EK.Procesos.Kontrol;

namespace EK.Procesos.SCV
{
    public class Etapas
        : pk.BPBase<m.IEtapa, d.IEtapas>, p.IEtapas
    {
        public Etapas(mk.IContainerFactory factory, d.IEtapas dao)
            : base(factory, dao, "etapas")
        {
        }

        protected override void Log(dynamic entity, dynamic obj)
        {
            entity.Nombre = obj.Nombre;
            entity.Clave = obj.Clave;
            entity.PlazoEstandar = obj.PlazoEstandar;

            entity.IdMacroEtapa = obj.MacroEtapa.ID;
            entity.IdMacroEtapaClave = obj.MacroEtapa.Clave;
            entity.IdMacroEtapaNombre = obj.MacroEtapa.Nombre;

            entity.IdFaseExpediente = obj.FaseExpediente.ID;
            entity.IdFaseExpedienteClave = obj.FaseExpediente.Clave;
            entity.IdFaseExpedienteNombre = obj.FaseExpediente.Nombre;

            entity.IdEstatus = obj.Estatus.ID;
            entity.IdEstatusClave = obj.Estatus.Clave;
            entity.IdEstatusNombre = obj.Estatus.Nombre;

            entity.RecordType = Convert.ToInt32(obj.Estado);
            entity.RecordTypeName = obj.Estado.ToString();

            entity.Creado = obj.Creado;
            entity.IdCreadoPor = obj.CreadoPor.ID;
            entity.IdCreadoPorNombre = obj.CreadoPor.Nombre;

            entity.Modificado = obj.Modificado;
            entity.IdModificadoPor = obj.ModificadoPor.ID;
            entity.IdModificadoPorNombre = obj.ModificadoPor.Nombre;
        }
    }
}