using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Net.Http;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderPaper.Web.Controllers
{
    [Route("api/[controller]")]
    public class ConfigurationController : Controller
    {
        // GET: api/values
        [HttpGet]
        public string Get()
        {
            var items = new List<ConfigItem>();
            items.Add(new ConfigItem { Key = "CPD Service Url", Value = "http://localhost/CoreParliamentaryData/CoreParliamentaryData.svc/" });
            items.Add(new ConfigItem { Key = "Bill Url Prefix", Value = "https://www.parliament.nz/en/pb/bills-and-laws/bills-prosposed-laws/document/" });
            items.Add(new ConfigItem { Key = "No of Parliament", Value = "51" });
            items.Add(new ConfigItem { Key = "PDF Generation Service", Value = "https://was.campus.services/_api/WAS/" });
            items.Add(new ConfigItem { Key = "Conversion List Url", Value = "http://ocpha.campus.services/sites/oppha/OrderPaperDocuments" });
            items.Add(new ConfigItem { Key = "Conversion Site Url", Value = "http://ocpha.campus.services/sites/OPPHA" });
            items.Add(new ConfigItem { Key = "OP Row Limit", Value = "300" });
            items.Add(new ConfigItem { Key = "Publish Email To", Value = "printlinkld@bluestargroup.co.nz" });
            items.Add(new ConfigItem { Key = "Publish Email CC", Value = "Table.Office@parliament.govt.nz" });
            items.Add(new ConfigItem { Key = "Sections Management Url", Value = "http://ocpha.campus.services/sites/OPPHA/Lists/Sections/AllItems.aspx" });
            items.Add(new ConfigItem { Key = "Publication Web Service", Value = "https://oppublishing.campus.services/api/publicationrequestor" });
            items.Add(new ConfigItem { Key = "PDF Static Email Url", Value = "https://www.parliament.nz/en/pb/order-paper-questions/order-paper/document/OrderPaper_" });

            return JsonConvert.SerializeObject(items);
        }
    }

    public class ConfigItem
    {
        public string Key { get; set; }
        public string Value { get; set; }
    }
}