import { request, response } from "express";
export const authorization = (role) => {
  return async (req = request, res = response, next) => {
    if (!req.user) return res.status(401).json({ status: "error", msg: "No Autorizado" });
    if (req.user.role != role) return res.status(403).json({ status: "error", msg: "No tenes permiso" });
    
    next();
  };
};