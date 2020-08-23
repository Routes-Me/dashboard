using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;

namespace InteractiveScreenDashboard.Controllers
{
    
    [Produces("application/json")]
    [Route("api/Vehicles")]
    public class VehiclesController : Controller
    {

        private IVehicleService _vehicle;

        public VehiclesController(IVehicleService vehicle)
        {
            this._vehicle = vehicle;
        }

        [HttpGet("{id}")]
        public IActionResult GetVehicles([FromRoute] int? id)
        {
            //var allVehicles = new ObjectResult(_vehicle.GetAllVehicles())
            //{
            //    StatusCode = (int)HttpStatusCode.OK
            //};
            var vehicles = _vehicle.GetVehicles(id);

            //Request.HttpContext.Response.Headers.Add("X-Total-Count", _vehicle.GetAllVehicles().Count().ToString());
            return Ok(vehicles);
        }

        [HttpGet("{id}")]
        public IActionResult GetVehiclesById([FromRoute]int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var vehicle = _vehicle.GetVehicleById(id);
            if (vehicle == null)
            {
                return NotFound();
            }

            return Ok(vehicle);
        }

        [HttpPost]
        public IActionResult AddVehicle([FromBody]Vehicle veh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (veh != null)
            {
                _vehicle.AddVehicle(veh);
            }
            return CreatedAtAction("GetVehiclesById", new { id = veh.id }, veh);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateVehicle([FromRoute]int id, [FromBody]Vehicle veh)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != veh.id)
            {
                return BadRequest();
            }
            

            try
            {
                _vehicle.UpdateVehicleDetails(id, veh);
                return Ok(veh);
            }
            catch (Exception e)
            {
                if (!_vehicle.VehicleExist(id))
                {
                    return NotFound();
                }
                else
                {
                    throw (e);
                }
            }

        }

        [HttpDelete("{id}")]
        public IActionResult DeleteVehicle([FromRoute]int id)
        {
            var veh = _vehicle.GetVehicleById(id);
            if(veh != null)
            {
                _vehicle.DeleteVehicle(id);
                return Ok(veh);
            }
            else
            {
                return NotFound();
            }
            
        }
    }
}