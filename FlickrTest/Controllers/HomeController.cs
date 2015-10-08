using System.Web.Mvc;
using FlickrTest.Repository;
using FlickrTest.Models;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace FlickrTest.Controllers
{
    /// <summary>
    /// The home controller
    /// </summary>
    public class HomeController : Controller
    {
        /// <summary>
        /// GET: /Home/
        /// </summary>
        /// <returns>Returns an action result containing the view</returns>
        public ActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// Gets images from repository
        /// </summary>
        /// <param name="tags">Tags that should be searched for in the repository</param>
        /// <returns>A Json object containing the images from the repository</returns>
        /// 
        [HttpPost]
        public ActionResult GetImages(string tags, bool cacheFlicker = false)
        {
            return GetJson(tags, cacheFlicker);
        }

        [HttpGet]
        public ActionResult GetImages(string tags)
        {
            List<FlickrImage> images = new List<FlickrImage>();

           // dynamic test = JsonConvert.DeserializeObject(GetJson(tags, false).Data());


                foreach (var fi in GetJson(tags, false).Data)
                {
                    images.Add(fi);
                }

            ViewBag.Images = images;
            return View();
        }

        public dynamic GetJson(string tags, bool cacheFlicker)
        {
            dynamic flickrRepository = null;
            if (cacheFlicker)
                flickrRepository = new FlickrCacheableRepository();
            else
                flickrRepository = new FlickrRepository();
            return Json(flickrRepository.GetImagesByTags(tags), JsonRequestBehavior.AllowGet);
        }

    }
}
