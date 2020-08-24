using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using InteractiveScreenDashboard.Data.Models;
using InteractiveScreenDashboard.Data.Services;
using Microsoft.AspNetCore.Mvc;

namespace InteractiveScreenDashboard.Controllers
{
    [Route("api/Institutions")]
    public class InstitutionController : Controller
    {
        private IInstitutionService _institutions;
        
        public InstitutionController(IInstitutionService institution)
        {
            this._institutions = institution;
        }

        [HttpGet("{id}")]
        public IActionResult GetInstitutions([FromRoute] int? id, [FromQuery] QueryParameters? parameters)
        {
            var institutions = _institutions.GetInstitutions(id, parameters);
            return Ok(institutions);
        }

        public IActionResult GetServices([FromRoute] int? id, [FromQuery] QueryParameters? parameters)
        {
            var services = _institutions.GetServices(id, parameters);
            return Ok(services);
        }

        [HttpPost]
        public IActionResult AddInstitution([FromBody] Institution inst)
        {
            _institutions.AddInstitution(inst);
            return Ok();
        }

        [HttpPut]
        public IActionResult AddInstitution(int id,Institution inst)
        {
            if(id != inst.id)
            {
                return BadRequest();
            }
            _institutions.UpdateInstitution(inst);
            return Ok();
        }

        

    }
}
