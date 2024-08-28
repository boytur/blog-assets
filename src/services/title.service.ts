import pool from "../config/db.config";

// กำหนดรูปแบบของข้อมูล Title โดยใช้ interface
export interface Title {
  tit_id: number; // รหัสไตเติ้ล (Primary Key)
  tit_name: string; // ชื่อไตเติ้ล
  tit_is_active: boolean; // สถานะว่าไตเติ้ลนี้ยังใช้งานอยู่หรือไม่
}

// ดึงข้อมูลไตเติ้ลทั้งหมดจากตาราง titles
export const getAllTitles = async (): Promise<Title[]> => {
  const [rows] = await pool.query("SELECT * FROM titles");
  return rows as Title[]; // แปลงผลลัพธ์จากฐานข้อมูลเป็นอาเรย์ของ Title และส่งกลับ
};

// ดึงข้อมูลไตเติ้ลจากตาราง titles โดยใช้ ID
export const getTitleById = async (id: number): Promise<Title> => {
  const [rows] = await pool.query("SELECT * FROM titles WHERE tit_id = ?", [
    id,
  ]);
  return (rows as Title[])[0]; // ส่งกลับไตเติ้ลที่ตรงกับ ID หรือ undefined หากไม่พบ
};

// สร้างไตเติ้ลใหม่ในตาราง titles
export const createTitle = async (title: Title): Promise<void> => {
  await pool.query(
    "INSERT INTO titles (tit_name, tit_is_active) VALUES (?, ?)",
    [title.tit_name, title.tit_is_active] // กำหนดชื่อและสถานะของไตเติ้ลใหม่
  );
};

// อัปเดตข้อมูลไตเติ้ลในตาราง titles โดยใช้ ID
export const updateTitle = async (id: number, title: Title): Promise<void> => {
  await pool.query(
    "UPDATE titles SET tit_name = ?, tit_is_active = ? WHERE tit_id = ?",
    [title.tit_name, title.tit_is_active, id] // อัปเดตชื่อและสถานะของไตเติ้ลที่ระบุ ID
  );
};

// ลบไตเติ้ลออกจากตาราง titles โดยใช้ ID
export const deleteTitle = async (id: number): Promise<void> => {
  await pool.query("DELETE FROM titles WHERE tit_id = ?", [id]); // ลบไตเติ้ลที่ตรงกับ ID
};
