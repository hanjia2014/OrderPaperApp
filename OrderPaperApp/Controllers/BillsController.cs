using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderPaper.Web.Controllers
{
    [Route("api/[controller]")]
    public class BillsController : Controller
    {
        // GET: api/values
        [HttpGet]
        public string Get()
        {
            var bills = new List<Bill_CPD>();
            bills.Add(new Bill_CPD { business_item_id = 5, short_title = "Accident Rehabilitation and Compensation Insurance (Discretion and Redrafting) Amendment" });
            bills.Add(new Bill_CPD { business_item_id = 6, short_title = "Adoption (Intercountry)" });
            bills.Add(new Bill_CPD { business_item_id = 7, short_title = "Agricultural Compounds and Veterinary Medicines" });
            bills.Add(new Bill_CPD { business_item_id = 8, short_title = "Airport Authorities Amendment" });
            var result = JsonConvert.SerializeObject(bills);
            return result;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(string id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }

    public class Bill_CPD
    {
        public int business_item_id { get; set; }
        public string short_title { get; set; }
    }
}
