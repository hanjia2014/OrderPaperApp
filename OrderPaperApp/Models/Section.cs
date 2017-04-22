using System.Collections.Generic;

namespace OC.OrderPapersWeb.Models
{
    public class Section
    {
        public bool IsFrontPage;
        public bool Include;
        public string Name;
        public List<Item> Items;
        public List<List<Item>> Groups;
        public Subheading Subheading;
        public Section()
        {
            Items = new List<Item>();
            Groups = new List<List<Item>>();
            Subheading = new Subheading();
        }
    }
}
