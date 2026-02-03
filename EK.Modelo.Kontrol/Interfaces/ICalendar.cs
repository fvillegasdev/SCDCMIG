using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EK.Modelo.Kontrol.Interfaces
{
    public interface ICalendar
    {
        string Version { get; set; }
        string ProdID { get; set; }
        string CalScale { get; set; }
        string Method { get; set; }

        List<ICalendarEvent> Events { get; set; }
    }
}
