using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveScreenDashboard.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class AdvertisementController : ControllerBase
    {
        private readonly IAdvertisementService _Advertisement;

        public AdvertisementController(IAdvertisementService advertisementService)
        {
            this._Advertisement = advertisementService;
        }

        [Produces(typeof(Advertisement))]
        [HttpPost("advertisement")]
        public IActionResult addAdvertisement([FromBody]Advertisement add)
        {
            if(!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if(add!=null)
            {
                _Advertisement.addAdvertisement(add);

            }

            return Ok(add);
        }


        [HttpGet]
        public ActionResult getAllAdvertisements([FromRoute] int? institutionId,[FromQuery] QueryParameters parameters)
        {
            var result = new ObjectResult(_Advertisement.getAdvertisements(institutionId, parameters))
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            return Ok(result);
        }

        [HttpGet]
        public ActionResult getAllCampaigns()
        {
            var result = new ObjectResult(_Advertisement.getAllCampaign())
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            return Ok(result);
        }

        [HttpGet]
        public ActionResult getAllDayinterval()
        {
            var result = new ObjectResult(_Advertisement.getAllDayIntervals())
            {
                StatusCode = (int)HttpStatusCode.OK
            };
            return Ok(result);
        }
        





    }
}
