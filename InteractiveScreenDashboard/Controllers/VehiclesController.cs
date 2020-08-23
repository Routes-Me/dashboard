using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using System.Net;

namespace InteractiveScreenDashboard.Controllers
{
    
    [Produces("application/json")]
    [Route("api/vehicles")]
    public class VehiclesController : Controller
    {

        private IVehicleService _vehicle;

        public VehiclesController(IVehicleService vehicle)
        {
            this._vehicle = vehicle;
        }

        [HttpGet("{id}")]
        public IActionResult GetVehicles([FromRoute] int? institutionId, [FromQuery]QueryParameters parameters)
        {
            //var allVehicles = new ObjectResult(_vehicle.GetAllVehicles())
            //{
            //    StatusCode = (int)HttpStatusCode.OK
            //};
            var vehicles = _vehicle.GetVehicles(institutionId, parameters);

            //Request.HttpContext.Response.Headers.Add("X-Total-Count", _vehicle.GetAllVehicles().Count().ToString());
            return Ok(vehicles);
        }

        [Route("manufacturers")]
        public IActionResult GetMakes(QueryParameters? parameters)
        {
            var makes = _vehicle.GetMakes(parameters);
            return Ok(makes);
        }
        [Route("models")]
        public IActionResult GetModels(QueryParameters? parameters)
        {
            var models = _vehicle.GetModels(parameters);
            return Ok(models);
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
        public IActionResult AddVehicle([FromBody]Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            if (vehicle != null)
            {
                _vehicle.AddVehicle(vehicle);
            }
            return CreatedAtAction("GetVehiclesById", new { id = vehicle.id }, vehicle);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateVehicle([FromRoute]int id, [FromBody]Vehicle vehicle)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != vehicle.id)
            {
                return BadRequest();
            }
            

            try
            {
                _vehicle.UpdateVehicleDetails(id, vehicle);
                return Ok(vehicle);
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