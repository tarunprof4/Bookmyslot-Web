using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Contracts;
using System.Threading.Tasks;

namespace BookMySlot.Web.Services.Bookmyslot.Api.Client.Interfaces
{
    public interface ICustomerClient
    {
        Task<Response<ProfileSettings>> GetCustomerByEmail(string email);
        Task<Response<string>> CreateCustomer(ProfileSettings profileSettings);
        Task<Response<bool>> DeleteCustomer(string email);
        Task<Response<bool>> UpdateCustomer(ProfileSettings profileSettings);
    }


}
