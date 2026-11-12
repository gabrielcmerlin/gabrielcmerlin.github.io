/* Filter for the Updates list on the home page.
   "Last year" keeps the items dated within the 12 months up to the current
   month of the visitor's calendar; the date is read from the bold "Mon YYYY"
   at the start of each item. */
(function () {
  var select = document.getElementById('updates-range');
  var list = document.getElementById('updates-list');
  if (!select || !list) { return; }

  var MONTHS = { Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5, Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11 };

  function itemMonthIndex(li) {
    var strong = li.querySelector('strong');
    var m = strong && strong.textContent.trim().match(/^([A-Z][a-z]{2})\s+(\d{4})$/);
    if (!m || !(m[1] in MONTHS)) { return null; }
    return Number(m[2]) * 12 + MONTHS[m[1]];
  }

  function apply() {
    var now = new Date();
    var current = now.getFullYear() * 12 + now.getMonth();
    var oldest = current - 11; /* this month plus the 11 before it */
    Array.prototype.forEach.call(list.children, function (li) {
      var idx = itemMonthIndex(li);
      var show = select.value === 'all' || (idx !== null && idx >= oldest && idx <= current);
      li.hidden = !show;
    });
  }

  select.addEventListener('change', apply);
  apply();
})();
