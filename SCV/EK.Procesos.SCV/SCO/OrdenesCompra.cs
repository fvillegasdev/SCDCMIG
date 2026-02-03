using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


using m = EK.Modelo;
using d=EK.Datos;
using p = EK.Procesos;



namespace EK.Procesos.SCO
{
    public class OrdenesCompra
        : p.Kontrol.BPBase<m.SCO.Interfaces.IOrdenesCompra, d.SCO.Interfaces.IOrdenesCompra>, p.SCO.Interfaces.IOrdenesCompra
    {
        public OrdenesCompra(m.Kontrol.Interfaces.IContainerFactory factory, d.SCO.Interfaces.IOrdenesCompra dao)
            : base(factory, dao, "OrdenesCompra")
        {
        }

        public async Task<m.SCV.Interfaces.IComisionesAprobacion> GeneracionOrdenesCompra(int idRevision)
        {
            BeginTransaction(true);

            var daoOrdenCompra= Get<d.SCO.Interfaces.IOrdenesCompra>();
            var daoOrdenCompraDetalle = Get<m.SCO.Interfaces.IOrdenesCompraDetalle>();
            var daoOrdenCompraImpuestos = Get<m.SCO.Interfaces.IOrdenesCompraImpuesto>();

            var daoComisionesAprobadas = Get<m.SCV.Interfaces.IComisionesAprobacion>();


            var bpComisionAprobacion = Get<p.SCV.Interfaces.IComisionesAprobacion>();

            

            var parametros = new Dictionary<string, object> { { "idRevision", idRevision } };
            var listadoComisionesAprobadas = await bpComisionAprobacion.ObtenerRevisionVigenteDetalle(parametros);


            foreach (var item in listadoComisionesAprobadas)
            {
                if (item.Estatus.Clave == "PA")
                {
                    /*Creacion orden de compra*/
                    var ordenCompra = await this.CreacionEncabezado(item);
                    var creacionImpuestos = await ObtenerImpuestos((int)ordenCompra.ID, item);
                    ordenCompra = await daoOrdenCompra.GetById((int)ordenCompra.ID);
                    ordenCompra.Total = ordenCompra.Importe + creacionImpuestos.Importe;
                    ordenCompra.TotalMoneda = ordenCompra.ImporteMoneda + creacionImpuestos.ImporteMoneda;
                    ordenCompra = await daoOrdenCompra.SaveEntity(ordenCompra, true);
                    await this.CreacionDetalle(item, ordenCompra);
                }
            }


            Commit();
            return null;
        }

        public async Task<m.SCO.Interfaces.IOrdenesCompra> CreacionEncabezado(
           m.SCV.Interfaces.IComisionesAprobacion comisionAprobacion)
        {
            BeginTransaction(true);

            var mOrdenCompra = Get<m.SCO.Interfaces.IOrdenesCompra>();
            var daoOrdenCompra = Get<d.SCO.Interfaces.IOrdenesCompra>();

            var bpTipoEntidad = Get<EK.Procesos.Kontrol.Interfaces.ITiposEntidad>();
            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();

            var estatus = await bpEstatus.Get("ESTATUS", "A");
            var tipoEntidad = await bpTipoEntidad.GetByClave("comisiones");


            mOrdenCompra.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            mOrdenCompra.ID = -1;
            mOrdenCompra.IdUsuario = comisionAprobacion.Usuario.ID.Value;
            mOrdenCompra.IdCompania = comisionAprobacion.Compania.ID.Value;
            mOrdenCompra.IdCentroCosto = comisionAprobacion.CentroCosto.ID.Value;

            mOrdenCompra.Importe = comisionAprobacion.ImporteComision;
            mOrdenCompra.ImporteMoneda = comisionAprobacion.ImporteComisionMoneda;

            mOrdenCompra.Total = 0;
            mOrdenCompra.TotalMoneda = 0;

            mOrdenCompra.IdOrigen = comisionAprobacion.ID.Value;
            mOrdenCompra.IdTipoEntidad = tipoEntidad.ID.Value;

            mOrdenCompra.IdMoneda = comisionAprobacion.IdMoneda;
            mOrdenCompra.TipoCambio = comisionAprobacion.TipoCambio;


            mOrdenCompra.IdEstatus = estatus.ID.Value;
            mOrdenCompra.Creado = DateTime.UtcNow;
            mOrdenCompra.IdCreadoPor = base.getUserId();
            mOrdenCompra.Modificado = DateTime.UtcNow;
            mOrdenCompra.IdModificadoPor = base.getUserId();

            var ordenCompra= await daoOrdenCompra.SaveEntity(mOrdenCompra, false);
            Commit();

            return ordenCompra;
        }


        public async Task<m.SCO.Interfaces.IOrdenesCompraDetalle> CreacionDetalle(
            m.SCV.Interfaces.IComisionesAprobacion comisionAprobacion,
            m.SCO.Interfaces.IOrdenesCompra ordenCompra)
        {

            BeginTransaction(true);

            var mOrdenCompraDetalle = Get<m.SCO.Interfaces.IOrdenesCompraDetalle>();
            var daoOrdenCompraDetalle = Get<d.SCO.Interfaces.IOrdenesCompraDetalle>();

            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");


            mOrdenCompraDetalle.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            mOrdenCompraDetalle.ID = -1;

            mOrdenCompraDetalle.IdOrdenCompra = ordenCompra.ID.Value;

            mOrdenCompraDetalle.IdTmComision = comisionAprobacion.TipoComision.ID.Value;
            mOrdenCompraDetalle.IdTmComisionOrdenCompra = comisionAprobacion.TipoComision.IdTipoMovimiento_OC.Value;
            mOrdenCompraDetalle.IdInsumo = comisionAprobacion.TipoComision.IdInsumo;
            mOrdenCompraDetalle.Comision = ordenCompra.Importe;
            mOrdenCompraDetalle.ComisionMoneda = ordenCompra.ImporteMoneda;
            mOrdenCompraDetalle.Cantidad = 1;
            mOrdenCompraDetalle.IdMoneda = comisionAprobacion.IdMoneda;
            mOrdenCompraDetalle.TipoCambio = comisionAprobacion.TipoCambio;

            mOrdenCompraDetalle.IdEstatus = estatus.ID.Value;
            mOrdenCompraDetalle.Creado = DateTime.UtcNow;
            mOrdenCompraDetalle.IdCreadoPor = base.getUserId();
            mOrdenCompraDetalle.Modificado = DateTime.UtcNow;
            mOrdenCompraDetalle.IdModificadoPor = base.getUserId();


            var ordenCompraDetale = await daoOrdenCompraDetalle.SaveEntity(mOrdenCompraDetalle, false);
            Commit();

            return ordenCompraDetale;
        }



        public async Task<m.SCO.Interfaces.IOrdenesCompraImpuesto> CreacionImpuesto(
            int IdOrdenCompra,
            decimal importe,
            decimal importeMoneda,
            m.SCV.Interfaces.IComisionesAprobacion comisionesAprobacion,
            m.SCV.Interfaces.IRegimenCompania impuesto
            )
        {

            BeginTransaction(true);

            var mOrdenCompraImpuesto = Get<m.SCO.Interfaces.IOrdenesCompraImpuesto>();
            var daoOrdenCompraImpuesto = Get<d.SCO.Interfaces.IOrdenesCompraImpuesto>();

            var bpEstatus = Get<EK.Procesos.Kontrol.Interfaces.ICatalogosGeneralesValores>();
            var estatus = await bpEstatus.Get("ESTATUS", "A");


            mOrdenCompraImpuesto.Estado = EK.Modelo.Kontrol.KontrolEstadosEnum.Nuevo;
            mOrdenCompraImpuesto.ID = -1;
            mOrdenCompraImpuesto.IdOrdenCompra = IdOrdenCompra;
            mOrdenCompraImpuesto.IdImpuesto = impuesto.Impuesto.ID.Value;
            mOrdenCompraImpuesto.RetencionImpuesto = impuesto.Impuesto.RetImp;

            mOrdenCompraImpuesto.Importe = importe;
            mOrdenCompraImpuesto.ImporteMoneda = importeMoneda;

            mOrdenCompraImpuesto.IdMoneda = comisionesAprobacion.IdMoneda;
            mOrdenCompraImpuesto.TipoCambio = comisionesAprobacion.TipoCambio;


            mOrdenCompraImpuesto.IdEstatus = estatus.ID.Value;
            mOrdenCompraImpuesto.Creado = DateTime.UtcNow;
            mOrdenCompraImpuesto.IdCreadoPor = base.getUserId();
            mOrdenCompraImpuesto.Modificado = DateTime.UtcNow;
            mOrdenCompraImpuesto.IdModificadoPor = base.getUserId();

            var ordenCompraImpuesto = await daoOrdenCompraImpuesto.SaveEntity(mOrdenCompraImpuesto, false);

            Commit();

            return ordenCompraImpuesto;
        }


        public async Task<m.SCO.Interfaces.IOrdenesCompraImpuesto> ObtenerImpuestos(
            int idOrdenCompra,
            m.SCV.Interfaces.IComisionesAprobacion comisionAprobacion)
        {

            BeginTransaction(true);

            try
            {
                var daoRegimenCompania = Get<d.SCV.Interfaces.IRegimenCompania>();
                var daoOrdenCompraImpuestos = Get<d.SCO.Interfaces.IOrdenesCompraImpuesto>();

                var moOrdenCompraImpuestos = Get<m.SCO.Interfaces.IOrdenesCompraImpuesto>();

                var param = new Dictionary<string, object> { { "idRegimen", comisionAprobacion.Agente.IdRegimen } };
                var companiasImpuestos = await daoRegimenCompania.GetAll(param);
                if (companiasImpuestos != null && companiasImpuestos.Count > 0)
                {
                    var busquedaPorCompania = companiasImpuestos.Where(x => x.IdCompania == comisionAprobacion.Compania.ID).ToList();

                    if (busquedaPorCompania != null && busquedaPorCompania.Count > 0)
                        foreach (var item in busquedaPorCompania)
                        {
                            var importe = (item.Impuesto.Porcentaje * comisionAprobacion.ImporteComision) / 100;
                            var importeMoneda = (item.Impuesto.Porcentaje * comisionAprobacion.ImporteComisionMoneda) / 100;

                            await this.CreacionImpuesto(idOrdenCompra, importe, importeMoneda, comisionAprobacion, item);

                        }

                    /*Obtener impuestos generados*/
                    param.Clear();
                    param.Add("idOrdenCompra", idOrdenCompra);
                    var impuestosPorAplicar = await daoOrdenCompraImpuestos.GetAll(param);

                    decimal total = 0;
                    decimal totalMoneda = 0;

                    foreach (var item in impuestosPorAplicar)
                    {
                        if (item.RetencionImpuesto)
                        {
                            total = total - (decimal)item.Importe;
                            totalMoneda = totalMoneda - (decimal)item.ImporteMoneda;

                        }
                        else
                        {
                            total = total + (decimal)item.Importe;
                            totalMoneda = totalMoneda + (decimal)item.ImporteMoneda;
                        }
                    }
                    moOrdenCompraImpuestos.Importe = total;
                    moOrdenCompraImpuestos.ImporteMoneda = totalMoneda;
                }

                Commit();

                return moOrdenCompraImpuestos;
            }
            catch (Exception ex)
            {
                Rollback();
                throw;
            }


        }



    }
}
