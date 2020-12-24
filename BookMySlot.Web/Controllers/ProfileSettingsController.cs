using BookMySlot.Web.Common;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Contracts.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookMySlot.Web
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProfileSettingsController : BaseApiController
    {
        private readonly IProfileSettingsBusiness profileSettingsBusiness;

        /// <summary>
        /// Initializes a new instance of the <see cref="CustomerController"/> class. 
        /// </summary>
        /// <param name="customerBusiness">customer Business</param>
        /// <param name="customerRepository">The customer repository</param>
        public ProfileSettingsController(IProfileSettingsBusiness profileSettingsBusiness)
        {
            this.profileSettingsBusiness = profileSettingsBusiness;
        }

        // GET: api/<ProfileSettingsController>
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET api/<ProfileSettingsController>/5
        [HttpGet("{email}")]
        public async Task<IActionResult> Get(string email)
        {
            Log.Information("Get Profile Settings "+ email);
            var profileSettingsResponse = await this.profileSettingsBusiness.GetProfileSettings(email);
            return this.CreateGetHttpResponse(profileSettingsResponse);
        }

        // POST api/<ProfileSettingsController>
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProfileSettings profileSettings)
        {
            Log.Information("Save Profile Settings " + profileSettings);
            var profileSettingsResponse = await this.profileSettingsBusiness.SaveProfileSettings(profileSettings);
            return this.CreatePostHttpResponse(profileSettingsResponse);
        }

        // PUT api/<ProfileSettingsController>/5
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ProfileSettings profileSettings)
        {
            Log.Information("Update Profile Settings " + profileSettings);
            var profileSettingsResponse = await this.profileSettingsBusiness.UpdateProfileSettings(profileSettings);
            return this.CreatePutHttpResponse(profileSettingsResponse);
        }

        // DELETE api/<ProfileSettingsController>/5
        [HttpDelete("{email}")]
        public async Task<IActionResult> Delete(string email)
        {
            Log.Information("Delete Profile Settings " + email);
            var profileSettingsResponse = await this.profileSettingsBusiness.UpdateProfileSettings(new ProfileSettings());
            return this.CreateDeleteHttpResponse(profileSettingsResponse);
        }
    }
}
