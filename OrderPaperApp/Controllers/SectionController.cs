using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using OC.OrderPapersWeb.Models;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderPapers.Controllers
{
    [Route("api/[controller]")]
    public class SectionController : Controller
    {
        public List<dynamic> Summary = new List<dynamic>
        {
            new { Id = 1, Text = "Section 1" },
            new { Id = 2, Text = "Section 2" },
            new { Id = 3, Text = "Section 3" },
            new { Id = 4, Text = "Section 4" },
            new { Id = 5, Text = "Section 5" },
            new { Id = 6, Text = "Section 6" },
            new { Id = 7, Text = "Section 7" },
            new { Id = 8, Text = "Section 8" },
            new { Id = 9, Text = "Section 9" },
            new { Id = 10, Text = "Section 10" },
            new { Id = 11, Text = "Section 11" },
            new { Id = 12, Text = "Section 12" },
            new { Id = 13, Text = "Section 13" },
            new { Id = 14, Text = "Section 14" },
            new { Id = 15, Text = "Section 15" },
            new { Id = 16, Text = "Section 16" },
            new { Id = 17, Text = "Section 17" },
            new { Id = 18, Text = "Section 18" },
            new { Id = 19, Text = "Section 19" },
            new { Id = 20, Text = "Section 20" },
            new { Id = 21, Text = "Section 21" },
            new { Id = 22, Text = "Section 22" },
            new { Id = 23, Text = "Section 23" },
            new { Id = 24, Text = "Section 24" },
            new { Id = 25, Text = "Section 25" },
            new { Id = 26, Text = "Section 26" },
            new { Id = 27, Text = "Section 27" },
            new { Id = 28, Text = "Section 28" },
            new { Id = 29, Text = "Section 29" },
            new { Id = 30, Text = "Section 30" }
        };
        // GET: api/values
        [HttpGet]
        public string Get()
        {
            return JsonConvert.SerializeObject(Summary);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            var idStr = id.ToString();
            var name = Summary.Find(p => p.Id == id).Text;
            var section = new { Id = id, TitleEditingAllowed = false, Name = name, Details = "this is the details for " + name, Speeches = "this is the details for " + name, Subheading = new Subheading() };
            return JsonConvert.SerializeObject(section);
        }
    }
}
