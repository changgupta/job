using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace ApiExample.Controllers
{
    public class ValuesController : ApiController
    {


        PoliclinicPatnaEntities web = new PoliclinicPatnaEntities();
        // GET api/values
        //[Route("api/adarsh/{id}")]
        public HttpResponseMessage Get()
        {

            var result = new
            {

                data = web.Doctors.Select(x => new { x.Id, x.Title, x.Mobile, x.Gender, x.Fee }).OrderByDescending(x => x.Id)
            };
           
            return Request.CreateResponse(HttpStatusCode.OK,result);


        }


        //[Route("api/adarsh/{id}")]
        public HttpResponseMessage GetDoctorbranch()
        {
            return Request.CreateResponse(HttpStatusCode.OK, web.Specializations.Select(x => new { x.Title,x.Id }));
        }

        // POST api/values

        [HttpPost]
        public HttpResponseMessage Post(Doctor value)
        {

            try
            {
                web.Doctors.Add(value);
                web.SaveChanges();
                return Request.CreateResponse(HttpStatusCode.OK, "Added Successfully");
            }
            catch (Exception)
            {

                return Request.CreateResponse(HttpStatusCode.BadRequest, "Internal Server Error");
            }

        }

        // PUT api/values/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpGet]
        public HttpResponseMessage Delete(int id)
        {
            Doctor obj = web.Doctors.Where(x => x.Id == id).FirstOrDefault();
            if (obj != null)
            {
                web.Doctors.Remove(obj);
                web.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK,"Delete Successfully");
            }

            else 
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

           
        }



        [HttpGet]
        public HttpResponseMessage Edit(int id)
        {
            Doctor obj = web.Doctors.Where(x => x.Id == id).FirstOrDefault();
            if (obj != null)
            {
                return Request.CreateResponse(HttpStatusCode.OK, obj);
            }

            else
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }


        }
    }
}
