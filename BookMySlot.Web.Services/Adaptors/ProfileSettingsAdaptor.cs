using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Services.Adaptors.Interfaces;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookMySlot.Web.Services.Adaptors
{
    public class ProfileSettingsAdaptor : IProfileSettingsAdaptor
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
    }
}
