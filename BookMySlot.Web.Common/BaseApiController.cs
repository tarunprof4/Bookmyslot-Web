﻿using BookMySlot.Web.Common.Constants;
using BookMySlot.Web.Common.Contracts;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Linq;

namespace BookMySlot.Web.Common
{
    public class BaseApiController : ControllerBase
    {
        private IActionResult InternalServerError<T>(Response<T> response)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, response.Messages.First());
        }
        protected virtual IActionResult CreateGetHttpResponse<T>(Response<T> response)
        {
            if (response.ResultType == ResultType.Success)
            {
                return this.Ok(response.Result);

            }

            else if (response.ResultType == ResultType.Empty)
            {
                return StatusCode(StatusCodes.Status404NotFound, response.Messages.First());
            }

            else if (response.ResultType == ResultType.ValidationError)
            {
                return this.BadRequest(response.Messages.First());
            }

            return InternalServerError(response);
        }


        protected virtual IActionResult CreatePostHttpResponse<T>(Response<T> response)
        {
            if (response.ResultType == ResultType.Success)
            {
                return this.Created(string.Empty, response.Result);
            }

            else if (response.ResultType == ResultType.ValidationError)
            {
                return this.BadRequest(response.Messages.First());
            }

            return InternalServerError(response);
        }

        protected virtual IActionResult CreatePutHttpResponse<T>(Response<T> response)
        {
            if (response.ResultType == ResultType.Success)
            {
                return this.NoContent();
            }

            else if (response.ResultType == ResultType.ValidationError)
            {
                return this.BadRequest(response.Messages.First());
            }

            if (response.ResultType == ResultType.Empty)
            {
                return StatusCode(StatusCodes.Status404NotFound, response.Messages.First());
            }

            return InternalServerError(response);
        }


        protected virtual IActionResult CreateDeleteHttpResponse<T>(Response<T> response)
        {
            if (response.ResultType == ResultType.Success)
            {
                return this.NoContent();
            }

            else if (response.ResultType == ResultType.ValidationError)
            {
                return this.BadRequest(response.Messages.First());
            }

            if (response.ResultType == ResultType.Empty)
            {
                return StatusCode(StatusCodes.Status404NotFound, response.Messages.First());
            }

            return InternalServerError(response);
        }
    }
}
