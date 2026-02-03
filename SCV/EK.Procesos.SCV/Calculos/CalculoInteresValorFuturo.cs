using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using pKontrol = EK.Procesos.Kontrol;
using miKontrol = EK.Modelo.Kontrol.Interfaces;
using EK.Modelo.SCV.Interfaces;
using EK.Procesos.SCV.Interfaces;

namespace EK.Procesos.SCV.Calculos
{
    public class CalculoInteresValorFuturo
        : pKontrol.ProcesoBase, ICalculoConceptoPV
    {
        private const string CLAVE_ABONO = "AB";
        private const string CLAVE_ABONO_CAPITAL = "AC";

        private double tipoCambio;
        private DateTime fechaActual;
        private List<EK.Modelo.Kontrol.Interfaces.IItemGeneral> tiposAbono;

        public CalculoInteresValorFuturo(miKontrol.IContainerFactory factory)
        {
            this.factory = factory;
        }

        public double TipoCambio
        {
            get
            {
                return this.tipoCambio;
            }
            set
            {
                this.tipoCambio = value;
            }
        }

        public List<EK.Modelo.Kontrol.Interfaces.IItemGeneral> TiposAbono
        {
            get
            {
                return this.tiposAbono;
            }
            set
            {
                this.tiposAbono = value;
            }
        }

        public DateTime FechaActual
        {
            get
            {
                return this.fechaActual;
            }
            set
            {
                this.fechaActual = value;
            }
        }

        public async Task Calcular(IVenta venta, IVentaPPConcepto concepto)
        {
            await Task.FromResult(0);

            if (concepto != null)
            {
                Interfaces.ITiposCambio tiposCambioBP = this.factory.GetInstance<Interfaces.ITiposCambio>();

                double interesAnual = decimal.ToDouble(concepto.PorcentajeTIF ?? 0);
                int plazo = concepto.NumeroPagos ?? 0;
                int plazoPrimerPago = concepto.NumeroPlazoPrimerPago ?? 0;
                int periodicidad = 0;
                int.TryParse(concepto.FrecuenciaPago.Clave, out periodicidad);
                int numeroPagos = concepto.NumeroPagos ?? 0;
                var DocsPagados = new List<miKontrol.IDocumentoPago>();
                var Pagados = 0;
                //double importeMoneda =decimal.ToDouble(concepto.ImporteMoneda ?? 0);

                double saldoConcepto;

                if (concepto.ID < 0)
                {
                    saldoConcepto = decimal.ToDouble(concepto.Saldo ?? 0);

                    if (saldoConcepto == 0)
                    {
                        saldoConcepto = decimal.ToDouble(concepto.ImporteMoneda ?? 0);
                    }
                }
                else
                {
                    saldoConcepto = decimal.ToDouble(concepto.Saldo ?? 0);
                }


                //double saldoConcepto = decimal.ToDouble(concepto.Saldo ?? 0);
                double pagadoConcepto = decimal.ToDouble(concepto.Pagado ?? 0);
                double importe = saldoConcepto;
                DateTime fechaVencimiento = DateTime.MinValue;
                double abono = 0d;
                // Boolean editar = true;

                var tipoAbonoRegular = this.tiposAbono.Where(ta => ta.Clave == CLAVE_ABONO).First();
                var tipoAbonoCapital = this.tiposAbono.Where(ta => ta.Clave == CLAVE_ABONO_CAPITAL).First();

                double totalImporteMoneda = 0d;
                double totalImporte = 0d;
                double totalInteresMoneda = 0d;
                double totalInteres = 0d;
                double totalCapitalMoneda = 0d;
                double totalCapital = 0d;


                double tc = this.tipoCambio;

                DateTime fechaInicial = DateTime.MinValue;
                DateTime fechaFinal = DateTime.MinValue;
                int numeroDocumento = 0;
                var documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();
                

                if (concepto.Documentos == null)
                {
                    concepto.Documentos = new List<miKontrol.IDocumentoPago>();
                }
                else
                {
                    // inicializamos la colección de documentos
                    var Docs = concepto.Documentos.ToList();
                    //Filtramos Documentos que solo sean diferentes a PAGADO
                    var DocsPorPagar = Docs.Where(x => x.EstatusDoc != "PAGADO").ToArray();
                    DocsPagados = Docs.Where(x => x.EstatusDoc == "PAGADO").ToList();

                    if (DocsPorPagar == null)
                    {
                        concepto.Documentos = new List<miKontrol.IDocumentoPago>();
                        concepto.Documentos.Clear();
                    }
                    else
                    {
                        if (venta.EstatusVenta.Clave == "RE" || venta.EstatusVenta.Clave == "F")
                        {
                            foreach (var d in concepto.Documentos)
                            {
                                if (d.EstatusDoc == "POR PAGAR")
                                {
                                    d.EstatusDoc = "CANCELADO";
                                }
                            }
                        }
                        else
                        {
                            concepto.Documentos.Clear();
                        }
                    }
                        //foreach(var c in venta.PlanPagos.Conceptos)
                        //{//Para guardar los documentos pagados en el caso que se invoca el método desde ubicaciones ó esquema.
                        //    if (c.ID == concepto.ID && c.Documentos.Count == 0)
                        //    {
                        //        concepto.Documentos = DocsPagados.ToList();
                        //        break;
                        //    }
                        //}
                        
                    }


                if (concepto.Pagado != null && concepto.Pagado > 0)
                {
                    //Deja los documentos que ya están pagados.
                    foreach (var c in venta.PlanPagos.Conceptos)
                    {
                        if (c.ID == concepto.ID)
                        {
                            ////pendiente revisar si se cancelará el documento o sigue activo cuando tiene pagos parciales.
                            foreach (var d in c.Documentos)
                            {
                                if (d.Pagado != null && d.Pagado > 0)
                                {
                                    if (d.Pagado < d.CapitalMoneda)
                                    {
                                        //Se genera otro concepto igual por el saldo pendiente.
                                        if (concepto.Documentos.Count > 0)
                                        {
                                            numeroDocumento = d.Numero + 1;
                                        }
                                        else
                                        {
                                            numeroDocumento = d.Numero;
                                        }


                                        // documento.EstatusDoc = "PAGADO";
                                        documento.ImporteMoneda = d.ImporteMoneda;
                                        documento.Pagado = d.Pagado;
                                        d.ImporteMoneda = d.Pagado;
                                        d.CapitalMoneda = d.Pagado - d.InteresMoneda;
                                        d.Capital = d.Pagado - d.Interes;

                                    }
                                    else { numeroDocumento++; }

                                    if (documento.Pagado < documento.ImporteMoneda)
                                    {//Para parcialidades.
                                        documento = d;
                                        concepto.Documentos.Add(documento);
                                    }
                                }
                            }
                        }
                    }
                    //****************************************//
                }


                if (periodicidad == 0d)
                {
                    // contado
                    // no se consideran los abonos adicionales

                    abono = importe;
                    fechaVencimiento = this.getFechaPrimerPago(plazoPrimerPago, concepto.PeriodoPrimerPago.Clave);

                    //var documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();
                    documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();
                    documento.ID = -1;
                    documento.Numero = 1;
                    documento.CapitalMoneda = Convert.ToDecimal(abono);
                    documento.InteresMoneda = 0;
                    documento.ImporteMoneda = Convert.ToDecimal(abono);
                    documento.Capital = Convert.ToDecimal(abono * tc);
                    documento.Interes = 0;
                    documento.Importe = Convert.ToDecimal(abono * tc);
                    documento.Vencimiento = fechaVencimiento;
                    documento.TipoCambio = Convert.ToDecimal(tc);
                    documento.TipoAbono = tipoAbonoCapital;
                    documento.Pagado = 0;
                    documento.EstatusDoc = "POR PAGAR";


                    totalCapital = abono * tc;
                    totalCapitalMoneda = abono;
                    totalInteres = 0d;
                    totalInteresMoneda = 0d;
                    totalImporte = abono * tc;
                    totalImporteMoneda = abono;

                    concepto.Documentos.Add(documento);
                }
                else if (interesAnual <= 0d)
                {
                    // calculo sin intereses
                    // en pagos
                    abono = importe / numeroPagos;
                    double saldo = importe;

                    for (var i = 0; i < plazo; i++)
                    {
                        //var documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();
                        documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();
                        if (i == 0)
                        {
                            // calculo primer pago
                            fechaVencimiento = this.getFechaPrimerPago(plazoPrimerPago, concepto.PeriodoPrimerPago.Clave);
                            
                        }
                        else
                        {
                            // calculo siguiente pago
                            fechaVencimiento = this.getFechaVencimiento(fechaVencimiento, periodicidad);
                        }
                        /*****/
                        if (concepto.Abonos != null)
                        {
                            foreach (var a
                                in concepto.Abonos.Where(a => a.Vencimiento >= fechaInicial && a.Vencimiento <= fechaVencimiento))
                            {

                                double importeAbono = Convert.ToDouble(a.ImporteMoneda);
                                //Si el importeAbono es mayor que el saldo, no se genera el movimiento.
                                if (importeAbono <= saldo)
                                {
                                    documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();

                                    numeroDocumento++;

                                    documento.ID = numeroDocumento * -1;
                                    documento.TipoAbono = tipoAbonoCapital;
                                    documento.Numero = numeroDocumento;
                                    documento.CapitalMoneda = Convert.ToDecimal(importeAbono);
                                    documento.InteresMoneda = 0;
                                    documento.ImporteMoneda = Convert.ToDecimal(importeAbono);
                                    documento.Capital = Convert.ToDecimal(importeAbono * tc);
                                    documento.Interes = 0;
                                    documento.Importe = Convert.ToDecimal(importeAbono * tc);
                                    documento.Vencimiento = a.Vencimiento;
                                    documento.TipoCambio = Convert.ToDecimal(tc);
                                    documento.Pagado = 0;
                                    documento.EstatusDoc = "POR PAGAR";
                                    documento.Status = "Abono";

                                    totalCapital += importeAbono * tc;
                                    totalCapitalMoneda += importeAbono;
                                    totalImporte += importeAbono * tc;
                                    totalImporteMoneda += importeAbono;

                                    // recalcular en base al nuevo saldo en capital
                                    saldo = (saldo - importeAbono);

                                    abono = saldo / (numeroPagos - i);

                                    concepto.Documentos.Add(documento);
                                }
                            }
                        }

                        /*****/
                        //if (abono > 0)
                        //{
                            numeroDocumento++;
                            documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();
                            documento.ID = (numeroDocumento * -1);
                            documento.Numero = numeroDocumento;
                            documento.CapitalMoneda = Convert.ToDecimal(abono);
                            documento.InteresMoneda = 0;
                            documento.ImporteMoneda = Convert.ToDecimal(abono);
                            documento.Capital = Convert.ToDecimal(abono * tc);
                            documento.Interes = 0;
                            documento.Importe = Convert.ToDecimal(abono * tc);
                            documento.Vencimiento = fechaVencimiento;
                            documento.TipoCambio = Convert.ToDecimal(tc);
                            documento.TipoAbono = tipoAbonoCapital;
                            documento.Pagado = 0;
                            if (documento.EstatusDoc != "PAGADO")
                            {
                                documento.EstatusDoc = "POR PAGAR";
                            }
                            totalCapital += abono * tc;
                            totalCapitalMoneda += abono;
                            totalInteres += 0d;
                            totalInteresMoneda += 0d;
                            totalImporte += abono * tc;
                            totalImporteMoneda += abono;

                            concepto.Documentos.Add(documento);
                            fechaInicial = fechaVencimiento;
                            saldo = saldo - abono;
                        //}
                    }
                }
                else
                {

                    double factor = (interesAnual / 12d) * (periodicidad / 100d); // tasa anual / 12 * periodicidad / 100
                    double valorFuturo = 0;
                    double saldo = 0;



                    if (DocsPagados.Count > 0 && Pagados == 0)
                    {
                        for (int d = 0; d < DocsPagados.Count; d++)
                        {
                            documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();
                            numeroDocumento = documento.Numero + 1;
                            DocsPagados[d].ImporteMoneda = DocsPagados[d].Pagado;
                            DocsPagados[d].CapitalMoneda = DocsPagados[d].Pagado - DocsPagados[d].InteresMoneda;
                            DocsPagados[d].Capital = DocsPagados[d].Pagado - DocsPagados[d].Interes;
                            concepto.Documentos = DocsPagados.ToList();
                            //Resta lo pagado y calcula de nuevo el saldo
                            importe = importe - Convert.ToDouble(DocsPagados[d].Pagado);
                            Pagados = 1;
                        }


                    }

                    valorFuturo = importe * Math.Pow((1d + factor), plazo); // importe 
                    saldo = importe;

                    // calculo con intereses
                    abono = (valorFuturo * factor) / (Math.Pow((1 + factor), plazo) - 1d);

                    //DateTime fechaInicial = DateTime.MinValue;
                    //DateTime fechaFinal = DateTime.MinValue;
                    //int numeroDocumento = 0;
                    for (var i = 0; i < plazo; i++)
                    {

                        var intereses = 0d;
                        var capital = 0d;

                        //var documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();

                        if (i == 0)
                        {
                            // calculo primer pago
                            fechaVencimiento = this.getFechaPrimerPago(plazoPrimerPago, concepto.PeriodoPrimerPago.Clave);
                        }
                        else
                        {
                            // calculo siguiente pago
                            fechaVencimiento = this.getFechaVencimiento(fechaVencimiento, periodicidad);
                        }

                        if (concepto.Abonos != null)
                        {
                            foreach (var a
                                in concepto.Abonos.Where(a => a.Vencimiento >= fechaInicial && a.Vencimiento <= fechaVencimiento))
                            {

                                double importeAbono = Convert.ToDouble(a.ImporteMoneda);
                                documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();

                                numeroDocumento++;

                                documento.ID = numeroDocumento * -1;
                                documento.TipoAbono = tipoAbonoCapital;
                                documento.Numero = numeroDocumento;
                                documento.CapitalMoneda = Convert.ToDecimal(importeAbono);
                                documento.InteresMoneda = 0;
                                documento.ImporteMoneda = Convert.ToDecimal(importeAbono);
                                documento.Capital = Convert.ToDecimal(importeAbono * tc);
                                documento.Interes = 0;
                                documento.Importe = Convert.ToDecimal(importeAbono * tc);
                                documento.Vencimiento = a.Vencimiento;
                                documento.TipoCambio = Convert.ToDecimal(tc);
                                documento.Pagado = 0;
                                documento.EstatusDoc = "POR PAGAR";
                                documento.Status = "Abono";

                                totalCapital += importeAbono * tc;
                                totalCapitalMoneda += importeAbono;
                                totalImporte += importeAbono * tc;
                                totalImporteMoneda += importeAbono;

                                // recalcular en base al nuevo saldo en capital
                                saldo = (saldo - importeAbono);

                                valorFuturo = saldo * Math.Pow((1d + factor), (plazo - i));
                                abono = (valorFuturo * factor) / (Math.Pow((1 + factor), (plazo - i)) - 1d);

                                concepto.Documentos.Add(documento);
                            }
                        }

                        intereses = saldo * factor;
                        capital = abono - intereses;

                        numeroDocumento++;

                        documento = this.factory.GetInstance<miKontrol.IDocumentoPago>();
                        documento.ID = numeroDocumento * -1;
                        documento.TipoAbono = tipoAbonoRegular;
                        documento.Numero = numeroDocumento;
                        documento.CapitalMoneda = Convert.ToDecimal(capital);
                        documento.InteresMoneda = Convert.ToDecimal(intereses);
                        documento.ImporteMoneda = Convert.ToDecimal(abono);
                        documento.Capital = Convert.ToDecimal(capital * tc);
                        documento.Interes = Convert.ToDecimal(intereses * tc); ;
                        documento.Importe = Convert.ToDecimal(abono * tc);
                        documento.Vencimiento = fechaVencimiento;
                        documento.TipoCambio = Convert.ToDecimal(tc);
                        documento.Pagado = 0;
                        if (documento.EstatusDoc != "PAGADO")
                        {
                            documento.EstatusDoc = "POR PAGAR";
                        }

                        totalCapital += capital * tc;
                        totalCapitalMoneda += capital;
                        totalInteres += intereses * tc;
                        totalInteresMoneda += intereses;
                        totalImporte += abono * tc;
                        totalImporteMoneda += abono;

                        concepto.Documentos.Add(documento);

                        saldo = saldo - capital;
                        fechaInicial = fechaVencimiento;


                    }
                }
                concepto.Importe = Convert.ToDecimal(totalImporte);
                concepto.ImporteMoneda = Convert.ToDecimal(totalImporteMoneda);
                concepto.Interes = Convert.ToDecimal(totalInteres);
                concepto.InteresMoneda = Convert.ToDecimal(totalInteresMoneda);
                concepto.Capital = Convert.ToDecimal(totalCapital);
                concepto.CapitalMoneda = Convert.ToDecimal(totalCapitalMoneda) + Convert.ToDecimal(pagadoConcepto);
                concepto.Saldo = Convert.ToDecimal(saldoConcepto);
                concepto.Pagado = Convert.ToDecimal(pagadoConcepto);
            }
        }

        private DateTime getFechaPrimerPago(int plazo, string periodo)
        {
            DateTime retValue = this.fechaActual;

            if (periodo == "D")
            {
                retValue = retValue.AddDays(plazo);
            }
            else if (periodo == "M")
            {
                retValue = retValue.AddMonths(plazo);
            }
            else if (periodo == "A")
            {
                retValue = retValue.AddYears(plazo);
            }

            return retValue;
        }

        private DateTime getFechaVencimiento(DateTime fecha, int periodicidad)
        {
            DateTime retValue = fecha.AddMonths(periodicidad);

            return retValue;
        }
    }
}