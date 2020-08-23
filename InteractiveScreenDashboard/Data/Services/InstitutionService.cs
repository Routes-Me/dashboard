using InteractiveScreenDashboard.Data.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace InteractiveScreenDashboard.Data.Services
{
    public class InstitutionService : IInstitutionService
    {
        public Institution AddInstitution(Institution inst)
        {
            throw new NotImplementedException();
        }

        public List<Institution> GetInstitutions(int? id)
        {
            List<Institution> InstitutionList = new List<Institution>();
            if (id == null)
            {
                // get for all
            }
            else
            {
                //get for single
            }

            return InstitutionList;
            //throw new NotImplementedException();
        }

        public Institution UpdateInstitution(Institution inst)
        {
            throw new NotImplementedException();
        }
    }
}
