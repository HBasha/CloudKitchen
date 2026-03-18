
function isWithinTime(openTime, closeTime) {
  const now = new Date();
  const mins = now.getHours()*60 + now.getMinutes();
  const [oh, om] = openTime.split(":").map(Number);
  const [ch, cm] = closeTime.split(":").map(Number);
  return mins >= (oh*60+om) && mins <= (ch*60+cm);
}

function createWhatsAppLink(number, itemName) {
  return `https://wa.me/${number.replace("+", "")}?text=${encodeURIComponent('I want to order: ' + itemName)}`;
}
