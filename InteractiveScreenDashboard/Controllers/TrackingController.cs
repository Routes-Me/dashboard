using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveScreenDashboard.Controllers
{
    [Authorize]
    [Produces("application/json")]
    [Route("api/tracking")]
    public class TrackingController : Controller
    {
        private ITrackingServices _tracking;
        public TrackingController(ITrackingServices Tracking)
        {
            this._tracking = Tracking;
        }
        [HttpGet]
        public IActionResult GetIdleVehicles()
        {
            var idleVehicles = _tracking.GetIdleVehicles();
            return Ok(idleVehicles);
        }
    }
}
