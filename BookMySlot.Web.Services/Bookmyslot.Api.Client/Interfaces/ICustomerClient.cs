using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace BookMySlot.Web.Services.Bookmyslot.Api.Client.Interfaces
{
    public interface ICustomerClient
    {
        Task<Response<IEnumerable<ProfileSettings>>> GetCustomers();

        Task<Response<ProfileSettings>> GetCustomerByEmail(string email);
    }
}
