using BookMySlot.Web.Common;
using BookMySlot.Web.Contracts;
using BookMySlot.Web.Contracts.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Serilog;
using System.Collections.Generic;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace BookMySlot.Web
{
    [Produces("application/json")]
    [Consumes("application/json")]
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

        /// <summary>
        /// Gets customer by email
        /// </summary>
        /// <param name="email">customer email id</param>
        /// <returns >customer details</returns>
        /// <response code="200">Returns customer details</response>
        /// <response code="404">no customer found</response>
        /// <response code="400">validation error bad request</response>
        /// <response code="500">internal server error</response>
        // GET api/<CustomerController>/email
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpGet("{email}")]
        public async Task<IActionResult> Get(string email)
        {
            Log.Information("Get Profile Settings "+ email);
            var profileSettingsResponse = await this.profileSettingsBusiness.GetProfileSettings(email);
            return this.CreateGetHttpResponse(profileSettingsResponse);
        }

        /// <summary>
        /// Create new customer
        /// </summary>
        /// <param name="customerModel">customer model</param>
        /// <returns >returns email id of created customer</returns>
        /// <response code="201">Returns email id of created customer</response>
        /// <response code="400">validation error bad request</response>
        /// <response code="500">internal server error</response>
        // POST api/<CustomerController>
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProfileSettings profileSettings)
        {
            Log.Information("Save Profile Settings " + profileSettings);
            var profileSettingsResponse = await this.profileSettingsBusiness.SaveProfileSettings(profileSettings);
            return this.CreatePostHttpResponse(profileSettingsResponse);
        }

        /// <summary>
        /// Update existing customer
        /// </summary>
        /// <param name="customerModel">customer model</param>
        /// <returns >success or failure bool</returns>
        /// <response code="204">Returns success or failure bool</response>
        /// <response code="400">validation error bad request</response>
        /// <response code="404">no customer found</response>
        /// <response code="500">internal server error</response>
        // PUT api/<CustomerController>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpPut]
        public async Task<IActionResult> Put([FromBody] ProfileSettings profileSettings)
        {
            Log.Information("Update Profile Settings " + profileSettings);
            var profileSettingsResponse = await this.profileSettingsBusiness.UpdateProfileSettings(profileSettings);
            return this.CreatePutHttpResponse(profileSettingsResponse);
        }

        /// <summary>
        /// Delete existing customer
        /// </summary>
        /// <param name="email">customer email</param>
        /// <returns >success or failure bool</returns>
        /// <response code="204">Returns success or failure bool</response>
        /// <response code="400">validation error bad request</response>
        /// <response code="404">no customer found</response>
        /// <response code="500">internal server error</response>
        // DELETE api/<CustomerController>/email
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        [HttpDelete("{email}")]
        public async Task<IActionResult> Delete(string email)
        {
            Log.Information("Delete Profile Settings " + email);
            var profileSettingsResponse = await this.profileSettingsBusiness.DeleteProfileSettings(email);
            return this.CreateDeleteHttpResponse(profileSettingsResponse);
        }
    }
}
