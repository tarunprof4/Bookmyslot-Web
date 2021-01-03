using BookMySlot.Web.Contracts;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Models;

namespace BookMySlot.Web.Services.Adaptors.Interfaces
{
    public interface IProfileSettingsRequestAdaptor
    {
        CustomerModel GetCustomerModel(ProfileSettings profileSettings);
    }
}
