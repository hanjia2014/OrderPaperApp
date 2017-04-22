namespace OC.OrderPapersWeb.Models
{
    public class OrderPaperWrapper
    {
        public int Id { get; set; }
        public string SittingDay { get; set; }
        public string Status { get; set; }
        public int Number { get; set; }
        public string OrderPaperJson { get; set; }
    }
}