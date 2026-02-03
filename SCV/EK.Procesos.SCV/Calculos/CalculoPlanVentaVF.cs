using System;
using System.Collections.Generic;
using System.Threading.Tasks;

using pKontrol = EK.Procesos.Kontrol;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;
using EK.Procesos.Kontrol.Interfaces;

namespace EK.Procesos.SCV.Calculos
{
    public class CalculoPlanVentaVF
        : pKontrol.ProcesoBase, Interfaces.ICalculoPlanVenta
    {
        private const string CLAVE_TIPOABONO = "TIPOSABONO";
        private const string CLAVE_ABONO = "AB";
        private const string CLAVE_ABONO_CAPITAL = "AC";

        public CalculoPlanVentaVF(miKontrol.IContainerFactory factory)
        {
            this.factory = factory;
        }

        private async Task<EK.Modelo.Kontrol.Interfaces.IItemGeneral> getTipoAbono(string clave)
        {
            ICatalogosGeneralesValores tipoAbonoBP = this.factory.GetInstance<ICatalogosGeneralesValores>();

            return await tipoAbonoBP.Get(CLAVE_TIPOABONO, clave);
        }

        public async Task Calcular(IVenta venta, IVentaPPConcepto concepto, miKontrol.IAbono abono)
        {
            //if (abono.TipoAbono == null) {
            //    abono.TipoAbono = await this.getTipoAbono(CLAVE_ABONO_CAPITAL);
            //}
            concepto.Abonos.Add(abono);

            await this.Calcular(venta, concepto);
        }

        public async Task Calcular(IVenta venta, IVentaPPConcepto concepto)
        {
            // 1.- Obtener TIPO DE CAMBIO
            // 2.- Compania
            // 3.- 

            Interfaces.ITiposCambio tiposCambioBP = this.factory.GetInstance<Interfaces.ITiposCambio>();
            ICompania companiaBP = this.factory.GetInstance<ICompania>();

            if (venta != null)
            {
                int idMonedaOrigen = venta.Moneda.ID.Value;
                int idMonedaDestino = 0;
                int idCompania = venta.Desarrollo.IdCompania.Value;

                miKontrol.ICompania compania = await companiaBP.GetById(idCompania);
                idMonedaDestino = compania.IdMonedaBase.Value;

                decimal? tc = await tiposCambioBP.GetTipoCambioAlDia(idMonedaOrigen, idMonedaDestino) ?? 0;
                DateTime today = await companiaBP.Today(idCompania);

                Interfaces.ICalculoConceptoPV calculoConcepto = this.factory.GetInstance<Interfaces.ICalculoConceptoPV>();
                calculoConcepto.TiposAbono = new List<Modelo.Kontrol.Interfaces.IItemGeneral>();
                calculoConcepto.TiposAbono.Add(await this.getTipoAbono(CLAVE_ABONO));
                calculoConcepto.TiposAbono.Add(await this.getTipoAbono(CLAVE_ABONO_CAPITAL));
                calculoConcepto.TipoCambio = decimal.ToDouble(tc.Value);
                calculoConcepto.FechaActual = today;
                decimal totalFinanciamiento = 0;

                // Monto de Crédito
                if (venta != null &&
                    venta.Financiamiento != null &&
                    venta.Financiamiento.FinanciamientoInstituciones != null &&
                    venta.Financiamiento.FinanciamientoInstituciones.Count > 0)
                {
                    foreach (var c in venta.Financiamiento.FinanciamientoInstituciones)
                    {
                        if (c.Estado != Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            totalFinanciamiento += c.MontoCredito;
                        }
                    }

                    //if (venta.PlanPagos != null && venta.PlanPagos.Conceptos != null && venta.PlanPagos.Conceptos.Count > 0)
                    //{
                    //    var ppConcepto = venta.PlanPagos.Conceptos.Find(c => c.ConceptoPago.Clave == "MC");
                    //    if (ppConcepto != null)
                    //    {
                    //        ppConcepto.Saldo = totalFinanciamiento;
                    //    }
                    //}
                }

                // Monto de Ubicaciones
                if (venta != null &&
                    venta.Ubicaciones != null &&
                    venta.Ubicaciones.Count > 0)
                {
                    decimal totalUbicaciones = 0;

                    foreach (var item in venta.Ubicaciones)
                    {
                        if (item.Estado != EK.Modelo.Kontrol.KontrolEstadosEnum.Eliminado)
                        {
                            decimal importemoneda = item.ImporteMoneda!=null? Convert.ToDecimal(item.ImporteMoneda) : 0;
                            totalUbicaciones += importemoneda;
                        }
                    }
                    //venta.Ubicaciones.ForEach(u => totalUbicaciones += u.ImporteMoneda ?? 0);

                    venta.ImporteMoneda = totalUbicaciones;
                }

                //Pendiente revisar condición para recalcular los importes de los conceptos cuando cambia el valor de la venta.
                if (concepto == null)
                {
                    //foreach (var c in venta.PlanPagos.Conceptos)
                    //{
                    //    if (c.ConceptoPago.TipoConceptoPago.Clave == "N")
                    //    {
                    //        totalFinanciamiento += c.ImporteMoneda ?? 0;
                    //    }
                    //}

                    var dictionaryConceptos = new Dictionary<string, double>();
                    dictionaryConceptos.Add("V_TV", Convert.ToDouble(venta.ImporteMoneda));
                    dictionaryConceptos.Add("V_TF",Convert.ToDouble(totalFinanciamiento));

                    foreach (var c in venta.PlanPagos.Conceptos)
                    {
                        dictionaryConceptos.Add(c.ConceptoPago.Clave, Convert.ToDouble(c.CapitalMoneda));
                    }
                    //var resultadoC = venta.PlanPagos.Conceptos.Sort((a,b) => a.Orden.CompareTo(b.Orden));


                    // numbers.Sort((a, b) => (a.ToString()[0].CompareTo(b.ToString()[0])));

                    //(x, y) => x.Orden.CompareTo(y.Orden)

                    // Calculo de importes de conceptos
                    foreach (var c in venta.PlanPagos.Conceptos)
                    {
                        // Asignar saldo inicial si no está definido
                        if (c.Saldo == null)
                        {
                            c.Saldo = c.Importe;
                        }

                        
                        if (c.Porcentaje != null && c.Porcentaje > 0)
                        { // Calcular importe en base a porcentaje valor venta
                            c.ImporteMoneda = venta.ImporteMoneda * (c.Porcentaje / 100m);
                            c.Importe = venta.Importe * (c.Porcentaje / 100m);
                            c.IdMoneda = idMonedaDestino;
                            c.Saldo = c.ImporteMoneda;
                        }
                        bool addChangeConcepto = false;
                        if (c.Venta == true && (venta.EstatusVenta.Clave == "CO" || venta.EstatusVenta.Clave=="D"))
                        {
                            addChangeConcepto = true;
                        }
                        if (c.Reestructura == true && venta.EstatusVenta.Clave == "RE")
                        {
                            addChangeConcepto = true;
                        }
                        if (c.Finiquito == true && venta.EstatusVenta.Clave == "F")
                        {
                            addChangeConcepto = true;
                        }


                        if (c.Formula != null && c.Formula != "" && addChangeConcepto == true)
                        {
                            c.Saldo = Convert.ToDecimal(base.Evaluate<double>(c.Formula, dictionaryConceptos, venta.PlanPagos.Conceptos));
                        }
                        else if (addChangeConcepto == true && c.Importe > 0)
                        {
                            c.Saldo = c.Importe;
                        }
                        //else  //Calcular concepto tipo Diferencia de Crédito.
                        //if (c.ConceptoPago.TipoConceptoPago.Clave == "DC")
                        //{
                        //    c.ImporteMoneda = venta.ImporteMoneda - totalFinanciamiento;
                        //    c.Importe = venta.Importe - totalFinanciamiento;
                        //    c.IdMoneda = idMonedaDestino;
                        //    c.Saldo = c.ImporteMoneda;
                        //}

                        else
                            c.TipoCambio = tc;
                        c.IdMoneda = idMonedaDestino;

                        //if (addChangeConcepto && c.Saldo > 0)
                    
                        if (c.Saldo!=0)
                        {
                            await calculoConcepto.Calcular(venta, c);
                        }
                        else if (c.ID < 1)
                        {
                            c.Importe = Convert.ToDecimal(0);
                            c.ImporteMoneda = Convert.ToDecimal(0);
                            c.Interes = Convert.ToDecimal(0);
                            c.InteresMoneda = Convert.ToDecimal(0);
                            c.Capital = Convert.ToDecimal(0);
                            c.CapitalMoneda = Convert.ToDecimal(0);
                            c.Saldo = Convert.ToDecimal(0);
                            c.Pagado = Convert.ToDecimal(0);
                        }

                        if (dictionaryConceptos.ContainsKey(c.ConceptoPago.Clave))
                        {
                            dictionaryConceptos.Remove(c.ConceptoPago.Clave);
                        }
                        dictionaryConceptos.Add(c.ConceptoPago.Clave, Convert.ToDouble(c.CapitalMoneda));

                    }
                }
                else
                {

                    await calculoConcepto.Calcular(venta, concepto);

                    for (int i = 0; i < venta.PlanPagos.Conceptos.Count; i++)
                    {
                        if (venta.PlanPagos.Conceptos[i].ID == concepto.ID)
                        {
                            var conceptoNuevo = venta.PlanPagos.Conceptos[i];
                            conceptoNuevo.Abonos = concepto.Abonos;
                            conceptoNuevo.Importe = concepto.Importe;
                            conceptoNuevo.ImporteMoneda = concepto.ImporteMoneda;
                            conceptoNuevo.Interes = concepto.Interes;
                            conceptoNuevo.InteresMoneda = concepto.InteresMoneda;
                            conceptoNuevo.Capital = concepto.Capital;
                            conceptoNuevo.CapitalMoneda = concepto.CapitalMoneda;
                            conceptoNuevo.Documentos = concepto.Documentos;
                            conceptoNuevo.PorcentajeTIF = concepto.PorcentajeTIF;
                            conceptoNuevo.NumeroPagos = concepto.NumeroPagos;
                            conceptoNuevo.FrecuenciaPago = concepto.FrecuenciaPago;
                            conceptoNuevo.NumeroPlazoPrimerPago = concepto.NumeroPlazoPrimerPago;
                            conceptoNuevo.PeriodoPrimerPago = concepto.PeriodoPrimerPago;
                            conceptoNuevo.IdMoneda = concepto.IdMoneda;
                            conceptoNuevo.TipoCambio = tc;
                            conceptoNuevo.IdMoneda = idMonedaDestino;
                            conceptoNuevo.Porcentaje = concepto.Porcentaje ?? 0;
                            conceptoNuevo.PorcentajeTIM = concepto.PorcentajeTIM ?? 0;
                            conceptoNuevo.Pagado = concepto.Pagado;
                            conceptoNuevo.Saldo = concepto.Saldo;
                            venta.PlanPagos.Conceptos[i] = conceptoNuevo;

                            break;
                        }
                    }
                }
            }
        }

        public async Task Calcular(IVenta venta)
        {
            await this.Calcular(venta, null);
        }
    }
}