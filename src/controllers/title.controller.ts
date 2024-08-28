import { Request, Response } from "express";
import {
  getAllTitles,
  getTitleById,
  createTitle,
  updateTitle,
  deleteTitle,
} from "../services/title.service";

// ดึงข้อมูลไตเติ้ลทั้งหมดและส่งกลับในรูปแบบ JSON
export const getTitles = async (req: Request, res: Response): Promise<void> => {
  try {
    const titles = await getAllTitles(); // เรียกใช้ service เพื่อดึงข้อมูลไตเติ้ลทั้งหมด
    res.json(titles); // ส่งข้อมูลไตเติ้ลกลับไปยังผู้ร้องขอในรูปแบบ JSON
  } catch (error) {
    console.error("Error getting titles:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ดึงข้อมูลไตเติ้ลตาม ID ที่ระบุและส่งกลับในรูปแบบ JSON
export const getTitle = async (req: Request, res: Response): Promise<void> => {
  try {
    const title = await getTitleById(parseInt(req.params.id)); // แปลง ID จากพารามิเตอร์เป็นจำนวนเต็มและดึงข้อมูลไตเติ้ล
    if (title) {
      res.json(title); // หากพบไตเติ้ลที่ตรงกับ ID ให้ส่งกลับในรูปแบบ JSON
    } else {
      res.status(404).json({ message: "Title not found" }); // หากไม่พบไตเติ้ล ส่งสถานะ 404 และข้อความแจ้งว่าไม่พบ
    }
  } catch (error) {
    console.error("Error getting title:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// เพิ่มไตเติ้ลใหม่ในฐานข้อมูลและส่งข้อความยืนยัน
export const addTitle = async (req: Request, res: Response): Promise<void> => {
  try {
    await createTitle(req.body); // ใช้ข้อมูลที่ได้รับจาก request body เพื่อสร้างไตเติ้ลใหม่
    res.status(201).json({ message: "Title created" }); // ส่งสถานะ 201 (Created) และข้อความยืนยันว่าการสร้างไตเติ้ลสำเร็จ
  } catch (error) {
    console.error("Error creating title:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// อัปเดตข้อมูลไตเติ้ลตาม ID ที่ระบุและส่งข้อความยืนยัน
export const updateTitleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await updateTitle(parseInt(req.params.id), req.body); // แปลง ID จากพารามิเตอร์และอัปเดตข้อมูลไตเติ้ลตาม request body
    res.json({ message: "Title updated" }); // ส่งข้อความยืนยันว่าการอัปเดตสำเร็จ
  } catch (error) {
    console.error("Error updating title:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// ลบไตเติ้ลตาม ID ที่ระบุและส่งข้อความยืนยัน
export const deleteTitleById = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    await deleteTitle(parseInt(req.params.id)); // แปลง ID จากพารามิเตอร์และลบไตเติ้ลที่ตรงกับ ID
    res.json({ message: "Title deleted" }); // ส่งข้อความยืนยันว่าการลบสำเร็จ
  } catch (error) {
    console.error("Error deleting title:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
