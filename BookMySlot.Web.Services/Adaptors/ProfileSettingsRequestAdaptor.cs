using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Services.Adaptors.Interfaces;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookMySlot.Web.Services.Adaptors
{
    public class ProfileSettingsRequestAdaptor : IProfileSettingsRequestAdaptor
    {
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
