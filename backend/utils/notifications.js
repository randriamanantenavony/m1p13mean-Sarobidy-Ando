const notifications = [];

// Ajouter une notification
const addNotification = ({ type, message, referenceId, shopId, date }) => {
  const notif = {
    id: Date.now().toString(), 
    type,          
    message,        
    referenceId,   
    shopId,     
    date: date || new Date(),
    read: false
  };
  notifications.push(notif);
  console.log('🔔 Nouvelle notification :', notif);
  return notif;
};

// Récupérer les notifications d’une boutique
const getNotificationsByShop = (shopId) => {
  return notifications.filter(n => n.shopId === shopId);
};

// Marquer notification comme lue
const markAsRead = (id) => {
  const notif = notifications.find(n => n.id === id);
  if (notif) notif.read = true;
  return notif;
};

module.exports = { addNotification, getNotificationsByShop, markAsRead };
