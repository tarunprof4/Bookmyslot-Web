using BookMySlot.Web.Contracts;
using BookMySlot.Web.Services.Adaptors.Interfaces;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Models;

namespace BookMySlot.Web.Services.Adaptors
{
    public class ProfileSettingsResponseAdaptor : IProfileSettingsResponseAdaptor
    {
        public ProfileSettings GetProfileSettings(CustomerModel customerModel)
        {
            return new ProfileSettings()
            {
                FirstName = customerModel.FirstName,
                MiddleName = customerModel.MiddleName,
                LastName = customerModel.LastName,
                Gender = customerModel.Gender,
                Email = customerModel.Email,
            };
        }

        public CustomerModel GetCustomerModel(ProfileSettings profileSettings)
        {
            return new CustomerModel()
            {
                FirstName = profileSettings.FirstName,
                MiddleName = profileSettings.MiddleName,
                LastName = profileSettings.LastName,
                Gender = profileSettings.Gender,
                Email = profileSettings.Email,
            };
        }
    }
}
