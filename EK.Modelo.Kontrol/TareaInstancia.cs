using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EK.Modelo.Kontrol.Interfaces;

namespace EK.Modelo.Kontrol
{
    //public class TareaInstancia
    //    : BaseKontrol, ITareaInstancia
    //{
    //    private int idInstancia;
    //    private string comentarios;
    //    private DateTime? fechaAprobacion;        
    //    private DateTime? fechaAsignacion;
    //    private DateTime? fechaVigencia;
    //    private int orden;
    //    private int diasVigencia;
    //    private int? idCompletadoPor;
    //    private int idReferencia;
    //    private string referencia;
    //    private bool? jefeDirecto;
    //    private int? idPuesto;
    //    private int? idPosicion;
    //    private bool? puestoJerarquia;
    //    private bool? puestoTodos;
    //    private IPuesto puesto;
    //    private IPosicion posicion;
    //    private List<ITareaInstancia> tareas;

    //    public TareaInstancia() 
    //        : base()
    //    {
    //    }

    //    public List<ITareaInstancia> Tareas
    //    {
    //        get {
    //            return this.tareas;
    //        }
    //        set {
    //            this.tareas = value;
    //        }
    //    }
    //    public int IdInstancia
    //    {
    //        get
    //        {
    //            return this.idInstancia;
    //        }

    //        set
    //        {
    //            this.idInstancia = value;
    //        }
    //    }

    //    public string Comentarios
    //    {
    //        get
    //        {
    //            return this.comentarios;
    //        }

    //        set
    //        {
    //            this.comentarios = value;
    //        }
    //    }

    //    public DateTime? FechaAprobacion
    //    {
    //        get
    //        {
    //            return this.fechaAprobacion;
    //        }

    //        set
    //        {
    //            this.fechaAprobacion = value;
    //        }
    //    }

    //    public DateTime? FechaAsignacion
    //    {
    //        get
    //        {
    //            return this.fechaAsignacion;
    //        }

    //        set
    //        {
    //            this.fechaAsignacion = value;
    //        }
    //    }

    //    public DateTime? FechaVigencia
    //    {
    //        get
    //        {
    //            return this.fechaVigencia;
    //        }

    //        set
    //        {
    //            this.fechaVigencia = value;
    //        }
    //    }

    //    public int? IdCompletadoPor
    //    {
    //        get
    //        {
    //            return this.idCompletadoPor;
    //        }

    //        set
    //        {
    //            this.idCompletadoPor = value;
    //        }
    //    }

    //    public int Orden
    //    {
    //        get
    //        {
    //            return this.orden;
    //        }

    //        set
    //        {
    //            this.orden = value;
    //            base.PropertyChanged("Orden");
    //        }
    //    }

    //    public int IdReferencia
    //    {
    //        get
    //        {
    //            return this.idReferencia;
    //        }

    //        set
    //        {
    //            this.idReferencia = value;
                
    //        }
    //    }

    //    public string Referencia
    //    {
    //        get
    //        {
    //            return this.referencia;
    //        }

    //        set
    //        {
    //            this.referencia = value;

    //        }
    //    }

    //    public int DiasVigencia
    //    {
    //        get
    //        {
    //            return this.diasVigencia;
    //        }

    //        set
    //        {
    //            this.diasVigencia = value;
    //            base.PropertyChanged("DiasVigencia");
    //        }
    //    }

    //    public bool? JefeDirecto
    //    {
    //        get
    //        {
    //            return this.jefeDirecto;
    //        }
    //        set
    //        {
    //            this.jefeDirecto = value;
    //        }
    //    }

    //    public int? IdPuesto
    //    {
    //        get
    //        {
    //            return this.idPuesto;
    //        }

    //        set
    //        {
    //            this.idPuesto = value;
    //        }
    //    }

    //    public bool? PuestoJerarquia
    //    {
    //        get
    //        {
    //            return this.puestoJerarquia;
    //        }

    //        set
    //        {
    //            this.puestoJerarquia = value;
    //        }
    //    }

    //    public bool? PuestoTodos
    //    {
    //        get
    //        {
    //            return this.puestoTodos;
    //        }

    //        set
    //        {
    //            this.puestoTodos = value;
    //        }
    //    }

    //    public int? IdPosicion
    //    {
    //        get
    //        {
    //            return this.idPosicion;
    //        }
    //        set
    //        {
    //            this.idPosicion = value;
    //        }
    //    }

    //    public IPuesto Puesto
    //    {
    //        get
    //        {
    //            return this.puesto;
    //        }
    //        set
    //        {
    //            this.puesto = value;
    //        }
    //    }

    //    public IPosicion Posicion
    //    {
    //        get
    //        {
    //            return this.posicion;
    //        }
    //        set
    //        {
    //            this.posicion = value;
    //        }
    //    }
    //}
}
