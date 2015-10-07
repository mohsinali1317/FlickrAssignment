using FlickrTest.App_Start.Bundles;
using System.Web.Optimization;

namespace FlickrTest.App_Start
{
    /// <summary>
    /// Handles bundle configuration
    /// </summary>
    public class BundleConfig
    {
        // For more information on Bundling, visit http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/script").Include(
                        "~/Scripts/script.js"));


            bundles.Add(new StyleBundle("~/Content/foundation").Include(
              "~/Content/foundation/foundation.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            #region Foundation Bundles

            bundles.Add(Foundation.Scripts());
            #endregion

        }
    }
}