using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;
using EK.Procesos.Kontrol.Interfaces;
using d = EK.Datos;
using m = EK.Modelo;
using p = EK.Procesos;

namespace EK.Procesos.Kontrol
{
    public class PersonalizarCamposOpciones
        : BPBase<m.Kontrol.Interfaces.IPersonalizarCampoOpcion, d.Kontrol.Interfaces.IPersonalizarCamposOpciones>, p.Kontrol.Interfaces.IPersonalizarCamposOpciones
    {
        public PersonalizarCamposOpciones(m.Kontrol.Interfaces.IContainerFactory factory, d.Kontrol.Interfaces.IPersonalizarCamposOpciones dao)
               : base(factory, dao, "PersonalizarCamposOpciones")
        {
        }

        public async Task<List<m.Kontrol.Interfaces.IPersonalizarCampoOpcion>> GetCustomForm(Dictionary<string, object> parametros)
        {
            string IdClave = Convert.ToString(parametros["IdClaveOpcion"]);
            var daoOpciones = Get<d.Kontrol.Interfaces.IOpciones>();

            m.Kontrol.Interfaces.IOpcionModulo opcion = await daoOpciones.GetByClave(IdClave);

            var parametros_peticion = new Dictionary<string, object>()
                {
                    { "idClaveOpcion",  opcion.ID }
                };
            //,
            return await this.dao.GetCustomForm(parametros_peticion);
        }

        public override async Task<m.Kontrol.Interfaces.IPersonalizarCampoOpcion> Save(m.Kontrol.Interfaces.IPersonalizarCampoOpcion item)
        {
            var elementoRecibido = item;
            int idUsuario = base.getUserId();

            //Objetos genericos
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");
            var estatusInactivo = await bpEstatus.Get("ESTATUS", "B");
            var retvalue = item;

            var secciones = elementoRecibido.Secciones;
            var configuraciones = elementoRecibido.Configuraciones;

            BeginTransaction(true);

            try
            {
                var daoSecciones = Get<d.Kontrol.Interfaces.IPersonalizarCamposSecciones>();
                var daoConfiguracion = Get<d.Kontrol.Interfaces.IPersonalizarCamposConfiguracion>();

                if (secciones != null && secciones.Count > 0)
                {
                    foreach (var sec in secciones)
                    {
                        var Seccion = Get<m.Kontrol.Interfaces.IPersonalizarCamposSecciones>();

                        if (sec.ID > 0)
                        {

                            if (sec.Estado != m.Kontrol.KontrolEstadosEnum.SinCambios)
                            {
                                sec.Changed("Visible", true);
                                sec.Changed("xs", true);
                                sec.Changed("sm", true);
                                sec.Changed("md", true);
                                sec.Changed("lg", true);
                                sec.Changed("Orden", true);
                                sec.Size = getSize(sec.xs, sec.sm, sec.md, sec.lg);
                                sec.Modificado = DateTime.UtcNow;
                                sec.IdModificadoPor = base.getUserId();
                                Seccion = await daoSecciones.SaveEntity(sec, true, true);
                            }
                            else {
                                Seccion = sec;
                            }
                        }
                        else {
                            if (sec.Estado == m.Kontrol.KontrolEstadosEnum.Nuevo)
                            {
                                sec.Estatus = estatus;
                                sec.IdEstatus = estatus.ID;
                                sec.Modificado = DateTime.UtcNow;
                                sec.IdModificadoPor = idUsuario;
                                sec.Creado = DateTime.UtcNow;
                                sec.IdCreadoPor = idUsuario;
                                sec.Changed("Visible", true);
                                sec.Changed("xs", true);
                                sec.Changed("sm", true);
                                sec.Changed("md", true);
                                sec.Changed("lg", true);
                                sec.Changed("Orden", true);
                                sec.Size = getSize(sec.xs, sec.sm, sec.md, sec.lg);

                                Seccion = await daoSecciones.SaveEntity(sec, true, true);
                            }
                        }

                        if (configuraciones != null && configuraciones.Count > 0)
                        {
                            foreach (var config in configuraciones)
                            {
                                if (sec.ID == config.Seccion.ID)
                                {
                                    config.IdSeccion = (Int32)Seccion.ID;
                                    config.Modificado = DateTime.UtcNow;
                                    config.IdModificadoPor = idUsuario;
                                    config.Changed("Visible", true);
                                    config.Changed("Etiqueta", true);
                                    config.Changed("Requerido", true);
                                    config.Changed("xs", true);
                                    config.Changed("sm", true);
                                    config.Changed("md", true);
                                    config.Changed("lg", true);

                                    config.Size = getSize(config.xs, config.sm, config.md, config.lg);

                                    if (config.ID > 0)
                                    {
                                        if (config.Estado == m.Kontrol.KontrolEstadosEnum.Modificado) {
                                            await daoConfiguracion.SaveEntity(config, false, false);
                                        }
                                    }else{
                                        config.Estado= m.Kontrol.KontrolEstadosEnum.Nuevo;
                                        config.Creado = DateTime.UtcNow;
                                        config.IdCreadoPor = idUsuario;
                                        config.Estatus = estatus;
                                        config.IdEstatus = estatus.ID;
                                            
                                        await daoConfiguracion.SaveEntity(config, false);
                                    }
                                }
                            }
                            retvalue.Configuraciones = configuraciones;
                        }
                    }
                    retvalue.Secciones = secciones;
                }
            }
            catch (Exception ex)
            {
                string error = ex.ToString();
                throw;
            }
            Commit();
            return retvalue;
        }

        public string getSize(int? xs, int? sm, int? md, int? lg)
        {
            string size = string.Empty;
            var sizeBootstrap = new List<Tuple<int, decimal>>();
            sizeBootstrap = this.createListSizeBootstrap();

            List<string> lista = new List<string>();
            int Xs = (int)xs > 0 ? this.searchSize((int)xs, sizeBootstrap) : 12;
            int Sm = (int)sm > 0 ? this.searchSize((int)sm, sizeBootstrap) : 12;
            int Md = (int)md > 0 ? this.searchSize((int)md, sizeBootstrap) : 12;
            int Lg = (int)lg > 0 ? this.searchSize((int)lg, sizeBootstrap) : 12;
            lista.Add(Xs.ToString());
            lista.Add(Sm.ToString());
            lista.Add(Md.ToString());
            lista.Add(Lg.ToString());
            size = string.Join(",", lista.ToArray());

            return size;
        }
        
        protected override void Log(dynamic entity, dynamic obj)
        {
        }
        private List<Tuple<int, decimal>> createListSizeBootstrap()
        {
            var sizeBootstrap = new List<Tuple<int, decimal>>();

            for (int i = 1; i <= 12; i++)
            {
                decimal val = (i * 100M) / 12M;
                sizeBootstrap.Add(new Tuple<int, decimal>(i, Math.Round(val)));
            }
            return sizeBootstrap;
        }

        public int searchSize(int valor, List<Tuple<int, decimal>> sizeBootstrap)
        {
            int valorAsignado = 0;

            for (int i = 0; i < sizeBootstrap.Count(); i++)
            {
                if (sizeBootstrap[i].Item2 <= valor && sizeBootstrap[i + 1].Item2 >= valor)
                {
                    if (sizeBootstrap[i].Item2 == valor)
                    {
                        valorAsignado = sizeBootstrap[i].Item1;
                    }
                    else
                    {
                        valorAsignado = sizeBootstrap[i + 1].Item1;
                    }
                    break;
                }
            }
            return valorAsignado;
        }

    }
}