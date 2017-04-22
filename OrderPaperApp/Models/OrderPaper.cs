using System;
using System.Collections.Generic;

namespace OC.OrderPapersWeb.Models
{
    public class OrderPaper
    {
        public string Id { get; set; }
        public DateTime Date { get; set; }
        public string Status { get; set; }
        public string OrderPaperNumber { get; set; }
        public string SittingHours { get; set; }
        public List<Section> Sections { get; set; }
    }
}
