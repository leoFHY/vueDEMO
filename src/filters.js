const MyPlugin = {};
import moment from 'moment'
MyPlugin.install = function (Vue, options) {
  Vue.filter('omitTitle', function (data, arg) {
    if (data.length > arg) {
      return data.slice(0, arg) + '...';
    } else {
      return data;
    }
  });

};
export default MyPlugin;
