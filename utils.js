function isWithinTime(openTime, closeTime) {
  const now = new Date();
  const current = now.getHours() * 60 + now.getMinutes();
  const [oh, om] = openTime.split(":").map(Number);
  const [ch, cm] = closeTime.split(":").map(Number);
  return current >= (oh*60+om) && current <= (ch*60+cm);
}
function createWhatsAppLink(number, itemName) {
  const encoded = encodeURIComponent(`I want to order: ${itemName}`);
  return `https://wa.me/${number.replace("+","")}?text=${encoded}`;
}
