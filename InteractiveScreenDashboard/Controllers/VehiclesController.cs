using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveScreenDashboard.Controllers
{
    [Route("api/[Controller]")]
    public class VehiclesController : Controller
    {

        private IVehicleService _vehicle;

        public VehiclesController(IVehicleService vehicle)
        {
            this._vehicle = vehicle;
        }

        [HttpGet("Vehicle")]
        public IActionResult GetAllVehicles()
        {
            var allVehicles = _vehicle.GetAllVehicles();
            return Ok(allVehicles);
        }

        [HttpGet("Vehicle/{id}")]
        public IActionResult GetVehiclesById(int id)
        {
            var vehicle = _vehicle.GetVehicleById(id);
            return Ok(vehicle);
        }

        [HttpPost("Vehicle")]
        public IActionResult AddVehicle([FromBody]Vehicle veh)
        {
            if (veh != null)
            {
                _vehicle.AddVehicle(veh);
            }
            return Ok();
        }

        [HttpPut("Vehicle/{id}")]
        public IActionResult UpdateVehicle(int id, [FromBody]Vehicle veh)
        {
            _vehicle.UpdateVehicleDetails(id, veh);
            return Ok(veh);
        }

        [HttpDelete("Vehicle/{id}")]
        public IActionResult DeleteVehicle(int id)
        {
            _vehicle.DeleteVehicle(id);
            return Ok();
        }
    }
}