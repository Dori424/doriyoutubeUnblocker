let users = {
  admin: { password: "ADMIN_PASSWORD_HERE", isAdmin: true },
};

let blockedDevices = new Set();

export default function handler(req, res) {
  const { action, username, password, newUser, newPass, targetUser, deviceId } = req.body;

  if (deviceId && blockedDevices.has(deviceId)) {
    return res.status(403).json({ error: "Device blocked" });
  }

  if (action === "login") {
    if (!users[username] || users[username].password !== password) {
      return res.status(401).json({ error: "Invalid login" });
    }
    return res.json({ success: true, admin: users[username].isAdmin || false });
  }

  if (!users[username] || users[username].password !== password || !users[username].isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }

  if (action === "addUser") {
    users[newUser] = { password: newPass, isAdmin: false };
    return res.json({ success: true });
  }

  if (action === "removeUser") {
    delete users[targetUser];
    return res.json({ success: true });
  }

  if (action === "blockDevice") {
    blockedDevices.add(deviceId);
    return res.json({ success: true });
  }

  res.status(400).json({ error: "Invalid action" });
}
