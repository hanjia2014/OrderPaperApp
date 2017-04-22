using System.Collections.Generic;
using System;

namespace OC.OrderPapersWeb.Models
{
    public class Item
    {
        public int Sequence { get; set; }
        public string Type { get; set; }
        public string Title { get; set; }
    }

    public class MotionItem : Item
    {
        public DateTime Date { get; set; }
        public string Summary { get; set; }
        public string Member { get; set; }
        public string Speeches { get; set; }
        public string Motion { get; set; }
        public MotionItem() {
            this.Type = "Motion";
        }
    }

    public class BillItem : Item
    {
        public string Number { get; set; }
        public string Member { get; set; }
        public string Stage { get; set; }
        public bool IsCurrentSittingWeek { get; set; }
        public bool IsFollowingSittingWeek { get; set; }
        public bool IsMajorityAmendments { get; set; }
        public bool IsExtendedSittingHours { get; set; }
        public string Speeches { get; set; }
        public string LatestEvent { get; set; }

        public BillItem() {
            this.Type = "Bill";
        }
    }

    public class ReportItem : Item
    {
        public string Shoulder { get; set; }
        public string Committee { get; set; }
        public string LatestEvent { get; set; }
        public ReportItem() {
            this.Type = "Report";
        }
    }

    public class LineItem : Item
    {
        public LineItem() {
            this.Type = "Line";
        }
    }

    public class GroupItem : Item
    {
        public List<Item> Items { get; set; }
        public GroupItem() {
            this.Items = new List<Item>();
            this.Type = "Group";
        }
    }
}
