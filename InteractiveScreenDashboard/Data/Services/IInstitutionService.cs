using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public interface IInstitutionService
    {
        List<Institution> GetInstitutions(int? id, QueryParameters? parameters);
        List<Service> GetServices(int? id, QueryParameters? parameters);
        Institution AddInstitution(Institution inst);
        Institution UpdateInstitution(Institution inst);


    }
}
