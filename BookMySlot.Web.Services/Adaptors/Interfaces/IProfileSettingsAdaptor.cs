using BookMySlot.Web.Common.Contracts;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Services.Bookmyslot.Api.Client.Models;
using System;
using System.Collections.Generic;
using System.Text;

namespace BookMySlot.Web.Services.Adaptors.Interfaces
{
    public interface IProfileSettingsAdaptor
    {
        ProfileSettings GetProfileSettings(CustomerModel customerModel);
    }
}
