import createApp from 'vue';
import moment from 'moment';

createApp.filter('formatDate', function(value, format = 'MMMM Do YYYY, h:mm:ss a') {
  if (!value) return '';
  return moment(value).format(format);
});