using System;
using System.Collections.Generic;
using Microsoft.AspNetCore.Mvc;
using OC.OrderPapersWeb.Models;
using Newtonsoft.Json;
using System.Net.Http;
using System.Net;
using System.IO;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling Web API for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace OrderPapers.Controllers
{
    [Route("api/[controller]")]
    public class OrderPaperController : Controller
    {
        private readonly IHostingEnvironment _appEnvironment;
        public OrderPaperController(IHostingEnvironment appEnvironment)
        {
            _appEnvironment = appEnvironment;
        }
        // GET: api/values
        [HttpGet]
        public string Get()
        {
            var summary = new List<OrderPaperWrapper>();
            summary.Add(new OrderPaperWrapper { Id = 1, Number = 1, SittingDay = "11-Jan-2017", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 2, Number = 2, SittingDay = "12-Jan-2017", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 3, Number = 3, SittingDay = "13-Jan-2017", Status = "Provisional" });
            summary.Add(new OrderPaperWrapper { Id = 4, Number = 4, SittingDay = "14-Jan-2017", Status = "Final" });
            summary.Add(new OrderPaperWrapper { Id = 5, Number = 5, SittingDay = "15-Jan-2017", Status = "Provisional" });

            return JsonConvert.SerializeObject(summary);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            var sample = string.Empty;
            using (var stream = new FileStream(_appEnvironment.ContentRootPath + @"\op-sample.json", FileMode.Open))
            {
                using (var streamReader = new StreamReader(stream))
                {
                    sample = streamReader.ReadToEnd();
                }
            }
            var obj = JsonConvert.DeserializeObject(sample);
            var wrapper = new OrderPaperWrapper { Id = 14, Number = 9, OrderPaperJson = JsonConvert.SerializeObject(obj), SittingDay = "14-Jan-2017", Status = "Provisional" };
            return JsonConvert.SerializeObject(wrapper);
        }

        // POST api/values
        [HttpPost]
        public HttpResponseMessage Post([FromBody]OrderPaperWrapper value)
        {
            try
            {
                var json = JsonConvert.SerializeObject(value);
                var doc = JsonConvert.DeserializeXNode(json, "OrderPaper");
                HttpResponseMessage response = new HttpResponseMessage();
                response.StatusCode = HttpStatusCode.Created;
                return response;
            }
            catch (Exception e)
            {
                var response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                response.ReasonPhrase = e.Message;
                return response;
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public HttpResponseMessage Put(int id, [FromBody]OrderPaperWrapper value)
        {
            try
            {
                var json = JsonConvert.SerializeObject(value);
                var doc = JsonConvert.DeserializeXNode(json, "OrderPaper");
                HttpResponseMessage response = new HttpResponseMessage();
                response.StatusCode = HttpStatusCode.Created;
                return response;
            }
            catch (Exception e)
            {
                var response = new HttpResponseMessage(HttpStatusCode.InternalServerError);
                response.ReasonPhrase = e.Message;
                return response;
            }
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public bool Delete(int id)
        {
            return id > 0;
        }
    }
}
